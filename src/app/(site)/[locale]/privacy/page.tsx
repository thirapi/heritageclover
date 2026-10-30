import { notFound } from "next/navigation";
import { LEGAL } from "@/content/legal";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclPageHero from "@/sections/common/hcl-page-hero";
import HclRichText from "@/sections/common/hcl-rich-text";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/privacy", LEGAL[locale].privacy.meta);
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = LEGAL[locale].privacy;

  return (
    <main>
      <HclPageHero {...c.hero} />
      <HclRichText {...c.body} />
    </main>
  );
}
