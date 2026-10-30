/*
 * Generates themed placeholder images in public/hcl/images until real photos
 * arrive (docs/00-Brief.md §5). Run: npm run gen:placeholders
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(__dirname, "..", "public/hcl/images");

type Spec = { name: string; label: string; w: number; h: number; from: string; to: string; ink: string };

const DARK = { from: "#4A2C21", to: "#2E1A13", ink: "#C9A45C" };
const WARM = { from: "#B5532E", to: "#4A2C21", ink: "#F6F0E4" };
const LIGHT = { from: "#E4D9C6", to: "#C9A45C", ink: "#4A2C21" };
const LEAF = { from: "#3F5B3A", to: "#2E1A13", ink: "#E4D9C6" };

const specs: Spec[] = [
  { name: "hero", label: "Clove buds drying in the sun", w: 1920, h: 1080, ...DARK },
  { name: "intro", label: "Hands sorting cloves", w: 900, h: 1100, ...WARM },
  { name: "heritage-map", label: "Spice route map", w: 1600, h: 900, ...LIGHT },
  { name: "origin", label: "Clove gardens, Maluku", w: 1600, h: 1000, ...LEAF },
  { name: "drying", label: "Sun drying", w: 1200, h: 900, ...WARM },
  { name: "sorting", label: "Hand sorting", w: 1200, h: 900, ...DARK },
  { name: "harvest", label: "Picking the buds", w: 1200, h: 900, ...LEAF },
  { name: "testing", label: "Moisture testing", w: 1200, h: 900, ...LIGHT },
  { name: "packing", label: "Sealed packing", w: 1200, h: 900, ...DARK },
  { name: "farmer-1", label: "Farmer portrait", w: 800, h: 1000, ...LEAF },
  { name: "farmer-2", label: "Farmer portrait", w: 800, h: 1000, ...WARM },
  { name: "farmer-3", label: "Farmer portrait", w: 800, h: 1000, ...DARK },
  { name: "product-whole", label: "Whole Cloves", w: 900, h: 1100, ...WARM },
  { name: "product-ground", label: "Ground Cloves", w: 900, h: 1100, ...LIGHT },
  { name: "product-oil", label: "Clove Bud Oil", w: 900, h: 1100, ...LEAF },
  { name: "product-gift", label: "Heritage Gift Set", w: 900, h: 1100, ...DARK },
  { name: "use-culinary", label: "Culinary", w: 900, h: 900, ...WARM },
  { name: "use-wellness", label: "Wellness", w: 900, h: 900, ...LEAF },
  { name: "use-aroma", label: "Home aroma", w: 900, h: 900, ...LIGHT },
  { name: "use-gifting", label: "Gifting", w: 900, h: 900, ...DARK },
  { name: "article-1", label: "Journal: Spice Islands", w: 1200, h: 800, ...DARK },
  { name: "article-2", label: "Journal: Recipes", w: 1200, h: 800, ...WARM },
  { name: "article-3", label: "Journal: Storage", w: 1200, h: 800, ...LEAF },
  { name: "page-hero", label: "Heritage Clover", w: 1920, h: 900, ...DARK },
  { name: "cta", label: "Clove harvest at dusk", w: 1920, h: 1000, ...WARM },
  { name: "cert", label: "Certification (TBD)", w: 320, h: 320, ...LIGHT },
  { name: "og", label: "Heritage Clover", w: 1200, h: 630, ...DARK },
];

// A stylised clove bud: round head with four sepals on a tapering stem.
const bud = (x: number, y: number, s: number, ink: string, rot: number) => `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" fill="${ink}" opacity="0.16">
    <circle cx="0" cy="-34" r="11"/>
    <path d="M-14 -24 L0 -14 L14 -24 L9 -12 L0 -6 L-9 -12 Z"/>
    <path d="M-3.5 -8 L3.5 -8 L1.5 40 L-1.5 40 Z"/>
  </g>`;

function svg({ label, w, h, from, to, ink }: Spec): string {
  const buds = Array.from({ length: 14 }, (_, i) => {
    const x = ((i * 137) % 100) / 100;
    const y = ((i * 71) % 100) / 100;
    return bud(x * w, y * h, (Math.min(w, h) / 420) * (0.8 + (i % 3) * 0.25), ink, (i * 47) % 360);
  }).join("");
  const font = Math.round(Math.min(w, h) / 16);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  ${buds}
  <rect x="${w * 0.04}" y="${h * 0.04}" width="${w * 0.92}" height="${h * 0.92}" fill="none" stroke="${ink}" stroke-opacity="0.35" stroke-width="${Math.max(1, Math.round(w / 900))}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="${ink}" font-family="Georgia, serif" font-size="${font}" font-style="italic">${label}</text>
  <text x="50%" y="${h * 0.5 + font * 1.3}" text-anchor="middle" fill="${ink}" fill-opacity="0.6" font-family="system-ui, sans-serif" font-size="${Math.round(font * 0.38)}" letter-spacing="3">PLACEHOLDER</text>
</svg>
`;
}

mkdirSync(OUT, { recursive: true });
for (const spec of specs) writeFileSync(join(OUT, `${spec.name}.svg`), svg(spec));
console.log(`wrote ${specs.length} placeholders to public/hcl/images`);
