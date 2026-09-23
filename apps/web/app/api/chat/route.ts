import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHAT_API_URL = (process.env.CHAT_API_URL || process.env.NEXT_PUBLIC_CHAT_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const CHAT_PROXY_SECRET = process.env.CHAT_PROXY_SECRET?.trim() || "";

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-vercel-forwarded-for")
    || request.headers.get("x-forwarded-for")
    || request.headers.get("x-real-ip")
    || "unknown";
  const candidate = forwarded.split(",", 1)[0].trim();
  return /^[0-9a-f:.]{1,64}$/i.test(candidate) ? candidate : "unknown";
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_768) return ndjsonError("La consulta es demasiado grande.", 413);

  try {
    const upstream = await fetch(`${CHAT_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "content-type": request.headers.get("content-type") || "application/json",
        "origin": request.headers.get("origin") || request.nextUrl.origin,
        "x-chat-client-ip": clientIp(request),
        ...(CHAT_PROXY_SECRET ? { "x-chat-proxy-secret": CHAT_PROXY_SECRET } : {}),
        ...(request.headers.get("cookie") ? { cookie: request.headers.get("cookie") as string } : {})
      },
      body: await request.text(),
      cache: "no-store",
      signal: request.signal
    });

    const headers = new Headers();
    headers.set("content-type", upstream.headers.get("content-type") || "application/x-ndjson; charset=utf-8");
    headers.set("cache-control", "no-store, no-transform");
    const cookie = upstream.headers.get("set-cookie");
    if (cookie) headers.set("set-cookie", cookie);

    return new Response(upstream.body, { status: upstream.status, headers });
  } catch {
    return ndjsonError("El asistente no está disponible en este momento.", 503);
  }
}

function ndjsonError(message: string, status: number) {
  return new Response(`${JSON.stringify({ type: "error", message })}\n`, {
    status,
    headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" }
  });
}
