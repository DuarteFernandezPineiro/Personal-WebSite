import { describe, expect, it } from "vitest";
import { about, credentials, isLocale, profile, projects, translate } from "./index";

describe("public content", () => {
  it("contains four featured case studies with unique slugs", () => {
    const featured = projects.filter((project) => project.featured);
    expect(featured).toHaveLength(4);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
  });

  it("does not expose restricted personal details", () => {
    const serialized = JSON.stringify({ profile, about, projects });
    expect(serialized).not.toMatch(/635\s*763\s*949/);
    expect(serialized).not.toMatch(/07[\/-]11[\/-]2004/);
  });

  it("keeps the four main projects detailed and auditable", () => {
    expect(projects).toHaveLength(4);
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
    }
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
});
