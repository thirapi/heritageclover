import type { Locale } from "@/lib/locales";
import type { HclPageHeroProps } from "@/sections/common/hcl-page-hero";
import type { HclContactProps } from "@/sections/support/hcl-contact";
import type { HclFaqProps } from "@/sections/support/hcl-faq";
import { ASSETS } from "./assets";

type ContactContent = {
  meta: { title: string; description: string };
  hero: HclPageHeroProps;
  contact: HclContactProps;
  faq: HclFaqProps;
};

export const CONTACT: Record<Locale, ContactContent> = {
  en: {
    meta: {
      title: "Contact",
      description:
        "Questions, gifts or orders for your kitchen or company: write to Heritage Clover and we will reply within one working day.",
    },
    hero: {
      eyebrow: "Contact",
      title: "Talk to us",
      subtitle: "Questions about our cloves, gifts or orders: we would love to hear from you.",
      image: ASSETS.origin,
    },
    contact: {},
    faq: {
      title: "Before you write",
      intro: "A few things people often ask us. For everything else, our full FAQ is a click away.",
      items: [
        {
          question: "How do I order and where do you ship?",
          answer:
            "All orders are placed through our online store, where you will find current prices, pack sizes and shipping options at checkout. Every parcel is packed airtight to protect the aroma on the way to you.",
        },
        {
          question: "Do you prepare corporate gifts?",
          answer:
            "Yes. We prepare heritage gift sets for corporate occasions and can supply larger volumes for kitchens, bakeries and retailers. Send us the quantity, timing and any custom packaging you have in mind, and we will come back to you with a proposal.",
        },
        {
          question: "Can I visit you or become a partner?",
          answer:
            "We welcome visits and partnership enquiries from buyers, chefs, retailers and fellow spice lovers. Write to us with a little about yourself and what you have in mind, and we will arrange a time that works for us both.",
        },
      ],
      contactText: "Looking for something else?",
      contactLabel: "Read all FAQs",
      contactHref: "/faq",
    },
  },
  id: {
    meta: {
      title: "Kontak",
      description:
        "Pertanyaan, hadiah, atau pesanan untuk dapur maupun perusahaan Anda: tulis kepada Heritage Clover dan kami akan membalas dalam satu hari kerja.",
    },
    hero: {
      eyebrow: "Kontak",
      title: "Hubungi kami",
      subtitle: "Pertanyaan seputar cengkeh, hadiah, atau pesanan: kami senang mendengar kabar dari Anda.",
      image: ASSETS.origin,
    },
    contact: {
      title: "Kirim kabar ke rumah rempah kami",
      body: "Pertanyaan tentang cengkeh kami, hadiah untuk orang tersayang, atau pesanan untuk dapur maupun perusahaan Anda: kami membaca setiap pesan dan membalas dalam satu hari kerja.",
      addressLabel: "Kunjungi",
      address: "Jl. Placeholder No. 1, Ternate\nMaluku Utara, Indonesia",
      emailInfoLabel: "Email",
      whatsappInfoLabel: "WhatsApp",
      whatsappLabel: "Ngobrol dengan kami di WhatsApp",
      hoursLabel: "Jam buka",
      hours: "Senin sampai Jumat, 09.00 sampai 17.00 WIT\nSabtu, 09.00 sampai 13.00 WIT",
      mapTitle: "Peta Ternate, Maluku Utara, Indonesia",
      formTitle: "Kirim pesan kepada kami",
      nameLabel: "Nama Anda",
      emailLabel: "Alamat email",
      subjectLabel: "Perihal",
      messageLabel: "Pesan",
      submitLabel: "Kirim pesan",
      requiredError: "Mohon isi kolom ini.",
      emailError: "Mohon masukkan alamat email yang valid.",
      successTitle: "Terima kasih",
      successText: "Pesan Anda sudah kami terima. Kami akan membalas dalam satu hari kerja.",
      resetLabel: "Kirim pesan lain",
    },
    faq: {
      title: "Sebelum Anda menulis",
      intro: "Beberapa hal yang sering ditanyakan kepada kami. Untuk pertanyaan lainnya, FAQ lengkap kami hanya sejauh satu klik.",
      items: [
        {
          question: "Bagaimana cara memesan dan ke mana saja pengirimannya?",
          answer:
            "Semua pesanan dilakukan melalui toko online kami. Di sana Anda dapat melihat harga terkini, ukuran kemasan, dan pilihan pengiriman saat checkout. Setiap paket dikemas kedap udara agar aromanya tetap terjaga hingga sampai di tangan Anda.",
        },
        {
          question: "Apakah Anda menyiapkan hadiah korporat?",
          answer:
            "Ya. Kami menyiapkan paket hadiah bernuansa warisan untuk berbagai acara perusahaan, dan dapat memasok dalam jumlah besar untuk dapur, toko roti, maupun peritel. Kirimkan jumlah, waktu, dan konsep kemasan khusus yang Anda inginkan, lalu kami akan menyampaikan penawaran.",
        },
        {
          question: "Bisakah saya berkunjung atau menjadi mitra?",
          answer:
            "Kami dengan senang hati menyambut kunjungan dan ajakan kemitraan dari pembeli, juru masak, peritel, maupun sesama pencinta rempah. Ceritakan sedikit tentang Anda dan rencana Anda, lalu kami akan mengatur waktu yang cocok bagi kedua pihak.",
        },
      ],
      contactText: "Mencari jawaban lain?",
      contactLabel: "Baca semua FAQ",
      contactHref: "/faq",
    },
  },
};
