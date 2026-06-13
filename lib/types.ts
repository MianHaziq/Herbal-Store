import type { ReactNode } from "react";

/** A product photo. `src` is a path under /public (e.g. "/products/main.jpg") or a full URL. */
export interface ProductImage {
  src: string;
  alt: string;
}

/** A purchasable size/pack option for a product. */
export interface ProductVariant {
  id: string;
  /** Label shown on the option button, e.g. "100 ML". */
  label: string;
  /** Current selling price for this variant. */
  price: number;
  /** Optional original price to show a strikethrough discount. */
  compareAtPrice?: number;
  /** Optional small note, e.g. "Best value". */
  badge?: string;
}

export interface ProductBenefit {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number; // 1–5
  quote: string;
}

/** Full data model for a single product. */
export interface Product {
  /** URL-safe identifier; also used as the route slug for future products. */
  slug: string;
  name: string;
  /** Optional product name in Urdu (shown under the English title). */
  nameUrdu?: string;
  /** Short selling line under the title. */
  tagline: string;
  /** Optional Urdu tagline (shown in Urdu script). */
  taglineUrdu?: string;
  /** Longer marketing paragraph(s). */
  description: string;
  /** Product photos shown in the gallery (first one is the main image). */
  images: ProductImage[];
  /** Selectable size/pack options (first one is the default). */
  variants: ProductVariant[];
  /** Star rating to display (1–5) and the review count behind it. */
  rating: number;
  reviewCount: number;
  /** Short bullet highlights shown near the buy box. */
  highlights: string[];
  benefits: ProductBenefit[];
  /** Ordered "how to use" steps. */
  usage: string[];
  /** Key ingredients / what's inside. */
  ingredients: string[];
  faqs: ProductFaq[];
  testimonials: Testimonial[];
}
