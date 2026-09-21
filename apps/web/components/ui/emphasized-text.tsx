import type { ReactNode } from "react";

type EmphasizedTextProps = {
  text: string;
  phrases: readonly string[];
};

export function EmphasizedText({ text, phrases }: EmphasizedTextProps) {
  const orderedPhrases = [...new Set(phrases)]
    .filter(Boolean)
    .sort((first, second) => second.length - first.length);
  const escaped = orderedPhrases
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!escaped.length) return text;

  const expression = new RegExp(`(${escaped.join("|")})`, "gi");
  const normalized = new Set(orderedPhrases.map((phrase) => phrase.toLocaleLowerCase()));

  return text.split(expression).map((part, index): ReactNode => (
    normalized.has(part.toLocaleLowerCase())
      ? <strong className="text-emphasis" key={`${part}-${index}`}>{part}</strong>
      : part
  ));
}
