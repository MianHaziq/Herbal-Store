"use client"; // needs useState to track the active gallery image

import { useState } from "react";
import Image from "next/image";

import type { ProductImage } from "@/lib/types";

interface ProductGalleryProps {
  images: ProductImage[];
}

/** Product photo gallery: a main image with a clickable thumbnail strip. */
export default function ProductGallery({ images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-cloud">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails (only if more than one image) */}
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
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
