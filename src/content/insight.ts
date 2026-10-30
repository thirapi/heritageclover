import type { Locale } from "@/lib/locales";
import { ASSETS } from "./assets";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // display string
  category: string;
  image: string;
  // Paragraphs separated by a blank line; a line starting with "## " is a heading.
  body: string;
}

const en: Article[] = [
  {
    slug: "cloves-and-the-spice-islands",
    title: "Cloves and the Spice Islands: a short history",
    excerpt: "How a tiny dried flower bud from Maluku drew fleets across the world.",
    date: "October 12, 2026",
    category: "Heritage",
    image: ASSETS.article1,
    body: `For centuries, cloves grew in only a handful of islands in North Maluku: Ternate, Tidore, Moti, Makian and Bacan. Traders carried them along the maritime silk road to China, India, the Middle East and Europe.

## Worth more than gold

By the sixteenth century a sack of cloves could make a merchant's fortune. Portuguese, Spanish and Dutch fleets fought for control of the islands, and the clove trade reshaped maps, empires and kitchens around the world.

## From monopoly to smallholders

Today cloves grow across Indonesia, largely on family-owned gardens. The trees still take years to mature, and the buds are still picked by hand before they bloom. That history lives on in every bud we dry and sort.`,
  },
  {
    slug: "five-ways-to-cook-with-cloves",
    title: "Five ways to cook with cloves",
    excerpt: "From rendang to mulled drinks: simple ways to bring warmth to your kitchen.",
    date: "September 28, 2026",
    category: "Recipes",
    image: ASSETS.article2,
    body: `Cloves are intense, so a little goes a long way. Start with two or three whole buds and adjust to taste.

## 1. Slow-cooked curries

Add whole cloves with cinnamon and star anise at the start of a rendang or gulai so the oils bloom in the fat.

## 2. Spiced rice

Drop a few cloves into the pot with pandan leaf for fragrant nasi kuning or biryani.

## 3. Warm drinks

Simmer cloves with ginger, cinnamon and palm sugar for wedang jahe, or with orange peel for mulled juice.

## 4. Baking

Ground cloves belong in gingerbread, spice cake and kue kering for the holidays.

## 5. Pickles and preserves

A couple of buds give depth to pickled vegetables, chutneys and fruit jams.`,
  },
  {
    slug: "how-to-store-cloves",
    title: "How to store cloves so they stay fragrant",
    excerpt: "Keep the essential oil in the bud: light, air and moisture are the enemies.",
    date: "September 10, 2026",
    category: "Guides",
    image: ASSETS.article3,
    body: `Good cloves feel slightly oily and smell sweet and strong. Their aroma comes from essential oil inside the bud, and it fades with light, air and moisture.

## Keep them whole

Whole cloves keep their aroma far longer than ground cloves. Grind only what you need.

## Use an airtight jar

Store cloves in a sealed glass jar, away from the stove and out of direct sunlight.

## Check the freshness

Press a bud with your fingernail. A fresh clove releases a little oil. If nothing happens, it is time for a new jar.`,
  },
];

const id: Article[] = [
  {
    slug: "cloves-and-the-spice-islands",
    title: "Cengkeh dan Kepulauan Rempah: sejarah singkat",
    excerpt: "Bagaimana kuncup bunga kering kecil dari Maluku menarik armada dari seluruh dunia.",
    date: "12 Oktober 2026",
    category: "Warisan",
    image: ASSETS.article1,
    body: `Selama berabad-abad, cengkeh hanya tumbuh di segelintir pulau di Maluku Utara: Ternate, Tidore, Moti, Makian, dan Bacan. Para pedagang membawanya melalui jalur sutra maritim ke Tiongkok, India, Timur Tengah, dan Eropa.

## Lebih berharga dari emas

Pada abad ke-16, sekarung cengkeh bisa membuat seorang pedagang kaya raya. Armada Portugis, Spanyol, dan Belanda berebut menguasai pulau-pulau ini, dan perdagangan cengkeh mengubah peta, kerajaan, serta dapur di seluruh dunia.

## Dari monopoli ke kebun rakyat

Kini cengkeh tumbuh di berbagai wilayah Indonesia, sebagian besar di kebun milik keluarga. Pohonnya tetap butuh bertahun-tahun untuk berbuah, dan kuncupnya tetap dipetik dengan tangan sebelum mekar. Sejarah itu hidup di setiap kuncup yang kami jemur dan sortir.`,
  },
  {
    slug: "five-ways-to-cook-with-cloves",
    title: "Lima cara memasak dengan cengkeh",
    excerpt: "Dari rendang hingga minuman hangat: cara sederhana menghadirkan kehangatan di dapur.",
    date: "28 September 2026",
    category: "Resep",
    image: ASSETS.article2,
    body: `Rasa cengkeh sangat kuat, jadi sedikit saja sudah cukup. Mulailah dengan dua atau tiga butir lalu sesuaikan.

## 1. Kari dan masakan bersantan

Masukkan cengkeh utuh bersama kayu manis dan bunga lawang di awal memasak rendang atau gulai agar minyak atsirinya keluar.

## 2. Nasi berbumbu

Tambahkan beberapa butir cengkeh dan daun pandan untuk nasi kuning atau nasi kebuli yang harum.

## 3. Minuman hangat

Rebus cengkeh dengan jahe, kayu manis, dan gula aren untuk wedang jahe, atau dengan kulit jeruk untuk minuman rempah.

## 4. Kue

Cengkeh bubuk cocok untuk kue jahe, bolu rempah, dan kue kering hari raya.

## 5. Acar dan selai

Beberapa butir cengkeh memberi kedalaman rasa pada acar, chutney, dan selai buah.`,
  },
  {
    slug: "how-to-store-cloves",
    title: "Cara menyimpan cengkeh agar tetap harum",
    excerpt: "Jaga minyak atsiri di dalam kuncup: cahaya, udara, dan lembap adalah musuhnya.",
    date: "10 September 2026",
    category: "Panduan",
    image: ASSETS.article3,
    body: `Cengkeh yang baik terasa sedikit berminyak dan beraroma manis serta kuat. Aromanya berasal dari minyak atsiri di dalam kuncup, yang memudar karena cahaya, udara, dan kelembapan.

## Simpan dalam bentuk utuh

Cengkeh utuh menyimpan aroma jauh lebih lama daripada cengkeh bubuk. Giling secukupnya saja.

## Gunakan toples kedap udara

Simpan cengkeh di toples kaca tertutup rapat, jauh dari kompor dan sinar matahari langsung.

## Cek kesegarannya

Tekan kuncup dengan kuku. Cengkeh yang segar akan mengeluarkan sedikit minyak. Jika tidak, saatnya mengganti stok.`,
  },
];

export const ARTICLES: Record<Locale, Article[]> = { en, id };

export const articleHref = (slug: string) => `/insight/${slug}`;
