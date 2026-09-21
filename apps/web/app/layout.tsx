import { profile } from "@duarte/content";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { MarginNeuralField } from "@/components/ui/margin-neural-field";
import { RouteDepthTransition } from "@/components/ui/route-depth-transition";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Duarte Fernández Piñeiro — AI Engineer",
    template: "%s — Duarte Fernández Piñeiro"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    icon: "/icon.svg"
  }
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Artificial Intelligence Engineer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Santiago de Compostela", addressRegion: "Galicia", addressCountry: "ES" },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: ["Artificial Intelligence", "Retrieval-augmented generation", "Natural language processing", "Machine learning", "Python"]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <MarginNeuralField />
        <RouteDepthTransition />
        {children}
        <div className="persistent-sound-control">
          <SoundToggle />
        </div>
      </body>
    </html>
  );
}
