# PRD: Website Heritage Clover (standalone, slice-ready untuk exantara-saas)

## Introduction

Heritage Clover adalah brand cengkeh Indonesia yang berangkat dari warisan jalur rempah.
PRD ini membangun website marketing **standalone** dengan Next.js di `~/project/heritageclover`.
Website ini sengaja disusun seperti library section `hcl-*`, supaya nanti mudah
dipindah ke website builder `~/project/exantara-saas` dengan cara yang sama seperti
Hancoco (`hc-*`) dan Coco Katapiang (`ck-*`).

Belanja **tidak** dibangun di sini. Semua CTA belanja mengarah ke `/store`, yang di
exantara dilayani **store standar v1** (cart + checkout bawaan).

Dokumen acuan (wajib dibaca sebelum mengerjakan story):
- `docs/00-Brief.md`: brand, produk, persona, open questions
- `docs/01-Design-System.md`: token, font, motion
- `docs/02-Arsitektur-Informasi.md`: route, urutan section, grup kategori
- `docs/03-Kontrak-Section.md`: **kontrak wajib** untuk setiap section
- `docs/04-Integrasi-Exantara.md`: rencana porting (di luar scope PRD ini)

## Goals

- Semua route di `docs/02` tampil lengkap dalam EN (`/en/...`) dan ID (`/id/...`).
- Setiap section mematuhi `docs/03`, dibuktikan oleh `npm run check:sections` yang lolos.
- Setiap section bisa dilihat terpisah di `/dev/sections/<id>`.
- Responsif di 375 / 768 / 1440 px tanpa scroll horizontal.
- Lighthouse (mobile) di `/en`: Performance ≥ 85, Accessibility ≥ 95.

## User Stories

Perintah cek yang dipakai di semua story:
`npm run typecheck` (= `tsc --noEmit`), `npm run lint`, `npm run check:sections` (ada mulai US-005).
Dev server: `npm run dev` → `http://localhost:3000`.

### US-001: Scaffold project Next.js
**Description:** As a developer, I need a Next.js project with the same base stack as exantara-saas so sections port without stack changes.

**Acceptance Criteria:**
- [x] Next.js 16.4.3 (App Router, `src/` dir, TypeScript strict, alias `@/*`), React 19.2, ESLint `eslint-config-next`
- [x] **Tailwind CSS 3.4** (bukan v4): `tailwind.config.ts` + `postcss.config.mjs`; `globals.css` memakai `@tailwind base/components/utilities`
- [x] Dependency: `motion`, `gsap`, `@gsap/react`, `lucide-react`. **Tanpa** `lenis`, `next-intl`, `styled-components`
- [x] Scripts di `package.json`: `dev`, `build`, `start`, `lint`, `typecheck` (`tsc --noEmit`)
- [x] `.gitignore` standar Next; `git init` + commit awal
- [x] `npm run typecheck`, `npm run lint`, `npm run build` lolos

### US-002: HclRoot, token brand, dan helper
**Description:** As a developer, I need a scoped brand root so tokens and fonts never leak into other tenants after porting.

**Acceptance Criteria:**
- [x] `src/sections/hcl-base.css` mendefinisikan semua token `docs/01 §1` di bawah selektor `.hcl-root`, beserta font-family display/body
- [x] `src/sections/hcl-root.tsx` mengekspor:
  - `HclRoot` (prop `as`, default `"div"`; memberi kelas `hcl-root`; merender `<link rel="stylesheet" precedence="default" href="…Cormorant+Garamond…Manrope…">`)
  - `withHclDefaults(defaults, props)` (urutan argumen sama dengan `withHcDefaults` Hancoco; mengabaikan `null`/`undefined`, string kosong tetap dipakai karena berarti field sengaja dikosongkan)
  - `hclLines(text)` (split per baris, trim, buang baris kosong)
  - tipe `HclInjectedProps` (salinan `SectionInjectedProps` exantara: `websiteId`, `fullDomain`, `isCanvas`, `previewMode`)
- [x] Tidak ada `next/font` atau `@import` di CSS
- [x] Unit test kecil (vitest) untuk `withHclDefaults` dan `hclLines`; script `test` di package.json; `npm test` lolos
- [x] `npm run typecheck` dan `npm run lint` lolos

