import { afterEach, describe, expect, it, vi } from "vitest";
import { PORTFOLIO_INBOX, requestIdempotencyKey, sendPortfolioNotification } from "./email-notifications";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("portfolio email notifications", () => {
  it("uses the canonical public inbox", () => {
    expect(PORTFOLIO_INBOX).toBe("dfernandezpineiro@gmail.com");
  });

  it("does not call an external provider without server credentials", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendPortfolioNotification({
      idempotencyKey: "contact-12345678",
      subject: "Test",
      text: "Test body"
    })).resolves.toEqual({ ok: false, reason: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends server-side mail to the canonical inbox", async () => {
    vi.stubEnv("RESEND_API_KEY", "server-secret");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Portfolio <portfolio@example.com>");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendPortfolioNotification({
      idempotencyKey: requestIdempotencyKey("testimonial", "12345678-abcd"),
      replyTo: "author@example.com",
      subject: "New testimonial",
      text: "Pending review"
    })).resolves.toEqual({ ok: true });

    const [, request] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(request.body)) as { to: string[]; reply_to: string };
    expect(body.to).toEqual(["dfernandezpineiro@gmail.com"]);
    expect(body.reply_to).toBe("author@example.com");
    expect(request.headers).toMatchObject({ "Idempotency-Key": "testimonial-12345678-abcd" });
  });
});
