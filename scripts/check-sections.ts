/*
 * Guard for the slice contract in docs/03-Kontrak-Section.md.
 * Run: npm run check:sections  (exit 1 with a list of violations)
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, relative } from "node:path";

const ROOT = join(__dirname, "..");
const SECTIONS = join(ROOT, "src/sections");
const HELPERS = new Set(["hcl-root.tsx", "hcl-link.tsx", "hcl-motion.tsx"]);

const FORBIDDEN: { pattern: RegExp; rule: string }[] = [
  { pattern: /from\s+["']next\/image["']/, rule: "no next/image (use <img>)" },
  { pattern: /from\s+["']next\/font/, rule: "no next/font (fonts load in HclRoot)" },
  { pattern: /["']lenis["']/, rule: "no Lenis / global smooth scroll" },
  { pattern: /useTranslations|["']next-intl["']/, rule: "no next-intl (copy is props)" },
  { pattern: /<style[\s>]/, rule: "no inline <style> (use the section .css)" },
  { pattern: /\bfetch\(/, rule: "no data fetching in sections" },
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const errors: string[] = [];
const fail = (file: string, rule: string) => errors.push(`${relative(ROOT, file)}: ${rule}`);

const files = walk(SECTIONS);
const registrySources = files
  .filter((f) => /^index.*\.ts$/.test(basename(f)))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");

// 1. Forbidden APIs anywhere under src/sections (tests excluded).
for (const file of files.filter((f) => /\.(tsx?|css)$/.test(f) && !f.endsWith(".test.ts"))) {
  const src = readFileSync(file, "utf8");
  for (const { pattern, rule } of FORBIDDEN) if (pattern.test(src)) fail(file, rule);
  if (file.endsWith(".css") && /@import/.test(src)) fail(file, "no @import in section CSS");
}

// 2. Per-section contract.
const sectionFiles = files.filter((f) => /\/hcl-[a-z0-9-]+\.tsx$/.test(f) && !HELPERS.has(basename(f)));
const ids = sectionFiles.map((f) => basename(f, ".tsx"));

for (const file of sectionFiles) {
  const id = basename(file, ".tsx");
  const src = readFileSync(file, "utf8");
  if (!existsSync(file.replace(/\.tsx$/, ".css"))) fail(file, `missing ${id}.css`);
  if (!/export const hcl[A-Za-z0-9]*Defaults\b/.test(src)) fail(file, "missing `export const hcl…Defaults`");
  if (!/\bsectionId\??\s*:/.test(src)) fail(file, "missing `sectionId` prop");
  if (!src.trimStart().startsWith('"use client"')) fail(file, 'must start with "use client"');
  if (!new RegExp(`["']${id}["']\\s*:`).test(registrySources)) fail(file, `"${id}" not registered in its group index.ts`);
}

// 3. No style id may be a prefix of another (CSS class prefixes would clash).
for (const a of ids) {
  for (const b of ids) {
    if (a !== b && b.startsWith(`${a}-`)) errors.push(`style id "${a}" is a prefix of "${b}": rename one`);
  }
}

// 4. Anti-slop rules (docs/01-Design-System.md §6).
const EYEBROW_ALLOWED = new Set(["hcl-hero", "hcl-page-hero"]);
const RADIUS_ALLOWED = /^(999px|50%|0|var\(--hcl-radius\)|var\(--hcl-radius-sm\))$/;
const BANNED_WORDS =
  /\b(rituals?|unhurried|timeless|elevate[sd]?|curated|crafted|whispers?|tapestry|testament)\b|tanpa terburu-buru|\bnot [a-z]+, (?:it|they) (?:is|are)\b|bukan [a-z]+, melainkan/i;
const ORNAMENT_GLYPHS = /[✦✧◆◇❖★☆]/;

// CSS rule blocks: "selector { body }" (no nesting in our section CSS besides @media).
const cssBlocks = (src: string) =>
  [...src.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selector: m[1].trim(),
    body: m[2],
  }));

for (const file of files.filter((f) => f.endsWith(".css") && basename(f) !== "hcl-base.css")) {
  for (const { selector, body } of cssBlocks(readFileSync(file, "utf8"))) {
    for (const [, value] of body.matchAll(/border-radius:\s*([^;]+);/g)) {
      if (value.split(/\s+/).some((v) => !RADIUS_ALLOWED.test(v.trim())))
        fail(file, `radius "${value.trim()}" (allowed: 999px, var(--hcl-radius), var(--hcl-radius-sm))`);
    }
    if (/:hover/.test(selector) && /scale\(/.test(body)) fail(file, `no scale() on hover (${selector})`);
    if (/transition:\s*all\b/.test(body)) fail(file, "no `transition: all`");
    if (/font-style:\s*italic/.test(body) && !/quote|accent/.test(selector))
      fail(file, `italic only for quotes / hero accent (${selector})`);
  }
}

for (const file of sectionFiles) {
  const id = basename(file, ".tsx");
  const src = readFileSync(file, "utf8");
  if (!EYEBROW_ALLOWED.has(id) && /\beyebrow:\s*"[^"]/.test(src)) fail(file, 'eyebrow default must be "" (max 2 per page)');
  if (ORNAMENT_GLYPHS.test(src)) fail(file, "no ornament glyphs");
  if (/hcl-btn--ghost/.test(src)) fail(file, "use hcl-btn--secondary or hcl-btn--on-dark");
}

const CONTENT = join(ROOT, "src/content");
for (const file of [...sectionFiles, ...readdirSync(CONTENT).map((f) => join(CONTENT, f))]) {
  const strings = [...readFileSync(file, "utf8").matchAll(/"((?:[^"\\]|\\.)*)"|`([^`]*)`/g)].map((m) => m[1] ?? m[2]);
  for (const s of strings) {
    const banned = s.match(BANNED_WORDS);
    if (banned) fail(file, `cliché copy "${banned[0]}" in: ${s.slice(0, 80)}`);
    if (s.includes("—")) fail(file, `em dash in copy: ${s.slice(0, 80)}`);
  }
}

if (errors.length) {
  console.error(`check:sections failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`check:sections ok (${ids.length} sections)`);
