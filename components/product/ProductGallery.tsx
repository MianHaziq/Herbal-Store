"use client"; // needs useState/useRef for swipe + active-image tracking

import { useRef, useState } from "react";
import Image from "next/image";

import type { ProductImage } from "@/lib/types";

interface ProductGalleryProps {
  images: ProductImage[];
}

/**
 * Product photo gallery.
 * - Main image is a horizontal scroll-snap track → swipe by hand on mobile,
 *   trackpad/drag on desktop. Dots show the active image on mobile.
 * - Thumbnails scroll the track to the chosen image.
 */
export default function ProductGallery({ images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Update the active index as the user swipes/scrolls.
  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(i);
  }

  // Jump to an image when a thumbnail is tapped.
  function goTo(i: number) {
    const el = trackRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActive(i);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Swipeable main image */}
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-3xl border border-line bg-cloud"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="relative aspect-square w-full shrink-0 snap-center"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                draggable={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover select-none"
              />
            </div>
          ))}
        </div>

        {/* Swipe dots (mobile only) */}
        {images.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5 sm:hidden">
            {images.map((img, i) => (
              <span
                key={img.src}
                className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${
                  active === i ? "w-5 bg-brand" : "w-1.5 bg-white/80"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Thumbnails */}
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={active === i}
              className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-colors ${
                active === i ? "border-brand" : "border-line hover:border-brand-light"
              }`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
