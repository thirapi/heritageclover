# 02: Arsitektur Informasi & Peta Section

## 1. Navigasi utama

Home · Our Story · Process · Insight · Shop (`/store`) · Contact · [EN | ID] · ikon cart

## 2. Routing standalone (`src/app/[locale]/...`, locale `en` | `id`)

| Route | Isi (urutan section) |
|---|---|
| `/` | hcl-hero · hcl-marquee · hcl-intro · hcl-stats · hcl-heritage-teaser · hcl-showcase · hcl-origin · hcl-steps · hcl-uses · hcl-quality · hcl-testimonials · hcl-insight-teaser · hcl-final-cta |
| `/our-story` | hcl-page-hero · hcl-timeline · hcl-values · hcl-farmers · hcl-stats · hcl-final-cta |
| `/process` | hcl-page-hero · hcl-process-detail · hcl-quality · hcl-final-cta |
| `/insight` | hcl-page-hero · hcl-insight-grid |
| `/insight/[slug]` | hcl-article |
| `/contact` | hcl-page-hero · hcl-contact · hcl-faq |
| `/faq` | hcl-page-hero · hcl-faq · hcl-final-cta |
| `/privacy`, `/terms` | hcl-page-hero · hcl-rich-text |
| `/store` | **stub** di standalone. Di exantara dirender oleh store standar v1. |

`/` tanpa locale di-redirect ke `/en` (via `src/proxy.ts`). Di exantara, locale
ditangani oleh builder, jadi routing ini hanya untuk standalone.

## 3. Footer

Logo + tagline · kolom Explore (nav) · kolom Shop (link `/store`) · kolom Contact
(alamat, email, WA) · sosmed · newsletter (visual saja) · copyright + Privacy/Terms.

## 4. Grup section → kategori builder exantara

| Kategori (index file) | Style id |
|---|---|
| `hcl-common` | hcl-page-hero, hcl-marquee, hcl-stats, hcl-final-cta, hcl-rich-text |
| `hcl-home` | hcl-hero, hcl-intro, hcl-heritage-teaser, hcl-showcase, hcl-origin, hcl-steps, hcl-uses, hcl-quality, hcl-testimonials, hcl-insight-teaser |
| `hcl-about` | hcl-timeline, hcl-values, hcl-farmers, hcl-process-detail |
| `hcl-insight` | hcl-insight-grid (list), hcl-article (detail), keduanya **collection-bound** |
| `hcl-support` | hcl-contact, hcl-faq |
| header / footer | hcl-header, hcl-footer |

Aturan prefix: tidak ada id yang merupakan awalan id lain plus `-`
(mis. **jangan** ada `hcl-insight` dan `hcl-insight-grid` sekaligus; itu sebabnya
teaser bernama `hcl-insight-teaser` dan tidak ada `hcl-insight` polos).
