"use client"; // shows/hides based on scroll position

import { useEffect, useState } from "react";

import { site } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";
import type { Product } from "@/lib/types";

interface StickyOrderBarProps {
  product: Product;
}

/**
 * Mobile-only sticky bar with the price and an Order button.
 * Appears after the user scrolls past the hero so the CTA is always reachable.
 */
export default function StickyOrderBar({ product }: StickyOrderBarProps) {
  const [show, setShow] = useState(false);
  const fromPrice = Math.min(...product.variants.map((v) => v.price));

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p dir="rtl" lang="ur" className="font-urdu text-xs text-muted">{product.name}</p>
          <p className="font-bold text-ink">
            {site.currency} {fromPrice.toLocaleString()}
          </p>
        </div>
        <a
          href="#order"
          className="flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white"
        >
          <IconWhatsApp size={18} />
          Order Now
        </a>
      </div>
    </div>
  );
}
