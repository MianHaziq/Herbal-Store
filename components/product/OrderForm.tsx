"use client"; // needs useState for form fields, variant/quantity selection, and submit state

import { useEffect, useMemo, useState } from "react";

import { site } from "@/lib/site";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { submitOrder, type DeliveryResult } from "@/lib/orderSubmission";
import type { Product } from "@/lib/types";
import OrderReceipt, { type ReceiptOrder } from "@/components/product/OrderReceipt";
import {
  IconUser,
  IconPhone,
  IconMapPin,
  IconBuilding,
  IconTruck,
  IconPlus,
  IconMinus,
} from "@/components/icons";

interface OrderFormProps {
  product: Product;
}

type Status = "idle" | "error" | "success";

interface PlacedOrder {
  data: ReceiptOrder;
  url: string;
  /** Background delivery state: null while sending, then the result. */
  delivery: DeliveryResult | null;
}

export default function OrderForm({ product }: OrderFormProps) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  // After the order is placed, bring the success receipt to the top of the
  // screen (otherwise the user stays scrolled mid-form and misses it).
  useEffect(() => {
    if (status === "success") {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );

  const total = variant.price * quantity;
  const saved = variant.compareAtPrice
    ? (variant.compareAtPrice - variant.price) * quantity
    : 0;

  const money = (n: number) => `${site.currency} ${n.toLocaleString()}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Front-end validation — no backend involved.
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setErrorMsg("Please fill in your name, phone, address and city to continue.");
      setStatus("error");
      return;
    }
    // Pakistani mobile number only: 11 digits, starts with 03 (e.g. 03001234567).
    if (!/^03\d{9}$/.test(phone)) {
      setErrorMsg("Please enter a valid Pakistani mobile number — 11 digits starting with 03, e.g. 0300 1234567.");
      setStatus("error");
      return;
    }

    const url = buildWhatsAppOrderUrl({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      productName: product.name,
      variantLabel: variant.label,
      quantity,
      total,
    });

    // Build a receipt snapshot with an order number + timestamp.
    const now = new Date();
    const receipt: ReceiptOrder = {
      id: now.getTime().toString(36).toUpperCase().slice(-6),
      date: now.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      productName: product.name,
      variantLabel: variant.label,
      quantity,
      unitPrice: variant.price,
      total,
      saved,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
    };

    // Show the receipt immediately (no new tab).
    setOrder({ data: receipt, url, delivery: null });
    setStatus("success");

    // Auto-send the order in the background (Google Sheet).
    submitOrder({
      id: receipt.id,
      date: receipt.date,
      name: receipt.name,
      phone: receipt.phone,
      address: receipt.address,
      city: receipt.city,
      productName: receipt.productName,
      variantLabel: receipt.variantLabel,
      quantity: receipt.quantity,
      total: receipt.total,
    }).then((delivery) => {
      // Update only if this order is still the one on screen.
      setOrder((prev) => (prev && prev.data.id === receipt.id ? { ...prev, delivery } : prev));
    });
  }

  function handleReset() {
    // Keep the customer's contact details prefilled for a repeat order;
    // only reset the order state and quantity.
    setStatus("idle");
    setOrder(null);
    setQuantity(1);
  }

  // After ordering, replace the form with the confirmation receipt.
  if (status === "success" && order) {
    return (
      <OrderReceipt
        order={order.data}
        whatsappUrl={order.url}
        delivery={order.delivery}
        onReset={handleReset}
      />
    );
  }

  const multiVariant = product.variants.length > 1;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-line bg-paper p-5 shadow-sm sm:p-8"
    >
      <h3 className="text-2xl font-extrabold text-ink">Free Home Delivery</h3>
      <p className="mt-1 text-sm text-body">
        Enter your details — we&apos;ll confirm on WhatsApp. Cash on delivery.
      </p>

      {/* Variant / size selector — only shown when there is more than one pack */}
      {multiVariant ? (
        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-semibold text-ink">Select size</legend>
          <div className="grid grid-cols-2 gap-3">
            {product.variants.map((v) => {
              const selected = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  aria-pressed={selected}
                  className={`relative rounded-2xl border-2 p-4 text-left transition-colors ${
                    selected ? "border-brand bg-mint" : "border-line hover:border-brand-light"
                  }`}
                >
                  {v.badge ? (
                    <span className="absolute -top-2 right-3 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      {v.badge}
                    </span>
                  ) : null}
                  <span className="block font-bold text-ink">{v.label}</span>
                  <span className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
                    <span className="font-semibold whitespace-nowrap text-brand">
                      {money(v.price)}
                    </span>
                    {v.compareAtPrice ? (
                      <span className="whitespace-nowrap text-xs text-muted line-through">
                        {money(v.compareAtPrice)}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {/* Customer details — Urdu labels & placeholders */}
      <div className="mt-6 space-y-4">
        <Field
          id="order-name"
          label="نام"
          icon={<IconUser size={18} />}
          value={name}
          onChange={setName}
          placeholder="نام"
          autoComplete="name"
        />
        <Field
          id="order-phone"
          label="فون نمبر"
          icon={<IconPhone size={18} />}
          value={phone}
          // Keep digits only and cap at 11 (Pakistani mobile: 03XXXXXXXXX).
          onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 11))}
          placeholder="فون نمبر"
          type="tel"
          inputMode="numeric"
          maxLength={11}
          autoComplete="tel"
        />
        <Field
          id="order-address"
          label="مکمل پتہ"
          icon={<IconMapPin size={18} />}
          value={address}
          onChange={setAddress}
          placeholder="مکمل پتہ"
          autoComplete="street-address"
          textarea
        />
        <Field
          id="order-city"
          label="شہر"
          icon={<IconBuilding size={18} />}
          value={city}
          onChange={setCity}
          placeholder="شہر"
          autoComplete="address-level2"
        />
      </div>

      {/* Quantity */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">Quantity</span>
        <div className="flex items-center gap-3 rounded-full border border-line p-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-mint disabled:opacity-40"
          >
            <IconMinus size={18} />
          </button>
          <span className="w-6 text-center font-bold text-ink" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-mint"
          >
            <IconPlus size={18} />
          </button>
        </div>
      </div>

      {/* Order summary */}
      <div className="mt-6 space-y-1.5 rounded-2xl bg-cloud p-4 text-sm">
        <Row label={variant.label} value={`× ${quantity}`} />
        {saved > 0 ? (
          <Row label="You save" value={`− ${money(saved)}`} accent />
        ) : null}
        <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
          <span className="font-semibold text-ink">Total</span>
          <span className="text-lg font-extrabold text-ink">{money(total)}</span>
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm font-medium text-sale">
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-5 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-full bg-brand px-5 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-brand-dark"
      >
        <span>Place Order</span>
        <span className="whitespace-nowrap">· {money(total)}</span>
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-muted">
        <IconTruck size={14} className="text-brand" />
        Free Home Delivery
      </p>
    </form>
  );
}

/* ── Small in-file field helpers (kept local to this form) ─────────── */

interface FieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
  inputMode?: "text" | "numeric" | "tel" | "email";
  maxLength?: number;
}

function Field({ id, label, icon, value, onChange, placeholder, type = "text", autoComplete, textarea, inputMode, maxLength }: FieldProps) {
  // Icon sits on the left (LTR); dir="auto" lets the Urdu placeholder align
  // right while typed Latin/number input stays left-aligned. `urdu-ph` renders
  // the placeholder in the Urdu (Nastaliq) font; typed text uses the UI font.
  const shared =
    "urdu-ph w-full rounded-2xl border border-line bg-paper py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand-light/50";
  return (
    <div>
      <label
        htmlFor={id}
        dir="rtl"
        lang="ur"
        className="font-urdu mb-1.5 block text-base font-semibold text-ink"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-3.5 text-muted">{icon}</span>
        {textarea ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            dir="auto"
            rows={3}
            className={`${shared} resize-none`}
            required
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={inputMode}
            maxLength={maxLength}
            dir="auto"
            className={shared}
            required
          />
        )}
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-body">{label}</span>
      <span className={accent ? "font-semibold text-brand" : "text-ink"}>{value}</span>
    </div>
  );
}
