import { NextRequest, NextResponse } from "next/server";
import { requestIdempotencyKey, sendPortfolioNotification } from "@/lib/server/email-notifications";
import { getApprovedTestimonials, testimonialSubmissionSchema } from "@/lib/testimonials";

const windows = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = windows.get(key);
  if (!entry || entry.resetAt < now) {
    windows.set(key, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 3;
}

export async function GET() {
  return NextResponse.json({ items: await getApprovedTestimonials() });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ code: "origin_not_allowed" }, { status: 403 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 8_192) return NextResponse.json({ code: "payload_too_large" }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ code: "rate_limited" }, { status: 429 });

  const parsed = testimonialSubmissionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ code: "invalid_payload" }, { status: 400 });

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!projectId || !token) return NextResponse.json({ code: "not_configured" }, { status: 503 });

  const { relationship, otherRelationship, anonymous, name, comment, locale } = parsed.data;
  const idempotencyKey = requestIdempotencyKey("testimonial", request.headers.get("idempotency-key"));
  const documentId = idempotencyKey.replace(/[^a-zA-Z0-9_-]/g, "-");
  const document = {
    _id: documentId,
    _type: "testimonial",
    relationship,
    otherRelationship: relationship === "other" ? otherRelationship : "",
    displayName: anonymous ? "" : name,
    anonymous,
    comment,
    locale,
    consentToPublish: true,
    status: "pending",
    submittedAt: new Date().toISOString()
  };

  const response = await fetch(`https://${projectId}.api.sanity.io/v2025-02-19/data/mutate/${dataset}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ createIfNotExists: document }] })
  });
  if (!response.ok) return NextResponse.json({ code: "storage_failed" }, { status: 502 });

  const notification = await sendPortfolioNotification({
    idempotencyKey,
    subject: `[Portfolio] Nueva opinión pendiente — ${anonymous ? "Anónimo" : name}`,
    text: [
      "A new testimonial is waiting for moderation in Sanity Studio.",
      `Document: ${documentId}`,
      `Dataset: ${dataset}`,
      `Locale: ${locale}`,
      `Relationship: ${relationship === "other" ? otherRelationship : relationship}`,
      `Public name: ${anonymous ? "Anonymous" : name}`,
      "",
      comment
    ].join("\n")
  });

  return NextResponse.json({ ok: true, pending: true, notified: notification.ok }, { status: 202 });
}
