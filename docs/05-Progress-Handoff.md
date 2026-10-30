# 05: Progress & Handoff (untuk porting ke exantara-saas)

> Status 2026-10-31: website standalone **selesai** (US-001 – US-040). Belum diporting.

## 1. Status

- 25 section `hcl-*` (layout 2, common 5, home 10, about 4, insight 2, support 2), semuanya
  lolos `npm run check:sections` dan bisa dipreview di `/dev/sections/<id>` (`?canvas=1` = state statis editor).
- 11 route × EN/ID = 22 halaman statis (SSG). `/` → `/en`. `/store*` = stub (di exantara: store standar v1).
- QA (`npm run qa`): 22 halaman, tanpa link mati, tanpa scroll horizontal di 375/768/1440,
  semua `<img>` ber-`alt`, satu `<h1>` per halaman, tanpa error console.
- Lighthouse mobile (build produksi lokal): Home 89 / A11y 100, Our Story (ID) 94 / 100,
  Contact 89 / 100. Best practices & SEO 100. CLS ≈ 0.

## 2. Cara menjalankan

```bash
npm install
npm run dev                 # http://localhost:3000 → /en
npm run typecheck && npm run lint && npm test && npm run check:sections
npm run build && npm start  # lalu, di terminal lain:
npm run qa                  # BASE_URL=http://localhost:3000 (default)
npm run gen:placeholders    # regenerasi gambar placeholder public/hcl/images
```

## 3. Peta file

| Path | Isi |
|---|---|
| `src/sections/hcl-root.tsx`, `hcl-base.css`, `hcl-motion.tsx` | fondasi brand: `HclRoot`, token, `withHclDefaults`, `hclLines`, `HclReveal`, `.hcl-fade-up` → **disalin** ke exantara |
| `src/sections/hcl-link.tsx` | **satu-satunya** glue standalone (prefix locale). Di exantara → `<a href>` biasa |
| `src/sections/<grup>/hcl-*.tsx/.css` | section; `<grup>/index*.ts` = registry per grup (≈ category index exantara) |
| `src/content/*.ts` | copy per halaman `{ en, id }`; EN kebanyakan `{}` (= defaults), ID = terjemahan penuh → `section.translations.id` |
| `src/content/assets.ts` | semua URL gambar → ganti base ke R2 |
| `src/content/insight.ts` | 3 artikel EN/ID → Collection "Insight" di exantara |
| `src/app/(site)/[locale]/*` | perakitan halaman (urutan section = urutan halaman demo di editor) |
| `src/proxy.ts`, `src/app/(tools)/*`, `global-not-found.tsx` | khusus standalone, **tidak diporting** |
| `scripts/check-sections.ts`, `scripts/qa-site.ts` | guard kontrak & QA |

## 4. Keputusan terkunci (jangan diubah tanpa user)

- Prefix `hcl-` (bukan `hc-`, milik Hancoco). Tailwind 3.4. Next 16.4.3 (16.3.x punya CVE RCE).
- Store = **store standar v1** exantara (bukan custom store). Semua CTA belanja → `/store`.
- Base CSS memakai `:where(.hcl-root) .x`: helper menang atas preflight Tailwind, kalah dari class section.
- Hero & page-hero memakai animasi CSS (`.hcl-fade-up`), bukan `HclReveal`, supaya LCP tidak menunggu hydration.
- `--hcl-ember` = `#AD4F2B` (digelapkan dari `#B5532E` untuk kontras teks kecil).
- `hcl-rich-text` judulnya `<h2>` (halaman legal sudah punya `<h1>` di `hcl-page-hero`).

## 5. Halaman demo di editor exantara (urutan section)

| Halaman | Section |
|---|---|
| Home `/` | hcl-hero · hcl-marquee · hcl-intro · hcl-stats · hcl-heritage-teaser · hcl-showcase · hcl-origin · hcl-steps · hcl-uses · hcl-quality · hcl-testimonials · hcl-insight-teaser · hcl-final-cta |
| Our Story | hcl-page-hero · hcl-timeline · hcl-values · hcl-farmers · hcl-stats · hcl-final-cta |
| Process | hcl-page-hero (`src/content/process.ts` hero) · hcl-process-detail · hcl-quality · hcl-final-cta |
| Insight (list) | hcl-page-hero · hcl-insight-grid (collection-bound) |
| Insight (detail) | hcl-article (collection-bound) |
| Contact | hcl-page-hero · hcl-contact · hcl-faq (3 item) |
| FAQ | hcl-page-hero · hcl-faq · hcl-final-cta |
| Privacy / Terms | hcl-page-hero · hcl-rich-text |
| Global | header: hcl-header (`supportsLocaleSwitcher: true`) · footer: hcl-footer |

