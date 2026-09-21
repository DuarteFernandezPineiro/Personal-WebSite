import { translate, type Locale, type Project } from "@duarte/content";
import { Arrow, Eyebrow, Tag } from "@duarte/ui";
import Link from "next/link";
import { ProfessionalText } from "@/components/ui/professional-text";
import { Reveal } from "@/components/ui/reveal";

export function ProjectShowcase({ locale, viewCase, projects }: { locale: Locale; viewCase: string; projects: Project[] }) {
  return (
    <div className="featured-projects">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={index * 0.04}>
          <article className="project-card" data-index={String(index + 1).padStart(2, "0")}>
            <div className="project-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
            <div className="project-card-copy">
              <div className="project-card-meta">
                <Eyebrow>{translate(project.category, locale)}</Eyebrow>
                <span>{project.year}</span>
              </div>
              <h3><Link href={`/${locale}/projects/${project.slug}`} prefetch={false}>{translate(project.title, locale)}</Link></h3>
              <p><ProfessionalText text={translate(project.summary, locale)} locale={locale} /></p>
              <div className="project-card-footer">
                <div className="tag-list">{project.technologies.slice(0, 5).map((technology) => <Tag key={technology}>{technology}</Tag>)}</div>
                <Link className="project-case-link" href={`/${locale}/projects/${project.slug}`} prefetch={false} aria-label={`${viewCase}: ${translate(project.title, locale)}`}>{viewCase}<Arrow /></Link>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