### US-003: Routing locale dan HclLink
**Description:** As a visitor, I want `/en/...` and `/id/...` URLs so I can read the site in my language.

**Acceptance Criteria:**
- [x] `src/app/[locale]/layout.tsx` hanya menerima `en` | `id` (`generateStaticParams`); locale lain → `notFound()`
- [x] `src/proxy.ts` me-redirect path tanpa locale (mis. `/`, `/our-story`) ke `/en/...`; path `/dev/*`, `/_next/*` dan file statis tidak disentuh
- [x] `src/lib/locale.tsx`: `LocaleProvider` + `useLocale()`
- [x] `src/sections/hcl-link.tsx`: `HclLink` menerima `href` tanpa locale; href internal (diawali `/`) diberi prefix locale aktif, kecuali `/store*`, yang dibiarkan apa adanya; href eksternal/`#anchor` dibiarkan
- [x] `<html lang>` sesuai locale
- [x] `npm run typecheck` dan `npm run lint` lolos
- [x] Verify in browser: buka `/`, maka teralihkan ke `/en`; buka `/fr`, maka tampil 404

### US-004: Registry section dan halaman preview dev
**Description:** As a developer, I want to preview any section in isolation, mirroring exantara's `/dev/sections/<styleId>`.

**Acceptance Criteria:**
- [x] `src/sections/registry.ts` mengekspor `sectionRegistry: Record<string, { component, defaults, group: "common"|"home"|"about"|"insight"|"support"|"layout" }>` (mulai kosong)
- [x] Route `src/app/dev/sections/page.tsx` menampilkan daftar semua id di registry, dikelompokkan per grup, masing-masing berupa link
- [x] Route `src/app/dev/sections/[id]/page.tsx` merender komponen dengan `defaults`; query `?canvas=1` mengirim `isCanvas={true}`; id tak dikenal → 404
- [x] `npm run typecheck` dan `npm run lint` lolos
- [x] Verify in browser: `/dev/sections` tampil tanpa error (daftar kosong)

### US-005: Guard script `check:sections`
**Description:** As a developer, I want an automated check of the slice contract so every later story can verify itself.

**Acceptance Criteria:**
- [x] `scripts/check-sections.ts` (dijalankan via `tsx`), script npm `check:sections`
- [x] Untuk setiap `src/sections/**/hcl-*.tsx` (kecuali `hcl-root.tsx`, `hcl-link.tsx`), skrip memastikan:
  - ada file `.css` dengan nama sama
  - ada `export const hcl…Defaults`
  - ada prop `sectionId`
  - id file terdaftar di `registry.ts`
- [x] Gagal (exit 1, dengan pesan file + aturan) bila ada di `src/sections/**`: `next/image`, `next/font`, `lenis`, `useTranslations`, `next-intl`, `<style`, `fetch(`
- [x] Gagal bila ada style id yang merupakan awalan id lain + `-` (mis. `hcl-faq` dan `hcl-faq-list`)
- [x] Dengan 0 section, skrip lolos (exit 0)
- [x] `npm run check:sections`, `npm run typecheck` lolos

### US-006: Aset placeholder dan data konten statis
**Description:** As a developer, I need one place for image URLs and static data so they can be swapped for R2 URLs and SaaS data later.

**Acceptance Criteria:**
- [x] `public/hcl/images/` berisi placeholder SVG bertema (warna token, label teks): `hero.svg`, `origin.svg`, `drying.svg`, `sorting.svg`, `farmer-1..3.svg`, `product-whole.svg`, `product-ground.svg`, `product-oil.svg`, `product-gift.svg`, `article-1..3.svg`, `og.svg`
- [x] `src/content/assets.ts` mengekspor konstanta URL (`/hcl/images/...`); tidak ada path gambar yang di-hardcode di luar file ini
- [x] `src/content/insight.ts`: 3 artikel `{ slug, title, excerpt, date, category, image, body }` (EN) + terjemahan ID di `src/content/id/insight.ts`; topik: sejarah cengkeh di Maluku, 5 resep dengan cengkeh, cara menyimpan cengkeh
- [x] `npm run typecheck` lolos

