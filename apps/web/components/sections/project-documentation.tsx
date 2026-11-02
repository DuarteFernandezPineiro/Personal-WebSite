import type { Locale, ProjectDocumentationSection } from "@duarte/content";
import { translate } from "@duarte/content";
import type { ReactNode } from "react";

function renderInline(text: string, keyPrefix: string) {
  const pattern = /(\*\*.+?\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern).filter(Boolean);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={key}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={key}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <span key={key}>{link[1]}</span>;
    return <span key={key}>{part}</span>;
  });
}

function MarkdownBody({ text, diagram }: { text: string; diagram?: ReactNode }) {
  const blocks = text
    .trim()
    .split(/(```mermaid[\s\S]*?```)/g)
    .flatMap((part) => part.startsWith("```mermaid") ? [part] : part.split(/\n\s*\n/))
    .filter(Boolean);

  return (
    <div className="case-document-body">
      {blocks.map((block, blockIndex) => {
        const key = `document-block-${blockIndex}`;
        const trimmed = block.trim();
        if (trimmed === "---") return <hr className="case-document-divider" key={key} />;
        if (trimmed.startsWith("```mermaid") && trimmed.endsWith("```")) {
          return diagram ? <div key={key}>{diagram}</div> : <pre className="case-document-code" key={key}><code>{trimmed.slice(10, -3).trim()}</code></pre>;
        }

        const lines = trimmed.split("\n");
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul className="case-document-list" key={key}>
              {lines.map((line, itemIndex) => <li key={`${key}-${itemIndex}`}>{renderInline(line.slice(2), `${key}-${itemIndex}`)}</li>)}
            </ul>
          );
        }

        return <p key={key}>{renderInline(lines.join(" "), key)}</p>;
      })}
    </div>
  );
}

export function ProjectDocumentation({ sections, locale, startIndex = 0, diagram }: { sections: ProjectDocumentationSection[]; locale: Locale; startIndex?: number; diagram?: ReactNode }) {
  return (
    <div className="case-documentation">
      {sections.map((section, index) => {
        const headingId = `case-document-section-${startIndex + index + 1}`;
        return (
          <section aria-labelledby={headingId} key={`${section.heading.es}-${index}`}>
            <h2 id={headingId}>{translate(section.heading, locale)}</h2>
            <MarkdownBody text={translate(section.body, locale)} diagram={diagram} />
          </section>
        );
      })}
    </div>
  );
}
