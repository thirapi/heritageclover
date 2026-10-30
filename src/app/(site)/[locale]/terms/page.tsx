import { notFound } from "next/navigation";
import { LEGAL } from "@/content/legal";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclPageHero from "@/sections/common/hcl-page-hero";
import HclRichText from "@/sections/common/hcl-rich-text";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/terms", LEGAL[locale].terms.meta);
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = LEGAL[locale].terms;

  return (
    <main>
      <HclPageHero {...c.hero} />
      <HclRichText {...c.body} />
    </main>
  );
}
