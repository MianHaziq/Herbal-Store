import { site } from "@/lib/site";
import type { DeliveryResult } from "@/lib/orderSubmission";
import {
  IconCheck,
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
}

interface OrderReceiptProps {
  order: ReceiptOrder;
  /** Pre-filled wa.me link used by the "Chat on WhatsApp" button. */
  whatsappUrl: string;
  /** Background delivery state: null = still sending. */
  delivery: DeliveryResult | null;
  /** Reset back to the order form to place another order. */
  onReset: () => void;
}

const money = (n: number) => `${site.currency} ${n.toLocaleString()}`;

/** Customer-facing status line based on the background delivery result. */
function deliveryCopy(delivery: DeliveryResult | null): { text: string; tone: "pending" | "ok" | "warn" } {
  switch (delivery) {
    case "sent":
      return { text: "Your order has been received. We'll confirm it shortly — pay cash on delivery.", tone: "ok" };
    case null:
      return { text: "Sending your order to our team…", tone: "pending" };
    default: // "failed" | "unconfigured"
      return {
        text: "Almost done! Please tap “Chat on WhatsApp” below to send us your order and confirm it.",
        tone: "warn",
      };
  }
}

/**
 * Order confirmation receipt shown after the customer places an order.
 * Displays an order number, itemized total, and the customer's details,
 * plus a "Chat on WhatsApp" button carrying the same pre-filled order.
 */
export default function OrderReceipt({ order, whatsappUrl, delivery, onReset }: OrderReceiptProps) {
  const status = deliveryCopy(delivery);

  return (
    <div className="rounded-3xl border border-line bg-paper p-5 shadow-sm sm:p-8">
      {/* Success header */}
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-brand">
          <IconCheck size={30} />
        </span>
        <h3 className="mt-4 text-xl font-bold text-ink">Order placed successfully</h3>
        <p
          className={`mt-1 text-sm ${
            status.tone === "warn" ? "text-sale" : status.tone === "pending" ? "text-muted" : "text-body"
          }`}
        >
          {status.text}
        </p>
      </div>

      {/* Order meta */}
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-cloud px-4 py-3 text-sm">
        <span className="font-semibold text-ink">Order #{order.id}</span>
        <span className="text-muted">{order.date}</span>
      </div>

      {/* Itemized */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Order summary
        </h4>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-start justify-between gap-3">
            <span className="text-ink">
              {order.productName}
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
      <div className="mt-5">
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
            {order.address}
          </li>
        </ul>
      </div>

      {/* Confirm on WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-dark sm:text-base"
      >
        <IconWhatsApp size={22} />
        Chat on WhatsApp to confirm
      </a>

      <button
        type="button"
        onClick={onReset}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-line px-5 py-3 text-sm font-semibold text-body transition-colors hover:border-brand hover:text-brand"
      >
        Place another order
        <IconArrowRight size={16} />
      </button>
    </div>
  );
}
