import { notFound } from "next/navigation";
import { OUR_STORY } from "@/content/our-story";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclFarmers from "@/sections/about/hcl-farmers";
import HclTimeline from "@/sections/about/hcl-timeline";
import HclValues from "@/sections/about/hcl-values";
import HclFinalCta from "@/sections/common/hcl-final-cta";
import HclPageHero from "@/sections/common/hcl-page-hero";
import HclStats from "@/sections/common/hcl-stats";

export async function generateMetadata({ params }: PageProps<"/[locale]/our-story">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/our-story", OUR_STORY[locale].meta);
}

export default async function OurStoryPage({ params }: PageProps<"/[locale]/our-story">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = OUR_STORY[locale];

  return (
    <main>
      <HclPageHero {...c.hero} />
      <HclTimeline {...c.timeline} />
      <HclValues {...c.values} />
      <HclFarmers {...c.farmers} />
      <HclStats {...c.stats} />
      <HclFinalCta {...c.cta} />
    </main>
  );
}
