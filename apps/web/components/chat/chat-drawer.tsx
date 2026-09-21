"use client";

import type { Locale, getDictionary } from "@duarte/content";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChatMessageContent } from "./chat-message-content";

type ChatCopy = ReturnType<typeof getDictionary>["chat"];
type Message = { id: string; role: "user" | "assistant"; text: string; pending?: boolean };
type StreamEvent = { type: string; text?: string; message?: string; position?: number };

export function ChatDrawer({ locale, copy, triggerLabel }: { locale: Locale; copy: ChatCopy; triggerLabel: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [detailLevel, setDetailLevel] = useState("normal");
  const [status, setStatus] = useState<string>(copy.ready);
  const [loading, setLoading] = useState(false);
  const [resetConversation, setResetConversation] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button, input, textarea, select")?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])')];
      const first = focusables[0];
      const last = focusables.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !messages.length) return;
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "end" });
  }, [messages, open, reduceMotion]);

  function appendDelta(id: string, delta: string) {
    setMessages((current) => current.map((message) => message.id === id ? { ...message, text: message.text + delta, pending: false } : message));
  }

  async function ask(value = question) {
    const cleanQuestion = value.trim();
    if (!cleanQuestion || loading) return;
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", text: cleanQuestion };
    const assistantId = crypto.randomUUID();
    setMessages((current) => [...current, userMessage, { id: assistantId, role: "assistant", text: "", pending: true }]);
    setQuestion("");
    setLoading(true);
    setStatus(locale === "es" ? "Preparando una respuesta…" : "Preparing an answer…");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanQuestion, detailLevel, resetConversation }),
        signal: controller.signal
      });
      if (!response.body) throw new Error(locale === "es" ? "El asistente no está disponible." : "The assistant is unavailable.");
      setResetConversation(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value: chunk } = await reader.read();
        buffer += decoder.decode(chunk || new Uint8Array(), { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as StreamEvent;
          if (event.type === "delta" && event.text) appendDelta(assistantId, event.text);
          if ((event.type === "status" || event.type === "queued") && event.message) setStatus(event.message);
          if (event.type === "error") throw new Error(event.message || "Error");
          if (event.type === "done") setStatus(locale === "es" ? "Respuesta completada." : "Answer complete.");
        }
        if (done) {
          if (buffer.trim()) {
            const event = JSON.parse(buffer) as StreamEvent;
            if (event.type === "delta" && event.text) appendDelta(assistantId, event.text);
            if (event.type === "error") throw new Error(event.message || (locale === "es" ? "El asistente no está disponible." : "The assistant is unavailable."));
            if (event.type === "done") setStatus(locale === "es" ? "Respuesta completada." : "Answer complete.");
          }
          if (!response.ok) throw new Error(locale === "es" ? "El asistente no está disponible." : "The assistant is unavailable.");
          break;
        }
      }
    } catch (error) {
      const aborted = error instanceof DOMException && error.name === "AbortError";
      const message = aborted ? (locale === "es" ? "Respuesta detenida." : "Answer stopped.") : error instanceof Error ? error.message : "Error";
      setStatus(message);
      setMessages((current) => current.map((item) => item.id === assistantId && !item.text ? { ...item, text: message, pending: false } : item));
    } finally {
      abortRef.current = null;
      setLoading(false);
    }
  }

  function submitOnEnter(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    void ask();
  }

  function startNewConversation() {
    abortRef.current?.abort();
    setMessages([]);
    setResetConversation(true);
    setStatus(copy.ready);
  }

  return (
    <>
      <button ref={triggerRef} className="utility-button chat-trigger" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <span className="chat-orb" aria-hidden="true" />
        <span>{triggerLabel}</span>
      </button>
      <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          className="chat-backdrop"
          role="presentation"
          initial={reduceMotion ? false : { backgroundColor: "rgba(1, 10, 16, 0)" }}
          animate={{ backgroundColor: "rgba(1, 10, 16, .62)" }}
          exit={{ backgroundColor: "rgba(1, 10, 16, 0)" }}
          transition={{ duration: reduceMotion ? 0 : 1.38, ease: [0.4, 0, 0.2, 1] }}
          onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <motion.div
            ref={dialogRef}
            className="chat-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            initial={reduceMotion ? false : { opacity: 0, x: 42, scale: 0.988 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 36, scale: 0.992 }}
            transition={{ duration: reduceMotion ? 0 : 1.68, ease: [0.4, 0, 0.2, 1] }}
          >
            <header className="chat-drawer-header">
              <div>
                <p className="eyebrow">{locale === "es" ? "IA · Perfil profesional de Duarte" : "AI · Duarte’s professional profile"}</p>
                <h2 id="chat-title">{copy.title}</h2>
                <p>{copy.subtitle}</p>
              </div>
              <button className="icon-close" type="button" onClick={() => setOpen(false)} aria-label={locale === "es" ? "Cerrar asistente" : "Close assistant"}>×</button>
            </header>
            <div className="chat-detail" role="group" aria-label={locale === "es" ? "Nivel de detalle" : "Detail level"}>
              {[
                ["breve", locale === "es" ? "Breve" : "Brief"],
                ["normal", locale === "es" ? "Normal" : "Normal"],
                ["detallado", locale === "es" ? "Detallado" : "Detailed"]
              ].map(([value, label]) => (
                <button key={value} type="button" data-active={detailLevel === value} onClick={() => setDetailLevel(value)}>{label}</button>
              ))}
            </div>
            <div className="chat-messages" aria-live="polite" aria-busy={loading}>
              {messages.length === 0 ? (
                <div className="chat-welcome">
                  <span className="chat-welcome-mark" aria-hidden="true">DF</span>
                  <p>{copy.ready}</p>
                  <div className="suggestion-list">
                    {copy.suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void ask(suggestion)}>{suggestion}<span>↗</span></button>)}
                  </div>
                </div>
              ) : messages.map((message) => (
                <motion.article
                  key={message.id}
                  className={`chat-message ${message.role}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>{message.role === "user" ? (locale === "es" ? "Tú" : "You") : "DF / AI"}</span>
                  {message.pending ? <p className="chat-thinking"><i /><i /><i /><span className="sr-only">{locale === "es" ? "Pensando…" : "Thinking…"}</span></p> : <ChatMessageContent text={message.text} />}
                </motion.article>
              ))}
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>
            <p className="chat-status" role="status">{status}</p>
            <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); void ask(); }}>
              <label className="sr-only" htmlFor="chat-question">{copy.placeholder}</label>
              <textarea id="chat-question" rows={2} value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={submitOnEnter} placeholder={copy.placeholder} maxLength={2000} />
              {loading ? (
                <button type="button" onClick={() => abortRef.current?.abort()}>{copy.stop}</button>
              ) : <button type="submit">{copy.send} ↗</button>}
            </form>
            <button className="new-chat-button" type="button" onClick={startNewConversation}>{copy.new}</button>
          </motion.div>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </>
  );
}