Copy per section: `src/content/<halaman>.ts` (EN = defaults, kecuali yang tertulis; ID = isi `id`).

## 6. Field map per section

Tipe field = helper exantara (`textField`, `textareaField`, `linkField`, `mediaField`, `colorField`,
`selectField`, `repeater`). Repeater hanya berisi field string datar. Field `icon` di repeater =
select nama ikon lucide. Teks bertanda textarea yang dipecah per baris memakai `hclLines`.

| Style id | Kategori | Props → field | Aset (ASSETS.*) | Motion |
|---|---|---|---|---|
| `hcl-footer` | header / footer | `sectionId`: textField (anchor)<br>`brandName`: textField<br>`tagline`: textareaField<br>`exploreTitle`: textField<br>`exploreLinks`: repeater()<br>`shopTitle`: textField<br>`shopLinks`: repeater()<br>`contactTitle`: textField<br>`address`: textareaField<br>`email`: textField<br>`whatsapp`: textField<br>`socials`: repeater(label)<br>`newsletterEyebrow`: textField<br>`newsletterTitle`: textField<br>`newsletterBody`: textareaField<br>`newsletterPlaceholder`: textField<br>`newsletterButton`: textField<br>`copyright`: textField<br>`legalLinks`: repeater()<br>`backgroundColor`: colorField<br>`textColor`: colorField | — | motion |
| `hcl-header` | header / footer | `sectionId`: textField (anchor)<br>`logoText`: textField<br>`logoImage`: mediaField<br>`links`: repeater(label)<br>`shopLabel`: textField<br>`shopHref`: linkField<br>`cartHref`: linkField<br>`cartLabel`: textField<br>`menuLabel`: textField<br>`closeLabel`: textField<br>`languageLabel`: textField<br>`panelNote`: textareaField<br>`backgroundColor`: colorField | — | motion |
| `hcl-final-cta` | hcl-common | `sectionId`: textField (anchor)<br>`title`: textField<br>`body`: textareaField<br>`primaryLabel`: textField<br>`primaryHref`: linkField<br>`secondaryLabel`: textField<br>`secondaryHref`: linkField<br>`image`: mediaField<br>`backgroundColor`: colorField | cta | motion |
| `hcl-marquee` | hcl-common | `sectionId`: textField (anchor)<br>`items`: textareaField<br>`speed`: selectField<br>`backgroundColor`: colorField<br>`textColor`: colorField | — | static |
| `hcl-page-hero` | hcl-common | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`subtitle`: textareaField<br>`image`: mediaField<br>`backgroundColor`: colorField<br>`textColor`: colorField | pageHero | CSS fade |
| `hcl-rich-text` | hcl-common | `sectionId`: textField (anchor)<br>`title`: textField<br>`updatedAt`: textField<br>`blocks`: repeater(heading) | — | motion |
| `hcl-stats` | hcl-common | `sectionId`: textField (anchor)<br>`title`: textField<br>`stats`: repeater(value)<br>`note`: textareaField<br>`backgroundColor`: colorField | — | motion |
| `hcl-heritage-teaser` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`body`: textareaField<br>`milestones`: repeater(year)<br>`ctaLabel`: textField<br>`ctaHref`: linkField<br>`mapImage`: mediaField | heritageMap | motion |
| `hcl-hero` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`titleAccent`: textField<br>`body`: textareaField<br>`primaryLabel`: textField<br>`primaryHref`: linkField<br>`secondaryLabel`: textField<br>`secondaryHref`: linkField<br>`image`: mediaField<br>`overlayOpacity`: selectField | hero | GSAP, CSS fade |
| `hcl-insight-teaser` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`articles`: repeater(title)<br>`readLabel`: textField<br>`ctaLabel`: textField<br>`ctaHref`: linkField<br>`backgroundColor`: colorField | — | motion |
| `hcl-intro` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`statement`: textareaField<br>`body`: textareaField<br>`signature`: textField<br>`image`: mediaField<br>`imageAlt`: textField | intro | motion |
| `hcl-origin` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`body`: textareaField<br>`facts`: repeater(label)<br>`factsTitle`: textField<br>`image`: mediaField<br>`imageAlt`: textField<br>`locationLabel`: textField | origin | motion |
| `hcl-quality` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`body`: textareaField<br>`points`: repeater(title)<br>`badgesLabel`: textField<br>`badges`: repeater(label)<br>`backgroundColor`: colorField<br>`textColor`: colorField | cert | motion |
| `hcl-showcase` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`body`: textareaField<br>`products`: repeater(name)<br>`cardLinkLabel`: textField<br>`ctaLabel`: textField<br>`ctaHref`: linkField<br>`swipeHint`: textField | productGift, productGround, productOil, productWhole | motion |
| `hcl-steps` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`intro`: textareaField<br>`steps`: repeater(number)<br>`ctaLabel`: textField<br>`ctaHref`: linkField<br>`backgroundColor`: colorField | — | motion |
| `hcl-testimonials` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`items`: repeater(quote)<br>`prevLabel`: textField<br>`nextLabel`: textField<br>`backgroundColor`: colorField | — | motion |
| `hcl-uses` | hcl-home | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`intro`: textareaField<br>`uses`: repeater(title)<br>`backgroundColor`: colorField | useAroma, useCulinary, useGifting, useWellness | motion |
| `hcl-farmers` | hcl-about | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`body`: textareaField<br>`people`: repeater(name)<br>`backgroundColor`: colorField<br>`textColor`: colorField | farmer1, farmer2, farmer3 | motion |
| `hcl-process-detail` | hcl-about | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`intro`: textareaField<br>`backgroundColor`: colorField<br>`textColor`: colorField | drying, harvest, packing, sorting, testing | motion |
| `hcl-timeline` | hcl-about | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`intro`: textareaField<br>`events`: repeater(year)<br>`backgroundColor`: colorField<br>`textColor`: colorField | drying, harvest, heritageMap, intro, origin | GSAP, motion |
| `hcl-values` | hcl-about | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`mission`: textareaField<br>`missionNote`: textareaField<br>`values`: repeater(title)<br>`backgroundColor`: colorField<br>`textColor`: colorField | — | motion |
| `hcl-article` | hcl-insight | `sectionId`: textField (anchor)<br>`category`: textField<br>`title`: textField<br>`date`: textField<br>`image`: mediaField<br>`imageAlt`: textField<br>`body`: textareaField<br>`backLabel`: textField<br>`backHref`: linkField<br>`backgroundColor`: colorField<br>`textColor`: colorField | — | motion |
| `hcl-insight-grid` | hcl-insight | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`intro`: textareaField<br>`filterLabel`: textField<br>`allLabel`: textField<br>`readMoreLabel`: textField<br>`emptyText`: textField<br>`articles`: repeater(title)<br>`backgroundColor`: colorField<br>`textColor`: colorField | — | motion |
| `hcl-contact` | hcl-support | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`body`: textareaField<br>`addressLabel`: textField<br>`address`: textareaField<br>`emailInfoLabel`: textField<br>`email`: textField<br>`whatsappInfoLabel`: textField<br>`whatsapp`: textField<br>`whatsappLabel`: textField<br>`hoursLabel`: textField<br>`hours`: textareaField<br>`mapEmbedUrl`: linkField<br>`mapTitle`: textField<br>`formTitle`: textField<br>`nameLabel`: textField<br>`emailLabel`: textField<br>`subjectLabel`: textField<br>`messageLabel`: textField<br>`submitLabel`: textField<br>`requiredError`: textField<br>`emailError`: textField<br>`successTitle`: textField<br>`successText`: textField<br>`resetLabel`: textField<br>`backgroundColor`: colorField<br>`textColor`: colorField | — | motion |
| `hcl-faq` | hcl-support | `sectionId`: textField (anchor)<br>`eyebrow`: textField<br>`title`: textField<br>`intro`: textareaField<br>`items`: repeater(question)<br>`contactText`: textareaField<br>`contactLabel`: textField<br>`contactHref`: linkField<br>`backgroundColor`: colorField<br>`textColor`: colorField | — | motion |

