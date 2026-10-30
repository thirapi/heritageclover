import type { Locale } from "@/lib/locales";
import type { HclProcessDetailProps } from "@/sections/about/hcl-process-detail";
import type { HclFinalCtaProps } from "@/sections/common/hcl-final-cta";
import type { HclPageHeroProps } from "@/sections/common/hcl-page-hero";
import type { HclQualityProps } from "@/sections/home/hcl-quality";
import { ASSETS } from "./assets";
import { QUALITY_ID } from "./home";
import { FINAL_CTA_ID } from "./our-story";

type ProcessContent = {
  meta: { title: string; description: string };
  hero: HclPageHeroProps;
  detail: HclProcessDetailProps;
  quality: HclQualityProps;
  cta: HclFinalCtaProps;
};

export const PROCESS: Record<Locale, ProcessContent> = {
  en: {
    meta: {
      title: "Process",
      description: "Hand-picked at the bud, dried under the sun, sorted by hand and sealed fresh: how our cloves are made.",
    },
    hero: {
      eyebrow: "The process",
      title: "From tree to table",
      subtitle: "Picked, dried, sorted, tested and sealed, the way growers in Maluku have done it for generations.",
      image: ASSETS.drying,
    },
    detail: {},
    quality: {},
    cta: {},
  },
  id: {
    meta: {
      title: "Proses",
      description: "Dipetik saat kuncup, dijemur di bawah matahari, disortir dengan tangan, dan dikemas segar: begini cengkeh kami dibuat.",
    },
    hero: {
      eyebrow: "Prosesnya",
      title: "Dari pohon ke meja",
      subtitle: "Dipetik, dijemur, disortir, diuji, dan dikemas, seperti yang dilakukan petani Maluku turun-temurun.",
      image: ASSETS.drying,
    },
    detail: {
      title: "Dari pohon ke toples",
      intro:
        "Setiap panen melewati lima tahap sebelum sampai di dapur Anda. Tidak ada mesin pengering dan tidak ada bahan tambahan.",
      steps: [
        {
          number: "01",
          title: "Dipetik saat masih kuncup",
          body: "Petani memanjat pohon dan memetik tandan dengan tangan selagi kuncup masih tertutup, tepat saat ujungnya berubah dari hijau ke merah muda lembut. Waktu adalah segalanya: begitu bunga mekar, aromanya memudar.",
          image: ASSETS.harvest,
          duration: "Di sejuknya pagi",
        },
        {
          number: "02",
          title: "Dijemur di bawah matahari",
          body: "Kuncup dihamparkan di atas tikar dan dibalik sepanjang hari hingga warnanya berubah dari merah muda menjadi cokelat tua mengilap. Penjemuran perlahan mengunci minyak atsiri yang memberi cengkeh kehangatannya.",
          image: ASSETS.drying,
          duration: "4–5 hari cerah",
        },
        {
          number: "03",
          title: "Disortir dengan tangan",
          body: "Tangkai, kepala yang patah, dan kuncup pucat dipilah dengan mata dan tangan. Hanya cengkeh utuh dengan mahkota yang lengkap yang lanjut ke meja berikutnya.",
          image: ASSETS.sorting,
          duration: "Kuncup demi kuncup",
        },
        {
          number: "04",
          title: "Dicek kadar airnya",
          body: "Setiap batch diuji kadar airnya sebelum diterima, agar cengkeh tetap harum dan awet di dapur Anda. Yang belum siap kembali dijemur.",
          image: ASSETS.testing,
          duration: "Setiap batch",
        },
        {
          number: "05",
          title: "Dikemas untuk menjaga harum",
          body: "Cengkeh jadi dikemas dalam kantong dan toples kedap udara yang melindunginya dari cahaya dan udara, membawa aroma kebun hingga ke meja Anda.",
          image: ASSETS.packing,
          duration: "Dikemas segar",
        },
      ],
    },
    quality: QUALITY_ID,
    cta: FINAL_CTA_ID(),
  },
};
