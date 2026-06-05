"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "../app/locale";

const LABELS: Record<Locale, string> = {
  en: "EN",
  ja: "日本語",
  zh: "中文",
};

// Swap the leading /<locale> segment of the current path, preserving the rest.
function pathFor(pathname: string, current: Locale, next: Locale): string {
  const rest = pathname.startsWith(`/${current}`)
    ? pathname.slice(`/${current}`.length)
    : pathname;
  return `/${next}${rest}` || `/${next}`;
}

export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && <span className="mx-1 text-faint">/</span>}
          <Link
            href={pathFor(pathname, current, locale)}
            // Persist the manual choice so the next visit to `/` honours it.
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
            }}
            aria-current={locale === current ? "true" : undefined}
            className={
              locale === current
                ? "text-accent"
                : "text-muted transition-colors hover:text-text"
            }
          >
            {LABELS[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
