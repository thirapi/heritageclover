import type { Locale } from "@/lib/locales";
import type { HclFinalCtaProps } from "@/sections/common/hcl-final-cta";
import type { HclMarqueeProps } from "@/sections/common/hcl-marquee";
import type { HclStatsProps } from "@/sections/common/hcl-stats";
import type { HclHeritageTeaserProps } from "@/sections/home/hcl-heritage-teaser";
import type { HclHeroProps } from "@/sections/home/hcl-hero";
import type { HclInsightTeaserProps } from "@/sections/home/hcl-insight-teaser";
import type { HclIntroProps } from "@/sections/home/hcl-intro";
import type { HclOriginProps } from "@/sections/home/hcl-origin";
import type { HclQualityProps } from "@/sections/home/hcl-quality";
import type { HclShowcaseProps } from "@/sections/home/hcl-showcase";
import type { HclStepsProps } from "@/sections/home/hcl-steps";
import type { HclTestimonialsProps } from "@/sections/home/hcl-testimonials";
import type { HclUsesProps } from "@/sections/home/hcl-uses";
import { ASSETS } from "./assets";
import { ARTICLES, articleHref } from "./insight";
import { FINAL_CTA_ID } from "./our-story";

type HomeContent = {
  meta: { title: string; description: string };
  hero: HclHeroProps;
  marquee: HclMarqueeProps;
  intro: HclIntroProps;
  stats: HclStatsProps;
  heritage: HclHeritageTeaserProps;
  showcase: HclShowcaseProps;
  origin: HclOriginProps;
  steps: HclStepsProps;
  uses: HclUsesProps;
  quality: HclQualityProps;
  testimonials: HclTestimonialsProps;
  insight: HclInsightTeaserProps;
  cta: HclFinalCtaProps;
};

// Full ID translation of the quality section; also used by the Process page.
export const QUALITY_ID: HclQualityProps = {
  eyebrow: "Janji kami",
  title: "Kualitas yang tercium sebelum toples dibuka",
  body: "Cengkeh yang baik itu gemuk, utuh, dan sedikit berminyak saat disentuh. Kami menjaga setiap batch pada standar lama itu, dan memeriksanya dengan cermat.",
  points: [
    {
      title: "Asal yang dapat ditelusuri",
      body: "Diambil dari kebun rakyat di Maluku, kepulauan tempat perdagangan cengkeh bermula.",
      icon: "MapPin",
    },
    {
      title: "Kuncup utuh, disortir tangan",
      body: "Tangkai patah dan kuncup yang tak layak dipilah dengan tangan, sehingga hanya cengkeh utuh yang sampai kepada Anda.",
      icon: "ScanSearch",
    },
    {
      title: "Kadar air diperiksa",
      body: "Setiap lot diuji setelah penjemuran agar kuncup tetap renyah, harum, dan benar-benar kering.",
      icon: "Droplets",
    },
    {
      title: "Tanpa tambahan apa pun",
      body: "Cengkeh murni, tanpa bahan pengisi, pewarna, atau pengawet. Hanya rempahnya, sebagaimana alam menciptakannya.",
      icon: "Leaf",
    },
  ],
  badgesLabel: "Sertifikasi",
  badges: [
    { label: "Sertifikasi (menyusul)", image: ASSETS.cert },
    { label: "Sertifikasi (menyusul)", image: ASSETS.cert },
    { label: "Sertifikasi (menyusul)", image: ASSETS.cert },
  ],
};

