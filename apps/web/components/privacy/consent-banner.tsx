"use client";

import type { Locale } from "@duarte/content";
import Link from "next/link";
import { useEffect, useState } from "react";

type Consent = "essential" | "analytics";
const STORAGE_KEY = "dfp-consent-v1";

async function enableAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
  if (!key) return;
  const { default: posthog } = await import("posthog-js");
  if (posthog.__loaded) return;
  posthog.init(key, { api_host: host, autocapture: false, disable_session_recording: true, persistence: "localStorage+cookie", respect_dnt: true, capture_pageview: false });
  posthog.capture("pageview_consented");
}

export function ConsentBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (!stored) setVisible(true);
    if (stored === "analytics") void enableAnalytics();
  }, []);

  function choose(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    if (value === "analytics") void enableAnalytics();
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <aside className="consent-banner" aria-label={locale === "es" ? "Preferencias de privacidad" : "Privacy preferences"}>
      <div>
        <p className="eyebrow">{locale === "es" ? "Privacidad por diseño" : "Privacy by design"}</p>
        <p>{locale === "es" ? "La web funciona sin analítica. Si aceptas, solo mediremos visitas y navegación básica: sin autocaptura ni grabaciones." : "The site works without analytics. If you accept, only visits and basic navigation are measured: no autocapture or recordings."}</p>
        <Link href={`/${locale}/privacy`} prefetch={false}>{locale === "es" ? "Leer política" : "Read policy"}</Link>
      </div>
      <div className="consent-actions">
        <button type="button" onClick={() => choose("essential")}>{locale === "es" ? "Solo esenciales" : "Essential only"}</button>
        <button type="button" onClick={() => choose("analytics")}>{locale === "es" ? "Aceptar analítica" : "Allow analytics"}</button>
      </div>
    </aside>
  );
}
