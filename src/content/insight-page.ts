import type { Locale } from "@/lib/locales";
import type { HclPageHeroProps } from "@/sections/common/hcl-page-hero";
import type { HclArticleProps } from "@/sections/insight/hcl-article";
import type { HclInsightGridProps } from "@/sections/insight/hcl-insight-grid";
import { ASSETS } from "./assets";
import { ARTICLES, articleHref } from "./insight";

type InsightPageContent = {
  meta: { title: string; description: string };
  hero: HclPageHeroProps;
  grid: HclInsightGridProps;
  // Shared labels only; per-article fields come from ARTICLES.
  article: HclArticleProps;
};

const gridArticles = (locale: Locale): NonNullable<HclInsightGridProps["articles"]> =>
  ARTICLES[locale].map((a) => ({
    title: a.title,
    excerpt: a.excerpt,
    image: a.image,
    href: articleHref(a.slug),
    date: a.date,
    category: a.category,
  }));

export const INSIGHT_PAGE: Record<Locale, InsightPageContent> = {
  en: {
    meta: {
      title: "Insight",
      description: "Stories, recipes and practical guides on cloves, from the heritage of the Spice Islands to your kitchen.",
    },
    hero: {
      eyebrow: "The journal",
      title: "Insight",
      subtitle: "Heritage, recipes and guides from the clove gardens of Maluku.",
      image: ASSETS.article1,
    },
    grid: { articles: gridArticles("en") },
    article: {},
  },
  id: {
    meta: {
      title: "Wawasan",
      description: "Kisah, resep, dan panduan praktis seputar cengkeh, dari warisan Kepulauan Rempah hingga dapur Anda.",
    },
    hero: {
      eyebrow: "Jurnal kami",
      title: "Wawasan",
      subtitle: "Warisan, resep, dan panduan dari kebun-kebun cengkeh Maluku.",
      image: ASSETS.article1,
    },
    grid: {
      title: "Catatan dari Kepulauan Rempah",
      intro:
        "Kisah, resep, dan panduan praktis tentang kuncup yang pernah mengubah dunia, ditulis dari meja sortir kami di Maluku.",
      filterLabel: "Saring artikel berdasarkan kategori",
      allLabel: "Semua",
      readMoreLabel: "Baca artikel",
      emptyText: "Belum ada artikel di sini. Kisah-kisah baru dari kebun cengkeh segera hadir.",
      articles: gridArticles("id"),
    },
    article: {
      backLabel: "Semua artikel",
    },
  },
};
