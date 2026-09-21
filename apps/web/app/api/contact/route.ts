import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requestIdempotencyKey, sendPortfolioNotification } from "@/lib/server/email-notifications";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(120).optional().default(""),
  topic: z.enum(["opportunity", "collaboration", "project", "other"]),
  message: z.string().trim().min(20).max(4000),
  consent: z.literal("accepted"),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().optional(),
  locale: z.enum(["es", "en"])
});

const windows = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = windows.get(key);
  if (!entry || entry.resetAt < now) {
    windows.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ code: "origin_not_allowed" }, { status: 403 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_384) return NextResponse.json({ code: "payload_too_large" }, { status: 413 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ code: "rate_limited" }, { status: 429 });

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ code: "invalid_payload" }, { status: 400 });

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!parsed.data.turnstileToken) return NextResponse.json({ code: "challenge_required" }, { status: 400 });
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: turnstileSecret, response: parsed.data.turnstileToken, remoteip: ip })
    });
    const result = (await verification.json()) as { success?: boolean };
    if (!result.success) return NextResponse.json({ code: "challenge_failed" }, { status: 403 });
  }

  const { name, email, company, topic, message, locale } = parsed.data;
  const notification = await sendPortfolioNotification({
    idempotencyKey: requestIdempotencyKey("contact", request.headers.get("idempotency-key")),
    replyTo: email,
    subject: `[Portfolio] ${topic} — ${name}`,
    text: [`Locale: ${locale}`, `Name: ${name}`, `Email: ${email}`, `Company: ${company || "—"}`, "", message].join("\n")
  });
  if (!notification.ok) {
    const status = notification.reason === "not_configured" ? 503 : 502;
    return NextResponse.json({ code: notification.reason }, { status });
  }
  return NextResponse.json({ ok: true });
}
