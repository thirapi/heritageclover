/*
 * Generates artisanal botanical and heritage vector illustrations in public/hcl/images.
 * High-end editorial aesthetic: botanical woodcut line art, maritime cartography,
 * vintage apothecary seals, and woven textures.
 * Run: npm run gen:placeholders
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(__dirname, "..", "public/hcl/images");

// Color palette matching docs/01
const PALETTE = {
  clove: "#4A2C21",
  cloveDeep: "#2E1A13",
  cloveNight: "#1B0F0B",
  ember: "#AD4F2B",
  emberMuted: "#873B1D",
  leaf: "#3F5B3A",
  leafDeep: "#233320",
  gold: "#C9A45C",
  goldMuted: "#9E7E3C",
  parchment: "#F6F0E4",
  sand: "#EFE6D3",
  ivory: "#FCFAF5",
  line: "#E4D9C6",
  inkMuted: "#7A6A5F",
};

// Reusable SVG snippets
function cloveBranchSVG(x: number, y: number, s: number, rot: number, color: string, op = 0.3): string {
  return `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke="${color}" stroke-opacity="${op}" fill="none">
    <path d="M 0 120 Q 8 60 0 0 Q -8 -60 0 -120" stroke-width="2.5" stroke-linecap="round"/>
    
    <!-- Leaves -->
    <path d="M 2 50 Q -35 38 -55 12 Q -35 -12 0 40" stroke-width="1.75" fill="${color}" fill-opacity="${op * 0.35}"/>
    <path d="M 0 45 Q -28 28 -52 15" stroke-width="1"/>
    
    <path d="M 2 35 Q 40 22 62 5 Q 40 -18 0 25" stroke-width="1.75" fill="${color}" fill-opacity="${op * 0.35}"/>
    <path d="M 0 30 Q 32 18 58 8" stroke-width="1"/>

    <path d="M -1 -25 Q -45 -42 -62 -72 Q -35 -82 -2 -35" stroke-width="1.75" fill="${color}" fill-opacity="${op * 0.35}"/>
    <path d="M -1 -30 Q -35 -48 -58 -68" stroke-width="1"/>

    <path d="M 1 -38 Q 45 -55 68 -85 Q 40 -95 0 -48" stroke-width="1.75" fill="${color}" fill-opacity="${op * 0.35}"/>
    <path d="M 0 -42 Q 36 -62 64 -80" stroke-width="1"/>

    <!-- Terminal cluster of 3 buds -->
    <path d="M 0 -120 L -30 -165" stroke-width="2"/>
    <path d="M 0 -120 L 0 -175" stroke-width="2"/>
    <path d="M 0 -120 L 30 -165" stroke-width="2"/>

    <g transform="translate(-30, -165) rotate(-24)">
      <path d="M -3.5 0 L 3.5 0 L 3 -28 L -3 -28 Z" fill="${color}" fill-opacity="${op * 0.6}" stroke-width="1"/>
      <path d="M -8 -30 L -3.5 -28 L 0 -29 L 3.5 -28 L 8 -30 L 5 -36 L -5 -36 Z" fill="${color}" fill-opacity="${op * 0.8}"/>
      <circle cx="0" cy="-40" r="9" fill="${color}" fill-opacity="${op * 0.85}" stroke-width="1"/>
    </g>

    <g transform="translate(0, -175)">
      <path d="M -4 0 L 4 0 L 3.5 -32 L -3.5 -32 Z" fill="${color}" fill-opacity="${op * 0.6}" stroke-width="1"/>
      <path d="M -9 -34 L -4 -32 L 0 -33 L 4 -32 L 9 -34 L 6 -40 L -6 -40 Z" fill="${color}" fill-opacity="${op * 0.8}"/>
      <circle cx="0" cy="-44" r="10" fill="${color}" fill-opacity="${op * 0.85}" stroke-width="1"/>
    </g>

    <g transform="translate(30, -165) rotate(24)">
      <path d="M -3.5 0 L 3.5 0 L 3 -28 L -3 -28 Z" fill="${color}" fill-opacity="${op * 0.6}" stroke-width="1"/>
      <path d="M -8 -30 L -3.5 -28 L 0 -29 L 3.5 -28 L 8 -30 L 5 -36 L -5 -36 Z" fill="${color}" fill-opacity="${op * 0.8}"/>
      <circle cx="0" cy="-40" r="9" fill="${color}" fill-opacity="${op * 0.85}" stroke-width="1"/>
    </g>
  </g>`;
}

// Single detailed clove bud
function cloveBudDetail(x: number, y: number, s: number, rot: number, color: string, op = 0.8): string {
  return `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke="${color}" stroke-opacity="${op}" fill="${color}" fill-opacity="${op * 0.35}">
    <!-- Tapering calyx tube / hypanthium with fine longitudinal ribs -->
    <path d="M -7 40 L -5 -20 L 5 -20 L 7 40 C 4 44 -4 44 -7 40 Z" stroke-width="1.5"/>
    <line x1="-2" y1="-18" x2="-3" y2="38" stroke-width="1" stroke-opacity="${op * 0.5}"/>
    <line x1="2" y1="-18" x2="3" y2="38" stroke-width="1" stroke-opacity="${op * 0.5}"/>
    <!-- 4 triangular sepals spreading outward -->
    <path d="M -16 -28 L -6 -20 L -2 -22 L 2 -22 L 6 -20 L 16 -28 L 12 -36 L 5 -30 L -5 -30 L -12 -36 Z" stroke-width="1.5" fill-opacity="${op * 0.7}"/>
    <!-- Round unopened bud dome (four tightly folded petals) -->
    <circle cx="0" cy="-40" r="14" stroke-width="1.5" fill-opacity="${op * 0.8}"/>
    <path d="M -9 -42 C -4 -49 4 -49 9 -42" stroke-width="1" fill="none" stroke-opacity="${op * 0.6}"/>
    <path d="M -11 -38 C -4 -32 4 -32 11 -38" stroke-width="1" fill="none" stroke-opacity="${op * 0.6}"/>
  </g>`;
}

// Vintage compass rose
function compassRose(cx: number, cy: number, r: number, color: string, op = 0.4): string {
  const pts8 = [0, 45, 90, 135, 180, 225, 270, 315];
  const paths = pts8.map((deg, i) => {
    const isMain = i % 2 === 0;
    const len = isMain ? r : r * 0.65;
    const rad = (deg * Math.PI) / 180;
    const radL = ((deg - 22.5) * Math.PI) / 180;
    const radR = ((deg + 22.5) * Math.PI) / 180;
    const tipX = cx + Math.sin(rad) * len;
    const tipY = cy - Math.cos(rad) * len;
    const baseLX = cx + Math.sin(radL) * (r * 0.2);
    const baseLY = cy - Math.cos(radL) * (r * 0.2);
    const baseRX = cx + Math.sin(radR) * (r * 0.2);
    const baseRY = cy - Math.cos(radR) * (r * 0.2);
    return `
      <polygon points="${cx},${cy} ${tipX},${tipY} ${baseLX},${baseLY}" fill="${color}" fill-opacity="${op * (isMain ? 0.9 : 0.6)}"/>
      <polygon points="${cx},${cy} ${tipX},${tipY} ${baseRX},${baseRY}" fill="${color}" fill-opacity="${op * (isMain ? 0.4 : 0.2)}"/>
    `;
  }).join("");

  return `
  <g stroke="${color}" stroke-opacity="${op}">
    <circle cx="${cx}" cy="${cy}" r="${r * 1.15}" fill="none" stroke-width="1" stroke-dasharray="2,3"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 1.05}" fill="none" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.25}" fill="none" stroke-width="1"/>
    ${paths}
    <circle cx="${cx}" cy="${cy}" r="3" fill="${color}" fill-opacity="${op}"/>
  </g>`;
}

// East Java regional contours for Heritage Clover map
function eastJavaMap(): string {
  return `
    <!-- East Java Volcanic Highlands & Clove Groves Map -->
    <!-- Grid graticule -->
    <g stroke="${PALETTE.gold}" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="4,6">
      <line x1="100" y1="150" x2="1500" y2="150"/>
      <line x1="100" y1="350" x2="1500" y2="350"/>
      <line x1="100" y1="550" x2="1500" y2="550"/>
      <line x1="100" y1="750" x2="1500" y2="750"/>
      <line x1="300" y1="80" x2="300" y2="820"/>
      <line x1="600" y1="80" x2="600" y2="820"/>
      <line x1="900" y1="80" x2="900" y2="820"/>
      <line x1="1200" y1="80" x2="1200" y2="820"/>
    </g>

    <!-- East Java Mainland Silhouette -->
    <!-- West border (Pacitan/Tuban) -> North coast (Surabaya) -> East horn (Banyuwangi) -> South rugged coast -->
    <g fill="${PALETTE.cloveDeep}" fill-opacity="0.22" stroke="${PALETTE.gold}" stroke-width="1.8" stroke-opacity="0.55">
      <path d="M 520 280 
               C 620 270, 750 290, 860 300 
               C 920 320, 970 300, 1020 330 
               C 1070 340, 1140 330, 1220 360 
               C 1270 380, 1340 430, 1370 480 
               C 1390 530, 1350 580, 1310 610 
               C 1240 610, 1160 590, 1100 620 
               C 1020 630, 950 640, 880 620 
               C 800 640, 720 630, 650 610 
               C 580 620, 520 630, 480 600 
               C 450 550, 460 480, 480 420 
               C 490 360, 480 320, 520 280 Z"/>
    </g>

    <!-- Madura Island (North of Surabaya) -->
    <g fill="${PALETTE.cloveDeep}" fill-opacity="0.18" stroke="${PALETTE.gold}" stroke-width="1.2" stroke-opacity="0.45">
      <path d="M 870 250 C 960 230, 1080 235, 1170 260 C 1190 280, 1140 300, 1070 300 C 970 300, 900 290, 870 250 Z"/>
      <text x="1000" y="275" fill="${PALETTE.goldMuted}" font-family="Georgia, serif" font-size="12" letter-spacing="2">MADURA</text>
    </g>

    <!-- Mount Semeru (Volcanic peak 3,676m - East Java) -->
    <g transform="translate(940, 530)">
      <circle cx="0" cy="0" r="34" fill="${PALETTE.ember}" fill-opacity="0.32" stroke="${PALETTE.gold}" stroke-width="1.6"/>
      <circle cx="0" cy="0" r="24" fill="none" stroke="${PALETTE.gold}" stroke-width="1" stroke-opacity="0.6"/>
      <circle cx="0" cy="0" r="14" fill="none" stroke="${PALETTE.gold}" stroke-width="1" stroke-dasharray="2,2"/>
      <circle cx="0" cy="0" r="4" fill="${PALETTE.gold}"/>
      <text x="44" y="-8" fill="${PALETTE.gold}" font-family="Georgia, serif" font-size="15" font-weight="600" letter-spacing="1">MT. SEMERU</text>
      <text x="44" y="8" fill="${PALETTE.clove}" font-family="sans-serif" font-size="10" letter-spacing="1">Volcanic Terroir (3,676m)</text>
    </g>

    <!-- Trenggalek / Watulimo Clove Hills -->
    <g transform="translate(680, 550)">
      <circle cx="0" cy="0" r="28" fill="${PALETTE.leaf}" fill-opacity="0.3" stroke="${PALETTE.gold}" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="18" fill="none" stroke="${PALETTE.gold}" stroke-width="1" stroke-opacity="0.6"/>
      <circle cx="0" cy="0" r="4" fill="${PALETTE.gold}"/>
      <text x="-40" y="-36" fill="${PALETTE.gold}" font-family="Georgia, serif" font-size="14" font-weight="600" letter-spacing="1">TRENGGALEK</text>
      <text x="-40" y="-22" fill="${PALETTE.clove}" font-family="sans-serif" font-size="10" letter-spacing="1">Watulimo Heirloom Groves</text>
    </g>

    <!-- Pacitan Clove Valley -->
    <g transform="translate(540, 560)">
      <circle cx="0" cy="0" r="22" fill="${PALETTE.ember}" fill-opacity="0.25" stroke="${PALETTE.gold}" stroke-width="1.2"/>
      <circle cx="0" cy="0" r="3" fill="${PALETTE.gold}"/>
      <text x="-80" y="24" fill="${PALETTE.gold}" font-family="Georgia, serif" font-size="13" font-weight="600" letter-spacing="1">PACITAN</text>
      <text x="-80" y="36" fill="${PALETTE.clove}" font-family="sans-serif" font-size="9" letter-spacing="1">South Coast Valleys</text>
    </g>

    <!-- Malang Plateau & Dampit -->
    <g transform="translate(860, 480)">
      <circle cx="0" cy="0" r="20" fill="${PALETTE.leaf}" fill-opacity="0.25" stroke="${PALETTE.gold}" stroke-width="1.2"/>
      <circle cx="0" cy="0" r="3" fill="${PALETTE.gold}"/>
      <text x="-30" y="-26" fill="${PALETTE.gold}" font-family="Georgia, serif" font-size="13" font-weight="600" letter-spacing="1">MALANG · DAMPIT</text>
    </g>

    <!-- Sea wave ripples (Southern Ocean / Samudra Hindia) -->
    <g stroke="${PALETTE.gold}" stroke-opacity="0.2" stroke-width="1" fill="none">
      <path d="M 420 690 Q 450 680 480 690 T 540 690 T 600 690"/>
      <path d="M 720 710 Q 750 700 780 710 T 840 710 T 900 710"/>
      <path d="M 1020 680 Q 1050 670 1080 680 T 1140 680 T 1200 680"/>
      <text x="760" y="750" fill="${PALETTE.goldMuted}" font-family="Georgia, serif" font-size="13" font-style="italic" letter-spacing="3">OCEANUS INDICUS</text>
    </g>

    <!-- Historic merchant galleon silhouette -->
    <g transform="translate(360, 380) scale(0.7)" stroke="${PALETTE.gold}" stroke-width="1.5" fill="${PALETTE.gold}" fill-opacity="0.2">
      <!-- Hull -->
      <path d="M 0 60 C 30 70, 90 70, 120 50 L 100 35 L 20 35 Z"/>
      <!-- Masts -->
      <line x1="40" y1="35" x2="40" y2="-20" stroke-width="2"/>
      <line x1="75" y1="35" x2="75" y2="-35" stroke-width="2"/>
      <line x1="105" y1="35" x2="105" y2="-15" stroke-width="2"/>
      <!-- Square sails -->
      <path d="M 25 30 Q 40 22 55 30 L 52 5 Q 40 -2 28 5 Z" fill-opacity="0.4"/>
      <path d="M 60 25 Q 75 16 90 25 L 87 -10 Q 75 -18 63 -10 Z" fill-opacity="0.4"/>
      <path d="M 95 30 Q 105 24 115 30 L 112 10 Q 105 5 98 10 Z" fill-opacity="0.4"/>
    </g>

    <!-- Chart cartouche label -->
    <g transform="translate(140, 110)">
      <rect x="0" y="0" width="370" height="98" rx="4" fill="${PALETTE.sand}" fill-opacity="0.88" stroke="${PALETTE.gold}" stroke-width="1.2"/>
      <text x="20" y="32" fill="${PALETTE.cloveDeep}" font-family="Georgia, serif" font-size="16" font-weight="600" letter-spacing="1.5">TABULA JAVAE ORIENTALIS</text>
      <text x="20" y="52" fill="${PALETTE.ember}" font-family="Georgia, serif" font-size="12" font-style="italic">The Volcanic Highlands &amp; Heirloom Clove Groves</text>
      <text x="20" y="74" fill="${PALETTE.clove}" font-family="sans-serif" font-size="11" letter-spacing="1">8° 03' S, 111° 42' E · JAVA ORIENTALIS</text>
    </g>
  `;
}

// Official vintage quality seal SVG
function qualitySealSVG(w: number, h: number): string {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.44;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="sealBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${PALETTE.ivory}"/>
      <stop offset="70%" stop-color="${PALETTE.sand}"/>
      <stop offset="100%" stop-color="${PALETTE.line}"/>
    </radialGradient>
    <path id="curveTop" d="M ${cx - r * 0.72} ${cy} A ${r * 0.72} ${r * 0.72} 0 0 1 ${cx + r * 0.72} ${cy}" fill="none"/>
    <path id="curveBottom" d="M ${cx + r * 0.72} ${cy} A ${r * 0.72} ${r * 0.72} 0 0 1 ${cx - r * 0.72} ${cy}" fill="none"/>
  </defs>

  <!-- Outer background -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sealBg)" stroke="${PALETTE.gold}" stroke-width="2"/>
  
  <!-- Guilloche / serrated border ring -->
  <circle cx="${cx}" cy="${cy}" r="${r - 8}" fill="none" stroke="${PALETTE.ember}" stroke-width="1.5" stroke-dasharray="3,3"/>
  <circle cx="${cx}" cy="${cy}" r="${r - 14}" fill="none" stroke="${PALETTE.gold}" stroke-width="1"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.52}" fill="none" stroke="${PALETTE.gold}" stroke-width="1"/>

  <!-- Curved text -->
  <text font-family="Georgia, serif" font-size="10" font-weight="600" fill="${PALETTE.cloveDeep}" letter-spacing="2">
    <textPath href="#curveTop" startOffset="50%" text-anchor="middle">HERITAGE CLOVER</textPath>
  </text>
  <text font-family="Georgia, serif" font-size="9" font-weight="500" fill="${PALETTE.ember}" letter-spacing="2">
    <textPath href="#curveBottom" startOffset="50%" text-anchor="middle">EAST JAVA ORIGIN · GRADE A</textPath>
  </text>

  <!-- Center emblem: detailed clove bud with 4 stars -->
  ${cloveBudDetail(cx, cy + 8, 0.65, 0, PALETTE.cloveDeep, 0.9)}
  
  <!-- Flanking stars -->
  <circle cx="${cx - r * 0.32}" cy="${cy}" r="2" fill="${PALETTE.gold}"/>
  <circle cx="${cx + r * 0.32}" cy="${cy}" r="2" fill="${PALETTE.gold}"/>
</svg>`;
}

// Product packaging vignette
function productArtwork(title: string, sub: string, netWt: string, color: string, w: number, h: number): string {
  const cx = w / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${PALETTE.cloveDeep}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="${PALETTE.gold}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${PALETTE.gold}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>

  <!-- Decorative border line -->
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" rx="8" fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.25" stroke-width="1"/>
  <rect x="30" y="30" width="${w - 60}" height="${h - 60}" rx="6" fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.12" stroke-width="1" stroke-dasharray="3,3"/>

  <!-- Corner flourishes -->
  <path d="M 40 50 L 50 40 M 40 40 L 60 40 M 40 40 L 40 60" stroke="${PALETTE.gold}" stroke-opacity="0.4" stroke-width="1" fill="none"/>
  <path d="M ${w - 40} 50 L ${w - 50} 40 M ${w - 40} 40 L ${w - 60} 40 M ${w - 40} 40 L ${w - 40} 60" stroke="${PALETTE.gold}" stroke-opacity="0.4" stroke-width="1" fill="none"/>
  <path d="M 40 ${h - 50} L 50 ${h - 40} M 40 ${h - 40} L 60 ${h - 40} M 40 ${h - 40} L 40 ${h - 60}" stroke="${PALETTE.gold}" stroke-opacity="0.4" stroke-width="1" fill="none"/>
  <path d="M ${w - 40} ${h - 50} L ${w - 50} ${h - 40} M ${w - 40} ${h - 40} L ${w - 60} ${h - 40} M ${w - 40} ${h - 40} L ${w - 40} ${h - 60}" stroke="${PALETTE.gold}" stroke-opacity="0.4" stroke-width="1" fill="none"/>

  <!-- Apothecary Jar / Pouch silhouette in center -->
  <g transform="translate(${cx}, ${h * 0.42})">
    <!-- Pouch / Jar body -->
    <path d="M -90 120 C -95 120, -110 90, -105 -30 C -100 -70, -70 -90, -45 -95 L 45 -95 C 70 -90, 100 -70, 105 -30 C 110 90, 95 120, 90 120 Z" fill="${PALETTE.sand}" fill-opacity="0.12" stroke="${PALETTE.gold}" stroke-opacity="0.4" stroke-width="1.5"/>
    <!-- Lid / Seal -->
    <rect x="-40" y="-115" width="80" height="20" rx="3" fill="${PALETTE.gold}" fill-opacity="0.3" stroke="${PALETTE.gold}" stroke-opacity="0.6" stroke-width="1.5"/>
    <!-- Tie twine -->
    <line x1="-50" y1="-95" x2="50" y2="-95" stroke="${PALETTE.ember}" stroke-width="2"/>

    <!-- Botanical etching on label -->
    ${cloveBranchSVG(0, 5, 0.7, 0, PALETTE.gold, 0.6)}
  </g>

  <!-- Typography: Product title & specifics -->
  <text x="${cx}" y="${h * 0.72}" text-anchor="middle" fill="${PALETTE.parchment}" font-family="Georgia, serif" font-size="28" font-weight="600" letter-spacing="1">${title}</text>
  <text x="${cx}" y="${h * 0.77}" text-anchor="middle" fill="${PALETTE.gold}" font-family="Georgia, serif" font-size="15" font-style="italic" letter-spacing="1">${sub}</text>
  <line x1="${cx - 40}" y1="${h * 0.81}" x2="${cx + 40}" y2="${h * 0.81}" stroke="${PALETTE.gold}" stroke-opacity="0.3" stroke-width="1"/>
  <text x="${cx}" y="${h * 0.86}" text-anchor="middle" fill="${PALETTE.parchment}" fill-opacity="0.75" font-family="system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="3">${netWt}</text>
</svg>`;
}

// Farmer Portrait / Craft vignette (woodcut style)
function farmerArtwork(region: string, crop: string, color: string, w: number, h: number): string {
  const cx = w / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="fBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${PALETTE.cloveDeep}"/>
    </linearGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#fBg)"/>

  <!-- Fine framing border -->
  <rect x="20" y="20" width="${w - 40}" height="${h - 40}" rx="8" fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Silhouette of Mount Semeru / Volcanic Peak in background -->
  <path d="M 60 ${h * 0.58} L ${cx} ${h * 0.32} L ${w - 60} ${h * 0.58} Z" fill="${PALETTE.gold}" fill-opacity="0.08"/>
  <path d="M 60 ${h * 0.58} L ${cx} ${h * 0.32} L ${w - 60} ${h * 0.58} Z" fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.25" stroke-width="1.2"/>
  
  <!-- Clove Tree Grove branches framing the sides -->
  ${cloveBranchSVG(110, h * 0.52, 1.1, 20, PALETTE.gold, 0.35)}
  ${cloveBranchSVG(w - 110, h * 0.52, 1.1, -20, PALETTE.gold, 0.35)}

  <!-- Stylized grower harvesting silhouette -->
  <g transform="translate(${cx}, ${h * 0.62})" stroke="${PALETTE.gold}" stroke-opacity="0.6" fill="${PALETTE.gold}" fill-opacity="0.2">
    <!-- Bamboo basket / tampah -->
    <ellipse cx="0" cy="50" rx="85" ry="24" stroke-width="1.5"/>
    <ellipse cx="0" cy="50" rx="65" ry="16" stroke-width="1" stroke-dasharray="3,3"/>
    <!-- Clove buds heaped in basket -->
    <circle cx="-30" cy="46" r="6"/>
    <circle cx="-10" cy="42" r="7"/>
    <circle cx="15" cy="44" r="6"/>
    <circle cx="35" cy="48" r="5"/>
  </g>

  <!-- Bottom region mark -->
  <rect x="${cx - 100}" y="${h * 0.82}" width="200" height="42" rx="4" fill="${PALETTE.cloveDeep}" fill-opacity="0.8" stroke="${PALETTE.gold}" stroke-opacity="0.4" stroke-width="1"/>
  <text x="${cx}" y="${h * 0.85}" text-anchor="middle" fill="${PALETTE.gold}" font-family="Georgia, serif" font-size="14" font-weight="600" letter-spacing="1.5">${region.toUpperCase()}</text>
  <text x="${cx}" y="${h * 0.885}" text-anchor="middle" fill="${PALETTE.parchment}" fill-opacity="0.8" font-family="sans-serif" font-size="11" letter-spacing="1">${crop}</text>
</svg>`;
}

// Background for Hero & CTA without ANY intrusive text
function atmosphericBackdrop(color1: string, color2: string, w: number, h: number, isHero = false): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="vignette" cx="65%" cy="45%" r="65%">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="60%" stop-color="${color2}"/>
      <stop offset="100%" stop-color="${PALETTE.cloveNight}"/>
    </radialGradient>
    <linearGradient id="warmLight" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${PALETTE.ember}" stop-opacity="0.2"/>
      <stop offset="50%" stop-color="${PALETTE.gold}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${PALETTE.cloveNight}" stop-opacity="0.4"/>
    </linearGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#vignette)"/>
  <rect width="${w}" height="${h}" fill="url(#warmLight)"/>

  <!-- Botanical branch clusters placed strictly on the right side and borders -->
  <!-- This keeps the left half perfectly clean and dark for text readability -->
  <g transform="translate(${w * 0.82}, ${h * 0.45})">
    ${cloveBranchSVG(0, 0, isHero ? 2.2 : 1.8, -15, PALETTE.gold, 0.22)}
  </g>
  <g transform="translate(${w * 0.92}, ${h * 0.82})">
    ${cloveBranchSVG(0, 0, isHero ? 1.6 : 1.4, -40, PALETTE.ember, 0.28)}
  </g>
  <g transform="translate(${w * 0.72}, ${h * 0.15})">
    ${cloveBranchSVG(0, 0, isHero ? 1.4 : 1.2, 25, PALETTE.gold, 0.18)}
  </g>

  <!-- Subtle star compass in bottom right corner -->
  ${compassRose(w - 180, h - 180, 70, PALETTE.gold, 0.2)}

  <!-- Clean framing borders -->
  <line x1="30" y1="30" x2="${w - 30}" y2="30" stroke="${PALETTE.gold}" stroke-opacity="0.12" stroke-width="1"/>
  <line x1="30" y1="${h - 30}" x2="${w - 30}" y2="${h - 30}" stroke="${PALETTE.gold}" stroke-opacity="0.12" stroke-width="1"/>
</svg>`;
}

// Editorial usage vignette (culinary, wellness, aroma, gifting)
function generateUseArtwork(theme: string, desc: string, iconType: string, color: string, w: number, h: number): string {
  const cx = w / 2;
  const cy = h * 0.45;

  let centralIcon = "";
  if (iconType === "culinary") {
    // Cast iron pot / spice bowl with aromatic steam
    centralIcon = `
      <g stroke="${PALETTE.gold}" stroke-width="1.5" fill="${PALETTE.gold}" fill-opacity="0.2">
        <path d="M -60 20 Q 0 80 60 20 L 50 -10 L -50 -10 Z"/>
        <line x1="-65" y1="-10" x2="65" y2="-10" stroke-width="2"/>
        <!-- Steam swirls with clove buds -->
        <path d="M -20 -20 Q -30 -50 -15 -70 Q 0 -90 -10 -110" fill="none" stroke-opacity="0.6"/>
        <path d="M 15 -20 Q 5 -50 20 -70 Q 35 -90 25 -110" fill="none" stroke-opacity="0.6"/>
        ${cloveBudDetail(0, -45, 0.5, 15, PALETTE.gold, 0.8)}
      </g>
    `;
  } else if (iconType === "wellness") {
    // Essential oil dropper & water ripple
    centralIcon = `
      <g stroke="${PALETTE.gold}" stroke-width="1.5" fill="${PALETTE.gold}" fill-opacity="0.2">
        <!-- Droplet -->
        <path d="M 0 -70 C 25 -25 35 5 0 25 C -35 5 -25 -25 0 -70 Z"/>
        <!-- Concentric ripples -->
        <ellipse cx="0" cy="50" rx="80" ry="20" fill="none" stroke-opacity="0.5"/>
        <ellipse cx="0" cy="50" rx="50" ry="12" fill="none" stroke-opacity="0.7"/>
        ${cloveBranchSVG(0, 10, 0.5, 0, PALETTE.gold, 0.7)}
      </g>
    `;
  } else if (iconType === "aroma") {
    // Pomander (orange studded with cloves)
    centralIcon = `
      <g stroke="${PALETTE.gold}" stroke-width="1.5" fill="${PALETTE.gold}" fill-opacity="0.2">
        <circle cx="0" cy="0" r="55" stroke-dasharray="2,3"/>
        <circle cx="0" cy="0" r="50"/>
        <!-- Ribbon bow -->
        <path d="M -40 -50 Q 0 -35 40 -50" fill="none" stroke="${PALETTE.ember}" stroke-width="2"/>
        <path d="M -50 -40 Q -35 0 -50 40" fill="none" stroke="${PALETTE.ember}" stroke-width="2"/>
        <!-- Studded clove buds -->
        ${cloveBudDetail(-25, -20, 0.4, -45, PALETTE.gold, 0.9)}
        ${cloveBudDetail(25, -20, 0.4, 45, PALETTE.gold, 0.9)}
        ${cloveBudDetail(-20, 25, 0.4, -135, PALETTE.gold, 0.9)}
        ${cloveBudDetail(20, 25, 0.4, 135, PALETTE.gold, 0.9)}
        ${cloveBudDetail(0, 0, 0.45, 0, PALETTE.gold, 0.9)}
      </g>
    `;
  } else {
    // Gifting hamper / wrapped parcel with botanical sprig
    centralIcon = `
      <g stroke="${PALETTE.gold}" stroke-width="1.5" fill="${PALETTE.gold}" fill-opacity="0.2">
        <rect x="-65" y="-35" width="130" height="95" rx="4"/>
        <line x1="0" y1="-35" x2="0" y2="60" stroke="${PALETTE.ember}" stroke-width="2.5"/>
        <line x1="-65" y1="12" x2="65" y2="12" stroke="${PALETTE.ember}" stroke-width="2.5"/>
        <!-- Ribbon tie & clove sprig -->
        <circle cx="0" cy="12" r="8" fill="${PALETTE.ember}"/>
        ${cloveBranchSVG(0, -35, 0.5, 30, PALETTE.gold, 0.8)}
      </g>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="uBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${PALETTE.cloveDeep}"/>
    </linearGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#uBg)"/>
  <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="8" fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.25" stroke-width="1"/>

  <g transform="translate(${cx}, ${cy})">
    ${centralIcon}
  </g>

  <!-- Editorial label -->
  <text x="${cx}" y="${h * 0.78}" text-anchor="middle" fill="${PALETTE.parchment}" font-family="Georgia, serif" font-size="22" font-weight="600" letter-spacing="1">${theme}</text>
  <text x="${cx}" y="${h * 0.85}" text-anchor="middle" fill="${PALETTE.gold}" font-family="sans-serif" font-size="12" letter-spacing="1.5">${desc.replace(/&amp;/g, "&").toUpperCase().replace(/&/g, "&amp;")}</text>
</svg>`;
}

// Process step illustrations (sun drying, sorting, harvest, testing, packing)
function processArtwork(step: string, title: string, color: string, w: number, h: number): string {
  const cx = w / 2;
  const cy = h * 0.44;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="pBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${PALETTE.cloveDeep}"/>
    </linearGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#pBg)"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" rx="8" fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Centered botanical engraving composition -->
  <g transform="translate(${cx}, ${cy})">
    <!-- Woven bamboo mat circular frame -->
    <circle cx="0" cy="0" r="140" fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="4,4"/>
    <circle cx="0" cy="0" r="125" fill="${PALETTE.gold}" fill-opacity="0.08" stroke="${PALETTE.gold}" stroke-opacity="0.2"/>
    ${cloveBranchSVG(0, 15, 0.9, 0, PALETTE.gold, 0.75)}
  </g>

  <g transform="translate(${cx}, ${h * 0.8})">
    <rect x="-80" y="-24" width="160" height="32" rx="4" fill="${PALETTE.cloveDeep}" fill-opacity="0.8" stroke="${PALETTE.gold}" stroke-opacity="0.5" stroke-width="1"/>
    <text x="0" y="-3" text-anchor="middle" fill="${PALETTE.gold}" font-family="sans-serif" font-size="12" font-weight="600" letter-spacing="2">STAGE ${step}</text>
    <text x="0" y="32" text-anchor="middle" fill="${PALETTE.parchment}" font-family="Georgia, serif" font-size="20" font-weight="600" letter-spacing="1">${title}</text>
  </g>
</svg>`;
}

// Generate all files
mkdirSync(OUT, { recursive: true });

// 1. Hero & Big Backdrops (NO clashing text watermark)
writeFileSync(join(OUT, "hero.svg"), atmosphericBackdrop(PALETTE.clove, PALETTE.cloveDeep, 1920, 1080, true));
writeFileSync(join(OUT, "cta.svg"), atmosphericBackdrop(PALETTE.emberMuted, PALETTE.cloveDeep, 1920, 1000, false));
writeFileSync(join(OUT, "page-hero.svg"), atmosphericBackdrop(PALETTE.cloveDeep, PALETTE.cloveNight, 1920, 900, false));
writeFileSync(join(OUT, "origin.svg"), atmosphericBackdrop(PALETTE.leafDeep, PALETTE.cloveDeep, 1600, 1000, false));
writeFileSync(join(OUT, "intro.svg"), atmosphericBackdrop(PALETTE.emberMuted, PALETTE.cloveDeep, 900, 1100, false));

// 2. Map (authentic East Java regional chart)
writeFileSync(join(OUT, "heritage-map.svg"), `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="mapBg" cx="70%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${PALETTE.parchment}"/>
      <stop offset="80%" stop-color="${PALETTE.sand}"/>
      <stop offset="100%" stop-color="${PALETTE.line}"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#mapBg)"/>
  ${eastJavaMap()}
  ${compassRose(480, 520, 100, PALETTE.gold, 0.45)}
</svg>`);

// 3. Official Quality Seal
writeFileSync(join(OUT, "cert.svg"), qualitySealSVG(320, 320));

// 4. Products
writeFileSync(join(OUT, "product-whole.svg"), productArtwork("Whole Cloves", "Hand-Sorted East Java Clove Buds", "NET WT. 100G · GRADE A", PALETTE.emberMuted, 900, 1100));
writeFileSync(join(OUT, "product-ground.svg"), productArtwork("Ground Cloves", "Stone-Milled Aromatic Spice", "NET WT. 80G · PURE", PALETTE.clove, 900, 1100));
writeFileSync(join(OUT, "product-oil.svg"), productArtwork("Clove Bud Oil", "Steam-Distilled Pure Essential Oil", "30 ML · 100% PURE", PALETTE.leafDeep, 900, 1100));
writeFileSync(join(OUT, "product-gift.svg"), productArtwork("Heritage Gift Set", "Complete East Java Collection", "FOUR COMPONENT SET", PALETTE.cloveNight, 900, 1100));

// 5. Farmers
writeFileSync(join(OUT, "farmer-1.svg"), farmerArtwork("Trenggalek", "Watulimo Heirloom Groves", PALETTE.leafDeep, 800, 1000));
writeFileSync(join(OUT, "farmer-2.svg"), farmerArtwork("Malang", "Semeru Volcanic Slopes", PALETTE.emberMuted, 800, 1000));
writeFileSync(join(OUT, "farmer-3.svg"), farmerArtwork("Pacitan", "Southern Valley Groves", PALETTE.clove, 800, 1000));

// 6. Process
writeFileSync(join(OUT, "harvest.svg"), processArtwork("01", "Hand Picking", PALETTE.leafDeep, 1200, 900));
writeFileSync(join(OUT, "drying.svg"), processArtwork("02", "Sun Drying", PALETTE.emberMuted, 1200, 900));
writeFileSync(join(OUT, "sorting.svg"), processArtwork("03", "Manual Sorting", PALETTE.clove, 1200, 900));
writeFileSync(join(OUT, "testing.svg"), processArtwork("04", "Moisture Inspection", PALETTE.cloveNight, 1200, 900));
writeFileSync(join(OUT, "packing.svg"), processArtwork("05", "Sealed Pouching", PALETTE.cloveDeep, 1200, 900));

// 7. Uses
writeFileSync(join(OUT, "use-culinary.svg"), generateUseArtwork("Culinary", "Traditional Cooking &amp; Baking", "culinary", PALETTE.emberMuted, 900, 900));
writeFileSync(join(OUT, "use-wellness.svg"), generateUseArtwork("Wellness", "Warm Infusions &amp; Aromatics", "wellness", PALETTE.leafDeep, 900, 900));
writeFileSync(join(OUT, "use-aroma.svg"), generateUseArtwork("Home Scent", "Natural Spiced Ambience", "aroma", PALETTE.clove, 900, 900));
writeFileSync(join(OUT, "use-gifting.svg"), generateUseArtwork("Gifting", "Selected Heritage Hampers", "gifting", PALETTE.cloveNight, 900, 900));

// 8. Articles
writeFileSync(join(OUT, "article-1.svg"), atmosphericBackdrop(PALETTE.cloveDeep, PALETTE.cloveNight, 1200, 800, false));
writeFileSync(join(OUT, "article-2.svg"), atmosphericBackdrop(PALETTE.emberMuted, PALETTE.cloveDeep, 1200, 800, false));
writeFileSync(join(OUT, "article-3.svg"), atmosphericBackdrop(PALETTE.leafDeep, PALETTE.cloveDeep, 1200, 800, false));

// 9. OG image
writeFileSync(join(OUT, "og.svg"), `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="ogBg" cx="60%" cy="50%" r="60%">
      <stop offset="0%" stop-color="${PALETTE.clove}"/>
      <stop offset="100%" stop-color="${PALETTE.cloveNight}"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogBg)"/>
  <rect x="24" y="24" width="1152" height="582" rx="8" fill="none" stroke="${PALETTE.gold}" stroke-opacity="0.3" stroke-width="1"/>
  
  <g transform="translate(920, 315)">
    ${cloveBranchSVG(0, 0, 1.8, -15, PALETTE.gold, 0.35)}
  </g>

  <g transform="translate(100, 260)">
    <text x="0" y="0" fill="${PALETTE.gold}" font-family="sans-serif" font-size="14" font-weight="600" letter-spacing="3">HERITAGE CLOVER · INDONESIA</text>
    <text x="0" y="65" fill="${PALETTE.parchment}" font-family="Georgia, serif" font-size="52" font-weight="600">The Spice That</text>
    <text x="0" y="125" fill="${PALETTE.gold}" font-family="Georgia, serif" font-size="52" font-style="italic">Shaped the World.</text>
    <text x="0" y="180" fill="${PALETTE.parchment}" fill-opacity="0.8" font-family="sans-serif" font-size="18">Single-origin cloves hand-picked from the volcanic hills of East Java.</text>
  </g>
</svg>`);

console.log("Artisanal vector illustrations generated successfully in public/hcl/images");
