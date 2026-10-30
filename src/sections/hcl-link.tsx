"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLocale } from "@/lib/locale";
import { LOCALES, isLocale, type Locale } from "@/lib/locales";

// Standalone-only glue: the ONE place that differs after porting to exantara-saas,
// where HclLink becomes a plain <a href={href}> (the platform handles locales).

// Internal hrefs get the active locale prefix, except /store (served by the
// exantara store v1, no locale segment). External, mailto/tel and #anchor
// hrefs pass through untouched.
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/store" || href.startsWith("/store/") || href.startsWith("/store?")) return href;
  const first = href.split(/[/?#]/)[1];
  if (isLocale(first)) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

type HclLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export function HclLink({ href, children, ...rest }: HclLinkProps) {
  const locale = useLocale();
  const target = localizeHref(href || "#", locale);
  const external = /^(https?:|mailto:|tel:)/.test(target);
  if (external || target.startsWith("#")) {
    return (
      <a href={target} {...(external && target.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={target} {...rest}>
      {children}
    </Link>
  );
}

// Language switcher hrefs: same page, other locale segment.
export function useHclLocaleLinks(): { locale: Locale; href: string; active: boolean }[] {
  const current = useLocale();
  const pathname = usePathname() || "/";
  const segments = pathname.split("/");
  const rest = isLocale(segments[1]) ? segments.slice(2).join("/") : segments.slice(1).join("/");
  return LOCALES.map((locale) => ({
    locale,
    href: `/${locale}${rest ? `/${rest}` : ""}`,
    active: locale === current,
  }));
}
