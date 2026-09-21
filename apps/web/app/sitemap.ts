import type { MetadataRoute } from "next";
import { projects } from "@duarte/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/about", "/contact", "/privacy"];
  const entries = (["es", "en"] as const).flatMap((locale) => [
    ...routes.map((route) => ({ url: `${siteConfig.siteUrl}/${locale}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...projects.map((project) => ({ url: `${siteConfig.siteUrl}/${locale}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: project.featured ? 0.9 : 0.7 }))
  ]);
  return entries;
}
