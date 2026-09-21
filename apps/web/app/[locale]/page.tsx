import { getDictionary, translate } from "@duarte/content";
import { Arrow, Eyebrow, SectionShell } from "@duarte/ui";
import Image from "next/image";
import Link from "next/link";
import { CapabilityCarousel } from "@/components/sections/capability-carousel";
import { CredentialGrid } from "@/components/sections/credential-grid";
import { ExperienceGrid } from "@/components/sections/experience-grid";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CvDownloadLink } from "@/components/ui/cv-download-link";
import { OpenChatButton } from "@/components/ui/open-chat-button";
import { ProfessionalText } from "@/components/ui/professional-text";
import { Reveal } from "@/components/ui/reveal";
import { getPortfolioContent } from "@/lib/content-repository";
import { requireLocale } from "@/lib/i18n";
import { getApprovedTestimonials } from "@/lib/testimonials";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const [{ profile, about, projects, timeline, credentials, capabilities, hobbies }, testimonials] = await Promise.all([
    getPortfolioContent(),
    getApprovedTestimonials()
  ]);
  const isEs = locale === "es";

  return (
    <main id="main-content" className="home-page">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-overline"><strong className="hero-role">{translate(profile.role, locale)}</strong><span>{translate(profile.location, locale)}</span></div>
            <h1><span>{isEs ? "Soy Duarte" : "I’m Duarte"}</span><em>Fernández Piñeiro.</em></h1>
            <p>
              <ProfessionalText text={translate(profile.hero, locale)} locale={locale} />
            </p>
            <div className="hero-actions">
              <Link className="primary-link" href={`/${locale}/about`} prefetch={false}>{isEs ? "Conocerme" : "About me"}<Arrow /></Link>
              <CvDownloadLink className="text-link hero-project-link hero-cv-link" locale={locale}>{isEs ? "Ver CV" : "View résumé"}<span aria-hidden="true"><Arrow /></span></CvDownloadLink>
              <Link className="text-link hero-project-link" href={`/${locale}/projects`} prefetch={false}>{dict.hero.ctaWork}<span aria-hidden="true"><Arrow /></span></Link>
            </div>
          </div>
        </div>
        <div className="hero-foot"><span className="availability-dot" />{translate(profile.availability, locale)}<span>{dict.hero.scroll} ↓</span></div>
      </section>

      <SectionShell className="home-introduction" tone="paper">
        <div className="home-introduction-grid">
          <Reveal><div><Eyebrow>{isEs ? "Sobre mí" : "About me"}</Eyebrow><h2>{isEs ? "Inteligencia Artificial, curiosidad y trabajo en equipo." : "Artificial Intelligence, curiosity and teamwork."}</h2></div></Reveal>
          <Reveal delay={0.08}><div className="home-introduction-copy"><p><ProfessionalText text={translate(profile.intro, locale)} locale={locale} /></p><p><ProfessionalText text={translate(about.story[2], locale)} locale={locale} /></p><Link href={`/${locale}/about`} prefetch={false}>{isEs ? "Leer más sobre mí" : "Read more about me"}<Arrow /></Link></div></Reveal>
        </div>
      </SectionShell>

      <SectionShell className="projects-section" tone="paper">
        <div className="section-heading split-heading">
          <Reveal><Eyebrow>{isEs ? "Proyectos principales / 04" : "Main projects / 04"}</Eyebrow><h2>{isEs ? "Cuatro proyectos para entender cómo trabajo." : "Four projects that show how I work."}</h2></Reveal>
          <Reveal delay={0.1}><p><ProfessionalText text={isEs ? "Cada caso explica el problema, la solución, las tecnologías utilizadas, cómo lo hice y la forma en que comprobé el resultado." : "Each case explains the problem, the solution, the technologies used, how I built it and how I checked the result."} locale={locale} phrases={isEs ? ["problema", "cómo lo hice", "comprobé el resultado"] : ["problem", "how I built it", "checked the result"]} /></p></Reveal>
        </div>
        <ProjectShowcase locale={locale} viewCase={dict.common.viewCase} projects={projects} />
      </SectionShell>

      <SectionShell className="trajectory-section" tone="paper">
        <div className="section-heading"><Eyebrow>{dict.sections.trajectory}</Eyebrow><h2>{isEs ? "Formación laboral y experiencia." : "Professional education and experience."}</h2></div>
        <ExperienceGrid entries={timeline} locale={locale} />
      </SectionShell>

      <SectionShell className="credentials-section" tone="paper">
        <div className="section-heading split-heading">
          <div>
            <Eyebrow>{isEs ? `Títulos y certificaciones / ${String(credentials.length).padStart(2, "0")}` : `Degrees and certifications / ${String(credentials.length).padStart(2, "0")}`}</Eyebrow>
            <h2>{isEs ? "Formación que puedo acreditar." : "Education I can evidence."}</h2>
          </div>
          <p><ProfessionalText text={isEs ? "Una selección breve de mi titulación universitaria, competencia lingüística y formación tecnológica aplicada." : "A concise selection of my university degree, language proficiency and applied technology training."} locale={locale} phrases={isEs ? ["titulación universitaria", "competencia lingüística", "formación tecnológica aplicada"] : ["university degree", "language proficiency", "applied technology training"]} /></p>
        </div>
        <CredentialGrid credentials={credentials} locale={locale} />
      </SectionShell>

      <SectionShell className="capabilities-section" tone="paper">
        <div className="section-heading split-heading"><div><Eyebrow>{isEs ? "Conocimientos técnicos" : "Technical knowledge"}</Eyebrow><h2>{isEs ? "Áreas con las que he trabajado." : "Areas I have worked with."}</h2></div><p><ProfessionalText text={isEs ? "Los proyectos académicos más pequeños se recogen aquí como conocimientos y técnicas, no como productos independientes." : "Smaller academic projects are represented here as knowledge and techniques rather than separate products."} locale={locale} phrases={isEs ? ["conocimientos y técnicas"] : ["knowledge and techniques"]} /></p></div>
        <CapabilityCarousel capabilities={capabilities} locale={locale} />
      </SectionShell>

      <SectionShell className="human-section" tone="paper">
        <Image className="human-background" src="/images/profile/duarte-waterfall-wide.png" alt="" fill sizes="100vw" />
        <div className="human-shade" aria-hidden="true" />
        <div className="human-content">
          <div className="section-heading split-heading"><div><Eyebrow>{dict.sections.human}</Eyebrow><h2>{isEs ? "Lo que también forma parte de mí." : "What is also part of who I am."}</h2></div><p><ProfessionalText text={isEs ? "El deporte, la naturaleza y la música forman parte de mi manera de vivir y de mantener el equilibrio." : "Sport, nature and music are part of how I live and maintain balance."} locale={locale} phrases={isEs ? ["deporte", "naturaleza", "música"] : ["Sport", "nature", "music"]} /></p></div>
          <div className="personal-list">
            {hobbies.map((hobby, index) => (
              <article className="personal-item" key={hobby.title.es}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{translate(hobby.title, locale)}</h3>
                <p><ProfessionalText text={translate(hobby.description, locale)} locale={locale} /></p>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="testimonials-section" tone="paper">
        <TestimonialsSection locale={locale} testimonials={testimonials} />
      </SectionShell>

      <SectionShell className="chat-callout" tone="ink">
        <div><Eyebrow>{isEs ? "Asistente profesional" : "Professional assistant"}</Eyebrow><h2>{isEs ? "¿Quieres preguntarme algo concreto?" : "Would you like to ask something specific?"}</h2><p><ProfessionalText text={isEs ? "El asistente puede responder sobre mi formación, experiencia y proyectos utilizando información controlada sobre mi perfil." : "The assistant can answer questions about my education, experience and projects using controlled information about my profile."} locale={locale} phrases={isEs ? ["formación", "experiencia", "proyectos", "información controlada"] : ["education", "experience", "projects", "controlled information"]} /></p></div>
        <OpenChatButton className="primary-link light">{dict.nav.ask}<Arrow /></OpenChatButton>
      </SectionShell>

      <SectionShell className="closing-section" tone="paper">
        <Eyebrow>{dict.sections.contact}</Eyebrow>
        <h2>{isEs ? "Si mi perfil encaja con tu equipo, podemos hablar." : "If my profile fits your team, let’s talk."}</h2>
        <div className="closing-actions"><Link className="primary-link dark" href={`/${locale}/contact`} prefetch={false}>{dict.nav.contact}<Arrow /></Link><a className="linkedin-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<span aria-hidden="true">↗</span></a></div>
      </SectionShell>
    </main>
  );
}
