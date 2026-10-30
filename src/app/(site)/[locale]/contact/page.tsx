import { notFound } from "next/navigation";
import { CONTACT } from "@/content/contact";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import HclPageHero from "@/sections/common/hcl-page-hero";
import HclContact from "@/sections/support/hcl-contact";
import HclFaq from "@/sections/support/hcl-faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/contact", CONTACT[locale].meta);
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = CONTACT[locale];

  return (
    <main>
      <HclPageHero {...c.hero} />
      <HclContact {...c.contact} />
      <HclFaq {...c.faq} />
    </main>
  );
}
