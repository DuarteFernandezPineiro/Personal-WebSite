import { profile, translate, type Locale, type getDictionary } from "@duarte/content";
import Link from "next/link";
import { CvDownloadLink } from "@/components/ui/cv-download-link";

type Dictionary = ReturnType<typeof getDictionary>;

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-label">{locale === "es" ? "Navegar" : "Navigate"}</p>
          <Link href={`/${locale}/projects`} prefetch={false}>{dict.nav.work}</Link>
          <Link href={`/${locale}/about`} prefetch={false}>{dict.nav.about}</Link>
          <Link href={`/${locale}/contact`} prefetch={false}>{dict.nav.contact}</Link>
        </div>
        <div>
          <p className="footer-label">{locale === "es" ? "Conectar" : "Connect"}</p>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={`mailto:${profile.email}`}>{profile.email} ↗</a>
        </div>
        <div>
          <p className="footer-label">{locale === "es" ? "Legal" : "Legal"}</p>
          <Link href={`/${locale}/privacy`} prefetch={false}>{locale === "es" ? "Privacidad" : "Privacy"}</Link>
          <CvDownloadLink locale={locale}>{locale === "es" ? "CV público ↓" : "Public résumé ↓"}</CvDownloadLink>
          <details className="music-credits">
            <summary>{locale === "es" ? "Créditos musicales" : "Music credits"}</summary>
            <ul>
              <li><a href="https://www.youtube.com/watch?v=aazYwcjYPdQ" target="_blank" rel="noreferrer">Spanish Romance — Ilona Guitar ↗</a></li>
              <li><a href="https://www.youtube.com/watch?v=gIrNZxDOYUY" target="_blank" rel="noreferrer">Chopin, Nocturne op. 9 no. 2 — Ilona Guitar ↗</a></li>
              <li><a href="https://www.youtube.com/watch?v=H0wvexNmX9U" target="_blank" rel="noreferrer">Bach, BWV 1007 — 방구석 클래식 · 정승원의 On Air ↗</a></li>
            </ul>
          </details>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Duarte Fernández Piñeiro</span>
        <span>{translate(profile.location, locale)}</span>
      </div>
    </footer>
  );
}
