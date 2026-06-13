import type { Product } from "@/lib/types";

interface BenefitsSectionProps {
  product: Product;
}

export default function BenefitsSection({ product }: BenefitsSectionProps) {
  return (
    <section id="benefits" className="scroll-mt-24 border-t border-line bg-mint">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">
            Why people love it
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Real relief, the natural way
          </h2>
          <p className="mt-3 text-body">
            Every bottle is made to soothe, protect, and restore — without the
            harsh chemicals.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-line bg-paper p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint">
                {b.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
