import { defineArrayMember, defineField, defineType } from "sanity";

const localizedString = defineType({
  name: "localizedString",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "es", title: "Español", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "en", title: "English", type: "string", validation: (rule) => rule.required() })
  ]
});

const localizedText = defineType({
  name: "localizedText",
  title: "Localized long text",
  type: "object",
  fields: [
    defineField({ name: "es", title: "Español", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "en", title: "English", type: "text", rows: 5, validation: (rule) => rule.required() })
  ]
});

const provenanceFields = [
  defineField({ name: "status", title: "Editorial status", type: "string", initialValue: "draft", options: { list: ["draft", "published"] }, validation: (rule) => rule.required() }),
  defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  defineField({ name: "visible", title: "Public", type: "boolean", initialValue: true }),
  defineField({ name: "confidential", title: "Confidential", type: "boolean", initialValue: false }),
  defineField({ name: "source", title: "Claim source", type: "string", description: "CV, repository, certificate, interview or verified metric." })
];

const asset = defineType({
  name: "mediaAsset",
  title: "Media asset",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "asset", title: "Image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "altEs", title: "Alt text · ES", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "altEn", title: "Alt text · EN", type: "string", validation: (rule) => rule.required() }),
    ...provenanceFields
  ],
  preview: { select: { title: "title.es", media: "asset" } }
});

function editorialDocument(name: string, title: string, extra: ReturnType<typeof defineField>[] = []) {
  return defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({ name: "title", title: "Title", type: "localizedString", validation: (rule) => rule.required() }),
      defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.es" }, validation: (rule) => rule.required() }),
      defineField({ name: "summary", title: "Summary", type: "localizedText" }),
      ...extra,
      ...provenanceFields
    ],
    preview: { select: { title: "title.es", subtitle: "status" } }
  });
}

const project = editorialDocument("project", "Project", [
  defineField({ name: "year", title: "Year", type: "string" }),
  defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  defineField({ name: "technologies", title: "Technologies", type: "array", of: [defineArrayMember({ type: "string" })] }),
  defineField({ name: "problem", title: "Problem", type: "localizedText" }),
  defineField({ name: "contribution", title: "Personal contribution", type: "localizedText" }),
  defineField({ name: "decisions", title: "Decisions", type: "array", of: [defineArrayMember({ type: "localizedText" })] }),
  defineField({ name: "architecture", title: "Architecture stages", type: "array", of: [defineArrayMember({ type: "localizedText" })] }),
  defineField({ name: "results", title: "Results", type: "array", of: [defineArrayMember({ type: "localizedText" })] }),
  defineField({ name: "validation", title: "Validation", type: "localizedText" }),
  defineField({ name: "learning", title: "Key learning", type: "localizedText" }),
  defineField({ name: "scope", title: "Scope and limitations", type: "localizedText" }),
  defineField({ name: "youtubeId", title: "YouTube video ID", type: "string" }),
  defineField({ name: "metrics", title: "Verified metrics", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "value", type: "string" }), defineField({ name: "label", type: "localizedString" }), defineField({ name: "source", type: "string" })] })] }),
  defineField({ name: "media", title: "Media", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "mediaAsset" }] })] })
]);

const profile = defineType({
  name: "profile", title: "Profile", type: "document",
  fields: [
    defineField({ name: "name", title: "Public name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Role", type: "localizedString" }),
    defineField({ name: "intro", title: "Introduction", type: "localizedText" }),
    defineField({ name: "story", title: "Personal story", type: "array", of: [defineArrayMember({ type: "localizedText" })] }),
    defineField({ name: "proposition", title: "Professional proposition", type: "localizedText" }),
    defineField({ name: "sport", title: "Sport and discipline", type: "localizedText" }),
    defineField({ name: "portrait", title: "Professional portrait", type: "reference", to: [{ type: "mediaAsset" }] }),
    defineField({ name: "lifestyleImage", title: "Personal dimension image", type: "reference", to: [{ type: "mediaAsset" }] }),
    defineField({ name: "availability", title: "Availability", type: "localizedString" }),
    defineField({ name: "location", title: "Public location", type: "localizedString" }),
    defineField({ name: "email", title: "Public email", type: "email" }),
    ...provenanceFields
  ]
});

