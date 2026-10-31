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
      description: "History, recipes and practical guides on cloves, from the gardens of East Java to your kitchen.",
    },
    hero: {
      eyebrow: "The journal",
      title: "Insight",
      subtitle: "History, recipes and storage guides from the clove gardens of East Java.",
      image: ASSETS.article1,
    },
    grid: { articles: gridArticles("en") },
    article: {},
  },
  id: {
    meta: {
      title: "Wawasan",
      description: "Sejarah, resep, dan panduan praktis seputar cengkeh, dari kebun-kebun Jawa Timur hingga dapur Anda.",
    },
    hero: {
      eyebrow: "Jurnal kami",
      title: "Wawasan",
      subtitle: "Sejarah, resep, dan panduan penyimpanan dari kebun-kebun cengkeh Jawa Timur.",
      image: ASSETS.article1,
    },
    grid: {
      title: "Catatan dari Kebun Jawa Timur",
      intro:
        "Sejarah, resep, dan panduan penyimpanan cengkeh, ditulis oleh tim yang menyortir dan mengemas hasil panen kami di Jawa Timur.",
      filterLabel: "Saring artikel berdasarkan kategori",
      allLabel: "Semua",
      readMoreLabel: "Baca artikel",
      emptyText: "Belum ada artikel dalam kategori ini.",
      articles: gridArticles("id"),
    },
    article: {
      backLabel: "Semua artikel",
    },
  },
};
