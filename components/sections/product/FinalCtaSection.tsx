import { site } from "@/lib/site";
import { IconArrowRight, IconShieldCheck } from "@/components/icons";
import type { Product } from "@/lib/types";

interface FinalCtaSectionProps {
  product: Product;
}

export default function FinalCtaSection({ product }: FinalCtaSectionProps) {
  const fromPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <section className="border-t border-line bg-brand">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready to feel the relief?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-light">
          Start your {product.name} today from {site.currency}{" "}
          {fromPrice.toLocaleString()}. Cash on delivery — pay only when it
          arrives.
        </p>
        <a
          href="#order"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-brand-dark shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Order now
          <IconArrowRight size={20} />
        </a>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-brand-light">
          <IconShieldCheck size={16} /> 100% natural · no side effects · trusted by thousands
        </p>
      </div>
    </section>
  );
}
