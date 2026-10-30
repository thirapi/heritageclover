# 04: Rencana Integrasi ke exantara-saas

Dikerjakan **setelah** website standalone selesai dan disetujui. Ini PRD terpisah
di repo `exantara-saas`. Acuan: `docs/SLICING-GUIDE.md`, `web-sections/hancoco/PORTING.md`,
`web-editor/CREATING-A-SECTION.md`.

## Pemetaan

| Standalone | exantara-saas |
|---|---|
| `src/sections/hcl-root.tsx` + `hcl-base.css` | `src/components/section/web-sections/heritageclover/hcl-root.tsx`, `hcl-base.css` |
| `src/sections/<grup>/hcl-*.tsx/.css` | `web-sections/heritageclover/hcl-*.tsx/.css` |
| tipe props + `hcl*Defaults` | `defineFields(...)` + `InferProps<typeof fields> & Partial<SectionInjectedProps>`. Defaults dipakai juga sebagai `defaultProps` registry |
| (baru) | `web-editor/lib/categories/heritageclover/hcl-*.ts` (`defineStyle`, tags `["hcl","heritageclover",…]`) |
| (baru) | `categories/heritageclover/index.hcl-{common,home,about,insight,support}.ts` |
| `layout/hcl-header`, `layout/hcl-footer` | `web-sections/header/hcl-header.tsx`, `footer/hcl-footer.tsx` + registry di `categories/header|footer` (header: `supportsLocaleSwitcher: true`, cart dari `storeData`) |
| `src/content/id/*` | diisi sebagai `section.translations.id` di demo website |
| `src/content/insight.ts` | Collection "Insight" + `hcl-insight-grid`/`hcl-article` masuk `COLLECTION_BOUND_STYLE_IDS` |
| `public/hcl/**` | upload R2: `npm run import:media -- --dir … ` → `https://media.exantara.com/heritageclover/...` |
| `/store` stub | **store standar v1** (`online_store.custom_store = NULL`), tanpa modul `_custom` |
| `HclLink` | `<a>` biasa / tanpa prefix locale |

## Langkah

1. Salin root + tokens, lalu tiap section (ubah props → `defineFields`).
2. Registry + index kategori + wiring `section-library.ts` (import, `sectionLibrary`,
   `getFilteredCategories`).
3. Header/footer + registry.
4. Upload aset ke R2, ganti URL di defaults. Perluas matcher `src/proxy.ts`
   bila ada ekstensi baru.
5. Verifikasi:
   - `npx tsc --noEmit | grep hcl`
   - `npx eslint src/components/section/web-sections/heritageclover src/components/section/web-editor/lib/categories/heritageclover`
   - `npx vitest run src/tests/unit/components/section/section-library.test.ts`
   - visual di `/dev/sections/hcl-*`
6. Buat demo website di editor (akun PRO dev), pasang domain, aktifkan store v1,
   isi produk. **Cek DB staging vs production sebelum menulis data.**
7. Commit `feat(heritageclover): …`.