### US-007: Section `hcl-header`
**Description:** As a visitor, I want a clear header with navigation, a language switch and a cart link.

**Acceptance Criteria:**
- [x] `src/sections/layout/hcl-header.tsx/.css`; props: `sectionId`, `logoText`, `logoImage`, `links` (repeater `{label, href}`), `shopLabel`, `shopHref` (default `/store`), `cartHref` (default `/store/cart`), `backgroundColor`
- [x] Sticky, `z-50`, latar transparan di atas hero lalu solid `--hcl-parchment` setelah scroll > 40px
- [x] Switcher EN | ID mengganti segmen locale di path saat ini
- [x] Mobile (< 900px): tombol menu membuka panel full-screen; `Escape` menutupnya; fokus kembali ke tombol
- [x] Terdaftar di registry grup `layout`
- [x] `npm run check:sections`, `npm run typecheck`, `npm run lint` lolos
- [x] Verify in browser: `/dev/sections/hcl-header` di 375px dan 1440px; menu mobile buka-tutup; klik ID di `/en/our-story` membuka `/id/our-story`

### US-008: Section `hcl-footer`
**Description:** As a visitor, I want a footer with navigation, contact info and legal links.

**Acceptance Criteria:**
- [x] Merender elemen `<footer>` (`HclRoot as="footer"`), latar `--hcl-clove-deep`
- [x] Props: `sectionId`, `tagline`, `exploreLinks` (repeater), `shopLinks` (repeater), `address`, `email`, `whatsapp`, `socials` (repeater `{label, href, icon}`), `newsletterTitle`, `newsletterPlaceholder`, `newsletterButton`, `copyright`, `legalLinks` (repeater)
- [x] Form newsletter visual saja (`preventDefault`)
- [x] Mobile: kolom ditumpuk
- [x] Cek lolos (check:sections, typecheck, lint)
- [x] Verify in browser: `/dev/sections/hcl-footer` di 375px dan 1440px, tanpa scroll horizontal

### US-009: Layout halaman dan stub `/store`
**Description:** As a visitor, I want every page to share header and footer, and the shop link not to 404 in standalone.

**Acceptance Criteria:**
- [x] `src/app/[locale]/layout.tsx` merender `HclHeader` + `children` + `HclFooter`, dengan copy ID dari `src/content/id/layout.ts` saat locale `id`
- [x] `src/app/store/[[...path]]/page.tsx` menampilkan pesan sederhana: "Store is served by Exantara (standard store v1)" + link kembali ke `/en`
- [x] `/en` sementara menampilkan halaman kosong di antara header dan footer
- [x] typecheck + lint lolos
- [x] Verify in browser: `/en` dan `/id` menampilkan header/footer dalam bahasa masing-masing; klik Shop membuka stub `/store`

### US-010: Section `hcl-page-hero`
**Description:** As a visitor, I want inner pages to open with a consistent title banner.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `subtitle`, `image`, `backgroundColor`, `textColor`
- [x] Tinggi 50–60vh desktop, overlay gelap di atas gambar, ornamen garis emas
- [x] Registry grup `common`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-page-hero` di 375px dan 1440px

### US-011: Section `hcl-marquee`
**Description:** As a visitor, I want a moving strip of brand keywords for rhythm between sections.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `items` (textarea → `hclLines`), `speed` (select `"slow"|"normal"|"fast"`), `backgroundColor`, `textColor`
- [x] Animasi CSS loop tanpa celah; berhenti (statis) saat `prefers-reduced-motion` atau `isCanvas`
- [x] Registry grup `common`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-marquee` bergerak; `/dev/sections/hcl-marquee?canvas=1` diam

### US-012: Section `hcl-stats`
**Description:** As a visitor, I want key numbers about the brand at a glance.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `title`, `stats` (repeater `{value, suffix, label}`), `note`, `backgroundColor`
- [x] Default memakai nilai `"XXX"` (bukan angka karangan; lihat `docs/00 §5`)
- [x] Count-up saat terlihat **hanya** bila `value` numerik; selain itu tampil apa adanya; statis saat reduced motion/canvas
- [x] Registry grup `common`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-stats` menampilkan 4 kotak "XXX" di 1440px, 2 kolom di 375px

### US-013: Section `hcl-final-cta`
**Description:** As a visitor, I want a strong closing call to shop or get in touch.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `title`, `body`, `primaryLabel`, `primaryHref` (default `/store`), `secondaryLabel`, `secondaryHref` (default `/contact`), `image`, `backgroundColor`
- [x] Link memakai `HclLink`
- [x] Registry grup `common`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-final-cta`; tombol primer menuju `/store`

