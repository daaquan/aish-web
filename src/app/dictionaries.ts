import "server-only";

import type { Locale } from "./locale";

// A subhead is a sequence of text runs; `code` runs render in the mono font.
// Keeping it as an array lets each locale order the inline code spans freely.
export type Run = { text: string; code?: boolean };

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { license: string };
  hero: {
    badge: string;
    titlePre: string;
    titleAccent: string;
    titleSuffix: string;
    subhead: Run[];
    installCaption: string;
    starButton: string;
    specsButton: string;
  };
  install: { copy: string; copied: string; ariaCopy: string };
  features: { heading: string; items: { title: string; body: string }[] };
  footer: {
    license: string;
    github: string;
    releases: string;
    changelog: string;
    contributing: string;
    specs: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default as Dictionary),
  ja: () => import("./dictionaries/ja.json").then((m) => m.default as Dictionary),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default as Dictionary),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