const siteSettings = defineType({
  name: "siteSettings", title: "Site settings", type: "document",
  fields: [
    defineField({ name: "title", title: "Site title", type: "localizedString" }),
    defineField({ name: "description", title: "SEO description", type: "localizedText" }),
    defineField({ name: "contactEnabled", title: "Contact form enabled", type: "boolean", initialValue: true }),
    defineField({ name: "chatEnabled", title: "Chat enabled", type: "boolean", initialValue: true }),
    defineField({ name: "audioEnabled", title: "Ambient audio enabled", type: "boolean", initialValue: true })
  ]
});

const chatSource = defineType({
  name: "chatSource", title: "Chat source", type: "document",
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "content", title: "Controlled content", type: "localizedText" }),
    defineField({ name: "priority", title: "Retrieval priority", type: "number", initialValue: 0 }),
    ...provenanceFields
  ]
});

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "relationship", title: "Relationship", type: "string", options: { list: [
      { title: "Teacher", value: "teacher" },
      { title: "Classmate", value: "classmate" },
      { title: "Coworker", value: "coworker" },
      { title: "Other", value: "other" }
    ] }, validation: (rule) => rule.required() }),
    defineField({ name: "otherRelationship", title: "Other relationship", type: "string" }),
    defineField({ name: "displayName", title: "Public name", type: "string" }),
    defineField({ name: "anonymous", title: "Publish anonymously", type: "boolean", initialValue: false }),
    defineField({ name: "comment", title: "Comment", type: "text", rows: 7, validation: (rule) => rule.required().min(30).max(1400) }),
    defineField({ name: "locale", title: "Submission language", type: "string", options: { list: ["es", "en"] }, validation: (rule) => rule.required() }),
    defineField({ name: "consentToPublish", title: "Consent to publish", type: "boolean", readOnly: true }),
    defineField({ name: "submittedAt", title: "Submitted at", type: "datetime", readOnly: true }),
    defineField({ name: "status", title: "Moderation status", type: "string", initialValue: "pending", options: { list: [
      { title: "Pending review", value: "pending" },
      { title: "Approved", value: "approved" },
      { title: "Rejected", value: "rejected" }
    ] }, validation: (rule) => rule.required() })
  ],
  preview: {
    select: { name: "displayName", anonymous: "anonymous", subtitle: "relationship", status: "status" },
    prepare: ({ name, anonymous, subtitle, status }) => ({ title: anonymous ? "Anonymous" : name || "Unnamed", subtitle: `${subtitle || "Unknown"} · ${status || "pending"}` })
  }
});

export const schemaTypes = [
  localizedString, localizedText, profile,
  editorialDocument("experience", "Experience", [defineField({ name: "period", type: "string" }), defineField({ name: "organization", type: "localizedString" })]),
  editorialDocument("education", "Education", [defineField({ name: "period", type: "string" }), defineField({ name: "institution", type: "localizedString" })]),
  editorialDocument("certification", "Certification", [
    defineField({ name: "kind", title: "Credential type", type: "string", options: { list: [{ title: "University degree", value: "degree" }, { title: "Language", value: "language" }, { title: "Applied skill", value: "applied-skill" }] }, validation: (rule) => rule.required() }),
    defineField({ name: "period", title: "Period or issue date", type: "localizedString", validation: (rule) => rule.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "localizedString", validation: (rule) => rule.required() }),
    defineField({ name: "credentialId", title: "Credential ID", type: "string" }),
    defineField({ name: "credentialUrl", title: "Public verification URL", type: "url" })
  ]),
  project,
  editorialDocument("skill", "Skill", [defineField({ name: "tools", type: "array", of: [defineArrayMember({ type: "string" })] })]),
  editorialDocument("hobby", "Hobby", [defineField({ name: "accent", type: "string" })]),
  asset, siteSettings, chatSource, testimonial
];
