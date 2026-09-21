import { profile } from "@duarte/content";

export const PORTFOLIO_INBOX = profile.email;

type NotificationInput = {
  subject: string;
  text: string;
  replyTo?: string;
  idempotencyKey: string;
};

export type NotificationResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "delivery_failed" };

export function requestIdempotencyKey(prefix: string, supplied: string | null) {
  const value = supplied?.trim();
  const safeValue = value && /^[a-zA-Z0-9_-]{8,128}$/.test(value) ? value : crypto.randomUUID();
  return `${prefix}-${safeValue}`;
}

export async function sendPortfolioNotification(input: NotificationInput): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !from) return { ok: false, reason: "not_configured" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": input.idempotencyKey
      },
      body: JSON.stringify({
        from,
        to: [PORTFOLIO_INBOX],
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
        subject: input.subject,
        text: input.text
      }),
      signal: AbortSignal.timeout(10_000)
    });
    return response.ok ? { ok: true } : { ok: false, reason: "delivery_failed" };
  } catch {
    return { ok: false, reason: "delivery_failed" };
  }
}
