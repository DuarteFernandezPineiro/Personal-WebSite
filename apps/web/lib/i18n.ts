import { isLocale, locales, type Locale } from "@duarte/content";
import { notFound } from "next/navigation";

export { locales, type Locale };

export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

