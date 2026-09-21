import { z } from "zod";

export const relationshipValues = ["teacher", "classmate", "coworker", "other"] as const;

export const testimonialSubmissionSchema = z.object({
  relationship: z.enum(relationshipValues),
  otherRelationship: z.string().trim().max(80).optional().default(""),
  name: z.string().trim().max(80).optional().default(""),
  anonymous: z.boolean().optional().default(false),
  comment: z.string().trim().min(30).max(1400),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""),
  locale: z.enum(["es", "en"])
}).superRefine((value, context) => {
  if (value.relationship === "other" && value.otherRelationship.length < 2) {
    context.addIssue({ code: "custom", path: ["otherRelationship"], message: "required_for_other" });
  }
  if (!value.anonymous && value.name.length < 2) {
    context.addIssue({ code: "custom", path: ["name"], message: "name_or_anonymous_required" });
  }
});

export type TestimonialSubmission = z.infer<typeof testimonialSubmissionSchema>;

export type PublicTestimonial = {
  id: string;
  relationship: (typeof relationshipValues)[number];
  otherRelationship?: string;
  anonymous: boolean;
  displayName: string;
  comment: string;
  submittedAt: string;
};

type SanityTestimonial = {
  _id?: string;
  relationship?: PublicTestimonial["relationship"];
  otherRelationship?: string;
  displayName?: string;
  anonymous?: boolean;
  comment?: string;
  submittedAt?: string;
};

export async function getApprovedTestimonials(): Promise<PublicTestimonial[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  if (!projectId) return [];

  const query = `*[_type == "testimonial" && status == "approved"] | order(submittedAt desc){_id,relationship,otherRelationship,displayName,anonymous,comment,submittedAt}`;
  const endpoint = `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(endpoint, { next: { revalidate: 60, tags: ["testimonials"] } });
    if (!response.ok) return [];
    const payload = (await response.json()) as { result?: SanityTestimonial[] };
    return (payload.result ?? []).flatMap((item) => {
      if (!item._id || !item.relationship || !item.comment || !item.submittedAt) return [];
      return [{
        id: item._id,
        relationship: item.relationship,
        ...(item.otherRelationship && { otherRelationship: item.otherRelationship }),
        anonymous: Boolean(item.anonymous),
        displayName: item.anonymous ? "" : item.displayName?.trim() || "",
        comment: item.comment,
        submittedAt: item.submittedAt
      }];
    });
  } catch {
    return [];
  }
}
