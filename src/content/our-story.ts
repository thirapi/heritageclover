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
      description: "Five centuries of clove history, from the Spice Islands of Maluku to the growers we work with today.",
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
      description: "Lima abad sejarah cengkeh, dari Kepulauan Rempah Maluku hingga para petani yang bekerja bersama kami hari ini.",
    },
    hero: {
      title: "Kisah Kami",
      subtitle: "Tempat cengkeh kami tumbuh, siapa yang memetiknya, dan bagaimana cengkeh itu sampai ke dapur Anda.",
    },
    timeline: {
      title: "Rempah yang mengubah dunia",
      intro:
        "Hampir sepanjang sejarah yang tercatat, cengkeh hanya tumbuh di beberapa pulau di Maluku Utara. Pedagang Arab dan Asia, kesultanan setempat, dan kongsi dagang Eropa memperebutkannya selama berabad-abad. Inilah titik-titik baliknya.",
      events: [
        {
          year: "Sebelum 1500",
          title: "Lahir di Kepulauan Rempah",
          body: "Cengkeh tumbuh liar di lereng vulkanik Ternate, Tidore, dan pulau-pulau tetangganya di Maluku Utara. Selama berabad-abad, pedagang Asia dan Arab membawa kuncup keringnya ke barat, mata rantai demi mata rantai di sepanjang jalur rempah maritim.",
          image: ASSETS.origin,
        },
        {
          year: "Awal 1500-an",
          title: "Eropa berlayar ke Maluku",
          body: "Kapal-kapal Portugis tiba di Ternate, disusul Spanyol ke Tidore. Dua mahkota itu berlomba melintasi dunia demi satu hadiah: kuncup cokelat kecil yang, berat demi berat, lebih berharga dari hampir semua muatan lainnya.",
          image: ASSETS.heritageMap,
        },
        {
          year: "1600-an",
          title: "Masa monopoli",
          body: "Kongsi Dagang Hindia Belanda (VOC) merebut kendali perdagangan, membatasi penanaman di segelintir pulau sekitar Ambon dan menjaga ketat setiap pohon agar harga tetap tinggi.",
          image: ASSETS.intro,
        },
        {
          year: "Akhir 1700-an",
          title: "Monopoli runtuh",
          body: "Bibit-bibit lolos dari penjagaan dan tumbuh di luar Maluku. Dalam satu generasi, cengkeh menjadi milik dunia, dan di Indonesia menyebar ke kebun-kebun rakyat dari pulau ke pulau.",
          image: ASSETS.drying,
        },
        {
          year: "Hari ini",
          title: "Warisan yang terus dibawa",
          body: "Petani keluarga masih memetik setiap kuncup dengan tangan di puncak kematangannya dan menjemurnya di bawah matahari khatulistiwa. Heritage Clover bekerja bersama mereka untuk membawa warisan itu ke meja Anda, dengan perawatan modern.",
          image: ASSETS.harvest,
        },
      ],
    },
    values: {
      mission:
        "Menghadirkan cengkeh Indonesia ke dapur Anda seperti cara petani Maluku menyimpannya: dipetik dengan tangan, dijemur di bawah matahari, dan dikemas rapat selagi minyaknya masih tersimpan di dalam kuncup.",
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
          body: "Kuncup dipetik selagi masih tertutup, lalu dijemur di atas tikar di bawah matahari selama beberapa hari, cara yang sama yang dipakai petani Maluku turun-temurun.",
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
      body: "Cengkeh kami berasal dari kebun keluarga di Maluku, tempat pohon yang ditanam satu generasi sering kali dipanen oleh generasi berikutnya. Inilah sebagian petani yang bekerja bersama kami.",
      people: [
        {
          name: "Pak Rusdi Mahasari",
          role: "Petani cengkeh, Ternate",
          image: ASSETS.farmer1,
          quote: "Kakek saya yang menanam pohon-pohon ini. Saat memanjatnya di musim panen, saya memetik hasil kerjanya sebanyak hasil kerja saya.",
        },
        {
          name: "Ibu Salma Kastela",
          role: "Petani cengkeh, Tidore",
          image: ASSETS.farmer2,
          quote: "Kami hanya memetik saat ujung kuncup mulai merona merah muda. Terlambat sehari, bunganya mekar dan harumnya ikut pergi.",
        },
        {
          name: "Pak Hasan Alting",
          role: "Penjemuran dan sortir, Ambon",
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
      note: "Data kemitraan kebun rakyat Maluku Utara.",
    },
    cta: FINAL_CTA_ID(),
  },
};

// Shared ID copy for the closing CTA used on several pages.
export function FINAL_CTA_ID(): HclFinalCtaProps {
  return {
    title: "Hadirkan Kepulauan Rempah di meja Anda.",
    body: "Cengkeh utuh, cengkeh bubuk, dan minyak bunga cengkeh dari kebun rakyat di Maluku. Dipetik dengan tangan, dijemur di bawah matahari, dan dikemas segar.",
    primaryLabel: "Lihat koleksi",
    secondaryLabel: "Hubungi kami",
  };
}
