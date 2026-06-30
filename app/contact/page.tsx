import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";
import {
  IconWhatsApp,
  IconPhone,
  IconMail,
  IconClock,
  IconArrowRight,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.brand} — chat on WhatsApp, call, or email us. We're here to help with your order.`,
};

const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Assalam o Alaikum! I'd like some help regarding ${site.brand}.`,
)}`;

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <header className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-brand">
          We&apos;re here to help
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-body">
          Have a question about your order, delivery, or our products? Reach out
          on WhatsApp for the fastest reply, or call and email us during
          business hours.
        </p>
      </header>

      {/* Primary CTA — WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-base font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <IconWhatsApp size={22} />
        Chat on WhatsApp
      </a>

      {/* Contact details */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <ContactCard
          icon={<IconWhatsApp size={20} />}
          label="WhatsApp"
          value={site.supportPhone}
          href={whatsappUrl}
          external
        />
        <ContactCard
          icon={<IconPhone size={20} />}
          label="Phone"
          value={site.supportPhone}
          href={`tel:+${site.whatsappNumber}`}
        />
        <ContactCard
          icon={<IconMail size={20} />}
          label="Email"
          value={site.supportEmail}
          href={`mailto:${site.supportEmail}`}
        />
        <ContactCard
          icon={<IconClock size={20} />}
          label="Business hours"
          value={site.supportHours}
        />
      </div>

      <p className="mt-8 rounded-2xl border border-line bg-cloud p-4 text-center text-sm text-body">
        Orders are placed right from the product page — just fill in your details
        and we confirm on WhatsApp. Payment is{" "}
        <span className="font-semibold text-ink">Cash on Delivery</span>.
      </p>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Back to store
          <IconArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function ContactCard({ icon, label, value, href, external }: ContactCardProps) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-brand">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </span>
        <span className="block font-semibold text-ink wrap-break-word">{value}</span>
      </span>
    </>
  );

  const className =
    "flex items-center gap-3 rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-brand-light";

  if (!href) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}
