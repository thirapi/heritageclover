import { notFound } from "next/navigation";
import { INSIGHT_PAGE } from "@/content/insight-page";
import { ARTICLES } from "@/content/insight";
import { LOCALES, isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclArticle from "@/sections/insight/hcl-article";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ARTICLES[locale].map(({ slug }) => ({ locale, slug })));
}

const findArticle = (locale: string, slug: string) =>
  isLocale(locale) ? ARTICLES[locale].find((a) => a.slug === slug) : undefined;

export async function generateMetadata({ params }: PageProps<"/[locale]/insight/[slug]">) {
  const { locale, slug } = await params;
  const article = findArticle(locale, slug);
  if (!article || !isLocale(locale)) return {};
  return pageMetadata(
    locale,
    `/insight/${slug}`,
    { title: article.title, description: article.excerpt },
    { image: article.image },
  );
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/insight/[slug]">) {
  const { locale, slug } = await params;
  const article = findArticle(locale, slug);
  if (!article || !isLocale(locale)) notFound();

  return (
    <main>
      <HclArticle
        {...INSIGHT_PAGE[locale].article}
        category={article.category}
        title={article.title}
        date={article.date}
        image={article.image}
        imageAlt={article.title}
        body={article.body}
      />
    </main>
  );
}