### US-014: Section `hcl-rich-text`
**Description:** As a visitor, I want readable long-form text for legal pages.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `title`, `updatedAt`, `blocks` (repeater `{heading, body}`; `body` dipisah paragraf per baris kosong)
- [x] Lebar baca maks 70ch
- [x] Registry grup `common`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-rich-text` dengan 3 blok default

### US-015: Section `hcl-hero` (home)
**Description:** As a visitor, I want an evocative first screen that says what Heritage Clover is.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `titleAccent` (dirender italic `--hcl-gold`), `body`, `primaryLabel`, `primaryHref` (`/store`), `secondaryLabel`, `secondaryHref` (`/our-story`), `image`, `overlayOpacity` (select `"0.3"|"0.5"|"0.7"`)
- [x] Tinggi 100svh, teks di kiri bawah, parallax ringan gambar (GSAP) kecuali reduced motion/canvas
- [x] Copy default EN: tagline `docs/00 §1`
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-hero` di 375px dan 1440px, judul terbaca, CTA terlihat tanpa scroll

### US-016: Section `hcl-intro`
**Description:** As a visitor, I want a short brand statement after the hero.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `statement` (textarea, kalimat besar display), `body`, `signature`, `image`
- [x] Layout 2 kolom desktop (teks 7/12, gambar 5/12), ditumpuk di mobile
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-intro` di 375px dan 1440px

### US-017: Section `hcl-heritage-teaser`
**Description:** As a visitor, I want a glimpse of the spice-route history to understand the brand's roots.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `body`, `milestones` (repeater `{year, label}`, maks 4), `ctaLabel`, `ctaHref` (`/our-story`), `mapImage`
- [x] Ilustrasi peta dengan garis jalur rempah (SVG inline sederhana) di belakang daftar milestone
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-heritage-teaser`; CTA menuju `/en/our-story` saat dirender di halaman `/en`

### US-018: Section `hcl-showcase` (produk statis)
**Description:** As a visitor, I want to see the product range and jump to the store.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `products` (repeater `{name, description, image, href}`, default 4 produk `docs/00 §2`, href `/store`), `ctaLabel`, `ctaHref` (`/store`)
- [x] **Tidak** menampilkan harga dan tidak fetch data
- [x] Grid 4 kolom desktop, carousel geser horizontal (scroll-snap, bukan JS) di mobile
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-showcase` di 375px bisa digeser; di 1440px 4 kartu sejajar

### US-019: Section `hcl-origin`
**Description:** As a visitor, I want to know where the cloves come from.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `body`, `facts` (repeater `{label, value}`), `image`, `locationLabel`
- [x] Gambar full-bleed setengah layar dengan kartu fakta menumpuk
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-origin` di 375px dan 1440px

### US-020: Section `hcl-steps`
**Description:** As a visitor, I want to see the journey from tree to jar in a few steps.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `steps` (repeater `{number, title, body, icon}`), `ctaLabel`, `ctaHref` (`/process`)
- [x] Default 5 langkah (`docs/00 §3`); ikon dari record `ICONS` lucide (mis. `Hand`, `Sun`, `Filter`, `Droplets`, `Package`)
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-steps`: 5 langkah horizontal di 1440px, vertikal di 375px

### US-021: Section `hcl-uses`
**Description:** As a visitor, I want ideas for using cloves (culinary, wellness, aroma, gifting).

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `uses` (repeater `{title, body, image}`), `backgroundColor`
- [x] Hover kartu: gambar zoom halus (CSS), dimatikan di reduced motion
- [x] Tidak ada klaim medis (lihat copy default; hindari "menyembuhkan")
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-uses` di 375px dan 1440px

