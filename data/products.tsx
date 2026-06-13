/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRODUCT DATA — the ONE file to edit.
 *
 *  • TEXT:   change the name, prices, description, benefits, FAQs, etc. below.
 *  • IMAGES: either (a) replace the files in /public/products/ keeping the same
 *            names, OR (b) change the `src` paths in the `images` array below.
 *            `src` can be a /public path ("/products/main.jpg") or a full URL.
 *
 *  To add another product later: add a new object to the `products` array with
 *  a unique `slug`, then read it with getProduct(slug).
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
    slug: "sugar-care-herbal-capsules",
    name: "Sugar Care Herbal Capsules",
    nameUrdu: "شوگر کیئر ہربل کیپسول",
    tagline: "Natural blood-sugar support — 100% herbal, no side effects",
    taglineUrdu: "قدرتی شوگر کنٹرول — مکمل ہربل فارمولا",
    description:
      "A traditional Unani-inspired herbal blend in easy-to-take capsules, made to support healthy blood-sugar levels as part of a balanced lifestyle. Formulated from time-tested botanicals like Karela (bitter gourd), Jamun, Gurmar and Methi — with no steroids, no added sugar, and no artificial chemicals.",
    // Edit image paths here, or just replace the files in /public/products/.
    images: [
      { src: "/products/product-main.jpg", alt: "Sugar Care herbal capsules bottle" },
      { src: "/products/product-2.jpg", alt: "Sugar Care herbal capsules in blister packs" },
      { src: "/products/product-3.jpg", alt: "Natural herbal capsules close-up" },
    ],
    // First variant is selected by default.
    variants: [
      { id: "60caps", label: "60 Capsules", price: 1990, compareAtPrice: 2450 },
      {
        id: "120caps",
        label: "120 Capsules",
        price: 3490,
        compareAtPrice: 4900,
        badge: "Best value",
      },
    ],
    rating: 4.8,
    reviewCount: 1463,
    highlights: [
      "100% natural herbal formula",
      "No steroids or added sugar",
      "Supports healthy sugar levels",
      "Cash on delivery available",
    ],
    benefits: [
      {
        icon: <IconLeaf className="text-brand" />,
        title: "100% Herbal",
        description:
          "A plant-based blend of Karela, Jamun, Gurmar and Methi — free from steroids, added sugar, and artificial chemicals.",
      },
      {
        icon: <IconDroplet className="text-brand" />,
        title: "Supports Sugar Balance",
        description:
          "Traditional botanicals chosen to help support healthy blood-sugar levels alongside a balanced diet.",
      },
      {
        icon: <IconShieldCheck className="text-brand" />,
        title: "Gentle & Safe",
        description:
          "Non-habit-forming capsules suitable for daily, long-term use as part of your routine.",
      },
      {
        icon: <IconSparkles className="text-brand" />,
        title: "Easy to Take",
        description:
          "Convenient capsules — no bitter taste, no measuring. Just take with water after meals.",
      },
    ],
    usage: [
      "Take 1 capsule twice daily, after breakfast and after dinner.",
      "Swallow with a glass of water — do not chew.",
      "Use consistently every day for best results.",
      "Pair with a balanced diet and light exercise; monitor your sugar levels regularly.",
    ],
    ingredients: [
      "Karela (Bitter Gourd)",
      "Jamun (Java Plum) seed",
      "Gurmar (Gymnema)",
      "Methi (Fenugreek)",
      "Neem",
    ],
    faqs: [
      {
        question: "Is it safe to take daily?",
        answer:
          "Yes. It is a non-habit-forming herbal supplement made for daily use. If you are pregnant, nursing, or already on prescribed diabetes medication, please consult your doctor before use so your dosage can be monitored.",
      },
      {
        question: "Can I take it with my current medicine?",
        answer:
          "Many people use it alongside their routine, but because it may support lower sugar levels, we recommend checking with your doctor first so they can adjust your medication and monitor you.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Herbal formulas work gradually. Most customers use it consistently for 4–8 weeks, along with a balanced diet, to notice a difference. Keep tracking your sugar readings.",
      },
      {
        question: "Do you offer cash on delivery?",
        answer:
          "Yes. You can pay cash when your order arrives. Just place your order and our team will confirm the details with you.",
      },
    ],
    testimonials: [
      {
        name: "Imran S.",
        location: "Lahore",
        rating: 5,
        quote:
          "I've been taking it daily for two months along with a better diet. My readings are more stable and the capsules are easy to take.",
      },
      {
        name: "Naseem A.",
        location: "Faisalabad",
        rating: 5,
        quote:
          "No bitter taste like the raw karela juice I used before. Delivery was quick and cash on delivery made it easy.",
      },
      {
        name: "Rabia K.",
        location: "Islamabad",
        rating: 4,
        quote:
          "Natural ingredients I recognise, and it sits well with my routine. Ordering was simple and the team confirmed my order fast.",
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
