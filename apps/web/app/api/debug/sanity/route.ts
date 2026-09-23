import { NextResponse } from "next/server";
import {
  getApprovedTestimonialsUrl,
  getTestimonialsSanityConfig,
  mapApprovedTestimonials,
  type SanityTestimonial
} from "@/lib/testimonials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizedError(error: unknown) {
  if (error instanceof SyntaxError) return "invalid_sanity_json";
  if (error instanceof TypeError) return "sanity_request_failed";
  return "unexpected_sanity_error";
}

export async function GET() {
  const config = getTestimonialsSanityConfig();
  const queryUrl = getApprovedTestimonialsUrl(config.projectId, config.dataset);
  const base = {
    projectId: config.projectId,
    dataset: config.dataset,
    isProjectIdDefined: config.projectIdDefined,
    isDatasetDefined: config.datasetDefined,
    queryUrl,
    sanityStatus: null as number | null,
    directResultCount: 0,
    mappedResultCount: 0,
    error: null as string | null
  };

  if (!config.projectId) {
    console.error("[debug/sanity] Testimonial read cannot start: NEXT_PUBLIC_SANITY_PROJECT_ID is missing");
    return NextResponse.json(
      { ...base, error: "missing_project_id" },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const response = await fetch(queryUrl, { cache: "no-store" });
    base.sanityStatus = response.status;
    if (!response.ok) {
      console.error("[debug/sanity] Sanity returned a non-success status", { status: response.status });
      return NextResponse.json(
        { ...base, error: `sanity_http_${response.status}` },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const payload = (await response.json()) as { result?: SanityTestimonial[] };
    const directResults = Array.isArray(payload.result) ? payload.result : [];
    const mappedResults = mapApprovedTestimonials(directResults);

    return NextResponse.json(
      {
        ...base,
        directResultCount: directResults.length,
        mappedResultCount: mappedResults.length
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    const code = sanitizedError(error);
    console.error("[debug/sanity] Sanity testimonial diagnostic failed", { error: code });
    return NextResponse.json(
      { ...base, error: code },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
