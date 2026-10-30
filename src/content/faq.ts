import type { Locale } from "@/lib/locales";
import type { HclFinalCtaProps } from "@/sections/common/hcl-final-cta";
import type { HclPageHeroProps } from "@/sections/common/hcl-page-hero";
import type { HclFaqProps } from "@/sections/support/hcl-faq";
import { ASSETS } from "./assets";
import { FINAL_CTA_ID } from "./our-story";

type FaqPageContent = {
  meta: { title: string; description: string };
  hero: HclPageHeroProps;
  faq: HclFaqProps;
  cta: HclFinalCtaProps;
};

// EN relies on section defaults (written as FAQ copy); ID is a full translation.
export const FAQ_PAGE: Record<Locale, FaqPageContent> = {
  en: {
    meta: {
      title: "FAQ",
      description: "Storage, freshness, ordering, grades, clove bud oil and corporate orders: answers to what our customers ask most.",
    },
    hero: {
      eyebrow: "FAQ",
      title: "Questions & answers",
      subtitle: "Storage, grades and ordering, for a jar at home or an order for your team.",
      image: ASSETS.sorting,
    },
    faq: {},
    cta: {},
  },
  id: {
    meta: {
      title: "FAQ",
      description:
        "Penyimpanan, kesegaran, pemesanan, kualitas, minyak bunga cengkeh, dan pesanan korporat: jawaban atas pertanyaan yang paling sering diajukan pelanggan kami.",
    },
    hero: {
      eyebrow: "FAQ",
      title: "Tanya jawab",
      subtitle: "Penyimpanan, kualitas, dan pemesanan, untuk satu toples di rumah maupun pesanan untuk tim Anda.",
      image: ASSETS.sorting,
    },
    faq: {
      title: "Pertanyaan umum seputar cengkeh kami",
      intro:
        "Penyimpanan, tingkatan kualitas, pemesanan, dan pasokan dalam jumlah besar: pertanyaan yang paling sering dikirim pelanggan kepada kami.",
      items: [
        {
          question: "Bagaimana cara menyimpan cengkeh?",
          answer:
            "Simpan dalam toples kaca tertutup rapat, jauh dari kompor, kelembapan, dan sinar matahari langsung. Cengkeh utuh menyimpan minyak atsirinya jauh lebih lama daripada cengkeh bubuk, jadi giling secukupnya saja untuk masakan yang sedang Anda siapkan.",
        },
        {
          question: "Berapa lama cengkeh tetap segar?",
          answer:
            "Jika disimpan dengan baik, cengkeh utuh mempertahankan aromanya selama berbulan-bulan, sementara cengkeh bubuk lebih cepat memudar. Setiap kemasan mencantumkan tanggal kedaluwarsa pada labelnya. Untuk cek cepat, tekan sebutir kuncup dengan kuku: cengkeh yang segar akan mengeluarkan sedikit minyak.",
        },
        {
          question: "Bagaimana cara memesan dan ke mana saja pengirimannya?",
          answer:
            "Semua pesanan dilakukan melalui toko online kami. Di sana Anda dapat melihat harga terkini, ukuran kemasan, dan pilihan pengiriman saat checkout. Setiap paket dikemas kedap udara agar aromanya tetap terjaga hingga sampai di tangan Anda.",
        },
        {
          question: "Apa arti tingkatan kualitas cengkeh Anda?",
          answer:
            "Kualitas premium kami terdiri dari kuncup utuh yang tidak patah dengan kepala lengkap, kadar air rendah, serta warna yang pekat dan merata, disortir dengan tangan setelah dijemur. Kualitas dapur kami dapat berisi kuncup tanpa kepala atau dengan ukuran yang sedikit beragam. Harganya lebih murah dan cocok untuk dijadikan bubuk atau untuk masakan yang direbus lama.",
        },
        {
          question: "Bagaimana cara menggunakan minyak bunga cengkeh?",
          answer:
            "Minyak bunga cengkeh kami ditujukan untuk wewangian dan perawatan rumah: beberapa tetes di diffuser, atau dicampur dengan minyak pembawa untuk aroma rempah yang hangat. Minyak ini sangat pekat, jadi selalu encerkan sebelum menyentuh kulit, jauhkan dari mata dan dari jangkauan anak-anak, dan jangan dikonsumsi.",
        },
        {
          question: "Apakah Anda menerima pesanan korporat dan dalam jumlah besar?",
          answer:
            "Ya. Kami menyiapkan paket hadiah untuk berbagai acara perusahaan dan memasok dalam jumlah lebih besar untuk dapur, toko roti, dan peritel. Sampaikan jumlah, waktu, dan konsep kemasan khusus yang Anda inginkan, lalu kami akan menghubungi Anda kembali dengan penawaran.",
        },
      ],
      contactText: "Pertanyaan Anda tidak ada di sini?",
      contactLabel: "Hubungi kami",
    },
    cta: FINAL_CTA_ID(),
  },
};
