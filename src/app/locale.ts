// Locale config + Accept-Language matching. Pure module (no server-only
// imports) so it can be used from both proxy.ts and Server Components.

export const locales = ["en", "ja", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Parse an `Accept-Language` header and return the best supported locale.
 * Honours `q` weights, matches on the primary subtag (so `zh-CN` → `zh`),
 * and falls back to {@link defaultLocale} when nothing matches.
 */
export function parseAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
      return {
        tag: tag.trim().toLowerCase(),
        quality: Number.isNaN(quality) ? 0 : quality,
      };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (hasLocale(base)) return base;
  }

  return defaultLocale;
}
