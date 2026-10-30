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
  .filter((f) => basename(f) === "index.ts")
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
    if (a !== b && b.startsWith(`${a}-`)) errors.push(`style id "${a}" is a prefix of "${b}" — rename one`);
  }
}

if (errors.length) {
  console.error(`check:sections failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`check:sections ok (${ids.length} sections)`);
