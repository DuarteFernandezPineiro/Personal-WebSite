import { translate, type Credential, type Locale } from "@duarte/content";
import { Reveal } from "@/components/ui/reveal";
import { ProfessionalText } from "@/components/ui/professional-text";

const kindLabel = {
  degree: { es: "Título universitario", en: "University degree" },
  language: { es: "Idioma", en: "Language" },
  "applied-skill": { es: "Acreditación aplicada", en: "Applied credential" }
} as const;

export function CredentialGrid({ credentials, locale }: { credentials: Credential[]; locale: Locale }) {
  const isEs = locale === "es";

  return (
    <Reveal className="credential-grid">
      {credentials.map((credential, index) => (
        <article className="credential-card" key={credential.id}>
          <div className="credential-card-top">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{kindLabel[credential.kind][locale]}</span>
          </div>
          <p className="credential-period">{translate(credential.period, locale)}</p>
          <h3>{translate(credential.title, locale)}</h3>
          <p className="credential-description"><ProfessionalText text={translate(credential.description, locale)} locale={locale} /></p>
          <dl className="credential-meta">
            <div>
              <dt>{isEs ? "Entidad" : "Issuer"}</dt>
              <dd>{translate(credential.issuer, locale)}</dd>
            </div>
            {credential.credentialId ? (
              <div>
                <dt>{isEs ? "ID de credencial" : "Credential ID"}</dt>
                <dd><code>{credential.credentialId}</code></dd>
              </div>
            ) : null}
          </dl>
        </article>
      ))}
    </Reveal>
  );
}
