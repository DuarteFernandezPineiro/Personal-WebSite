export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  name: "Duarte Fernández Piñeiro",
  description: "Artificial Intelligence engineer building reliable RAG, NLP and applied AI products.",
  siteUrl
};

