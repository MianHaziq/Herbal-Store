import { site } from "@/lib/site";
import type { OrderDetails } from "@/lib/whatsapp";

export interface SubmittableOrder extends OrderDetails {
  id: string;
  date: string;
}

export type DeliveryResult = "sent" | "failed" | "unconfigured";

/**
 * Sends an order to our serverless endpoint (`/api/order`), which writes it to
 * the Google Sheet server-side with retry and returns the REAL result.
 *
 * Because this is a same-origin request, we can read the response — so "sent"
 * here means the order was genuinely confirmed, not just "request left the
 * browser". `keepalive` lets the request finish even if the page is closing.
 */
export async function submitOrder(order: SubmittableOrder): Promise<DeliveryResult> {
  const payload = {
    order_id: order.id,
    date: order.date,
    product: `${order.productName} (${order.variantLabel})`,
    quantity: order.quantity,
    total: `${site.currency} ${order.total.toLocaleString()}`,
    name: order.name,
    phone: order.phone,
    address: order.address,
  };

  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    const data = (await res.json().catch(() => ({ ok: false }))) as {
      ok?: boolean;
      configured?: boolean;
    };
    if (data.configured === false) return "unconfigured";
    return data.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
