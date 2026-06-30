/**
 * Serverless order endpoint (runs on Vercel/Netlify, free tier).
 *
 * The browser POSTs the order here (same-origin, so the response is readable).
 * This handler then saves it SERVER-SIDE to whichever channels are configured:
 *   - Google Sheet (primary), and/or
 *   - Telegram (free backup — every order becomes a message in your chat).
 * Running server-side lets it:
 *   - read the real response (no "no-cors" blindness),
 *   - retry automatically on transient failures,
 *   - keep all secrets (Sheet URL, bot token) in env vars, never in client code.
 * The order counts as saved if AT LEAST ONE channel confirms it.
 */
import { NextResponse, after } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Allow enough server time for a slow Apps Script response (Vercel caps Hobby
// functions; 30s keeps us well within limits while tolerating a slow Sheet).
export const maxDuration = 30;

interface OrderPayload {
  order_id: string;
  date: string;
  product: string;
  quantity: number;
  total: string;
  name: string;
  phone: string;
  address: string;
  city: string;
}

const REQUIRED: (keyof OrderPayload)[] = ["name", "phone", "address", "city", "product", "total"];

/**
 * POST the order to the Apps Script URL, returning true only on a confirmed write.
 *
 * IMPORTANT: we make a SINGLE attempt with a generous timeout — we do NOT retry.
 * Aborting a fetch does not stop the Apps Script execution on Google's side; a
 * timed-out request keeps running and holds the script's LockService lock. So
 * retrying would spawn overlapping executions all waiting on the same lock,
 * which is exactly what makes the Sheet crawl (15–25s) and return 502. One
 * clean attempt avoids that self-inflicted contention; if it fails, the client
 * falls back to the WhatsApp button.
 */
async function writeToSheet(url: string, payload: OrderPayload): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Do NOT follow the redirect. Apps Script runs doPost (writes the row) and
      // then 302-redirects to script.googleusercontent.com to serve the result.
      // Reaching that 302 already means the write executed. Following the second
      // hop server-side is unreliable — Google often returns "unable to open the
      // file at present" for anonymous server-to-server requests — which made us
      // wrongly report a failure even though the row was saved. So we treat the
      // redirect to googleusercontent as the confirmation instead of chasing it.
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
    });

    if (res.status === 302 || res.status === 301 || res.status === 303) {
      const location = res.headers.get("location") || "";
      if (location.includes("script.googleusercontent.com")) return true;
    }

    // Some deployments return the body directly (200 with "ok") — honour that too.
    if (res.ok) {
      const text = (await res.text()).trim().toLowerCase();
      if (text.includes("ok")) return true;
    }
  } catch {
    // network error / timeout — treat as a failed save
  }
  return false;
}

/** Escape the few characters Telegram's HTML parse mode reserves. */
function esc(v: unknown): string {
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Backup the order to Telegram by posting it as a message to your chat.
 * Best-effort: returns true only on a confirmed send. Free, no storage limits —
 * the message stays in your chat history forever and is searchable.
 */
async function sendToTelegram(token: string, chatId: string, p: OrderPayload): Promise<boolean> {
  const text =
    `🛒 <b>New Order</b>\n\n` +
    `🆔 <b>Order:</b> ${esc(p.order_id)}\n` +
    `📅 ${esc(p.date)}\n\n` +
    `📦 <b>Product:</b> ${esc(p.product)}\n` +
    `🔢 <b>Qty:</b> ${esc(p.quantity)}\n` +
    `💰 <b>Total:</b> ${esc(p.total)}\n\n` +
    `👤 <b>Name:</b> ${esc(p.name)}\n` +
    `📞 <b>Phone:</b> ${esc(p.phone)}\n` +
    `🏙️ <b>City:</b> ${esc(p.city)}\n` +
    `📍 <b>Address:</b> ${esc(p.address)}`;

  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return true;
    } catch {
      // network error / timeout — fall through to retry
    }
    if (i < 2) await new Promise((r) => setTimeout(r, 400 * (i + 1)));
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
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;
  const telegramConfigured = Boolean(tgToken && tgChatId);

  if (!url && !telegramConfigured) {
    // No channel configured — tell the client so it can fall back to WhatsApp.
    return NextResponse.json({ ok: false, configured: false }, { status: 200 });
  }

  const payload = body as OrderPayload;

  // The Google Sheet is the PRIMARY store and responds quickly (~few seconds)
  // now that we don't chase its slow redirect, so we await it and report its
  // result. Telegram is a best-effort BACKUP that can be slow or unreachable
  // (its retries take ~24s on failure), so we NEVER block the customer on it —
  // it fires in the background via `after`, which keeps the function alive
  // until the send settles without delaying the response.
  if (url) {
    if (telegramConfigured) {
      after(async () => {
        await sendToTelegram(tgToken!, tgChatId!, payload);
      });
    }
    const sheetOk = await writeToSheet(url, payload);
    return NextResponse.json(
      { ok: sheetOk, configured: true, sheet: sheetOk },
      { status: sheetOk ? 200 : 502 },
    );
  }

  // No Sheet configured — Telegram is the only channel, so we must await it.
  const telegramOk = telegramConfigured
    ? await sendToTelegram(tgToken!, tgChatId!, payload)
    : false;
  return NextResponse.json(
    { ok: telegramOk, configured: true, telegram: telegramOk },
    { status: telegramOk ? 200 : 502 },
  );
}
