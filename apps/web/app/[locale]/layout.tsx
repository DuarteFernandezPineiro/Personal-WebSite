import { getDictionary, profile, translate } from "@duarte/content";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChatDrawer } from "@/components/chat/chat-drawer";
import { DocumentLanguage } from "@/components/layout/document-language";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ConsentBanner } from "@/components/privacy/consent-banner";
import { locales, requireLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const description = translate(profile.intro, locale);
  return {
    title: locale === "es" ? "Ingeniero de Inteligencia Artificial" : "Artificial Intelligence Engineer",
    description,
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}`,
      languages: {
        es: `${siteConfig.siteUrl}/es`,
        en: `${siteConfig.siteUrl}/en`
      }
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_GB",
      title: `${profile.name} — ${translate(profile.role, locale)}`,
      description,
      url: `${siteConfig.siteUrl}/${locale}`,
      siteName: profile.name
    }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  return (
    <div className="site-page" lang={locale} data-theme="atlantic">
        <DocumentLanguage locale={locale} />
        <a className="skip-link" href="#main-content">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
        <SiteHeader locale={locale} dict={dict} />
        {children}
        <SiteFooter locale={locale} dict={dict} />
        <ConsentBanner locale={locale} />
        <div className="utility-dock" aria-label={locale === "es" ? "Controles de experiencia" : "Experience controls"}>
          <ChatDrawer locale={locale} copy={dict.chat} triggerLabel={dict.nav.ask} />
        </div>
    </div>
  );
}
