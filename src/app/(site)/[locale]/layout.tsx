import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/lib/locale";
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
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