Catatan porting motion: `GSAP` = `useGSAP` + ScrollTrigger (cek `isCanvas` & reduced motion sudah ada);
`motion` = `motion/react` / `HclReveal`; `CSS fade` = `.hcl-fade-up` dari `hcl-base.css`.

## 7. Diketahui belum beres (bukan bug)

- Semua gambar = placeholder SVG berlabel "PLACEHOLDER" (`public/hcl/images`).
- Angka statistik = `XXX`, testimoni & petani = nama placeholder, sertifikasi = "Certification (TBD)".
- Kontak (email, WhatsApp `+62 XXX…`, alamat Ternate), link sosmed = placeholder.
- Halaman Privacy/Terms = draf, perlu review hukum.
- Form kontak & newsletter hanya visual (tidak mengirim data).

## 8. Open questions (dari `00-Brief.md §5`)

- [ ] Nama "Heritage Clover" (clover = semanggi) disengaja, atau "Heritage Clove"?
- [ ] Asal kebun sebenarnya (asumsi: Maluku Utara) + angka petani/lahan/volume.
- [ ] Daftar produk final (asumsi: utuh, bubuk, minyak, gift set) + target B2C/B2B.
- [ ] Foto asli, sertifikasi (BPOM/Halal/PIRT), kontak resmi, sosmed, domain final.
