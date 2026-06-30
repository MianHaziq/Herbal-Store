import Image from "next/image";

import { IconLeaf } from "@/components/icons";
import type { Product } from "@/lib/types";

interface UsageSectionProps {
  product: Product;
}

export default function UsageSection({ product }: UsageSectionProps) {
  return (
    <section id="usage" className="scroll-mt-24 border-t border-line">
      <div dir="rtl" lang="ur" className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
        {/* Steps */}
        <div>
          <span className="font-urdu text-base font-semibold text-brand">
            استعمال میں آسان
          </span>
          <h2 className="font-urdu mt-3 text-3xl font-bold text-ink sm:text-4xl">
            طریقہ استعمال
          </h2>
          <p className="font-urdu mt-3 text-body">
            دن میں دو بار صرف چند قطرے۔ بہترین نتائج کے لیے باقاعدگی ضروری ہے۔
          </p>

          <ol className="mt-8 space-y-5">
            {product.usage.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="font-urdu pt-1 text-body">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Ingredients card */}
        <div className="rounded-3xl border border-line bg-cloud p-8">
          <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-2xl">
            <Image
              src={(product.images[1] ?? product.images[0]).src}
              alt={(product.images[1] ?? product.images[0]).alt}
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
          </div>
          <h3 className="font-urdu mt-6 text-center text-lg font-bold text-ink">
            اس میں کیا شامل ہے
          </h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {product.ingredients.map((ing) => (
              <li
                key={ing}
                className="font-urdu flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-medium text-body"
              >
                <IconLeaf size={14} className="text-brand" />
                {ing}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
