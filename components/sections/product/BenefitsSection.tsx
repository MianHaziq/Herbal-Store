import type { Product } from "@/lib/types";

interface BenefitsSectionProps {
  product: Product;
}

export default function BenefitsSection({ product }: BenefitsSectionProps) {
  return (
    <section id="benefits" className="scroll-mt-24 border-t border-line bg-mint">
      <div dir="rtl" lang="ur" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-urdu text-base font-semibold text-brand">
            لوگ اسے کیوں پسند کرتے ہیں
          </span>
          <h2 className="font-urdu mt-3 text-3xl font-bold text-ink sm:text-4xl">
            قدرتی طریقے سے حقیقی سکون
          </h2>
          <p className="font-urdu mt-3 text-body">
            ہر بوتل جلد کو سکون دینے، محفوظ رکھنے اور بحال کرنے کے لیے بنائی گئی ہے — سخت کیمیکلز کے بغیر۔
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
              <h3 className="font-urdu mt-4 text-lg font-bold text-ink">{b.title}</h3>
              <p className="font-urdu mt-2 text-sm text-body">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
