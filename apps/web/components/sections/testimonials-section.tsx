"use client";

import type { Locale } from "@duarte/content";
import { Arrow, Eyebrow } from "@duarte/ui";
import { useState, type FormEvent } from "react";
import type { PublicTestimonial } from "@/lib/testimonials";

const relationLabels = {
  es: { teacher: "Profesor/a", classmate: "Compañero/a de clase", coworker: "Compañero/a de trabajo", other: "Otra relación" },
  en: { teacher: "Teacher", classmate: "Classmate", coworker: "Coworker", other: "Other relationship" }
} as const;

export function TestimonialsSection({ locale, testimonials }: { locale: Locale; testimonials: PublicTestimonial[] }) {
  const isEs = locale === "es";
  const [relationship, setRelationship] = useState<keyof typeof relationLabels.es>("coworker");
  const [anonymous, setAnonymous] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorCode, setErrorCode] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setErrorCode("");
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({
          relationship,
          otherRelationship: data.get("otherRelationship") || "",
          name: data.get("name") || "",
          anonymous,
          comment: data.get("comment") || "",
          consent: data.get("consent") === "accepted",
          website: data.get("website") || "",
          locale
        })
      });
      const result = (await response.json()) as { code?: string };
      if (!response.ok) throw new Error(result.code || "request_failed");
      form.reset();
      setRelationship("coworker");
      setAnonymous(false);
      setState("success");
    } catch (error) {
      setErrorCode(error instanceof Error ? error.message : "request_failed");
      setState("error");
    }
  }

  const statusMessage = state === "success"
    ? isEs ? "Gracias. La opinión se publicará cuando haya sido revisada." : "Thank you. The comment will be published after review."
    : state === "error"
      ? errorCode === "not_configured"
        ? isEs ? "La recepción de opiniones se activará en la publicación final." : "Submissions will be enabled for the final launch."
        : isEs ? "No se ha podido enviar. Inténtalo de nuevo más tarde." : "It could not be sent. Please try again later."
      : "";

  return (
    <section className="testimonials-layout" aria-labelledby="testimonials-title">
      <div className="testimonials-intro">
        <Eyebrow>{isEs ? "Opiniones" : "Testimonials"}</Eyebrow>
        <h2 id="testimonials-title">{isEs ? "La experiencia de trabajar y aprender conmigo." : "What it is like to work and learn with me."}</h2>
        <p>{isEs ? "Este espacio recogerá testimonios reales de personas que han compartido conmigo trabajo, estudios o docencia. Deja aquí tu opinión a cerca de Duarte." : "This space collects genuine testimonials from people who have worked, studied or taught with me. Leave your testimonial about Duarte here."}</p>
      </div>

      {testimonials.length ? (
        <div className="testimonial-list" aria-label={isEs ? "Opiniones publicadas" : "Published testimonials"}>
          {testimonials.map((testimonial) => (
            <blockquote className="testimonial-card" key={testimonial.id}>
              <p>“{testimonial.comment}”</p>
              <footer>
                <strong>{testimonial.anonymous ? (isEs ? "Anónimo" : "Anonymous") : testimonial.displayName}</strong>
                <span>{testimonial.relationship === "other" ? testimonial.otherRelationship : relationLabels[locale][testimonial.relationship]}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      ) : (
        <p className="testimonial-empty">{isEs ? "Las primeras opiniones verificadas aparecerán aquí." : "The first verified testimonials will appear here."}</p>
      )}

      <form className="testimonial-form" onSubmit={submit} aria-busy={state === "sending"}>
        <div className="testimonial-form-heading">
          <span>{isEs ? "Dejar una opinión" : "Leave a testimonial"}</span>
          <p>{isEs ? "Cuéntales a otras personas cómo fue compartir un proyecto, una clase o un equipo conmigo." : "Tell others what it was like to share a project, class or team with me."}</p>
        </div>
        <div className="form-grid">
          <label>
            <span>{isEs ? "Tu relación con Duarte" : "Your relationship with Duarte"}</span>
            <select name="relationship" value={relationship} onChange={(event) => setRelationship(event.target.value as typeof relationship)}>
              <option value="teacher">{relationLabels[locale].teacher}</option>
              <option value="classmate">{relationLabels[locale].classmate}</option>
              <option value="coworker">{relationLabels[locale].coworker}</option>
              <option value="other">{relationLabels[locale].other}</option>
            </select>
          </label>
          {relationship === "other" ? (
            <label>
              <span>{isEs ? "Especifica la relación" : "Specify the relationship"}</span>
              <input name="otherRelationship" minLength={2} maxLength={80} required />
            </label>
          ) : <div aria-hidden="true" />}
        </div>
        <div className="testimonial-name-row">
          <label>
            <span>{isEs ? "Nombre" : "Name"}</span>
            <input name="name" autoComplete="name" minLength={2} maxLength={80} required={!anonymous} disabled={anonymous} placeholder={anonymous ? (isEs ? "Se publicará como Anónimo" : "It will be published as Anonymous") : ""} />
          </label>
          <label className="anonymous-row">
            <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} />
            <span>{isEs ? "Prefiero aparecer como Anónimo" : "I prefer to appear as Anonymous"}</span>
          </label>
        </div>
        <label>
          <span>{isEs ? "Tu opinión" : "Your testimonial"}</span>
          <textarea name="comment" maxLength={1400} rows={6} required placeholder={isEs ? "¿Cómo fue trabajar, estudiar o colaborar con Duarte?" : "What was it like to work, study or collaborate with Duarte?"} />
        </label>
        <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className="consent-row">
          <input name="consent" type="checkbox" value="accepted" required />
          <span>{isEs ? "Autorizo la publicación de este comentario y del nombre indicado. Podré solicitar su retirada en cualquier momento." : "I authorise publication of this comment and the stated name. I may request its removal at any time."}</span>
        </label>
        <div className="form-submit-row">
          <button className="button button-dark" type="submit" disabled={state === "sending"}>
            {state === "sending" ? (isEs ? "Enviando…" : "Sending…") : (isEs ? "Enviar opinión" : "Send testimonial")}<span aria-hidden="true"><Arrow /></span>
          </button>
          <p className="form-status" role="status" aria-live="polite">{statusMessage}</p>
        </div>
      </form>
    </section>
  );
}
