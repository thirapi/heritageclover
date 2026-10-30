# 01: Design System

Semua token di-scope di bawah `.hcl-root` (CSS variables), **bukan** di
`tailwind.config`. Config Tailwind di exantara-saas dipakai bersama semua tenant,
jadi token brand tidak boleh masuk ke sana.

## 1. Warna (token)

| Token | Hex | Pakai |
|---|---|---|
| `--hcl-clove` | `#4A2C21` | teks utama, background gelap (warna kuncup cengkeh kering) |
| `--hcl-clove-deep` | `#2E1A13` | footer, hero overlay |
| `--hcl-ember` | `#B5532E` | aksen/CTA (merah bata bunga cengkeh segar) |
| `--hcl-leaf` | `#3F5B3A` | aksen sekunder (daun cengkeh/semanggi) |
| `--hcl-gold` | `#C9A45C` | garis ornamen, angka, badge "heritage" |
| `--hcl-parchment` | `#F6F0E4` | background utama |
| `--hcl-ivory` | `#FCFAF5` | kartu |
| `--hcl-ink-muted` | `#7A6A5F` | teks sekunder |
| `--hcl-line` | `#E4D9C6` | border |

Kontras: teks `--hcl-clove` di atas `--hcl-parchment` harus ≥ 4.5:1. CTA
`--hcl-ember` memakai teks `--hcl-ivory`.

## 2. Tipografi

- Display: **Cormorant Garamond** (500/600, italic untuk aksen).
- Body/UI: **Manrope** (400/500/600).
- Font dimuat lewat `<link rel="stylesheet" precedence="default">` di `HclRoot`
  (Google Fonts). **Dilarang** `next/font` dan `@import` di CSS, karena keduanya tidak
  jalan di canvas editor exantara (Shadow DOM).
- Skala: `clamp()` untuk H1 (40→88px), H2 (32→56px), H3 (22→28px), body 16–18px.

## 3. Motif

- Ornamen garis tipis emas (peta jalur rempah, kompas, ilustrasi kuncup cengkeh).
- Foto hangat, tone sepia ringan, close-up tekstur.
- Sudut: kartu radius 4px (kesan arsip/klasik), tombol pill.

## 4. Motion

- Library: `motion` (framer-motion v12) dan GSAP + ScrollTrigger (`@gsap/react`).
- **Tanpa Lenis** atau smooth-scroll global.
- Reveal sekali per elemen, durasi 0.6–0.9 s, ease out.
- `prefers-reduced-motion` atau prop `isCanvas` = true → tampilkan layout statis final.
- Jangan pasang `overflow: hidden/auto` pada ancestor elemen `position: sticky`.

## 5. Layer (z-index), sama dengan exantara

floating button `z-40` · header/cart sheet `z-50` · modal `z-60+`.
