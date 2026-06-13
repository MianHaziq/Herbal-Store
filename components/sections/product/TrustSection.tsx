import { IconStar, IconShieldCheck, IconTruck, IconLeaf, IconUser } from "@/components/icons";
import type { Product } from "@/lib/types";

interface TrustSectionProps {
  product: Product;
}

const GUARANTEES = [
  { icon: <IconShieldCheck size={22} />, title: "Quality assured", text: "Lab-tested, dermatologist-reviewed formula." },
  { icon: <IconTruck size={22} />, title: "Fast delivery", text: "Dispatched in 24–48h with cash on delivery." },
  { icon: <IconLeaf size={22} />, title: "Natural & safe", text: "No steroids, parabens, or artificial fragrance." },
];

export default function TrustSection({ product }: TrustSectionProps) {
  return (
    <section id="reviews" className="scroll-mt-24 border-t border-line bg-cloud">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        {/* Guarantee strip */}
        <div className="grid gap-5 sm:grid-cols-3">
          {GUARANTEES.map((g) => (
            <div key={g.title} className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-brand">
                {g.icon}
              </span>
              <div>
                <h3 className="font-bold text-ink">{g.title}</h3>
                <p className="mt-0.5 text-sm text-body">{g.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar key={i} size={22} className="text-amber" />
              ))}
            </span>
            <span className="text-lg font-bold text-ink">{product.rating} / 5</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Loved by {product.reviewCount.toLocaleString()}+ customers
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {product.testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
              <span className="flex" aria-label={`Rated ${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} size={16} className={i < t.rating ? "text-amber" : "text-line"} />
                ))}
              </span>
              <blockquote className="mt-3 flex-1 text-body">“{t.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-brand">
                  <IconUser size={18} />
                </span>
                <span className="text-sm">
                  <span className="block font-bold text-ink">{t.name}</span>
                  <span className="text-muted">{t.location}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