### US-022: Section `hcl-quality`
**Description:** As a visitor, I want reasons to trust the quality.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `points` (repeater `{title, body, icon}`), `badges` (repeater `{label, image}`), `backgroundColor`
- [x] Badge default placeholder berlabel "Certification (TBD)"
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-quality`

### US-023: Section `hcl-testimonials`
**Description:** As a visitor, I want to read what customers say.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `items` (repeater `{quote, name, role}`), `backgroundColor`
- [x] Slider: tombol prev/next + swipe; dapat dioperasikan keyboard; tanpa autoplay saat reduced motion
- [x] Default ditandai placeholder (nama "Customer name")
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-testimonials`: next/prev berganti kutipan

### US-024: Section `hcl-insight-teaser`
**Description:** As a visitor, I want to see the latest articles on the home page.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `articles` (repeater `{title, excerpt, image, href, date}`, default 3 artikel dari `src/content/insight.ts`), `ctaLabel`, `ctaHref` (`/insight`)
- [x] Registry grup `home`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-insight-teaser` menampilkan 3 kartu

### US-025: Rakit halaman Home (EN + ID)
**Description:** As a visitor, I want the full home page in both languages.

**Acceptance Criteria:**
- [x] `src/app/[locale]/page.tsx` merender urutan section `docs/02 §2` untuk `/`
- [x] `src/content/id/home.ts` berisi terjemahan ID lengkap untuk setiap section; tidak ada teks EN tersisa di `/id`
- [x] `metadata` (title, description, OG image `og.svg`) per locale
- [x] typecheck + lint + check:sections lolos
- [x] Verify in browser: `/en` dan `/id` di 375/768/1440px, semua section tampil, tanpa scroll horizontal, tanpa error console

### US-026: Section `hcl-timeline`
**Description:** As a visitor, I want the clove's history told as a timeline.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `events` (repeater `{year, title, body, image}`)
- [x] Desktop: garis vertikal tengah, item kiri-kanan bergantian; progress garis mengikuti scroll (GSAP) kecuali reduced motion/canvas. Mobile: satu kolom
- [x] Ancestor tidak memakai `overflow: hidden`
- [x] Registry grup `about`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-timeline` di 375px dan 1440px

### US-027: Section `hcl-values`
**Description:** As a visitor, I want to understand the brand's mission and values.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `mission`, `values` (repeater `{title, body, icon}`), `backgroundColor`
- [x] Registry grup `about`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-values`

### US-028: Section `hcl-farmers`
**Description:** As a visitor, I want to meet the people behind the cloves.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `body`, `people` (repeater `{name, role, image, quote}`)
- [x] Default 3 orang placeholder
- [x] Registry grup `about`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-farmers`

### US-029: Rakit halaman Our Story
**Description:** As a visitor, I want a full story page.

**Acceptance Criteria:**
- [x] `src/app/[locale]/our-story/page.tsx` sesuai `docs/02 §2` + `src/content/id/our-story.ts`
- [x] Metadata per locale; cek lolos
- [x] Verify in browser: `/en/our-story` dan `/id/our-story` di 375 dan 1440px

### US-030: Section `hcl-process-detail`
**Description:** As a visitor, I want a detailed look at each processing step.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `steps` (repeater `{number, title, body, image, duration}`)
- [x] Desktop: kolom gambar sticky berganti sesuai langkah aktif saat scroll; mobile/reduced motion/canvas: daftar biasa gambar+teks
- [x] Registry grup `about`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-process-detail`: di 1440px gambar berganti saat scroll

### US-031: Rakit halaman Process
**Description:** As a visitor, I want the process page.

**Acceptance Criteria:**
- [x] `src/app/[locale]/process/page.tsx` + `src/content/id/process.ts`; metadata; cek lolos
- [x] Verify in browser: `/en/process` dan `/id/process`

### US-032: Section `hcl-insight-grid`
**Description:** As a visitor, I want to browse all articles.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `title`, `allLabel`, `articles` (repeater `{title, excerpt, image, href, date, category}`), `emptyText`
- [x] Filter kategori (pill) dibuat dari nilai unik `category`, state lokal; "All" default
- [x] Bila kosong, tampil `emptyText`
- [x] Registry grup `insight`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-insight-grid`: klik kategori menyaring kartu

