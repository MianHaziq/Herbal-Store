"use client"; // controlled swipe slider needs state + pointer handlers

import { useRef, useState } from "react";
import Image from "next/image";

import type { ProductImage } from "@/lib/types";

interface ProductGalleryProps {
  images: ProductImage[];
}

/**
 * Product gallery with a CONTROLLED swipe slider — one image per swipe.
 * A horizontal drag past a small threshold advances exactly ±1 image (so
 * three images go 1 → 2 → 3, never skipping to the end). Thumbnails and dots
 * also control it. Vertical drags are ignored so the page can still scroll.
 */
export default function ProductGallery({ images }: ProductGalleryProps) {
  const last = images.length - 1;
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const widthRef = useRef(1);
  const axis = useRef<null | "x" | "y">(null);

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    startY.current = e.clientY;
    widthRef.current = e.currentTarget.clientWidth || 1;
    axis.current = null;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Decide gesture direction once, after a small movement.
    if (axis.current === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis.current !== "x") return; // vertical → let the page scroll

    // Add resistance when dragging past the first/last image.
    let offset = dx;
    if ((active === 0 && dx > 0) || (active === last && dx < 0)) offset = dx * 0.3;
    setDragX(offset);
  }

  function endDrag() {
    if (!dragging) return;
    setDragging(false);
    const threshold = Math.min(60, widthRef.current * 0.18);
    let next = active;
    if (dragX <= -threshold) next = Math.min(last, active + 1);
    else if (dragX >= threshold) next = Math.max(0, active - 1);
    setActive(next);
    setDragX(0);
    axis.current = null;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Swipeable viewport */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-cloud">
        <div
          className="flex touch-pan-y"
          style={{
            transform: `translateX(calc(${-active * 100}% + ${dragX}px))`,
            transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {images.map((img, i) => (
            <div key={img.src} className="relative aspect-square w-full shrink-0">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                draggable={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="pointer-events-none select-none object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dots (mobile) */}
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
              onClick={() => setActive(i)}
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
