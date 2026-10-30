/*
 * Site QA (US-039). Needs a running server: `npm run build && npm start`, then
 *   npm run qa            (BASE_URL defaults to http://localhost:3000)
 *
 * Crawls every internal page reachable from /en and /id and checks, per page:
 *   - HTTP status is 200 (links to /store* are skipped: served by exantara)
 *   - no horizontal scroll at 375 / 768 / 1440 px
 *   - every <img> has an alt attribute, exactly one <h1>
 *   - no console errors / page errors
 * Exits 1 with a list of problems.
 */
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium, type Browser } from "playwright-core";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const VIEWPORTS = [375, 768, 1440];
const CHROME =
  process.env.CHROME_PATH ?? join(homedir(), ".cache/ms-playwright/chromium-1200/chrome-linux64/chrome");

const problems: string[] = [];

async function crawl(browser: Browser): Promise<string[]> {
  const queue = ["/en", "/id"];
  const seen = new Set(queue);
  const page = await browser.newPage();
  for (let i = 0; i < queue.length; i++) {
    const path = queue[i];
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    const status = res?.status() ?? 0;
    if (status !== 200) {
      problems.push(`${path}: HTTP ${status}`);
      continue;
    }
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href") ?? ""));
    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const clean = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
      if (clean.startsWith("/store") || clean.startsWith("/_next") || /\.[a-z0-9]+$/i.test(clean)) continue;
      if (!seen.has(clean)) {
        seen.add(clean);
        queue.push(clean);
      }
    }
  }
  await page.close();
  return queue;
}

async function audit(browser: Browser, path: string) {
  for (const width of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors: string[] = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    page.on("pageerror", (err) => errors.push(err.message));
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    if (res?.status() !== 200) {
      await page.close();
      continue;
    }
    // Scroll through so lazy/whileInView content renders before measuring.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    const r = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      imgsWithoutAlt: Array.from(document.images).filter((img) => !img.hasAttribute("alt")).map((img) => img.src),
      h1: document.querySelectorAll("h1").length,
    }));
    const at = `${path} @${width}px`;
    if (r.scrollWidth > r.innerWidth) problems.push(`${at}: horizontal scroll (${r.scrollWidth} > ${r.innerWidth})`);
    if (width === 1440) {
      if (r.imgsWithoutAlt.length) problems.push(`${at}: <img> without alt: ${r.imgsWithoutAlt.join(", ")}`);
      if (r.h1 !== 1) problems.push(`${at}: expected 1 <h1>, found ${r.h1}`);
    }
    for (const e of errors) problems.push(`${at}: console error: ${e.slice(0, 200)}`);
    await page.close();
  }
}

async function main() {
  if (!existsSync(CHROME)) throw new Error(`Chromium not found at ${CHROME} (set CHROME_PATH)`);
  const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });
  try {
    const pages = await crawl(browser);
    console.log(`crawled ${pages.length} pages`);
    for (const path of pages) await audit(browser, path);
  } finally {
    await browser.close();
  }
  if (problems.length) {
    console.error(`qa failed (${problems.length}):\n- ${problems.join("\n- ")}`);
    process.exit(1);
  }
  console.log("qa ok");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
