import { about, capabilities, credentials, hobbies, profile, projects, timeline, type Credential, type LocalizedText, type SiteProfile, type Project } from "@duarte/content";
import { cache } from "react";

type SanityDocument = {
  _type: string;
  slug?: string;
  title?: LocalizedText;
  summary?: LocalizedText;
  kind?: Credential["kind"];
  issuer?: LocalizedText;
  period?: LocalizedText;
  credentialId?: string;
  role?: LocalizedText;
  intro?: LocalizedText;
  availability?: LocalizedText;
  location?: LocalizedText;
  email?: string;
  year?: string;
  featured?: boolean;
  technologies?: string[];
  problem?: LocalizedText;
  contribution?: LocalizedText;
  decisions?: LocalizedText[];
  results?: LocalizedText[];
  architecture?: LocalizedText[];
  validation?: LocalizedText;
  learning?: LocalizedText;
  scope?: LocalizedText;
  metrics?: Project["metrics"];
  order?: number;
};

export type PortfolioContent = {
  profile: SiteProfile;
  about: typeof about;
  projects: Project[];
  timeline: typeof timeline;
  credentials: typeof credentials;
  capabilities: typeof capabilities;
  hobbies: typeof hobbies;
  source: "sanity" | "fixture";
};

const fallback: PortfolioContent = { profile, about, projects, timeline, credentials, capabilities, hobbies, source: "fixture" };

export const getPortfolioContent = cache(async (): Promise<PortfolioContent> => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  if (!projectId) return fallback;

  const query = `*[_type in ["profile","project","certification"] && status == "published" && visible == true && confidential != true] | order(order asc){_type,"slug":slug.current,title,summary,kind,issuer,period,credentialId,role,intro,availability,location,email,year,featured,technologies,problem,contribution,decisions,results,architecture,validation,learning,scope,metrics,order}`;
  const endpoint = `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(endpoint, { next: { revalidate: 300, tags: ["portfolio-content"] } });
    if (!response.ok) return fallback;
    const payload = (await response.json()) as { result?: SanityDocument[] };
    if (!Array.isArray(payload.result)) return fallback;
    const cmsProfile = payload.result.find((document) => document._type === "profile");
    const mergedProfile: SiteProfile = cmsProfile
      ? { ...profile, ...(cmsProfile.role && { role: cmsProfile.role }), ...(cmsProfile.intro && { intro: cmsProfile.intro }), ...(cmsProfile.availability && { availability: cmsProfile.availability }), ...(cmsProfile.location && { location: cmsProfile.location }), ...(cmsProfile.email && { email: cmsProfile.email }) }
      : profile;
    const cmsProjects = new Map(payload.result.filter((document) => document._type === "project" && document.slug).map((document) => [document.slug, document]));
    const mergedProjects = projects.map((item) => {
      const document = cmsProjects.get(item.slug);
      if (!document) return item;
      return {
        ...item,
        ...(document.title && { title: document.title }),
        ...(document.summary && { summary: document.summary }),
        ...(document.year && { year: document.year }),
        ...(typeof document.featured === "boolean" && { featured: document.featured }),
        ...(document.technologies && { technologies: document.technologies }),
        ...(document.problem && { problem: document.problem }),
        ...(document.contribution && { role: document.contribution }),
        ...(document.decisions && { decisions: document.decisions }),
        ...(document.results && { results: document.results }),
        ...(document.architecture && { architecture: document.architecture }),
        ...(document.validation && { validation: document.validation }),
        ...(document.learning && { learning: document.learning }),
        ...(document.scope && { scope: document.scope }),
        ...(document.metrics && { metrics: document.metrics })
      };
    });
    const cmsCredentials = new Map(payload.result.filter((document) => document._type === "certification" && document.slug).map((document) => [document.slug, document]));
    const mergedCredentials = credentials.map((item) => {
      const document = cmsCredentials.get(item.id);
      if (!document) return item;
      return {
        ...item,
        ...(document.kind && { kind: document.kind }),
        ...(document.title && { title: document.title }),
        ...(document.summary && { description: document.summary }),
        ...(document.issuer && { issuer: document.issuer }),
        ...(document.period && { period: document.period }),
        ...(document.credentialId && { credentialId: document.credentialId })
      };
    });
    const knownCredentialIds = new Set(credentials.map((item) => item.id));
    const additionalCredentials: Credential[] = payload.result.flatMap((document) => {
      if (document._type !== "certification" || !document.slug || knownCredentialIds.has(document.slug) || !document.kind || !document.title || !document.summary || !document.issuer || !document.period) return [];
      return [{
        id: document.slug,
        kind: document.kind,
        title: document.title,
        issuer: document.issuer,
        period: document.period,
        description: document.summary,
        ...(document.credentialId && { credentialId: document.credentialId })
      }];
    });
    return { ...fallback, profile: mergedProfile, projects: mergedProjects, credentials: [...mergedCredentials, ...additionalCredentials], source: "sanity" };
  } catch {
    return fallback;
  }
});
