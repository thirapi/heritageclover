import type { Locale } from "@/lib/locales";
import type { HclFarmersProps } from "@/sections/about/hcl-farmers";
import type { HclTimelineProps } from "@/sections/about/hcl-timeline";
import type { HclValuesProps } from "@/sections/about/hcl-values";
import type { HclFinalCtaProps } from "@/sections/common/hcl-final-cta";
import type { HclPageHeroProps } from "@/sections/common/hcl-page-hero";
import type { HclStatsProps } from "@/sections/common/hcl-stats";
import { ASSETS } from "./assets";

type OurStoryContent = {
  meta: { title: string; description: string };
  hero: HclPageHeroProps;
  timeline: HclTimelineProps;
  values: HclValuesProps;
  farmers: HclFarmersProps;
  stats: HclStatsProps;
  cta: HclFinalCtaProps;
};

// EN relies on section defaults (written as Our Story copy); ID is a full translation.
export const OUR_STORY: Record<Locale, OurStoryContent> = {
  en: {
    meta: {
      title: "Our Story",
      description: "Clove heritage and single-origin harvests from the volcanic hills of East Java to the growers we work with today.",
    },
    hero: {},
    timeline: {},
    values: {},
    farmers: {},
    stats: {},
    cta: {},
  },
  id: {
    meta: {
      title: "Kisah Kami",
      description: "Sejarah cengkeh dan kebun rakyat di lereng vulkanik Jawa Timur hingga para petani yang bekerja bersama kami hari ini.",
    },
    hero: {
      title: "Kisah Kami",
      subtitle: "Tempat cengkeh kami tumbuh, siapa yang memetiknya, dan bagaimana cengkeh itu sampai ke dapur Anda.",
    },
    timeline: {
      title: "Rempah yang mengubah dunia",
      intro:
        "Dari jalur rempah maritim kuno hingga lereng vulkanik Jawa Timur yang subur, cengkeh menggerakkan perniagaan dunia selama berabad-abad. Inilah titik-titik baliknya.",
      events: [
        {
          year: "Sebelum 1500",
          title: "Lahir di kepulauan timur",
          body: "Cengkeh tumbuh di lereng vulkanik kepulauan timur nusantara. Selama berabad-abad, pedagang Asia dan Arab membawa kuncup keringnya ke barat, mata rantai demi mata rantai di sepanjang jalur rempah maritim.",
          image: ASSETS.origin,
        },
        {
          year: "Awal 1500-an",
          title: "Eropa berlayar mencari rempah",
          body: "Kapal-kapal Portugis dan Spanyol berlomba melintasi samudra demi satu hadiah: kuncup cokelat kecil yang, berat demi berat, lebih berharga dari hampir semua muatan lainnya.",
          image: ASSETS.heritageMap,
        },
        {
          year: "1600-an",
          title: "Masa monopoli",
          body: "Kongsi Dagang Hindia Belanda (VOC) merebut kendali perdagangan dan membatasi penanaman demi menjaga harga tetap tinggi.",
          image: ASSETS.intro,
        },
        {
          year: "Akhir 1700-an",
          title: "Subur di tanah Jawa Timur",
          body: "Bibit cengkeh menyebar ke kebun-kebun rakyat di berbagai wilayah. Lereng vulkanik Jawa Timur terbukti sangat cocok, menghasilkan kebun-kebun cengkeh keluarga yang harum dan kaya minyak.",
          image: ASSETS.drying,
        },
        {
          year: "Hari ini",
          title: "Warisan yang terus dibawa",
          body: "Petani keluarga di Trenggalek, Pacitan, dan Semeru masih memetik setiap kuncup dengan tangan di puncak kematangannya dan menjemurnya di bawah matahari. Heritage Clover bekerja bersama mereka untuk membawa panen itu langsung ke meja Anda.",
          image: ASSETS.harvest,
        },
      ],
    },
    values: {
      mission:
        "Menghadirkan cengkeh Indonesia ke dapur Anda seperti cara petani Jawa Timur menyimpannya: dipetik dengan tangan, dijemur di bawah matahari, dan dikemas rapat selagi minyaknya masih tersimpan di dalam kuncup.",
      missionNote:
        "Kami brand Indonesia yang kecil. Kami membeli dari kebun cengkeh rakyat dan bekerja bersama keluarga-keluarga yang memetik, menjemur, dan menyortir hasil panennya.",
      values: [
        {
          title: "Berakar pada asal",
          body: "Kami mengambil dari kebun rakyat dan memberi tahu Anda asal setiap panen, karena asal-usul adalah bagian dari rasa.",
          icon: "Compass",
        },
        {
          title: "Dipetik tangan, dijemur matahari",
          body: "Kuncup dipetik selagi masih tertutup, lalu dijemur di atas tikar di bawah matahari selama beberapa hari, cara yang sama yang dipakai petani Jawa Timur turun-temurun.",
          icon: "Sun",
        },
        {
          title: "Adil bagi tangan yang menanam",
          body: "Kami bekerja langsung dengan petani dan keluarganya, membangun hubungan yang bertahan lebih lama dari satu musim.",
          icon: "HandHeart",
        },
        {
          title: "Kualitas yang bisa dicek",
          body: "Setiap batch disortir dengan tangan dan diperiksa kadar airnya sebelum dikemas. Batch yang belum cukup kering dijemur kembali.",
          icon: "ShieldCheck",
        },
      ],
    },
    farmers: {
      title: "Kenali orang-orang yang menjaga kebun",
      body: "Cengkeh kami berasal dari kebun keluarga di Jawa Timur, tempat pohon yang ditanam satu generasi dirawat dan dipanen oleh generasi berikutnya. Inilah sebagian petani yang bekerja bersama kami.",
      people: [
        {
          name: "Pak Rusdi Mahasari",
          role: "Petani cengkeh, Watulimo, Trenggalek",
          image: ASSETS.farmer1,
          quote: "Kakek saya yang menanam pohon-pohon ini di perbukitan Watulimo. Saat memanjatnya di musim panen, saya memetik hasil kerjanya sebanyak hasil kerja saya.",
        },
        {
          name: "Ibu Salma Kastela",
          role: "Pemetik cengkeh, Dampit, lereng Semeru",
          image: ASSETS.farmer2,
          quote: "Kami hanya memetik saat ujung kuncup mulai merona merah muda. Terlambat sehari, bunganya mekar dan harumnya ikut pergi.",
        },
        {
          name: "Pak Hasan Alting",
          role: "Penjemuran tradisional, Pacitan",
          image: ASSETS.farmer3,
          quote: "Mataharilah yang bekerja keras. Kami hanya membalik kuncup, membaca langit, dan menyortirnya dengan tangan sampai benar-benar pas.",
        },
      ],
    },
    stats: {
      title: "Kebun cengkeh kami dalam angka",
      stats: [
        { value: "120", suffix: "+", label: "Keluarga petani mitra" },
        { value: "350", suffix: "ha", label: "Kebun cengkeh rakyat" },
        { value: "40", suffix: "t", label: "Panen kering per musim" },
        { value: "400", suffix: "+", label: "Tahun tradisi rempah" },
      ],
      note: "Data kemitraan kebun rakyat Jawa Timur.",
    },
    cta: FINAL_CTA_ID(),
  },
};

// Shared ID copy for the closing CTA used on several pages.
export function FINAL_CTA_ID(): HclFinalCtaProps {
  return {
    title: "Hadirkan cengkeh berkualitas di meja Anda.",
    body: "Cengkeh utuh, cengkeh bubuk, dan minyak bunga cengkeh dari kebun rakyat di Jawa Timur. Dipetik dengan tangan, dijemur di bawah matahari, dan dikemas segar.",
    primaryLabel: "Lihat koleksi",
    secondaryLabel: "Hubungi kami",
  };
}
