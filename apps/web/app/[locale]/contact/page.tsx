import { getDictionary, profile } from "@duarte/content";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/sections/contact-form";
import { ProfessionalText } from "@/components/ui/professional-text";
import { requireLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return { title: locale === "es" ? "Contacto" : "Contact" };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  return (
    <main id="main-content" className="contact-page editorial-page">
      <section className="page-hero contact-hero">
        <p className="eyebrow">{dict.contact.eyebrow}</p>
        <h1>{locale === "es" ? <>La próxima conversación<br /><em>puede empezar aquí.</em></> : <>The next conversation<br /><em>can start here.</em></>}</h1>
        <p className="page-lead"><ProfessionalText text={dict.contact.lead} locale={locale} phrases={locale === "es" ? ["conocernos", "proyecto", "oportunidad profesional"] : ["get to know each other", "project", "professional opportunity"]} /></p>
      </section>
      <section className="contact-layout">
        <aside className="contact-aside">
          <p className="micro-label">{locale === "es" ? "Contacto directo" : "Direct contact"}</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <p><ProfessionalText text={locale === "es" ? "Santiago de Compostela · Disponible para remoto, híbrido y presencial." : "Santiago de Compostela · Available for remote, hybrid and on-site work."} locale={locale} phrases={locale === "es" ? ["Disponible para remoto, híbrido y presencial"] : ["Available for remote, hybrid and on-site work"]} /></p>
          <Link href={`/${locale}/privacy`} prefetch={false}>{locale === "es" ? "Privacidad y datos" : "Privacy & data"}</Link>
        </aside>
        <ContactForm locale={locale} copy={dict.contact} />
      </section>
    </main>
  );
}
