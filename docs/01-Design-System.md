# 01: Design System

Semua token di-scope di bawah `.hcl-root` (CSS variables), **bukan** di
`tailwind.config`. Config Tailwind di exantara-saas dipakai bersama semua tenant,
jadi token brand tidak boleh masuk ke sana.

## 1. Warna (token)

| Token | Hex | Pakai |
|---|---|---|
| `--hcl-clove` | `#4A2C21` | teks utama, background gelap (warna kuncup cengkeh kering) |
| `--hcl-clove-deep` | `#2E1A13` | footer, hero overlay |
| `--hcl-ember` | `#AD4F2B` | aksen/CTA (merah bata bunga cengkeh segar; digelapkan dari #B5532E agar kontras teks kecil ≥ 4.5:1) |
| `--hcl-leaf` | `#3F5B3A` | aksen sekunder (daun cengkeh/semanggi) |
| `--hcl-gold` | `#C9A45C` | garis ornamen, angka, badge "heritage" |
| `--hcl-parchment` | `#F6F0E4` | background utama |
| `--hcl-ivory` | `#FCFAF5` | kartu |
| `--hcl-ink-muted` | `#7A6A5F` | teks sekunder |
| `--hcl-line` | `#E4D9C6` | border |

Kontras: teks `--hcl-clove` di atas `--hcl-parchment` harus ≥ 4.5:1. CTA
`--hcl-ember` memakai teks `--hcl-ivory`.

## 2. Tipografi

- Display: **Cormorant Garamond** (500/600; italic hanya untuk kutipan & `titleAccent` hero, lihat §6).
- Body/UI: **Manrope** (400/500/600).
- Font dimuat lewat `<link rel="stylesheet" precedence="default">` di `HclRoot`
  (Google Fonts). **Dilarang** `next/font` dan `@import` di CSS, karena keduanya tidak
  jalan di canvas editor exantara (Shadow DOM).
- Skala: `clamp()` untuk H1 (40→88px), H2 (32→56px), H3 (22→28px), body 16–18px.

## 3. Motif

- Yang membawa kesan "warisan" adalah **foto dan isi** (asal-usul, sejarah, orang),
  bukan ornamen. Foto hangat, tone sepia ringan, close-up tekstur.
- Satu-satunya ilustrasi: peta jalur rempah di `hcl-heritage-teaser` (konten, bukan hiasan).
- Emas (`--hcl-gold`) hanya untuk: angka statistik, tahun di timeline, dan teks aksen
  di atas latar gelap. Bukan untuk garis hiasan.

## 4. Motion

- Library: `motion` (framer-motion v12) dan GSAP + ScrollTrigger (`@gsap/react`).
- **Tanpa Lenis** atau smooth-scroll global.
- Reveal sekali per elemen, durasi 0.6–0.9 s, ease out.
- `prefers-reduced-motion` atau prop `isCanvas` = true → tampilkan layout statis final.
- Jangan pasang `overflow: hidden/auto` pada ancestor elemen `position: sticky`.

## 5. Layer (z-index), sama dengan exantara

floating button `z-40` · header/cart sheet `z-50` · modal `z-60+`.

## 6. Anti-slop (diadaptasi dari aturan CK; di luar daftar ini = slop)

Ditegakkan otomatis oleh `npm run check:sections` (kode) dan `npm run qa` (halaman jadi).

1. **Eyebrow maks 2 per halaman** (di luar header/footer): hero/page-hero + paling
   banyak satu section lain. Default `eyebrow` di section = `""` (kecuali hero & page-hero);
   dirender hanya jika diisi.
2. **Tanpa ornamen dekoratif**: tidak ada garis emas pendek di bawah judul, divider
   ✦/◆/kompas di atas judul, bingkai offset di belakang gambar, wordmark raksasa samar,
   tanda kutip raksasa. Pemisah = border 1px `--hcl-line` (atau `rgba(ivory,.15)` di
   gelap) yang memang memisahkan konten.
3. **Italic hanya untuk kutipan nyata** (testimoni, kutipan petani) dan `titleAccent`
   di hero. Bukan gaya default eyebrow/caption/angka/tanggal.
4. **Penomoran 01/02 hanya bila urutan adalah isi** (langkah proses: `hcl-steps`,
   `hcl-process-detail`). Kartu produk, nilai, petani, FAQ, legal: tanpa nomor.
5. **Radius**: `999px` (tombol, chip, pill, badge, avatar) · `--hcl-radius` 12px
   (kartu, gambar, panel) · `--hcl-radius-sm` 8px (input, kotak ikon). Tidak ada nilai lain.
6. **Hover**: tanpa `scale()` pada gambar/kartu. Hover kartu = warna border →
   `--hcl-ember` + panah bergeser. Tanpa `transition: all`.
7. **Band gelap ≤ 25% tinggi halaman** (di luar footer): hero + satu momen signature.
   Section lain di latar terang (`--hcl-parchment` / `--hcl-ivory` / `--hcl-sand`).
8. **Tombol**: hanya `.hcl-btn--primary`, `.hcl-btn--secondary` (permukaan terang),
   `.hcl-btn--on-dark` (permukaan gelap). Section tidak boleh menimpa warna tombol.
9. **Ikon**: lucide, 20px, stroke 1.75, sebaris dengan judul dalam kotak
   `--hcl-radius-sm` berlatar `--hcl-ember` 10%. Bukan lingkaran berbingkai emas.
10. **Angka** selalu `font-variant-numeric: tabular-nums`.
11. **Layout**: tanpa kartu "zig-zag" (kartu genap diturunkan), grid harus habis dibagi
    (4 item → 4/2 kolom, 3 item → 3/1).
12. **Copy**: tanpa kata klise `ritual`, `unhurried`/`tanpa terburu-buru`, `journey`/`perjalanan`
    (sebagai metafora), `timeless`, `elevate`, `curated`, `crafted`, `whisper`, `tapestry`,
    `testament`; tanpa pola "bukan X, melainkan Y"; tanpa em dash (—) di kalimat.
    Tulis fakta konkret (asal, cara, waktu), bukan suasana.
