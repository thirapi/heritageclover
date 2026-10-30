// Server-safe locale constants (no "use client"), shared by proxy, layouts and pages.
export const LOCALES = ["en", "id"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (value: string | undefined): value is Locale =>
  LOCALES.includes(value as Locale);

// Pick the page content for a locale: `{ en, id }` objects live in src/content/<page>.ts.
export const pick = <T,>(locale: Locale, content: Record<Locale, T>): T => content[locale];
