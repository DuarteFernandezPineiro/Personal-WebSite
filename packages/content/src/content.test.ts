import { describe, expect, it } from "vitest";
import { about, credentials, isLocale, profile, projects, translate } from "./index";

describe("public content", () => {
  it("contains five featured case studies with unique slugs", () => {
    const featured = projects.filter((project) => project.featured);
    expect(featured).toHaveLength(5);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
  });

  it("does not expose restricted personal details", () => {
    const serialized = JSON.stringify({ profile, about, projects });
    expect(serialized).not.toMatch(/635\s*763\s*949/);
    expect(serialized).not.toMatch(/07[\/-]11[\/-]2004/);
  });

  it("keeps the main projects detailed and auditable in both languages", () => {
    expect(projects).toHaveLength(5);
    for (const project of projects) {
      expect(project.summary.es.length).toBeGreaterThan(60);
      expect(project.problem.es.length).toBeGreaterThan(40);
      expect(project.decisions.length).toBeGreaterThan(0);
      expect(project.results.length).toBeGreaterThan(0);
      expect(project.learning?.es.length).toBeGreaterThan(30);
    }
    for (const project of projects) {
      expect(project.architecture?.length).toBeGreaterThanOrEqual(4);
      expect(project.validation?.es.length).toBeGreaterThan(80);
      expect(project.scope?.es.length).toBeGreaterThan(40);
      expect(project.summary.en.length).toBeGreaterThan(60);
      expect(project.validation?.en.length).toBeGreaterThan(80);
      expect(project.scope?.en.length).toBeGreaterThan(40);
    }
  });

  it("presents Airfryer as research with a defined recognition domain and human review", () => {
    const airfryer = projects.find((project) => project.slug === "airfryer-vision-cocinado");
    expect(airfryer?.status).toBe("research");
    expect(airfryer?.scope?.es).toContain("siete cortes de pollo");
    expect(airfryer?.scope?.en).toContain("seven chicken cuts");
    expect(airfryer?.scope?.es).toContain("revisión humana");
    expect(airfryer?.scope?.en).toContain("human review");
    expect(airfryer?.metrics.find((metric) => metric.value === "91,71%")?.label.en).toContain("603 test images");
  });

  it("resolves locales and translated values", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(translate({ es: "Hola", en: "Hello" }, "en")).toBe("Hello");
  });

  it("keeps public credentials bilingual and identifiable", () => {
    expect(credentials).toHaveLength(3);
    expect(new Set(credentials.map((credential) => credential.id)).size).toBe(credentials.length);
    for (const credential of credentials) {
      expect(credential.title.es.length).toBeGreaterThan(5);
      expect(credential.title.en.length).toBeGreaterThan(5);
      expect(credential.description.es.length).toBeGreaterThan(30);
      expect(credential.description.en.length).toBeGreaterThan(30);
    }
    expect(credentials.find((credential) => credential.id === "microsoft-foundry-chat-app")?.credentialId).toBe("E0A6793EE57A22FF");
  });

  it("keeps the requested RAG and Bitcoin scope copy in both locales", () => {
    const rag = projects.find((project) => project.slug === "rag-hibrido-documentacion");
    const bitcoin = projects.find((project) => project.slug === "bitcoin-sentiment");
    expect(rag?.scope).toEqual({
      es: "Proyecto final implementado como sistema real e integrado con el software de la empresa para el procesamiento de documentación corporativa",
      en: "Final project implemented as a real system and integrated with the company’s software for corporate document processing."
    });
    expect(bitcoin?.scope).toEqual({
      es: "Proyecto experimental que analiza el sentimiento general acerca de bitcoin, como asesoramiento para posibles inversiones",
      en: "Experimental project that analyses general sentiment around Bitcoin as guidance for potential investments."
    });
  });
});
