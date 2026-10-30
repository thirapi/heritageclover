import { notFound } from "next/navigation";
import { PROCESS } from "@/content/process";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclProcessDetail from "@/sections/about/hcl-process-detail";
import HclFinalCta from "@/sections/common/hcl-final-cta";
import HclPageHero from "@/sections/common/hcl-page-hero";
import HclQuality from "@/sections/home/hcl-quality";

export async function generateMetadata({ params }: PageProps<"/[locale]/process">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/process", PROCESS[locale].meta);
}

export default async function ProcessPage({ params }: PageProps<"/[locale]/process">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = PROCESS[locale];

  return (
    <main>
      <HclPageHero {...c.hero} />
      <HclProcessDetail {...c.detail} />
      <HclQuality {...c.quality} />
      <HclFinalCta {...c.cta} />
    </main>
  );
}
