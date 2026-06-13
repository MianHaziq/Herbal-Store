import ProductGallery from "@/components/product/ProductGallery";
import OrderForm from "@/components/product/OrderForm";
import { IconStar, IconCheck, IconShieldCheck, IconTruck, IconLeaf, IconBag } from "@/components/icons";
import type { Product } from "@/lib/types";

interface HeroSectionProps {
  product: Product;
}

const ASSURANCES = [
  { icon: <IconShieldCheck size={18} />, label: "No side effects" },
  { icon: <IconTruck size={18} />, label: "Cash on delivery" },
  { icon: <IconLeaf size={18} />, label: "100% natural" },
];

export default function HeroSection({ product }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="dotted absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-16">
        {/* Left: gallery + info */}
        <div className="lg:pr-4">
          <ProductGallery images={product.images} />

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <span className="flex" aria-label={`Rated ${product.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar
                    key={i}
                    size={18}
                    className={i < Math.round(product.rating) ? "text-amber" : "text-line"}
                  />
                ))}
              </span>
              <span className="text-sm font-medium text-body">
                {product.rating} · {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            {product.nameUrdu ? (
              <p dir="rtl" lang="ur" className="font-urdu mt-1 text-2xl leading-relaxed text-ink">
                {product.nameUrdu}
              </p>
            ) : null}
            <p className="mt-2 text-lg text-brand-dark">{product.tagline}</p>
            {product.taglineUrdu ? (
              <p dir="rtl" lang="ur" className="font-urdu mt-1 text-lg leading-loose text-brand-dark">
                {product.taglineUrdu}
              </p>
            ) : null}

            {/* Mobile-only quick CTA — jumps to the order form below. Hidden on
                desktop, where the order form sits in the right column. */}
            <a
              href="#order"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-brand-dark lg:hidden"
            >
              <IconBag size={20} />
              Order Now
            </a>

            <p className="mt-5 max-w-prose text-body lg:mt-4">{product.description}</p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm font-medium text-ink">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-brand">
                    <IconCheck size={14} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {ASSURANCES.map((a) => (
                <span key={a.label} className="flex items-center gap-1.5 text-sm text-body">
                  <span className="text-brand">{a.icon}</span>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: order box (sticky on desktop) */}
        <div id="order" className="scroll-mt-28 lg:sticky lg:top-24 lg:self-start">
          <OrderForm product={product} />
        </div>
      </div>
    </section>
  );
}
