/**
 * Serverless order endpoint (runs on Vercel/Netlify, free tier).
 *
 * The browser POSTs the order here (same-origin, so the response is readable).
 * This handler then writes it to the Google Sheet SERVER-SIDE, where it can:
 *   - read Google's real response (no "no-cors" blindness),
 *   - retry automatically on transient failures,
 *   - keep the Sheet URL secret (server env var, not in client code).
 * It returns the TRUE success/failure to the browser.
 */
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface OrderPayload {
  order_id: string;
  date: string;
  product: string;
  quantity: number;
  total: string;
  name: string;
  phone: string;
  address: string;
}

const REQUIRED: (keyof OrderPayload)[] = ["name", "phone", "address", "product", "total"];

/** POST the order to the Apps Script URL, returning true only on a confirmed write. */
async function writeToSheet(url: string, payload: OrderPayload): Promise<boolean> {
  const attempts = 3;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
      });
      const text = (await res.text()).trim().toLowerCase();
      if (res.ok && text.includes("ok")) return true;
    } catch {
      // network error / timeout — fall through to retry
    }
    // Backoff before the next try (0.4s, 0.8s).
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
  return false;
}

export async function POST(req: Request) {
  let body: Partial<OrderPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Validate required fields.
  for (const key of REQUIRED) {
    if (!body[key] || String(body[key]).trim() === "") {
      return NextResponse.json({ ok: false, error: `Missing ${key}` }, { status: 400 });
    }
  }

  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    // No channel configured — tell the client so it can fall back to WhatsApp.
    return NextResponse.json({ ok: false, configured: false }, { status: 200 });
  }

  const ok = await writeToSheet(url, body as OrderPayload);
  return NextResponse.json({ ok, configured: true }, { status: ok ? 200 : 502 });
}
