import { notFound } from "next/navigation";
import { FAQ_PAGE } from "@/content/faq";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclFinalCta from "@/sections/common/hcl-final-cta";
import HclPageHero from "@/sections/common/hcl-page-hero";
import HclFaq from "@/sections/support/hcl-faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/faq", FAQ_PAGE[locale].meta);
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = FAQ_PAGE[locale];

  return (
    <main>
      <HclPageHero {...c.hero} />
      <HclFaq {...c.faq} />
      <HclFinalCta {...c.cta} />
    </main>
  );
}
