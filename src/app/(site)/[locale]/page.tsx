import { HOME } from "@/content/home";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclFinalCta from "@/sections/common/hcl-final-cta";
import HclMarquee from "@/sections/common/hcl-marquee";
import HclStats from "@/sections/common/hcl-stats";
import HclHeritageTeaser from "@/sections/home/hcl-heritage-teaser";
import HclHero from "@/sections/home/hcl-hero";
import HclInsightTeaser from "@/sections/home/hcl-insight-teaser";
import HclIntro from "@/sections/home/hcl-intro";
import HclOrigin from "@/sections/home/hcl-origin";
import HclQuality from "@/sections/home/hcl-quality";
import HclShowcase from "@/sections/home/hcl-showcase";
import HclSteps from "@/sections/home/hcl-steps";
import HclTestimonials from "@/sections/home/hcl-testimonials";
import HclUses from "@/sections/home/hcl-uses";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/", HOME[locale].meta, { absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = HOME[locale];

  return (
    <main>
      <HclHero {...c.hero} />
      <HclMarquee {...c.marquee} />
      <HclIntro {...c.intro} />
      <HclStats {...c.stats} />
      <HclHeritageTeaser {...c.heritage} />
      <HclShowcase {...c.showcase} />
      <HclOrigin {...c.origin} />
      <HclSteps {...c.steps} />
      <HclUses {...c.uses} />
      <HclQuality {...c.quality} />
      <HclTestimonials {...c.testimonials} />
      <HclInsightTeaser {...c.insight} />
      <HclFinalCta {...c.cta} />
    </main>
  );
}
