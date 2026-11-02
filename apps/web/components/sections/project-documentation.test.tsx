import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectDocumentation } from "./project-documentation";
import { RagPipelineDiagram } from "./rag-pipeline-diagram";
import { AirfryerPipelineDiagram } from "./airfryer-pipeline-diagram";
import { ProjectFlowDiagram } from "./project-flow-diagram";
import type { FlowProject } from "./project-flow-diagrams";

const body = "Texto con *chunking*.\n\n```mermaid\nflowchart LR\n A --> B\n\n B --> C\n```\n\nDespués del diagrama.";
const sections = [{ heading: { es: "3. Solución y arquitectura", en: "3. Solution and architecture" }, body: { es: body, en: body } }];
afterEach(cleanup);

describe("ProjectDocumentation diagrams", () => {
  it.each([
    ["twinphoto", "es", "Arquitectura de TwinPhoto"],
    ["twinphoto", "en", "TwinPhoto architecture"],
    ["asistente-profesional", "es", "Arquitectura del asistente profesional"],
    ["asistente-profesional", "en", "Professional assistant architecture"],
    ["bitcoin-sentiment", "es", "Arquitectura de Bitcoin Decision Chat"],
    ["bitcoin-sentiment", "en", "Bitcoin Decision Chat architecture"]
  ] as const)("renders the correct %s diagram in %s", (project, locale, title) => {
    const { container } = render(<ProjectDocumentation sections={sections} locale={locale} diagram={<ProjectFlowDiagram project={project as FlowProject} locale={locale} />} />);
    expect(screen.getByRole("img", { name: title })).toBeVisible();
    expect(container.querySelectorAll("[data-project-diagram]")).toHaveLength(1);
    expect(container.querySelector("[data-project-diagram]")?.getAttribute("data-project-diagram")).toBe(project);
    expect(container.querySelector("pre")).toBeNull();
  });
  it("renders the selected RAG diagram without leaking Mermaid or italic markers", () => {
    const { container } = render(<ProjectDocumentation sections={sections} locale="es" startIndex={2} diagram={<RagPipelineDiagram locale="es" />} />);
    expect(screen.getByRole("img", { name: "Arquitectura del RAG documental" })).toBeVisible();
    expect(container.querySelector(".airfryer-diagram")).toBeNull();
    expect(container.textContent).not.toContain("flowchart LR");
    expect(container.querySelector("em")?.textContent).toBe("chunking");
    expect(screen.getByText("Después del diagrama.")).toBeVisible();
    expect(screen.getByRole("heading").id).toBe("case-document-section-3");
  });

  it("preserves the selected Airfryer diagram", () => {
    const { container } = render(<ProjectDocumentation sections={sections} locale="es" diagram={<AirfryerPipelineDiagram locale="es" />} />);
    expect(container.querySelector(".airfryer-diagram svg")).not.toBeNull();
    expect(container.querySelector("[data-project-diagram='rag']")).toBeNull();
  });

  it("shows a safe code fallback when no project diagram was selected", () => {
    const { container } = render(<ProjectDocumentation sections={sections} locale="es" />);
    expect(container.querySelector("pre code")?.textContent).toContain("B --> C");
    expect(container.querySelector("svg")).toBeNull();
  });
});
