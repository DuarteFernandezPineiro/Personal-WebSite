import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Duarte Fernández Piñeiro — AI Engineer",
    short_name: "Duarte · AI",
    description: "Applied AI, RAG and NLP portfolio.",
    start_url: "/es",
    display: "standalone",
    background_color: "#e9eee8",
    theme_color: "#061923",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
