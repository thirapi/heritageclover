import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locales";

// Standalone-only: paths without a locale segment go to /en/... .
// (In exantara-saas the platform proxy owns routing; nothing here is ported.)
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return;
  if (first === "dev" || first === "store") return;

  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and any file with an extension (public assets).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
