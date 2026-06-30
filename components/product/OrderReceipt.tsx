import { site } from "@/lib/site";
import type { DeliveryResult } from "@/lib/orderSubmission";
import {
  IconWhatsApp,
  IconUser,
  IconPhone,
  IconMapPin,
  IconArrowRight,
} from "@/components/icons";

export interface ReceiptOrder {
  id: string;
  date: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
  total: number;
  saved: number;
  name: string;
  phone: string;
  address: string;
  city: string;
}

interface OrderReceiptProps {
  order: ReceiptOrder;
  /** Pre-filled wa.me link used by the WhatsApp button. */
  whatsappUrl: string;
  /** Background delivery state: null = still saving. */
  delivery: DeliveryResult | null;
  /** Reset back to the order form to place another order. */
  onReset: () => void;
}

const money = (n: number) => `${site.currency} ${n.toLocaleString()}`;

/** Customer-facing status (title + line) based on the background delivery result. */
function deliveryCopy(delivery: DeliveryResult | null): { title: string; text: string; tone: "pending" | "ok" | "warn" } {
  switch (delivery) {
    case "sent":
      return {
        title: "Order placed successfully",
        text: "Your order is confirmed. Our team will arrange delivery and you simply pay cash when it arrives — nothing else to do.",
        tone: "ok",
      };
    case null:
      return {
        title: "Saving your order…",
        text: "Please wait a moment while we save your order.",
        tone: "pending",
      };
    default: // "failed" | "unconfigured"
      return {
        title: "Couldn't save your order",
        text: "There was an error on the website, so your order wasn't saved. Please send it to us on WhatsApp using the button below — we'll process it right away.",
        tone: "warn",
      };
  }
}

/**
 * Order confirmation receipt shown after the customer places an order.
 * The order is already saved server-side — the WhatsApp button here is
 * OPTIONAL (for questions / more details), not required to confirm.
 */
export default function OrderReceipt({ order, whatsappUrl, delivery, onReset }: OrderReceiptProps) {
  const status = deliveryCopy(delivery);
  // Only when auto-save failed does the customer NEED WhatsApp to send the order.
  const needsWhatsApp = delivery === "failed" || delivery === "unconfigured";

  return (
    <div className="animate-pop rounded-3xl border border-line bg-paper p-5 shadow-sm sm:p-8">
      {/* State-aware header icon: spinner while saving, checkmark on success,
          warning on error. */}
      <div className="flex flex-col items-center text-center">
        {delivery === null ? (
          // Saving — animated loading spinner.
          <span className="flex h-20 w-20 items-center justify-center" role="status" aria-label="Saving your order">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-mint border-t-brand" />
          </span>
        ) : needsWhatsApp ? (
          // Error — warning triangle (recoverable via WhatsApp below).
          <span className="animate-pop relative flex h-20 w-20 items-center justify-center" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-amber/15" />
            <svg viewBox="0 0 24 24" className="relative h-10 w-10 text-amber" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              <path d="M12 9v4M12 17h.01" />
            </svg>
          </span>
        ) : (
          // Success — animated, drawn-on checkmark.
          <span className="animate-check relative flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-mint" aria-hidden="true" />
            <span
              className="animate-ring absolute inset-2 rounded-full bg-brand-light"
              aria-hidden="true"
            />
            <svg viewBox="0 0 56 56" className="relative h-12 w-12 text-brand" aria-hidden="true">
              <circle
                className="success-ring"
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                className="success-tick"
                d="M17 29l7 7 15-16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        <h3
          className="animate-fade-up mt-4 text-xl font-bold text-ink"
          style={{ animationDelay: "0.15s" }}
        >
          {status.title}
        </h3>
        <p
          className={`animate-fade-up mt-1 text-sm ${
            status.tone === "warn" ? "text-sale" : status.tone === "pending" ? "text-muted" : "text-body"
          }`}
          style={{ animationDelay: "0.25s" }}
        >
          {status.text}
        </p>
      </div>

      {/* Order meta */}
      <div
        className="animate-fade-up mt-6 flex items-center justify-between rounded-2xl bg-cloud px-4 py-3 text-sm"
        style={{ animationDelay: "0.32s" }}
      >
        <span className="font-semibold text-ink">Order #{order.id}</span>
        <span className="text-muted">{order.date}</span>
      </div>

      {/* Itemized */}
      <div className="animate-fade-up mt-5" style={{ animationDelay: "0.4s" }}>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Order summary
        </h4>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-start justify-between gap-3">
            <span className="text-ink">
              <span dir="rtl" lang="ur" className="font-urdu">{order.productName}</span>
              <span className="text-muted"> · {order.variantLabel}</span>
              <span className="block text-xs text-muted">
                {money(order.unitPrice)} × {order.quantity}
              </span>
            </span>
            <span className="whitespace-nowrap font-medium text-ink">
              {money(order.unitPrice * order.quantity)}
            </span>
          </div>
          {order.saved > 0 ? (
            <div className="flex items-center justify-between">
              <span className="text-body">You save</span>
              <span className="font-semibold text-brand">− {money(order.saved)}</span>
            </div>
          ) : null}
          <div className="mt-1 flex items-center justify-between border-t border-line pt-3">
            <span className="font-semibold text-ink">Total payable</span>
            <span className="text-lg font-extrabold text-ink">{money(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Customer details */}
      <div className="animate-fade-up mt-5" style={{ animationDelay: "0.48s" }}>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Delivery details
        </h4>
        <ul className="mt-3 space-y-2.5 text-sm">
          <li className="flex items-center gap-2.5 text-ink">
            <IconUser size={16} className="text-muted" />
            {order.name}
          </li>
          <li className="flex items-center gap-2.5 text-ink">
            <IconPhone size={16} className="text-muted" />
            {order.phone}
          </li>
          <li className="flex items-start gap-2.5 text-ink">
            <IconMapPin size={16} className="mt-0.5 shrink-0 text-muted" />
            {order.address}, {order.city}
          </li>
        </ul>
      </div>

      {/* WhatsApp */}
      {needsWhatsApp ? (
        // Auto-save failed → WhatsApp is the way to actually send the order.
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay: "0.56s" }}
          className="animate-fade-up mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-dark sm:text-base"
        >
          <IconWhatsApp size={22} />
          Send my order on WhatsApp
        </a>
      ) : (
        // Order is already placed → WhatsApp is OPTIONAL, just for questions.
        <div
          className="animate-fade-up mt-6 rounded-2xl border border-line bg-cloud p-4 text-center"
          style={{ animationDelay: "0.56s" }}
        >
          <p className="text-sm text-body">
            If you’d like, you can chat with us on WhatsApp for any questions or
            more details — your order is already placed, so this is optional.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand bg-paper px-5 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            <IconWhatsApp size={20} />
            Chat on WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold text-body transition-colors hover:text-brand"
      >
        Place another order
        <IconArrowRight size={16} />
      </button>
    </div>
  );
}
