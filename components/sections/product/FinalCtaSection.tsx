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
      <div dir="rtl" lang="ur" className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <h2 className="font-urdu text-3xl font-bold text-white sm:text-4xl">
          سکون کے لیے تیار ہیں؟
        </h2>
        <p className="font-urdu mx-auto mt-3 max-w-xl text-brand-light">
          {product.name} آج ہی منگوائیں، صرف{" "}
          <span className="ltr-nums">
            {site.currency} {fromPrice.toLocaleString()}
          </span>{" "}
          سے۔ کیش آن ڈیلیوری — ادائیگی صرف آرڈر ملنے پر۔
        </p>
        <a
          href="#order"
          className="font-urdu mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-brand-dark shadow-lg transition-transform hover:-translate-y-0.5"
        >
          ابھی آرڈر کریں
          <IconArrowRight size={20} className="rotate-180" />
        </a>
        <p className="font-urdu mt-4 flex items-center justify-center gap-1.5 text-sm text-brand-light">
          <IconShieldCheck size={16} /> 100% قدرتی · کوئی سائیڈ ایفیکٹ نہیں · ہزاروں کا اعتماد
        </p>
      </div>
    </section>
  );
}
