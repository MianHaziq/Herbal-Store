"use client"; // needs useState to track which FAQ item is expanded

import { useState } from "react";

import { IconChevronDown } from "@/components/icons";
import type { Product } from "@/lib/types";

interface FaqSectionProps {
  product: Product;
}

export default function FaqSection({ product }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">
            Questions
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Frequently asked
          </h2>
        </div>

        <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {product.faqs.map((faq, i) => {
            const expanded = open === i;
            return (
              <div key={i} className="bg-paper">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : i)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-ink">{faq.question}</span>
                  <IconChevronDown
                    size={20}
                    className={`shrink-0 text-brand transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-body">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
