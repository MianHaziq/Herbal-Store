"use client"; // needs useState to track the active gallery view

import { useState } from "react";

import BottleImage from "@/components/product/BottleImage";

interface ProductGalleryProps {
  productName: string;
  /** Selected size label, shown on the bottle. */
  size?: string;
}

/** Different framings of the product, mimicking a multi-image gallery. */
const VIEWS = [
  { id: "front", caption: "Front", bg: "product-glow" },
  { id: "ingredients", caption: "100% Natural", bg: "bg-mint" },
  { id: "dropper", caption: "Easy dropper", bg: "bg-cloud" },
] as const;

export default function ProductGallery({ productName, size }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-paper">
        <div className={`absolute inset-0 ${VIEWS[active].bg}`} aria-hidden="true" />
        <div className="relative flex items-center justify-center px-8 py-10">
          <BottleImage
            productName={productName}
            size={size}
            className="h-72 w-auto drop-shadow-xl transition-transform duration-500 sm:h-96"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-paper/80 px-3 py-1 text-xs font-semibold text-brand backdrop-blur">
          {VIEWS[active].caption}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {VIEWS.map((view, i) => (
          <button
            key={view.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View: ${view.caption}`}
            aria-pressed={active === i}
            className={`relative flex items-center justify-center overflow-hidden rounded-2xl border-2 py-4 transition-colors ${
              active === i ? "border-brand" : "border-line hover:border-brand-light"
            }`}
          >
            <div className={`absolute inset-0 ${view.bg}`} aria-hidden="true" />
            <BottleImage productName={productName} size={size} className="relative h-16 w-auto" />
          </button>
        ))}
      </div>
    </div>
  );
}
