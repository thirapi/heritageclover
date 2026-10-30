import { notFound } from "next/navigation";
import { INSIGHT_PAGE } from "@/content/insight-page";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclPageHero from "@/sections/common/hcl-page-hero";
import HclInsightGrid from "@/sections/insight/hcl-insight-grid";

export async function generateMetadata({ params }: PageProps<"/[locale]/insight">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/insight", INSIGHT_PAGE[locale].meta);
}

export default async function InsightPage({ params }: PageProps<"/[locale]/insight">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = INSIGHT_PAGE[locale];

  return (
    <main>
      <HclPageHero {...c.hero} />
      <HclInsightGrid {...c.grid} />
    </main>
  );
}
