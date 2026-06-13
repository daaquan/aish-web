import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { getDictionary } from "../dictionaries";
import { hasLocale, locales } from "../locale";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const SITE_URL = "https://openaish.com";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const { title, description } = dict.meta;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: ["aish", "AI copilot", "command line", "CLI", "terminal", "git", "open source", "MIT"],
    authors: [{ name: "daaquan" }],
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${lang}`,
      title,
      description,
      siteName: "aish",
      locale: lang,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
