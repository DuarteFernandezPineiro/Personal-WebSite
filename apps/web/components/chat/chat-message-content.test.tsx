import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatMessageContent } from "./chat-message-content";

describe("ChatMessageContent", () => {
  it("renders safe markdown emphasis without exposing asterisks", () => {
    render(<ChatMessageContent text="Duarte trabaja con **RAG híbrido** y NLP." />);
    expect(screen.getByText("RAG híbrido").tagName).toBe("STRONG");
    expect(screen.queryByText(/\*\*/)).not.toBeInTheDocument();
  });

  it("preserves line breaks", () => {
    render(<ChatMessageContent text={"Primera línea\nSegunda línea"} />);
    expect(screen.getByText("Primera línea")).toBeInTheDocument();
    expect(screen.getByText("Segunda línea")).toBeInTheDocument();
  });

  it("renders headings, bullets and safe links as interface elements", () => {
    render(<ChatMessageContent text={"## Contacto\n- Consulta su [LinkedIn](https://www.linkedin.com/in/dfernandezpineiro)"} />);
    expect(screen.getByRole("heading", { name: "Contacto" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/dfernandezpineiro");
  });
});