// EN relies on section defaults (written as Home copy); ID is a full translation.
export const HOME: Record<Locale, HomeContent> = {
  en: {
    meta: {
      title: "Heritage Clover — Cloves from the Spice Islands",
      description:
        "Hand-picked, sun-dried cloves from smallholder gardens in Maluku, the original Spice Islands, sealed fresh for your kitchen.",
    },
    hero: {},
    marquee: {},
    intro: {},
    stats: {},
    heritage: {},
    showcase: {},
    origin: {},
    steps: {},
    uses: {},
    quality: {},
    testimonials: {},
    insight: {},
    cta: {},
  },
  id: {
    meta: {
      title: "Heritage Clover — Cengkeh dari Kepulauan Rempah",
      description:
        "Cengkeh petik tangan dan jemur matahari dari kebun rakyat di Maluku, Kepulauan Rempah yang asli, dikemas segar untuk dapur Anda.",
    },
    hero: {
      eyebrow: "Heritage Clover · Maluku, Indonesia",
      title: "Rempah yang",
      titleAccent: "Mengubah Dunia.",
      body: "Kuncup cengkeh petik tangan dari Kepulauan Rempah yang asli, dijemur dengan cara lama dan dikemas segar untuk dapur Anda.",
      primaryLabel: "Belanja cengkeh",
      secondaryLabel: "Kisah kami",
    },
    marquee: {
      items: [
        "Dipetik tangan di Maluku",
        "Dijemur berhari-hari",
        "Disortir dengan tangan",
        "Lahir di Jalur Rempah",
        "Dari kebun rakyat",
        "Dikemas untuk menjaga harum",
      ].join("\n"),
    },
    intro: {
      eyebrow: "Sejak jalur rempah",
      statement:
        "Dahulu lebih berharga dari emas, cengkeh berlayar dari Maluku ke seluruh penjuru dunia.\nKini kami membawanya pulang, sebagaimana mestinya.",
      body: "Heritage Clover bekerja bersama petani rakyat di Kepulauan Rempah, tempat pohon cengkeh telah berbunga selama berabad-abad. Setiap kuncup dipetik dengan tangan tepat saat merona merah muda, dijemur perlahan di bawah matahari khatulistiwa, dan disortir dengan cermat, agar aromanya yang hangat dan manis sampai kepada Anda dengan utuh.",
      signature: "Keluarga Heritage Clover",
      imageAlt: "Tangan menyortir kuncup cengkeh kering",
    },
    stats: {
      title: "Berakar di kebun-kebun Maluku",
      stats: [
        { value: "XXX", suffix: "+", label: "Petani rakyat" },
        { value: "XXX", suffix: "ha", label: "Hektar kebun" },
        { value: "XXX", suffix: "t", label: "Ton dijemur setiap musim" },
        { value: "XXX", suffix: "+", label: "Tahun tradisi" },
      ],
      note: "Angka akan dikonfirmasi bersama mitra petani kami.",
    },
    heritage: {
      eyebrow: "Jalur rempah",
      title: "Kuncup mungil yang menarik armada dari seluruh dunia",
      body: "Selama berabad-abad, cengkeh hanya tumbuh di segelintir pulau di Maluku Utara. Harumnya berlayar ke istana dan dapur yang jauh, dan di sepanjang perjalanan itu, ia mengubah peta dunia.",
      milestones: [
        { year: "Zaman kuno", label: "Cengkeh meninggalkan Maluku lewat jalur laut awal menuju Tiongkok dan India." },
        { year: "1500-an", label: "Ternate dan Tidore menjadi jantung perdagangan cengkeh." },
        { year: "1600-an", label: "Armada-armada Eropa berlomba menuju Kepulauan Rempah." },
        { year: "Hari ini", label: "Petani rakyat menjaga panen tetap hidup, kuncup demi kuncup." },
      ],
      ctaLabel: "Baca kisah kami",
    },
    showcase: {
      eyebrow: "Koleksi kami",
      title: "Dari Kepulauan Rempah, untuk meja Anda",
      body: "Empat cara menghadirkan kehangatan cengkeh Maluku ke rumah Anda, masing-masing disortir dengan tangan dan dikemas saat harumnya di puncak.",
      products: [
        {
          name: "Cengkeh Utuh",
          description: "Kuncup premium sortir tangan dengan kepala utuh, kaya aroma hangat dan manis.",
          image: ASSETS.productWhole,
          href: "/store",
        },
        {
          name: "Cengkeh Bubuk",
          description: "Digiling halus untuk kue, kari, bumbu rendaman, dan minuman rempah.",
          image: ASSETS.productGround,
          href: "/store",
        },
        {
          name: "Minyak Bunga Cengkeh",
          description: "Disuling dari kuncup kering untuk aromaterapi dan ritual di rumah.",
          image: ASSETS.productOil,
          href: "/store",
        },
        {
          name: "Paket Hadiah Warisan",
          description: "Bingkisan kenangan berisi harta jalur rempah, siap untuk diberikan.",
          image: ASSETS.productGift,
          href: "/store",
        },
      ],
      cardLinkLabel: "Beli sekarang",
      ctaLabel: "Kunjungi toko",
      swipeHint: "Geser untuk melihat",
    },
    origin: {
      eyebrow: "Tempat tumbuhnya",
      title: "Berakar di Kepulauan Rempah yang asli",
      body: "Cengkeh kami berasal dari kebun rakyat di lereng vulkanik Maluku Utara, tempat angin laut, tanah yang subur, dan kearifan turun-temurun memberi setiap kuncup kehangatan yang dalam dan manis. Kami membeli langsung dari keluarga-keluarga yang merawat pohonnya.",
      facts: [
        { label: "Asal", value: "Maluku Utara" },
        { label: "Panen", value: "Petik tangan" },
        { label: "Penjemuran", value: "4–5 hari di bawah matahari" },
        { label: "Sortir", value: "Kuncup demi kuncup" },
      ],
      factsTitle: "Sekilas",
      imageAlt: "Pohon cengkeh di kebun lereng bukit di Maluku Utara",
      locationLabel: "Ternate · Maluku Utara",
    },
    steps: {
      eyebrow: "Dari pohon ke toples",
      title: "Lima langkah tanpa terburu-buru",
      intro:
        "Keterampilan sabar yang sama yang telah dijalankan Kepulauan Rempah selama berabad-abad, dijaga jujur dengan beberapa pemeriksaan modern.",
      steps: [
        {
          number: "01",
          title: "Dipetik tangan",
          body: "Kuncup dipetik dengan tangan tepat saat merona merah muda, sesaat sebelum bunganya mekar.",
          icon: "Hand",
        },
        {
          number: "02",
          title: "Dijemur matahari",
          body: "Dihamparkan di atas tikar anyaman, kuncup mengering perlahan di bawah matahari khatulistiwa hingga cokelat kemerahan pekat.",
          icon: "Sun",
        },
        {
          number: "03",
          title: "Disortir tangan",
          body: "Setiap batch diayak dan dipilah dengan mata, hanya menyisakan kuncup yang utuh dan berbentuk sempurna.",
          icon: "Filter",
        },
        {
          number: "04",
          title: "Diuji kadar air",
          body: "Setiap lot diperiksa kadar airnya agar cengkeh tetap kering, harum, dan awet disimpan.",
          icon: "Droplets",
        },
        {
          number: "05",
          title: "Dikemas segar",
          body: "Dikemas dalam kantong kedap udara yang menjaga aroma hangat dan manisnya hingga Anda membukanya.",
          icon: "Package",
        },
      ],
      ctaLabel: "Lihat proses kami",
    },
    uses: {
      eyebrow: "Cara menikmati",
      title: "Satu kuncup kecil, beragam ritual",
      intro:
        "Turun-temurun, cengkeh telah mengharumkan dapur, rumah, dan perayaan di sepanjang jalur rempah. Inilah beberapa cara menghadirkan kehangatannya dalam hari-hari Anda.",
      uses: [
        {
          title: "Kuliner",
          body: "Tumis kuncup utuh dalam rendang, nasi berempah, kue jahe, dan minuman rempah untuk kehangatan yang dalam dan manis.",
          image: ASSETS.useCulinary,
        },
        {
          title: "Ritual relaksasi",
          body: "Secangkir wedang cengkeh atau setetes minyak bunga cengkeh di air mandi hangat untuk malam yang tenang dan nyaman.",
          image: ASSETS.useWellness,
        },
        {
          title: "Pengharum rumah",
          body: "Rebusan rempah, pomander, dan racikan diffuser yang memenuhi rumah dengan harum rempah yang hangat.",
          image: ASSETS.useAroma,
        },
        {
          title: "Hadiah",
          body: "Paket hadiah warisan yang membawa kisah dari Kepulauan Rempah kepada orang-orang terkasih.",
          image: ASSETS.useGifting,
        },
      ],
    },
    quality: QUALITY_ID,
    testimonials: {
      eyebrow: "Kata mereka",
      title: "Dari dapur dekat dan jauh",
      items: [
        {
          quote:
            "Begitu kantongnya dibuka, seisi dapur langsung harum seperti rendang buatan nenek saya. Kuncupnya utuh dan mengilap, tak ada yang patah.",
          name: "Nama pelanggan",
          role: "Juru masak rumahan · ulasan contoh",
        },
        {
          quote:
            "Setiap akhir pekan saya merebus beberapa kuncup bersama kayu manis dan kulit jeruk. Aromanya hangat dan manis, tidak pernah apak atau hambar.",
          name: "Nama pelanggan",
          role: "Pencinta teh · ulasan contoh",
        },
        {
          quote:
            "Tahun ini kami mengirim paket hadiah warisan kepada mitra kami. Semua orang bertanya tentang kisah Kepulauan Rempah di baliknya.",
          name: "Nama pelanggan",
          role: "Hadiah korporat · ulasan contoh",
        },
      ],
      prevLabel: "Testimoni sebelumnya",
      nextLabel: "Testimoni berikutnya",
    },
    insight: {
      eyebrow: "Wawasan",
      title: "Catatan dari jalur rempah",
      articles: ARTICLES.id.slice(0, 3).map((a) => ({
        title: a.title,
        excerpt: a.excerpt,
        image: a.image,
        href: articleHref(a.slug),
        date: a.date,
      })),
      readLabel: "Baca artikel",
      ctaLabel: "Semua artikel",
    },
    cta: FINAL_CTA_ID(),
  },
};
