import type { Metadata } from "next";
import { requireLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return { title: locale === "es" ? "Privacidad" : "Privacy" };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const es = locale === "es";
  const sections = es
    ? [
        ["Qué se recoge", "El formulario de contacto procesa nombre, email, empresa opcional, motivo y mensaje. Las opiniones incluyen relación con Duarte, nombre o elección de anonimato y comentario. El asistente procesa el texto que escribes y una sesión técnica temporal."],
        ["Para qué", "Los datos de contacto se usan únicamente para responder a tu consulta. Las opiniones se revisan antes de publicarse y solo se muestran el nombre autorizado —o Anónimo—, la relación y el comentario. El chat usa la conversación para generar una respuesta sobre el perfil profesional de Duarte."],
        ["Conservación", "Los mensajes de contacto se conservan solo mientras sean necesarios para atender la conversación. Las opiniones se conservan mientras estén pendientes o publicadas y pueden retirarse a petición de su autor. No se venden datos ni se crean perfiles publicitarios."],
        ["Analítica y cookies", "La analítica opcional permanece desactivada hasta obtener consentimiento. No se utiliza autocaptura ni grabación de sesiones."],
        ["Tus derechos", "Puedes solicitar acceso, corrección o eliminación escribiendo al email de contacto. No introduzcas información sensible en el chat o el formulario."]
      ]
    : [
        ["What is collected", "The contact form processes your name, email, optional company, subject and message. Testimonials include your relationship with Duarte, your name or choice to remain anonymous, and your comment. The assistant processes your text and a temporary technical session."],
        ["Purpose", "Contact data is used only to reply to your enquiry. Testimonials are reviewed before publication and display only the authorised name —or Anonymous—, relationship and comment. The chat uses the conversation to answer questions about Duarte’s professional profile."],
        ["Retention", "Contact messages are kept only as long as needed to handle the conversation. Testimonials are retained while pending or published and may be removed at the author’s request. Data is not sold and no advertising profiles are created."],
        ["Analytics and cookies", "Optional analytics remains disabled until consent is provided. Autocapture and session recording are not used."],
        ["Your rights", "You may request access, correction or deletion using the contact email. Do not enter sensitive information in the chat or form."]
      ];

  return (
    <main id="main-content" className="legal-page editorial-page privacy-page">
      <header className="page-hero compact-page-hero">
        <p className="eyebrow">{es ? "Transparencia" : "Transparency"}</p>
        <h1>{es ? <>Privacidad <em>sin letra pequeña.</em></> : <>Privacy <em>without fine print.</em></>}</h1>
        <p className="page-lead">{es ? "Una explicación clara de qué ocurre con los datos en esta web." : "A plain-language explanation of what happens to data on this website."}</p>
      </header>
      {sections.map(([title, body], index) => (
        <section className="privacy-card" key={title}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <h2>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
      <section className="privacy-updated">
        <p>{es ? "Última actualización: 19 de septiembre de 2026." : "Last updated: 19 September 2026."}</p>
      </section>
    </main>
  );
}
