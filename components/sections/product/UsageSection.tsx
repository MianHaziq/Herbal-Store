import BottleImage from "@/components/product/BottleImage";
import { IconLeaf } from "@/components/icons";
import type { Product } from "@/lib/types";

interface UsageSectionProps {
  product: Product;
}

export default function UsageSection({ product }: UsageSectionProps) {
  return (
    <section id="usage" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
        {/* Steps */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">
            Simple to use
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            How to use
          </h2>
          <p className="mt-3 text-body">
            Just a few drops, twice a day. Consistency is the key to lasting
            results.
          </p>

          <ol className="mt-8 space-y-5">
            {product.usage.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-body">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Ingredients card */}
        <div className="rounded-3xl border border-line bg-cloud p-8">
          <div className="flex items-center justify-center">
            <div className="product-glow rounded-3xl px-6 py-4">
              <BottleImage
                productName={product.name}
                size={product.variants[0].label}
                className="h-56 w-auto drop-shadow-lg"
              />
            </div>
          </div>
          <h3 className="mt-6 text-center text-lg font-bold text-ink">
            What&apos;s inside
          </h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {product.ingredients.map((ing) => (
              <li
                key={ing}
                className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-medium text-body"
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
