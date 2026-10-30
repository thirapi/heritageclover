import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LAYOUT } from "@/content/layout";
import { LocaleProvider } from "@/lib/locale";
import HclFooter from "@/sections/layout/hcl-footer";
import HclHeader from "@/sections/layout/hcl-header";
import { LOCALES, isLocale } from "@/lib/locales";
import "../../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: { default: "Heritage Clover", template: "%s · Heritage Clover" },
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale}>
          <HclHeader {...LAYOUT[locale].header} />
          {children}
          <HclFooter {...LAYOUT[locale].footer} />
        </LocaleProvider>
      </body>
    </html>
  );
}
