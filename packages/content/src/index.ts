export * from "./types";
export * from "./content";
export * from "./dictionary";

import { locales, type Locale, type LocalizedText } from "./types";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function translate(value: LocalizedText, locale: Locale): string {
  return value[locale] || value.es;
}

