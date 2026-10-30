import type { Metadata } from "next";
import { ASSETS } from "@/content/assets";
import { LOCALES, type Locale } from "./locales";

// Per-page metadata with hreflang alternates. `path` has no locale ("/our-story").
export function pageMetadata(
  locale: Locale,
  path: string,
  meta: { title: string; description: string },
  opts: { absoluteTitle?: boolean; image?: string } = {},
): Metadata {
  const suffix = path === "/" ? "" : path;
  return {
    title: opts.absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}${suffix}`])),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [opts.image ?? ASSETS.og],
    },
  };
}
