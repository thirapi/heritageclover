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
      subtitle: "Dari Kepulauan Rempah Maluku ke dapur Anda, satu kuncup petik tangan dalam satu waktu.",
    },
    timeline: {
      title: "Rempah yang mengubah dunia",
      intro:
        "Jauh sebelum sampai di dapur Anda, cengkeh telah mengarungi jalur rempah, memahkotai kesultanan, dan mengirim kerajaan-kerajaan menyeberangi samudra. Berikut lima masa yang menentukan sejarahnya.",
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
        "Mengembalikan cengkeh ke tempat semestinya: ditanam dengan jujur, dirawat dengan cermat, dan seharum saat meninggalkan Kepulauan Rempah.",
      missionNote:
        "Kami brand Indonesia yang kecil dengan ingatan yang panjang. Semua yang kami lakukan berawal dari para petani yang menjaga warisan ini tetap hidup.",
      values: [
        {
          title: "Berakar pada asal",
          body: "Kami mengambil dari kebun rakyat dan memberi tahu Anda asal setiap panen, karena asal-usul adalah bagian dari rasa.",
          icon: "Compass",
        },
        {
          title: "Sabar, bukan jalan pintas",
          body: "Dipetik dengan tangan saat masih kuncup dan dijemur perlahan di bawah matahari. Tradisi yang menentukan tempo, bukan jam.",
          icon: "Sun",
        },
        {
          title: "Adil bagi tangan yang menanam",
          body: "Kami bekerja langsung dengan petani dan keluarganya, membangun hubungan yang bertahan lebih lama dari satu musim.",
          icon: "HandHeart",
        },
        {
          title: "Kualitas yang bisa dicek",
          body: "Setiap batch disortir, diperiksa, dan dikemas dengan cermat. Jika belum layak untuk dapur kami sendiri, tidak akan kami kirim.",
          icon: "ShieldCheck",
        },
      ],
    },
    farmers: {
      title: "Kenali orang-orang yang menjaga kebun",
      body: "Cengkeh kami berasal dari kebun keluarga, tempat keahlian diwariskan dari orang tua ke anak. Mereka mengenal setiap pohon dan setiap musim dari aromanya. Inilah sebagian petani yang bekerja bersama kami.",
      people: [
        {
          name: "Nama petani",
          role: "Petani cengkeh, Ternate",
          image: ASSETS.farmer1,
          quote: "Kakek saya yang menanam pohon-pohon ini. Saat memanjatnya di musim panen, saya memetik hasil kerjanya sebanyak hasil kerja saya.",
        },
        {
          name: "Nama petani",
          role: "Petani cengkeh, Tidore",
          image: ASSETS.farmer2,
          quote: "Kami hanya memetik saat ujung kuncup mulai merona merah muda. Terlambat sehari, bunganya mekar dan harumnya ikut pergi.",
        },
        {
          name: "Nama petani",
          role: "Penjemuran dan sortir, Ambon",
          image: ASSETS.farmer3,
          quote: "Mataharilah yang bekerja keras. Kami hanya membalik kuncup, membaca langit, dan menyortirnya dengan tangan sampai benar-benar pas.",
        },
      ],
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
    cta: FINAL_CTA_ID(),
  },
};

// Shared ID copy for the closing CTA used on several pages.
export function FINAL_CTA_ID(): HclFinalCtaProps {
  return {
    title: "Hadirkan Kepulauan Rempah di meja Anda.",
    body: "Cengkeh utuh, bubuk halus, dan minyak bunga cengkeh murni, dipetik dengan tangan oleh petani rakyat di Maluku dan dijemur seperti yang dilakukan turun-temurun.",
    primaryLabel: "Lihat koleksi",
    secondaryLabel: "Hubungi kami",
  };
}
