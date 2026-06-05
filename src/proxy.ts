import { NextResponse, type NextRequest } from "next/server";

import {
  hasLocale,
  locales,
  parseAcceptLanguage,
} from "./app/locale";

const LOCALE_COOKIE = "NEXT_LOCALE";

// Redirect locale-less paths to a locale-prefixed URL. A manual choice (stored
// in the NEXT_LOCALE cookie by the language switcher) wins over the browser's
// Accept-Language header.
export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  const alreadyLocalized = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (alreadyLocalized) return undefined;

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookie && hasLocale(cookie)
      ? cookie
      : parseAcceptLanguage(request.headers.get("accept-language"));

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except Next internals and files with an extension
  // (install.sh, *.svg, favicon.ico, …).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
