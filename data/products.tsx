/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRODUCT DATA — single source of truth.
 *
 *  To change the product, edit the object below.
 *  To add more products later, add another entry to the `products` array;
 *  each needs a unique `slug`. Use getProduct(slug) / getDefaultProduct()
 *  to read them in pages and components.
 * ─────────────────────────────────────────────────────────────────────────
 */
import {
  IconLeaf,
  IconShieldCheck,
  IconDroplet,
  IconSparkles,
} from "@/components/icons";
import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "herbal-relief-oil",
    name: "Herbal Relief Oil",
    tagline: "Fast, soothing relief — 100% natural, no side effects",
    description:
      "A dermatologist-reviewed blend of cold-pressed botanical oils crafted to calm itching, irritation, and dryness. Lightweight and fast-absorbing, it nourishes the skin without leaving a greasy residue — safe for daily use on sensitive skin.",
    // First variant is selected by default.
    variants: [
      { id: "100ml", label: "100 ML", price: 1990, compareAtPrice: 2450 },
      {
        id: "200ml",
        label: "200 ML",
        price: 3490,
        compareAtPrice: 4900,
        badge: "Best value",
      },
    ],
    rating: 4.8,
    reviewCount: 1284,
    highlights: [
      "100% natural ingredients",
      "No steroids or harsh chemicals",
      "Visible results in 7 days",
      "Cash on delivery available",
    ],
    benefits: [
      {
        icon: <IconLeaf className="text-brand" />,
        title: "100% Natural",
        description:
          "Plant-based oils and extracts — free from steroids, parabens, and artificial fragrance.",
      },
      {
        icon: <IconDroplet className="text-brand" />,
        title: "Deeply Soothing",
        description:
          "Calms itching and irritation on contact while restoring the skin's moisture barrier.",
      },
      {
        icon: <IconShieldCheck className="text-brand" />,
        title: "No Side Effects",
        description:
          "Gentle, non-irritating formula safe for sensitive skin and daily long-term use.",
      },
      {
        icon: <IconSparkles className="text-brand" />,
        title: "Visible Results",
        description:
          "Most customers notice a clear difference within the first week of regular use.",
      },
    ],
    usage: [
      "Clean and gently dry the affected area.",
      "Apply 3–4 drops of oil and massage in slow circular motions.",
      "Use twice daily — morning and before bed — for best results.",
      "Continue for at least 2 weeks for lasting relief.",
    ],
    ingredients: [
      "Cold-pressed Neem oil",
      "Tea tree extract",
      "Aloe vera",
      "Vitamin E",
      "Coconut carrier oil",
    ],
    faqs: [
      {
        question: "Is it safe for sensitive skin?",
        answer:
          "Yes. The formula is free from steroids, parabens, and synthetic fragrance, and is gentle enough for daily use on sensitive skin. For very young children or open wounds, consult a doctor first.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Most customers feel soothing relief from the first application, with visible improvement within 7 days of twice-daily use.",
      },
      {
        question: "Do you offer cash on delivery?",
        answer:
          "Yes. You can pay cash when your order arrives. Just place your order and our team will confirm the details with you on WhatsApp.",
      },
      {
        question: "How is the order delivered?",
        answer:
          "After you submit the form, your order is sent to us on WhatsApp. We confirm your address and dispatch within 24–48 hours, with delivery typically in 2–4 business days.",
      },
    ],
    testimonials: [
      {
        name: "Ayesha K.",
        location: "Lahore",
        rating: 5,
        quote:
          "The itching that bothered me for months calmed down in just a few days. It doesn't feel greasy at all.",
      },
      {
        name: "Bilal R.",
        location: "Karachi",
        rating: 5,
        quote:
          "Ordering on WhatsApp was so easy and delivery was quick. The oil genuinely works for my dry, irritated skin.",
      },
      {
        name: "Sana M.",
        location: "Islamabad",
        rating: 4,
        quote:
          "Natural smell, gentle on my sensitive skin, and real results. Will be ordering the bigger bottle next.",
      },
    ],
  },
];

/** The product shown on the homepage. */
export function getDefaultProduct(): Product {
  return products[0];
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
