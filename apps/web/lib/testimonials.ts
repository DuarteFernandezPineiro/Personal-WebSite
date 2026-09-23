import { z } from "zod";

export const relationshipValues = ["teacher", "classmate", "coworker", "other"] as const;

export const testimonialSubmissionSchema = z.object({
  relationship: z.enum(relationshipValues),
  otherRelationship: z.string().trim().max(80).optional().default(""),
  name: z.string().trim().max(80).optional().default(""),
  anonymous: z.boolean().optional().default(false),
  comment: z.string().trim().min(1).max(1400),
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

export type SanityTestimonial = {
  _id?: string;
  relationship?: PublicTestimonial["relationship"];
  otherRelationship?: string;
  displayName?: string;
  anonymous?: boolean;
  comment?: string;
  submittedAt?: string;
};

export const approvedTestimonialsQuery = `*[_type == "testimonial" && status == "approved"] | order(submittedAt desc){_id,relationship,otherRelationship,displayName,anonymous,comment,submittedAt}`;

export function getTestimonialsSanityConfig() {
  const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  return {
    projectId: rawProjectId?.trim() || "",
    dataset: rawDataset?.trim() || "production",
    projectIdDefined: Boolean(rawProjectId?.trim()),
    datasetDefined: Boolean(rawDataset?.trim())
  };
}

export function getApprovedTestimonialsUrl(projectId: string, dataset: string) {
  if (!projectId) return "";
  return `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(approvedTestimonialsQuery)}`;
}

export function mapApprovedTestimonials(items: SanityTestimonial[]): PublicTestimonial[] {
  return items.flatMap((item) => {
    const missingFields = [
      !item._id && "_id",
      !item.relationship && "relationship",
      !item.comment && "comment",
      !item.submittedAt && "submittedAt"
    ].filter((field): field is string => Boolean(field));

    if (missingFields.length) {
      console.warn("[testimonials] Discarded Sanity testimonial", {
        id: item._id?.slice(0, 100) || "(missing)",
        reason: "missing_required_fields",
        fields: missingFields
      });
      return [];
    }

    return [{
      id: item._id as string,
      relationship: item.relationship as PublicTestimonial["relationship"],
      ...(item.otherRelationship && { otherRelationship: item.otherRelationship }),
      anonymous: Boolean(item.anonymous),
      displayName: item.anonymous ? "" : item.displayName?.trim() || "",
      comment: item.comment as string,
      submittedAt: item.submittedAt as string
    }];
  });
}

export async function getApprovedTestimonials(): Promise<PublicTestimonial[]> {
  const { projectId, dataset } = getTestimonialsSanityConfig();
  if (!projectId) return [];

  const endpoint = getApprovedTestimonialsUrl(projectId, dataset);
  try {
    const response = await fetch(endpoint, { next: { revalidate: 60, tags: ["testimonials"] } });
    if (!response.ok) return [];
    const payload = (await response.json()) as { result?: SanityTestimonial[] };
    return mapApprovedTestimonials(payload.result ?? []);
  } catch (error) {
    console.error("[testimonials] Sanity read failed", {
      error: error instanceof Error ? error.name : "unknown_error"
    });
    return [];
  }
}
