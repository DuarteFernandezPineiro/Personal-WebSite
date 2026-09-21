"use client";

import type { Locale, getDictionary } from "@duarte/content";
import Script from "next/script";
import { useState, type FormEvent } from "react";

type ContactCopy = ReturnType<typeof getDictionary>["contact"];

export function ContactForm({ locale, copy }: { locale: Locale; copy: ContactCopy }) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({ ...data, turnstileToken: data["cf-turnstile-response"], locale })
      });
      const result = (await response.json()) as { ok?: boolean; code?: string };
      if (!response.ok) throw new Error(result.code || "request_failed");
      form.reset();
      setState("success");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error && error.message === "not_configured" ? copy.fallback : locale === "es" ? "No se ha podido enviar. Inténtalo de nuevo o utiliza el email directo." : "It could not be sent. Please retry or use the direct email.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-busy={state === "sending"}>
      <div className="form-grid">
        <label>
          <span>{copy.name}</span>
          <input name="name" autoComplete="name" minLength={2} maxLength={80} required />
        </label>
        <label>
          <span>{copy.email}</span>
          <input name="email" type="email" autoComplete="email" maxLength={160} required />
        </label>
      </div>
      <label>
        <span>{copy.company}</span>
        <input name="company" autoComplete="organization" maxLength={120} />
      </label>
      <label>
        <span>{copy.topic}</span>
        <select name="topic" defaultValue="opportunity">
          <option value="opportunity">{locale === "es" ? "Oportunidad profesional" : "Career opportunity"}</option>
          <option value="collaboration">{locale === "es" ? "Colaboración" : "Collaboration"}</option>
          <option value="project">{locale === "es" ? "Proyecto" : "Project"}</option>
          <option value="other">{locale === "es" ? "Otro" : "Other"}</option>
        </select>
      </label>
      <label>
        <span>{copy.message}</span>
        <textarea name="message" minLength={20} maxLength={4000} rows={7} required />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
        </>
      ) : null}
      <label className="consent-row">
        <input name="consent" type="checkbox" value="accepted" required />
        <span>{copy.consent}</span>
      </label>
      <div className="form-submit-row">
        <button className="button button-dark" type="submit" disabled={state === "sending"}>
          {state === "sending" ? copy.sending : copy.send}<span aria-hidden="true">↗</span>
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {state === "success" ? copy.success : state === "error" ? message : ""}
        </p>
      </div>
    </form>
  );
}
