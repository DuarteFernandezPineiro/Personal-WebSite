import { translate } from "@duarte/content";
import { Arrow, Eyebrow, Tag } from "@duarte/ui";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CredentialGrid } from "@/components/sections/credential-grid";
import { ExperienceGrid } from "@/components/sections/experience-grid";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CvDownloadLink } from "@/components/ui/cv-download-link";
import { ProfessionalText } from "@/components/ui/professional-text";
import { Reveal } from "@/components/ui/reveal";
import { getPortfolioContent } from "@/lib/content-repository";
import { requireLocale } from "@/lib/i18n";
import { getApprovedTestimonials } from "@/lib/testimonials";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const { profile } = await getPortfolioContent();
  return { title: locale === "es" ? "Sobre mí" : "About me", description: translate(profile.intro, locale) };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const [{ about, timeline, credentials, capabilities, hobbies }, testimonials] = await Promise.all([
    getPortfolioContent(),
    getApprovedTestimonials()
  ]);
  const isEs = locale === "es";

  return (
    <main id="main-content" className="about-page editorial-page">
      <header className="page-hero about-hero">
        <Eyebrow>{isEs ? "Sobre mí" : "About me"}</Eyebrow>
        <h1>{isEs ? "Soy Duarte Fernández Piñeiro." : "I’m Duarte Fernández Piñeiro."}</h1>
        <p><ProfessionalText text={translate(about.lead, locale)} locale={locale} phrases={isEs ? ["sociable", "positivo", "resolutivo"] : ["sociable", "positive", "practical"]} /></p>
        <div className="about-hero-meta" aria-label={isEs ? "Resumen profesional" : "Professional summary"}>
          <span>{isEs ? "Graduado en Inteligencia Artificial" : "Artificial Intelligence graduate"}</span>
          <span>{isEs ? "ESEI · Universidade de Vigo" : "ESEI · University of Vigo"}</span>
          <span>Santiago de Compostela</span>
        </div>
      </header>

      <section className="about-identity" aria-labelledby="identity-title">
        <Reveal className="about-portrait-reveal">
          <figure className="profile-portrait">
            <Image src="/images/profile/duarte-professional.png" alt={isEs ? "Retrato profesional de Duarte Fernández Piñeiro" : "Professional portrait of Duarte Fernández Piñeiro"} fill sizes="(max-width: 760px) 100vw, 42vw" loading="eager" className="profile-portrait-image" />
            <figcaption><span>Duarte Fernández Piñeiro</span><span>{isEs ? "Ingeniero de IA" : "AI Engineer"}</span></figcaption>
          </figure>
        </Reveal>
        <div className="about-story">
          <Eyebrow>{isEs ? "Mi recorrido" : "My background"}</Eyebrow>
          <h2 id="identity-title">{isEs ? "Por qué elegí Inteligencia Artificial." : "Why I chose Artificial Intelligence."}</h2>
          {about.story.map((paragraph) => <p key={paragraph.es}><ProfessionalText text={translate(paragraph, locale)} locale={locale} /></p>)}
          <div className="about-story-actions"><CvDownloadLink className="text-link hero-project-link hero-cv-link" locale={locale}>{isEs ? "Ver CV" : "View résumé"}<span aria-hidden="true"><Arrow /></span></CvDownloadLink></div>
        </div>
      </section>

      <section className="about-strengths" aria-labelledby="strengths-title">
        <div className="section-heading"><Eyebrow>{isEs ? "Cómo trabajo" : "How I work"}</Eyebrow><h2 id="strengths-title">{isEs ? "Tres aspectos importantes de mi forma de trabajar." : "Three important aspects of how I work."}</h2></div>
        <p className="about-method"><ProfessionalText text={translate(about.proposition, locale)} locale={locale} phrases={isEs ? ["entender el problema", "datos disponibles", "comprobará el resultado"] : ["understand the problem", "available data", "result will be checked"]} /></p>
        <div className="strength-grid">
          {about.strengths.map((strength) => <Reveal className="strength-reveal" key={strength.index}><article className="strength-card"><span>{strength.index}</span><h3>{translate(strength.title, locale)}</h3><p><ProfessionalText text={translate(strength.description, locale)} locale={locale} /></p></article></Reveal>)}
        </div>
      </section>

      <section className="athletics-story" aria-labelledby="athletics-title">
        <div className="athletics-image-wrap">
          <Image src="/images/profile/duarte-athletics-sharp.png" alt={isEs ? "Duarte compitiendo en una prueba de atletismo" : "Duarte competing in an athletics race"} fill sizes="(max-width: 1000px) 100vw, 58vw" quality={100} className="athletics-image" />
        </div>
        <div className="athletics-copy"><Eyebrow>{isEs ? "Fuera del trabajo" : "Outside work"}</Eyebrow><h2 id="athletics-title">{isEs ? "El deporte forma parte de mi rutina." : "Sport is part of my routine."}</h2><p><ProfessionalText text={translate(about.sport, locale)} locale={locale} /></p></div>
      </section>

      <section className="about-timeline">
        <div className="section-heading"><Eyebrow>{isEs ? "Formación laboral y experiencia" : "Professional education and experience"}</Eyebrow><h2>{isEs ? "Dónde me he formado y trabajado." : "Where I have studied and worked."}</h2></div>
        <ExperienceGrid entries={timeline} locale={locale} />
      </section>

      <section className="about-credentials" aria-labelledby="credentials-title">
        <div className="section-heading split-heading">
          <div><Eyebrow>{isEs ? "Títulos y certificaciones" : "Degrees and certifications"}</Eyebrow><h2 id="credentials-title">{isEs ? "Formación acreditada." : "Accredited education."}</h2></div>
          <p><ProfessionalText text={isEs ? "Credenciales que complementan mi trayectoria académica y técnica." : "Credentials that complement my academic and technical background."} locale={locale} phrases={isEs ? ["trayectoria académica y técnica"] : ["academic and technical background"]} /></p>
        </div>
        <CredentialGrid credentials={credentials} locale={locale} />
      </section>

      <section className="about-skills">
        <div className="section-heading split-heading"><div><Eyebrow>{isEs ? "Conocimientos" : "Knowledge"}</Eyebrow><h2>{isEs ? "Tecnologías y técnicas con las que he trabajado." : "Technologies and techniques I have worked with."}</h2></div><p><ProfessionalText text={isEs ? "Estos conocimientos proceden del grado, las prácticas y los proyectos que puedes consultar en esta web." : "This knowledge comes from my degree, internship and the projects available on this website."} locale={locale} phrases={isEs ? ["grado", "prácticas", "proyectos"] : ["degree", "internship", "projects"]} /></p></div>
        <div className="about-skill-groups">
          {capabilities.map((capability) => <article key={capability.id}><h3>{translate(capability.title, locale)}</h3><p><ProfessionalText text={translate(capability.description, locale)} locale={locale} /></p><div className="tag-list">{(locale === "en" ? capability.toolsEn ?? capability.tools : capability.tools).map((tool) => <Tag key={tool}>{tool}</Tag>)}</div></article>)}
        </div>
      </section>

      <section className="about-hobbies">
        <Image className="about-hobbies-background" src="/images/profile/duarte-sunset.jpeg" alt="" fill sizes="100vw" quality={92} />
        <div className="about-hobbies-shade" aria-hidden="true" />
        <div className="about-hobbies-content">
          <div className="section-heading"><Eyebrow>{isEs ? "Intereses personales" : "Personal interests"}</Eyebrow><h2>{isEs ? "También fuera de la tecnología." : "Beyond technology too."}</h2></div>
          <div className="hobby-grid">{hobbies.map((hobby, index) => <article key={hobby.title.es}><span>{String(index + 1).padStart(2, "0")}</span><h3>{translate(hobby.title, locale)}</h3><p><ProfessionalText text={translate(hobby.description, locale)} locale={locale} /></p></article>)}</div>
        </div>
      </section>

      <section className="about-testimonials testimonials-section">
        <TestimonialsSection locale={locale} testimonials={testimonials} />
      </section>

      <section className="about-closing"><Eyebrow>{isEs ? "Contacto" : "Contact"}</Eyebrow><h2>{isEs ? "Si quieres conocer mejor mi trabajo, podemos hablar." : "If you would like to know more about my work, let’s talk."}</h2><div className="about-closing-actions"><Link href={`/${locale}/contact`} prefetch={false}>{isEs ? "Contactar" : "Contact me"}<Arrow /></Link><CvDownloadLink locale={locale}>{isEs ? "Ver CV" : "View résumé"}<Arrow /></CvDownloadLink></div></section>
    </main>
  );
}
