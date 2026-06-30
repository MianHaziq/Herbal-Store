import Link from "next/link";
import Image from "next/image";

import { site } from "@/lib/site";
import { IconWhatsApp, IconShieldCheck, IconTruck } from "@/components/icons";

const TRUST = [
  { icon: <IconShieldCheck size={18} />, label: "100% Authentic" },
  { icon: <IconTruck size={18} />, label: "Cash on Delivery" },
  { icon: <IconWhatsApp size={18} />, label: "WhatsApp Support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cloud">
      {/* Extra bottom padding on mobile so the sticky order bar never covers footer content */}
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-28 sm:px-6 md:pb-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/herbal_logoo.png"
                alt={site.brand}
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-xl font-extrabold tracking-tight text-ink">
                {site.brand}
              </span>
            </Link>
            <p className="mt-3 text-sm text-body">
              {site.tagline}. Natural, herbal care delivered to your door.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm font-medium text-body">
                <span className="text-brand">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            <IconWhatsApp size={18} />
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            <Link
              href="/contact"
              className="text-sm font-medium text-body transition-colors hover:text-brand"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm font-medium text-body transition-colors hover:text-brand"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-sm font-medium text-body transition-colors hover:text-brand"
            >
              Terms &amp; Conditions
            </Link>
          </nav>

          <div className="mt-5 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {/* update yearly */}2026 {site.brand}. All rights reserved.</p>
            <p>
              These statements are for general wellness. Consult a doctor for
              medical conditions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
