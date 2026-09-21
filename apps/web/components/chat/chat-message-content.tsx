import { Fragment, type ReactNode } from "react";

const INLINE_PATTERN = /(\*\*[^*\n]+\*\*|\[[^\]\n]+\]\((?:https?:\/\/|mailto:)[^)\s]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^)\s]+)\)$/;

export function parseChatInline(text: string): ReactNode[] {
  return text.split(INLINE_PATTERN).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(LINK_PATTERN);
    if (link) {
      const [, label, href] = link;
      const external = href.startsWith("http");
      return <a key={`${href}-${index}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{label}<span aria-hidden="true"> ↗</span></a>;
    }
    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

export function ChatMessageContent({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="chat-message-content">
      {lines.map((line, index) => {
        const heading = line.match(/^#{1,3}\s+(.+)$/);
        const bullet = line.match(/^[-*]\s+(.+)$/);
        if (!line.trim()) return <span className="chat-paragraph-gap" key={`gap-${index}`} aria-hidden="true" />;
        if (heading) return <h3 key={`${line}-${index}`}>{parseChatInline(heading[1])}</h3>;
        if (bullet) return <p className="chat-bullet" key={`${line}-${index}`}><span aria-hidden="true">—</span><span>{parseChatInline(bullet[1])}</span></p>;
        return <p key={`${line}-${index}`}>{parseChatInline(line)}</p>;
      })}
    </div>
  );
}
