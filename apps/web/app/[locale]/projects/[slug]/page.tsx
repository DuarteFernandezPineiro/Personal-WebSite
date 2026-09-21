import { projects, translate } from "@duarte/content";
import { Arrow, Eyebrow, Tag } from "@duarte/ui";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ProfessionalText } from "@/components/ui/professional-text";
import { getPortfolioContent } from "@/lib/content-repository";
import { locales, requireLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type ProjectPageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = requireLocale(rawLocale);
  const { projects: contentProjects } = await getPortfolioContent();
  const project = contentProjects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: translate(project.title, locale),
    description: translate(project.summary, locale),
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/projects/${slug}` }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = requireLocale(rawLocale);
  const { projects: contentProjects } = await getPortfolioContent();
  const project = contentProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  const isEs = locale === "es";
  const index = contentProjects.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? contentProjects[index - 1] : null;
  const next = index < contentProjects.length - 1 ? contentProjects[index + 1] : null;
  const status = {
    completed: isEs ? "Completado" : "Completed",
    deployed: isEs ? "Desplegado" : "Deployed",
    research: isEs ? "Investigación" : "Research"
  }[project.status];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: translate(project.title, locale),
    description: translate(project.summary, locale),
    author: { "@type": "Person", name: "Duarte Fernández Piñeiro" },
    dateCreated: project.year,
    applicationCategory: translate(project.category, locale)
  };

  return (
    <main id="main-content" className="case-page editorial-page">
      <header className="case-hero">
        <Link className="back-link" href={`/${locale}/projects`} prefetch={false}>← {isEs ? "Proyectos" : "Projects"}</Link>
        <div className="case-number">{String(index + 1).padStart(2, "0")} / {String(contentProjects.length).padStart(2, "0")}</div>
        <Eyebrow>{translate(project.eyebrow, locale)} · {project.year}</Eyebrow>
        <h1>{translate(project.title, locale)}</h1>
        <p><ProfessionalText text={translate(project.summary, locale)} locale={locale} /></p>
      </header>

      <div className="case-layout">
        <article className="case-article">
          <section aria-labelledby="case-overview">
            <Eyebrow>01 / {isEs ? "Visión general" : "Overview"}</Eyebrow>
            <h2 id="case-overview">{isEs ? "Qué es y qué problema resuelve" : "What it is and the problem it solves"}</h2>
            <p><ProfessionalText text={translate(project.problem, locale)} locale={locale} /></p>
            {project.scope ? <p><ProfessionalText text={translate(project.scope, locale)} locale={locale} /></p> : null}
          </section>

          {project.architecture?.length ? (
            <section aria-labelledby="case-operation">
              <Eyebrow>02 / {isEs ? "Funcionamiento" : "How it works"}</Eyebrow>
              <h2 id="case-operation">{isEs ? "Cómo funciona el sistema" : "How the system works"}</h2>
              <ol className="case-flow">
                {project.architecture.map((stage, stageIndex) => <li key={stage.es}><span>{String(stageIndex + 1).padStart(2, "0")}</span><p><ProfessionalText text={translate(stage, locale)} locale={locale} /></p></li>)}
              </ol>
            </section>
          ) : null}

          <section aria-labelledby="case-contribution">
            <Eyebrow>03 / {isEs ? "Mi aportación" : "My contribution"}</Eyebrow>
            <h2 id="case-contribution">{isEs ? "Qué hice yo" : "What I did"}</h2>
            <p><ProfessionalText text={translate(project.role, locale)} locale={locale} /></p>
            {project.decisions.length ? <><h3>{isEs ? "Decisiones principales" : "Main decisions"}</h3><ul className="case-decision-list">{project.decisions.map((decision) => <li key={decision.es}><ProfessionalText text={translate(decision, locale)} locale={locale} /></li>)}</ul></> : null}
          </section>

          <section aria-labelledby="case-validation">
            <Eyebrow>04 / {isEs ? "Comprobación y resultado" : "Validation and outcome"}</Eyebrow>
            <h2 id="case-validation">{isEs ? "Cómo comprobé el resultado" : "How I checked the result"}</h2>
            {project.validation ? <p><ProfessionalText text={translate(project.validation, locale)} locale={locale} /></p> : null}
            {project.results.length ? <><h3>{isEs ? "Resultado del proyecto" : "Project outcome"}</h3><ul className="case-result-list">{project.results.map((result) => <li key={result.es}><ProfessionalText text={translate(result, locale)} locale={locale} /></li>)}</ul></> : null}
          </section>

          {project.learning ? (
            <section aria-labelledby="case-learning">
              <Eyebrow>05 / {isEs ? "Aprendizajes" : "Lessons learned"}</Eyebrow>
              <h2 id="case-learning">{isEs ? "Qué aprendí durante el desarrollo" : "What I learned during development"}</h2>
              <p><ProfessionalText text={translate(project.learning, locale)} locale={locale} /></p>
            </section>
          ) : null}
        </article>

        <aside className="case-facts" aria-label={isEs ? "Ficha del proyecto" : "Project facts"}>
          <div><span>{isEs ? "Año" : "Year"}</span><strong>{project.year}</strong></div>
          <div><span>{isEs ? "Estado" : "Status"}</span><strong>{status}</strong></div>
          <div><span>{isEs ? "Área" : "Area"}</span><strong>{translate(project.category, locale)}</strong></div>
          <div><span>{isEs ? "Tecnologías" : "Technologies"}</span><div className="tag-list">{project.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>)}</div></div>
          {project.metrics.length ? <div><span>{isEs ? "Datos destacados" : "Key figures"}</span><dl className="case-fact-metrics">{project.metrics.map((metric) => <div key={metric.label.es}><dt>{translate(metric.label, locale)}</dt><dd>{metric.value}</dd></div>)}</dl></div> : null}
          {project.links.length ? <div className="case-fact-links"><span>{isEs ? "Enlaces" : "Links"}</span>{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{translate(link.label, locale)}<Arrow /></a>)}</div> : null}
        </aside>
      </div>

      {project.video ? <section className="case-video"><div className="case-video-copy"><Eyebrow>{isEs ? "Presentación técnica" : "Technical presentation"}</Eyebrow><h2>{translate(project.video.title, locale)}</h2><p><ProfessionalText text={translate(project.video.description, locale)} locale={locale} /></p></div><div className="case-video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${project.video.youtubeId}`} title={translate(project.video.title, locale)} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></section> : null}

      <nav className="case-pagination" data-single={!previous || !next} aria-label={isEs ? "Navegación entre proyectos" : "Project navigation"}>
        {previous ? <Link className="case-project-link previous-case" href={`/${locale}/projects/${previous.slug}`} prefetch={false}><Arrow /><span>{isEs ? "Proyecto anterior" : "Previous project"}</span><strong>{translate(previous.title, locale)}</strong></Link> : null}
        {next ? <Link className="case-project-link next-case" href={`/${locale}/projects/${next.slug}`} prefetch={false}><span>{isEs ? "Siguiente proyecto" : "Next project"}</span><strong>{translate(next.title, locale)}</strong><Arrow /></Link> : null}
      </nav>
      <Script id={`project-${project.slug}-structured-data`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
