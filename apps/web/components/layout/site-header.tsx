"use client";

import type { Locale, getDictionary } from "@duarte/content";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { requestLocaleTransition } from "@/components/ui/route-depth-transition";
import { alternateLocale } from "@/lib/i18n";

type Dictionary = ReturnType<typeof getDictionary>;

export type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const otherLocale = alternateLocale(locale);
  const translatedPath = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${otherLocale}`);
  const links = [
    { href: `/${locale}/projects`, label: dict.nav.work },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact }
  ];

  return (
    <header className="site-header">
      <Link className="brand-mark" href={`/${locale}`} prefetch={false} aria-label="Duarte Fernández Piñeiro — Home">
        <span aria-hidden="true">D</span>
        <span aria-hidden="true">F</span>
        <span className="brand-full">Duarte Fernández Piñeiro</span>
      </Link>
      <nav className="desktop-nav" aria-label={locale === "es" ? "Navegación principal" : "Primary navigation"}>
        {links.map((item) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return <Link key={item.href} href={item.href} prefetch={false} aria-current={current ? "page" : undefined}>{item.label}</Link>;
        })}
      </nav>
      <div className="header-actions">
        <Link
          className="locale-link"
          data-locale-transition="true"
          href={translatedPath}
          hrefLang={otherLocale}
          lang={otherLocale}
          prefetch={false}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
            const href = `${translatedPath}${window.location.search}${window.location.hash}`;
            if (requestLocaleTransition({ href, locale: otherLocale, preserveScroll: true, label: otherLocale.toUpperCase() })) event.preventDefault();
          }}
        >
          {otherLocale.toUpperCase()}
        </Link>
      </div>
    </header>
  );
}
