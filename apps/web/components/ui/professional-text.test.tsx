import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfessionalText } from "./professional-text";

describe("ProfessionalText", () => {
  it("emphasizes the complete professional role before its shorter nested phrase", () => {
    const { container } = render(<p><ProfessionalText locale="es" text="Soy Ingeniero de Inteligencia Artificial y formo parte de la primera promoción." /></p>);

    expect(screen.getByText("Ingeniero de Inteligencia Artificial", { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByText("primera promoción", { selector: "strong" })).toBeInTheDocument();
    expect(container.querySelectorAll("strong")).toHaveLength(2);
  });

  it("keeps the same editorial emphasis in English", () => {
    render(<p><ProfessionalText locale="en" text="Artificial Intelligence Engineer with experience in hybrid RAG and traceability." /></p>);

    expect(screen.getByText("Artificial Intelligence Engineer", { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByText("hybrid RAG", { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByText("traceability", { selector: "strong" })).toBeInTheDocument();
  });
});
