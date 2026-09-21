import { translate, type Locale, type Project } from "@duarte/content";
import { Arrow, Tag } from "@duarte/ui";
import Link from "next/link";
import { ProfessionalText } from "@/components/ui/professional-text";

export function ProjectArchive({ locale, projects }: { locale: Locale; projects: Project[]; allLabel?: string }) {
  const isEs = locale === "es";

  return (
    <div className="project-index-list">
      {projects.map((project, index) => (
        <article className="project-index-row" key={project.slug}>
          <span className="project-index-number">{String(index + 1).padStart(2, "0")}</span>
          <div className="project-index-main">
            <p className="project-index-meta">{translate(project.eyebrow, locale)} · {project.year}</p>
            <h2><Link href={`/${locale}/projects/${project.slug}`} prefetch={false}>{translate(project.title, locale)}</Link></h2>
            <p><ProfessionalText text={translate(project.summary, locale)} locale={locale} /></p>
            <div className="tag-list">{project.technologies.slice(0, 6).map((technology) => <Tag key={technology}>{technology}</Tag>)}</div>
          </div>
          <Link className="project-case-link" href={`/${locale}/projects/${project.slug}`} prefetch={false} aria-label={`${isEs ? "Leer proyecto" : "Read project"}: ${translate(project.title, locale)}`}>
            {isEs ? "Leer proyecto" : "Read project"}<Arrow />
          </Link>
        </article>
      ))}
    </div>
  );
}
