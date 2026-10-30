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
  title: "Kualitas yang tercium sebelum toples dibuka",
  body: "Cengkeh yang baik itu gemuk, utuh, dan sedikit berminyak saat disentuh. Setiap batch disortir dengan tangan dan diuji kadar airnya sebelum dikemas.",
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
      body: "Hanya kuncup cengkeh utuh, tanpa bahan pengisi, pewarna, atau pengawet.",
      icon: "Leaf",
    },
  ],
  badgesLabel: "Standar mutu",
  badges: [
    { label: "100% Asal Maluku", image: ASSETS.cert },
    { label: "Grade A Sortir Tangan", image: ASSETS.cert },
    { label: "Alami Jemur Matahari", image: ASSETS.cert },
  ],
};

// EN relies on section defaults (written as Home copy); ID is a full translation.
export const HOME: Record<Locale, HomeContent> = {
  en: {
    meta: {
      title: "Heritage Clover: Cloves from the Spice Islands",
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
      title: "Heritage Clover: Cengkeh dari Kepulauan Rempah",
      description:
        "Cengkeh petik tangan dan jemur matahari dari kebun rakyat di Maluku, Kepulauan Rempah yang asli, dikemas segar untuk dapur Anda.",
    },
    hero: {
      eyebrow: "Heritage Clover · Maluku, Indonesia",
      title: "Rempah yang",
      titleAccent: "Mengubah Dunia.",
      body: "Kuncup cengkeh yang dipetik dengan tangan di Maluku Utara, dijemur di bawah matahari selama empat sampai lima hari, dan dikemas segar untuk dapur Anda.",
      primaryLabel: "Belanja cengkeh",
      secondaryLabel: "Kisah kami",
    },
    marquee: {
      items: [
        "Dipetik tangan di Maluku",
        "Dijemur berhari-hari",
        "Disortir dengan tangan",
        "Dipetik saat masih kuncup",
        "Dari kebun rakyat",
        "Dikemas untuk menjaga harum",
      ].join("\n"),
    },
    intro: {
      statement:
        "Selama berabad-abad, cengkeh hanya tumbuh di beberapa pulau kecil di Maluku Utara.\nKami membelinya di sana, dari keluarga-keluarga yang menanamnya.",
      body: "Heritage Clover bekerja bersama petani rakyat di Ternate dan pulau-pulau di sekitarnya. Setiap kuncup dipetik dengan tangan saat warnanya berubah dari hijau ke merah muda, dijemur di bawah matahari selama empat sampai lima hari, dan disortir dengan tangan sebelum dikemas.",
      signature: "Keluarga Heritage Clover",
      imageAlt: "Tangan menyortir kuncup cengkeh kering",
    },
    stats: {
      title: "Kebun cengkeh kami dalam angka",
      stats: [
        { value: "120", suffix: "+", label: "Keluarga petani mitra" },
        { value: "350", suffix: "ha", label: "Kebun cengkeh rakyat" },
        { value: "40", suffix: "t", label: "Panen kering per musim" },
        { value: "400", suffix: "+", label: "Tahun tradisi rempah" },
      ],
      note: "Data kemitraan kebun rakyat Maluku Utara.",
    },
    heritage: {
      title: "Kuncup mungil yang menarik armada dari seluruh dunia",
      body: "Selama berabad-abad, cengkeh hanya tumbuh di segelintir pulau di Maluku Utara. Para pedagang membawanya lewat laut ke Tiongkok, India, Timur Tengah, dan Eropa, dan perebutan pasokannya mendatangkan armada-armada Eropa ke pulau-pulau itu.",
      milestones: [
        { year: "Zaman kuno", label: "Cengkeh meninggalkan Maluku lewat jalur laut awal menuju Tiongkok dan India." },
        { year: "1500-an", label: "Ternate dan Tidore menjadi pusat perdagangan cengkeh." },
        { year: "1600-an", label: "Armada-armada Eropa berlomba menuju Kepulauan Rempah." },
        { year: "Hari ini", label: "Keluarga petani rakyat di pulau-pulau yang sama masih memetik kuncupnya dengan tangan." },
      ],
      ctaLabel: "Baca kisah kami",
    },
    showcase: {
      title: "Dari Kepulauan Rempah, untuk meja Anda",
      body: "Kuncup utuh, cengkeh bubuk, minyak bunga cengkeh, dan paket hadiah. Semuanya berasal dari cengkeh yang sama, dipetik dengan tangan dan dijemur di bawah matahari di Maluku Utara.",
      products: [
        {
          name: "Cengkeh Utuh",
          description: "Kuncup sortir tangan dengan kepala utuh, untuk nasi, semur, acar, dan minuman rempah.",
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
          description: "Disuling dari kuncup cengkeh kering, untuk diffuser dan pengharum ruangan.",
          image: ASSETS.productOil,
          href: "/store",
        },
        {
          name: "Paket Hadiah Warisan",
          description: "Pilihan produk cengkeh kami dalam satu kotak, siap untuk diberikan.",
          image: ASSETS.productGift,
          href: "/store",
        },
      ],
      cardLinkLabel: "Beli sekarang",
      ctaLabel: "Kunjungi toko",
      swipeHint: "Geser untuk melihat",
    },
    origin: {
      title: "Tumbuh di lereng vulkanik Maluku Utara",
      body: "Cengkeh kami berasal dari kebun rakyat di sekitar Ternate, tempat pohon-pohonnya tumbuh di tanah vulkanik yang menghadap ke laut. Kami membeli langsung dari keluarga-keluarga yang merawat pohonnya, saat musim panen.",
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
      title: "Dari pohon ke toples",
      intro:
        "Pemetikan, penjemuran, dan penyortiran dikerjakan dengan tangan, seperti yang selalu dilakukan petani Maluku. Kadar air diperiksa dan setiap lot dikemas rapat sebelum meninggalkan pulau.",
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
          body: "Dihamparkan di atas tikar anyaman, kuncup dijemur di bawah matahari khatulistiwa hingga berwarna cokelat kemerahan pekat.",
          icon: "Sun",
        },
        {
          number: "03",
          title: "Disortir tangan",
          body: "Setiap batch diayak dan dipilah dengan mata, hanya menyisakan kuncup yang utuh dan berbentuk baik.",
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
          body: "Dikemas dalam kantong kedap udara yang menjaga aromanya hingga Anda membukanya.",
          icon: "Package",
        },
      ],
      ctaLabel: "Lihat proses lengkapnya",
    },
    uses: {
      title: "Empat cara menggunakan cengkeh utuh",
      intro:
        "Di dapur Indonesia, cengkeh membumbui rendang dan nasi berempah, dan masuk ke dalam minuman hangat. Beberapa kuncup yang direbus dalam air juga bisa mengharumkan seisi ruangan.",
      uses: [
        {
          title: "Memasak",
          body: "Tumis kuncup utuh dalam minyak sebelum bumbu rendang dimasukkan, atau masak bersama nasi, kue jahe, dan anggur rempah.",
          image: ASSETS.useCulinary,
        },
        {
          title: "Minuman dan mandi",
          body: "Seduh beberapa kuncup dalam air panas untuk wedang cengkeh, atau teteskan sedikit minyak bunga cengkeh ke air mandi hangat.",
          image: ASSETS.useWellness,
        },
        {
          title: "Pengharum rumah",
          body: "Rebus segenggam cengkeh bersama kayu manis dan kulit jeruk, atau tancapkan pada sebutir jeruk untuk membuat pomander.",
          image: ASSETS.useAroma,
        },
        {
          title: "Hadiah",
          body: "Paket hadiah berisi cengkeh utuh Maluku, dikemas untuk dikirim kepada keluarga, teman, dan mitra bisnis.",
          image: ASSETS.useGifting,
        },
      ],
    },
    quality: QUALITY_ID,
    testimonials: {
      title: "Dari dapur dekat dan jauh",
      items: [
        {
          quote:
            "Begitu kantongnya dibuka, seisi dapur langsung harum seperti rendang buatan nenek saya. Kuncupnya utuh dan mengilap, tak ada yang patah.",
          name: "Ratih Soedarmono",
          role: "Juru masak rumahan, Jakarta",
        },
        {
          quote:
            "Setiap akhir pekan saya merebus beberapa kuncup bersama kayu manis dan kulit jeruk. Aromanya hangat dan manis, tidak pernah apak atau hambar.",
          name: "Chef Aris Munandar",
          role: "Chef & artisan baker, Bali",
        },
        {
          quote:
            "Tahun ini kami mengirim paket hadiah warisan kepada mitra kami. Semua orang bertanya tentang kisah Kepulauan Rempah di baliknya.",
          name: "David Tan",
          role: "Roaster kopi & pencinta teh, Singapura",
        },
      ],
      prevLabel: "Testimoni sebelumnya",
      nextLabel: "Testimoni berikutnya",
    },
    insight: {
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
