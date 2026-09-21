import type { Locale } from "@duarte/content";
import { Eyebrow } from "@duarte/ui";
import type { Metadata } from "next";
import { ProjectArchive } from "@/components/sections/project-archive";
import { ProfessionalText } from "@/components/ui/professional-text";
import { getPortfolioContent } from "@/lib/content-repository";
import { requireLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return {
    title: locale === "es" ? "Proyectos principales" : "Main projects",
    description: locale === "es" ? "Cuatro proyectos de IA explicados con su problema, arquitectura, tecnologías, aportación y resultados." : "Four AI projects explained through their problem, architecture, technologies, contribution and results."
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale) as Locale;
  const { projects } = await getPortfolioContent();
  return (
    <main id="main-content" className="archive-page editorial-page">
      <header className="page-hero archive-hero">
        <Eyebrow>{locale === "es" ? "Proyectos principales / 04" : "Main projects / 04"}</Eyebrow>
        <h1>{locale === "es" ? "Proyectos que explican mi forma de trabajar." : "Projects that explain how I work."}</h1>
        <p><ProfessionalText text={locale === "es" ? "He seleccionado los cuatro trabajos que mejor representan mis intereses y capacidades. En cada uno explico qué problema aborda, cómo funciona, qué tecnologías utilicé y cuál fue mi responsabilidad." : "I selected the four pieces of work that best represent my interests and abilities. Each one explains the problem, how it works, the technologies I used and my responsibility."} locale={locale} phrases={locale === "es" ? ["cuatro trabajos", "problema", "cómo funciona", "tecnologías utilicé", "mi responsabilidad"] : ["four pieces of work", "problem", "how it works", "technologies I used", "my responsibility"]} /></p>
      </header>
      <ProjectArchive locale={locale} projects={projects} />
    </main>
  );
}
