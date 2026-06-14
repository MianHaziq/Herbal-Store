import HeroSection from "@/components/sections/product/HeroSection";
import BenefitsSection from "@/components/sections/product/BenefitsSection";
import UsageSection from "@/components/sections/product/UsageSection";
import TrustSection from "@/components/sections/product/TrustSection";
import FaqSection from "@/components/sections/product/FaqSection";
import FinalCtaSection from "@/components/sections/product/FinalCtaSection";
import StickyOrderBar from "@/components/product/StickyOrderBar";
import StickyWhatsApp from "@/components/product/StickyWhatsApp";
import { getDefaultProduct } from "@/data/products";
import { site } from "@/lib/site";

export default function HomePage() {
  const product = getDefaultProduct();
  const fromPrice = Math.min(...product.variants.map((v) => v.price));

  // Structured data helps search engines show rich product results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: site.brand },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PKR",
      lowPrice: fromPrice,
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Safe: serialized from our own static product data.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection product={product} />
      <BenefitsSection product={product} />
      <UsageSection product={product} />
      <TrustSection product={product} />
      <FaqSection product={product} />
      <FinalCtaSection product={product} />
      <StickyOrderBar product={product} />
      <StickyWhatsApp productName={product.name} />
    </>
  );
}