### US-033: Section `hcl-article`
**Description:** As a visitor, I want to read a single article.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `category`, `title`, `date`, `image`, `body` (textarea; paragraf dipisah baris kosong; baris diawali `## ` → `<h2>`), `backLabel`, `backHref` (`/insight`)
- [x] Lebar baca maks 70ch
- [x] Registry grup `insight`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-article`

### US-034: Rakit halaman Insight dan detail artikel
**Description:** As a visitor, I want the insight list and article pages.

**Acceptance Criteria:**
- [x] `/[locale]/insight` dan `/[locale]/insight/[slug]` memakai data `src/content/insight.ts` (+ versi ID); `generateStaticParams` untuk 3 slug × 2 locale; slug tak dikenal → 404
- [x] Metadata per artikel; cek lolos
- [x] Verify in browser: `/en/insight`, lalu klik kartu, artikel terbuka; `/id/insight/<slug>` berbahasa Indonesia

### US-035: Section `hcl-contact`
**Description:** As a visitor, I want to contact the brand.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `title`, `body`, `address`, `email`, `whatsapp`, `whatsappLabel`, `hours`, form label (`nameLabel`, `emailLabel`, `subjectLabel`, `messageLabel`, `submitLabel`, `successText`), `mapEmbedUrl`
- [x] Form visual: validasi wajib-isi di sisi client, `preventDefault`, setelah submit valid tampil `successText`
- [x] Link WhatsApp `https://wa.me/<nomor>`
- [x] Registry grup `support`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-contact`: submit kosong menampilkan error, submit valid menampilkan pesan sukses

### US-036: Section `hcl-faq`
**Description:** As a visitor, I want answers to common questions.

**Acceptance Criteria:**
- [x] Props: `sectionId`, `eyebrow`, `title`, `items` (repeater `{question, answer}`)
- [x] Accordion aksesibel (`button[aria-expanded]`, satu terbuka sekaligus)
- [x] Default 6 FAQ (penyimpanan, umur simpan, pengiriman via store, grade, minyak cengkeh, pemesanan korporat)
- [x] Registry grup `support`; cek lolos
- [x] Verify in browser: `/dev/sections/hcl-faq`: klik pertanyaan membuka jawaban, menutup yang lain

### US-037: Rakit halaman Contact dan FAQ
**Description:** As a visitor, I want contact and FAQ pages.

**Acceptance Criteria:**
- [x] `/[locale]/contact` dan `/[locale]/faq` sesuai `docs/02 §2` + konten ID; metadata; cek lolos
- [x] Verify in browser: `/en/contact`, `/id/faq`

### US-038: Halaman Privacy dan Terms
**Description:** As a visitor, I want legal pages linked from the footer.

**Acceptance Criteria:**
- [x] `/[locale]/privacy` dan `/[locale]/terms` memakai `hcl-page-hero` + `hcl-rich-text`; copy placeholder ditandai "Draft, needs legal review"
- [x] Cek lolos
- [x] Verify in browser: link Privacy/Terms di footer membuka halaman yang benar di kedua locale

### US-039: QA responsif, aksesibilitas, dan link
**Description:** As the owner, I want the whole site verified before porting.

**Acceptance Criteria:**
- [x] Script `scripts/qa-site.ts` (npm `qa`, menggantikan `check:links`): crawl `next start` lokal dari `/en` dan `/id`, gagal bila ada link internal 404 (kecuali `/store*`), scroll horizontal, `<img>` tanpa alt, jumlah `h1` ≠ 1, atau error console
- [x] Semua route di 375/768/1440px: `document.documentElement.scrollWidth <= innerWidth`
- [x] Semua `<img>` punya `alt`; heading berurutan (satu `h1` per halaman)
- [x] Lighthouse mobile `/en`: Performance ≥ 85, Accessibility ≥ 95
- [x] `npm run build`, `check:sections`, `qa` lolos (Lighthouse mobile: Home 89/100, Our Story 94/100, Contact 89/100)

### US-040: Dokumen handoff porting
**Description:** As the developer porting to exantara-saas, I want a per-section field map so porting is mechanical.

**Acceptance Criteria:**
- [x] `docs/05-Progress-Handoff.md` berisi tabel per style id: grup/kategori, setiap prop → tipe field exantara (`textField`/`textareaField`/`linkField`/`mediaField`/`colorField`/`selectField`/`repeater`), aset yang dipakai, catatan motion
- [x] Daftar halaman demo + urutan section untuk dibuat di editor exantara
- [x] Daftar open questions `docs/00 §5` yang masih terbuka

## Functional Requirements

- FR-1: Situs tersedia di `/en/*` dan `/id/*`; `/` dialihkan ke `/en`.
- FR-2: Setiap section adalah komponen `hcl-*` mandiri dengan default copy EN dan prop `sectionId`, mematuhi `docs/03`.
- FR-3: Semua teks yang terlihat berasal dari props. Copy ID berasal dari `src/content/id/*`.
- FR-4: Semua CTA belanja menuju `/store` (path apa adanya, tanpa prefix locale).
- FR-5: Form (kontak, newsletter) hanya visual: tidak mengirim data ke mana pun.
- FR-6: Animasi nonaktif saat `prefers-reduced-motion: reduce` atau `isCanvas=true`.
- FR-7: Setiap section dapat dirender sendiri di `/dev/sections/<id>`.
- FR-8: `npm run check:sections` gagal bila kontrak `docs/03 §4` dilanggar.

## Non-Goals

- Tidak membangun katalog, cart, checkout, atau harga. Itu tugas store standar v1 exantara.
- Tidak ada backend, CMS, database, auth, atau pengiriman email/form.
- Tidak melakukan porting ke exantara-saas (PRD terpisah, lihat `docs/04`).
- Tidak memakai `next/image`, `next-intl`, Lenis, atau Tailwind v4.
- Tidak membuat konten final (foto, angka, sertifikasi): memakai placeholder bertanda.
- Tidak ada SEO lanjutan (sitemap/robots/schema) karena di exantara itu ditangani platform.

## Design Considerations

- Token, font dan motion: `docs/01-Design-System.md`. Nuansa arsip rempah: parchment,
  coklat cengkeh, aksen ember dan emas, serif Cormorant Garamond.
- Referensi pola komponen yang sudah jalan:
  - `~/project/exantara-saas/src/components/section/web-sections/hancoco/` (`hc-root.tsx`, `hc-hero.tsx`)
  - `~/project/hancoco-web` (struktur situs standalone yang serupa)

## Technical Considerations

- Stack disamakan dengan exantara-saas (Next 16, React 19.2, Tailwind 3.4, `motion` 12, GSAP),
  supaya tidak perlu konversi Tailwind v4 → v3 seperti CK.
- `HclLink` adalah satu-satunya titik yang berbeda antara standalone dan exantara
  (prefix locale). Komponen lain harus bisa disalin apa adanya.
- Di exantara, header membaca cart dari `storeData`. Di standalone, ikon cart cukup link ke `/store/cart`.
- Struktur folder:
  - `src/sections/{common,home,about,insight,support,layout}/hcl-*.{tsx,css}`
  - `src/content/{assets,insight}.ts`
  - `src/content/id/*.ts`
  - `scripts/check-*.ts`

## Success Metrics

- 100% section lolos `check:sections`. Porting per section ke exantara ≤ 30 menit
  (hanya konversi props → `defineFields` + registry).
- Semua route EN/ID tampil tanpa error console dan tanpa scroll horizontal di 3 viewport.
- Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95.

## Open Questions

- Nama "Heritage Clover": *clover* = semanggi, *clove* = cengkeh. Disengaja (mis. logo daun semanggi) atau perlu diganti "Heritage Clove"? **Asumsi: dipertahankan.**
- Asal kebun **[ASUMSI: Maluku]**, angka petani/lahan/volume (sementara `XXX`).
- Daftar produk final **[ASUMSI: whole, ground, oil, gift set]**. Harga diisi di store exantara.
- Target pembeli **[ASUMSI: B2C retail, karena memakai store v1 dengan checkout]**. Ada segmen B2B/ekspor juga?
- Sertifikasi (BPOM/Halal/PIRT), kontak resmi, sosmed, domain final.
- Foto asli: sementara placeholder SVG di `public/hcl/images/`.
