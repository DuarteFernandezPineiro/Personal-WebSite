import { describe, expect, it } from "vitest";
import { approvedTestimonialsQuery, testimonialSubmissionSchema } from "./testimonials";

const validSubmission = {
  relationship: "coworker" as const,
  otherRelationship: "",
  name: "Ana Ejemplo",
  anonymous: false,
  comment: "Trabajar con Duarte fue una experiencia colaborativa, rigurosa y muy positiva.",
  consent: true as const,
  website: "",
  locale: "es" as const
};

describe("testimonial submission validation", () => {
  it("only reads approved testimonials with publication consent", () => {
    expect(approvedTestimonialsQuery).toContain('status == "approved"');
    expect(approvedTestimonialsQuery).toContain("consentToPublish == true");
    expect(approvedTestimonialsQuery).not.toContain("locale ==");
  });

  it("accepts an identified professional testimonial", () => {
    expect(testimonialSubmissionSchema.safeParse(validSubmission).success).toBe(true);
  });

  it("allows an anonymous testimonial without a name", () => {
    expect(testimonialSubmissionSchema.safeParse({ ...validSubmission, anonymous: true, name: "" }).success).toBe(true);
  });

  it("requires a description for another relationship", () => {
    expect(testimonialSubmissionSchema.safeParse({ ...validSubmission, relationship: "other", otherRelationship: "" }).success).toBe(false);
  });

  it("accepts short comments but rejects empty and honeypot submissions", () => {
    expect(testimonialSubmissionSchema.safeParse({ ...validSubmission, comment: "Muy bien." }).success).toBe(true);
    expect(testimonialSubmissionSchema.safeParse({ ...validSubmission, comment: "   " }).success).toBe(false);
    expect(testimonialSubmissionSchema.safeParse({ ...validSubmission, website: "spam.example" }).success).toBe(false);
  });
});
