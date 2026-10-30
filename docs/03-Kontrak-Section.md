# 03: Kontrak Section (slice-ready)

Tujuannya: setiap section di repo standalone ini bisa dipindah ke
`exantara-saas/src/components/section/web-sections/heritageclover/` dengan
perubahan minimal. Mengikuti `exantara-saas/docs/SLICING-GUIDE.md` dan
`web-sections/hancoco/PORTING.md`.

## 1. File

- `src/sections/<grup>/hcl-<nama>.tsx` + `hcl-<nama>.css` (responsive rules).
- Grup: `common`, `home`, `about`, `insight`, `support`, `layout` (header/footer).
- Satu komponen = satu section = satu style id `hcl-<nama>`.
- Daftarkan di `src/sections/registry.ts` (`id → { component, defaults, group }`).

## 2. Props

```ts
"use client";
import "./hcl-hero.css";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "@/sections/hcl-root";

export type HclHeroProps = {
  sectionId?: string;          // selalu prop pertama → <section id>
  eyebrow?: string;            // text
  title?: string;              // text
  body?: string;               // textarea
  ctaLabel?: string; ctaHref?: string;   // link
  image?: string;              // media (URL)
  backgroundColor?: string;    // color
  items?: { label: string; icon: string }[]; // repeater: hanya field string, TANPA nesting
} & HclInjectedProps;          // { isCanvas?: boolean }

export const hclHeroDefaults = { /* copy EN lengkap */ } satisfies Required<Omit<HclHeroProps, keyof HclInjectedProps>>;

export default function HclHero(raw: HclHeroProps) {
  const p = withHclDefaults(hclHeroDefaults, raw);
  ...
}
```

Aturan:

1. **Semua teks yang terlihat = prop**, dengan default EN di `hcl<Nama>Defaults`.
   Tidak ada `next-intl` atau `useTranslations` di section.
2. Copy ID ada di `src/content/id/<halaman>.ts` (objek props per section).
   Copy EN di `src/content/en/<halaman>.ts` boleh `{}`, karena default sudah EN.
3. Tipe prop yang boleh: `string` (text/textarea/link/media/color/select)
   dan array objek datar berisi `string` saja (repeater). List bersarang →
   textarea dipisah per baris dengan `hclLines()`.
4. Ikon = string nama lucide (mis. `"Leaf"`), dipetakan lewat record `ICONS` lokal.
5. Gambar = `<img>` biasa (+ `// eslint-disable-next-line @next/next/no-img-element`).
   **Tanpa `next/image`.** URL dari `src/content/assets.ts` (nanti diganti URL R2).
6. Link ditulis tanpa prefix locale (`/our-story`). Render dengan `<HclLink>` yang
   menambahkan locale aktif di standalone (di exantara menjadi `<a>` biasa).
7. Warna utama section diekspos sebagai prop `backgroundColor` / `textColor`.
8. Tidak ada fetch data di section. Form: `onSubmit={e => e.preventDefault()}` (visual).
9. CTA belanja selalu ke `/store` atau `/store/...`.

## 3. Styling

- Bungkus root section dengan `<HclRoot as="section" id={p.sectionId} className="hcl-hero">`.
- Kelas BEM ber-prefix unik per section: `hcl-hero__title`, `hcl-hero__media`.
- Media query **hanya** di file `.css` section. Tidak boleh `<style>` inline,
  karena canvas editor hanya menulis ulang `@media` dari stylesheet dokumen.
- Tailwind **v3.4** (sama dengan exantara). Warna brand lewat `var(--hcl-*)`,
  bukan dari theme Tailwind.

## 4. Larangan (dicek oleh `npm run check:sections`)

`next/image` · `next/font` · `@import` font di CSS · `lenis` · `useTranslations` /
`next-intl` · `<style>` inline · `fetch(` di section · prefix kelas yang menjadi
awalan prefix section lain.
