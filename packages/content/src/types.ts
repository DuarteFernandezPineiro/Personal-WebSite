export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export type Link = {
  label: LocalizedText;
  href: string;
  kind: "demo" | "code" | "download" | "external";
};

export type Metric = {
  value: string;
  label: LocalizedText;
  evidence?: string;
};

export type Project = {
  slug: string;
  order: number;
  featured: boolean;
  year: string;
  status: "completed" | "deployed" | "research";
  category: LocalizedText;
  title: LocalizedText;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  role: LocalizedText;
  decisions: LocalizedText[];
  results: LocalizedText[];
  architecture?: LocalizedText[];
  validation?: LocalizedText;
  learning?: LocalizedText;
  scope?: LocalizedText;
  video?: {
    youtubeId: string;
    title: LocalizedText;
    description: LocalizedText;
  };
  technologies: string[];
  metrics: Metric[];
  links: Link[];
};

export type AboutProfile = {
  lead: LocalizedText;
  story: LocalizedText[];
  proposition: LocalizedText;
  strengths: Array<{
    index: string;
    title: LocalizedText;
    description: LocalizedText;
  }>;
  sport: LocalizedText;
};

export type TimelineEntry = {
  period: string;
  title: LocalizedText;
  organization: LocalizedText;
  description: LocalizedText;
  details?: Array<{
    title: LocalizedText;
    description: LocalizedText;
  }>;
};

export type Credential = {
  id: string;
  kind: "degree" | "language" | "applied-skill";
  title: LocalizedText;
  issuer: LocalizedText;
  period: LocalizedText;
  description: LocalizedText;
  credentialId?: string;
};

export type Capability = {
  id: string;
  index: string;
  title: LocalizedText;
  description: LocalizedText;
  tools: string[];
  toolsEn?: string[];
};

export type Hobby = {
  title: LocalizedText;
  description: LocalizedText;
  accent: string;
};

export type SiteProfile = {
  name: string;
  shortName: string;
  role: LocalizedText;
  hero: LocalizedText;
  intro: LocalizedText;
  location: LocalizedText;
  availability: LocalizedText;
  email: string;
  linkedin: string;
  github: string;
};
