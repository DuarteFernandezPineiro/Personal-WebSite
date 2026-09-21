"use client";

import type { Locale } from "@duarte/content";
import type { MouseEvent, ReactNode } from "react";

const cvAssets = {
  es: {
    path: "/cv/CV_Duarte_Fernandez_Pineiro_ES.pdf",
    filename: "CV_Duarte_Fernandez_Pineiro_ES.pdf"
  },
  en: {
    path: "/cv/CV_Duarte_Fernandez_Pineiro_EN.pdf",
    filename: "CV_Duarte_Fernandez_Pineiro_EN.pdf"
  }
} as const;

export function getCvAsset(locale: Locale) {
  return cvAssets[locale];
}

export function CvDownloadLink({ locale, className, children }: { locale: Locale; className?: string; children?: ReactNode }) {
  const asset = getCvAsset(locale);

  function openAndDownload(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    window.open(asset.path, "_blank", "noopener,noreferrer");
    const download = document.createElement("a");
    download.href = asset.path;
    download.download = asset.filename;
    download.hidden = true;
    document.body.appendChild(download);
    window.requestAnimationFrame(() => {
      download.click();
      download.remove();
    });
  }

  return (
    <a
      className={["cv-action", className].filter(Boolean).join(" ")}
      href={asset.path}
      target="_blank"
      rel="noreferrer"
      onClick={openAndDownload}
      aria-label={locale === "es" ? "Ver y descargar el CV de Duarte" : "View and download Duarte’s résumé"}
    >
      {children ?? (locale === "es" ? "Ver CV" : "View résumé")}
    </a>
  );
}
