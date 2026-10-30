import type { Locale } from "@/lib/locales";
import type { HclFooterProps } from "@/sections/layout/hcl-footer";
import type { HclHeaderProps } from "@/sections/layout/hcl-header";

// Site-wide header/footer copy per locale. EN = the section defaults; ID is a
// full translation (becomes `section.translations.id` in the exantara builder).
export const LAYOUT: Record<Locale, { header: HclHeaderProps; footer: HclFooterProps }> = {
  en: { header: {}, footer: {} },
  id: {
    header: {
      links: [
        { label: "Kisah Kami", href: "/our-story" },
        { label: "Proses", href: "/process" },
        { label: "Wawasan", href: "/insight" },
        { label: "Kontak", href: "/contact" },
      ],
      shopLabel: "Belanja",
      cartLabel: "Keranjang",
      menuLabel: "Menu",
      closeLabel: "Tutup",
      languageLabel: "Bahasa",
      panelNote: "Cengkeh petik tangan dari Kepulauan Rempah Maluku.",
    },
    footer: {
      tagline: "Cengkeh dari kebun rakyat di Maluku Utara, dipetik dengan tangan dan dijemur di bawah matahari.",
      exploreTitle: "Jelajahi",
      exploreLinks: [
        { label: "Beranda", href: "/" },
        { label: "Kisah Kami", href: "/our-story" },
        { label: "Proses", href: "/process" },
        { label: "Wawasan", href: "/insight" },
        { label: "Kontak", href: "/contact" },
      ],
      shopTitle: "Belanja",
      shopLinks: [
        { label: "Cengkeh Utuh", href: "/store" },
        { label: "Cengkeh Bubuk", href: "/store" },
        { label: "Minyak Bunga Cengkeh", href: "/store" },
        { label: "Paket Hadiah Warisan", href: "/store" },
      ],
      contactTitle: "Kontak",
      address: "Ternate, Maluku Utara\nIndonesia",
      newsletterTitle: "Kabar panen dan resep lewat email",
      newsletterBody: "Email sesekali saat panen baru selesai dikemas. Berhenti berlangganan kapan saja.",
      newsletterPlaceholder: "Alamat email Anda",
      newsletterButton: "Berlangganan",
      copyright: "© 2026 Heritage Clover. Hak cipta dilindungi.",
      legalLinks: [
        { label: "Kebijakan Privasi", href: "/privacy" },
        { label: "Ketentuan Penggunaan", href: "/terms" },
      ],
    },
  },
};
