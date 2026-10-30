import type { Locale } from "@/lib/locales";
import type { HclPageHeroProps } from "@/sections/common/hcl-page-hero";
import type { HclRichTextProps } from "@/sections/common/hcl-rich-text";
import { ASSETS } from "./assets";

type LegalPage = {
  meta: { title: string; description: string };
  hero: HclPageHeroProps;
  body: HclRichTextProps;
};

type LegalContent = {
  privacy: LegalPage;
  terms: LegalPage;
};

// Privacy EN relies on the rich-text defaults (written as privacy copy). Terms copy is a draft.
export const LEGAL: Record<Locale, LegalContent> = {
  en: {
    privacy: {
      meta: {
        title: "Privacy Policy",
        description: "How Heritage Clover collects, uses and looks after your personal information.",
      },
      hero: {
        eyebrow: "Legal",
        title: "Privacy Policy",
        subtitle: "What we collect when you visit or contact us, and how we look after it.",
        image: ASSETS.pageHero,
      },
      body: {
        title: "Privacy Policy (Draft, needs legal review)",
      },
    },
    terms: {
      meta: {
        title: "Terms of Use",
        description: "The terms that apply when you use the Heritage Clover website and order through our online store.",
      },
      hero: {
        eyebrow: "Legal",
        title: "Terms of Use",
        subtitle: "The simple ground rules for using our website and ordering from our store.",
        image: ASSETS.pageHero,
      },
      body: {
        title: "Terms of Use (Draft, needs legal review)",
        updatedAt: "Last updated: XXX",
        blocks: [
          {
            heading: "Using this website",
            body: "This website is run by Heritage Clover to share the story of our cloves, the growers we work with and the products we offer. By browsing it, you agree to use it lawfully and in a way that does not harm the site or other visitors.\n\nWe work to keep the information here accurate and up to date, but it is provided for general information only and may change without notice.",
          },
          {
            heading: "Orders through our online store",
            body: "Purchases are made through our online store, powered by Exantara. Prices, availability, payment, delivery and returns are shown at checkout and are governed by the store's own terms, which you accept when you place an order.\n\nIf something is not right with your order, please contact us and we will do our best to make it right.",
          },
          {
            heading: "Intellectual property",
            body: "The Heritage Clover name and logo, together with the text, photographs and design of this website, belong to Heritage Clover or are used with permission. You may share links to our pages, but please do not copy, reproduce or use our content for commercial purposes without our written consent.",
          },
          {
            heading: "Changes and contact",
            body: "We may update these terms from time to time as our business grows. The date at the top of this page shows when they were last revised, and continued use of the site means you accept the current version.\n\nIf you have any question about these terms, you can reach us through the contact page at any time.",
          },
        ],
      },
    },
  },
  id: {
    privacy: {
      meta: {
        title: "Kebijakan Privasi",
        description: "Bagaimana Heritage Clover mengumpulkan, menggunakan, dan menjaga informasi pribadi Anda.",
      },
      hero: {
        eyebrow: "Legal",
        title: "Kebijakan Privasi",
        subtitle: "Apa yang kami kumpulkan saat Anda berkunjung atau menghubungi kami, dan bagaimana kami menjaganya.",
        image: ASSETS.pageHero,
      },
      body: {
        title: "Kebijakan Privasi (Draf, perlu ditinjau bagian hukum)",
        updatedAt: "Terakhir diperbarui: XXX",
        blocks: [
          {
            heading: "Tentang kami",
            body: "Heritage Clover menghadirkan cengkeh petik tangan dari kebun-kebun rakyat di Maluku ke dapur dan rumah di seluruh dunia. Kebijakan ini menjelaskan informasi pribadi apa saja yang kami kumpulkan saat Anda mengunjungi situs kami atau menghubungi kami, serta bagaimana kami menjaganya.\n\nJika Anda memiliki pertanyaan tentang kebijakan ini, Anda dapat menghubungi kami kapan saja melalui halaman kontak.",
          },
          {
            heading: "Apa yang kami kumpulkan dan untuk apa",
            body: "Saat Anda mengirim pesan kepada kami, kami menerima data yang Anda pilih untuk dibagikan, seperti nama, alamat email, dan isi pertanyaan Anda. Kami hanya menggunakannya untuk membalas Anda dan, bila perlu, menindaklanjuti permintaan Anda.\n\nPesanan di toko kami diproses oleh penyedia toko kami, yang mengelola data pembayaran dan pengiriman berdasarkan ketentuan privasinya sendiri. Kami tidak pernah menjual informasi pribadi Anda kepada siapa pun.",
          },
          {
            heading: "Pilihan Anda",
            body: "Anda dapat meminta kami kapan saja untuk melihat, memperbaiki, atau menghapus informasi pribadi Anda yang kami simpan. Kami akan menanggapinya dalam waktu yang wajar dan sesuai dengan hukum yang berlaku.\n\nKami dapat memperbarui kebijakan ini seiring berkembangnya usaha kami. Tanggal di bagian atas halaman ini menunjukkan kapan kebijakan ini terakhir diperbarui.",
          },
        ],
      },
    },
    terms: {
      meta: {
        title: "Ketentuan Penggunaan",
        description: "Ketentuan yang berlaku saat Anda menggunakan situs Heritage Clover dan memesan melalui toko online kami.",
      },
      hero: {
        eyebrow: "Legal",
        title: "Ketentuan Penggunaan",
        subtitle: "Aturan dasar yang sederhana untuk menggunakan situs kami dan berbelanja di toko kami.",
        image: ASSETS.pageHero,
      },
      body: {
        title: "Ketentuan Penggunaan (Draf, perlu ditinjau bagian hukum)",
        updatedAt: "Terakhir diperbarui: XXX",
        blocks: [
          {
            heading: "Penggunaan situs ini",
            body: "Situs ini dikelola oleh Heritage Clover untuk berbagi kisah cengkeh kami, para petani yang bekerja bersama kami, dan produk yang kami tawarkan. Dengan menjelajahinya, Anda setuju untuk menggunakannya secara sah dan tidak merugikan situs maupun pengunjung lainnya.\n\nKami berupaya menjaga informasi di sini tetap akurat dan terkini, namun informasi tersebut bersifat umum dan dapat berubah sewaktu-waktu tanpa pemberitahuan.",
          },
          {
            heading: "Pesanan melalui toko online kami",
            body: "Pembelian dilakukan melalui toko online kami yang didukung oleh Exantara. Harga, ketersediaan, pembayaran, pengiriman, dan pengembalian ditampilkan saat checkout dan diatur oleh ketentuan toko tersebut, yang Anda setujui ketika melakukan pemesanan.\n\nJika ada yang kurang sesuai dengan pesanan Anda, silakan hubungi kami dan kami akan berusaha sebaik mungkin untuk memperbaikinya.",
          },
          {
            heading: "Hak kekayaan intelektual",
            body: "Nama dan logo Heritage Clover, beserta teks, foto, dan desain situs ini, adalah milik Heritage Clover atau digunakan atas izin pemiliknya. Anda boleh membagikan tautan ke halaman kami, namun mohon untuk tidak menyalin, memperbanyak, atau menggunakan konten kami untuk tujuan komersial tanpa persetujuan tertulis dari kami.",
          },
          {
            heading: "Perubahan dan kontak",
            body: "Kami dapat memperbarui ketentuan ini dari waktu ke waktu seiring berkembangnya usaha kami. Tanggal di bagian atas halaman ini menunjukkan kapan ketentuan ini terakhir diperbarui, dan dengan terus menggunakan situs ini, Anda menyetujui versi yang berlaku.\n\nJika Anda memiliki pertanyaan tentang ketentuan ini, Anda dapat menghubungi kami kapan saja melalui halaman kontak.",
          },
        ],
      },
    },
  },
};
