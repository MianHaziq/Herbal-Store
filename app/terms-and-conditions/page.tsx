import type { Metadata } from "next";

import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that apply when you order from ${site.brand}, including pricing, payment, delivery, and returns.`,
};

const LAST_UPDATED = "June 12, 2026";

const sections: LegalSection[] = [
  {
    heading: "1. Overview",
    paragraphs: [
      `These Terms & Conditions govern your use of the ${site.brand} website and your purchase of products from us. By placing an order, you agree to these terms. Please read them carefully.`,
    ],
  },
  {
    heading: "2. Products and descriptions",
    paragraphs: [
      "We try to describe our products as accurately as possible. Images are for illustration and packaging may vary slightly. Our products are natural wellness products and are not a substitute for professional medical advice, diagnosis, or treatment. Consult a doctor for any medical condition.",
    ],
  },
  {
    heading: "3. Orders",
    paragraphs: [
      "When you submit the order form, your details are sent to us on WhatsApp. An order is only confirmed once our team has acknowledged it on WhatsApp. We reserve the right to refuse or cancel any order — for example, due to stock availability, pricing errors, or an incomplete address.",
    ],
  },
  {
    heading: "4. Pricing",
    paragraphs: [
      `All prices are listed in ${site.currency} (Pakistani Rupees) and include applicable charges unless stated otherwise. We may change prices and promotions at any time, but changes will not affect orders already confirmed.`,
    ],
  },
  {
    heading: "5. Payment",
    paragraphs: [
      "We currently offer Cash on Delivery (COD). You pay in cash to the courier when your order is delivered. No online or card payment is taken on this website.",
    ],
  },
  {
    heading: "6. Shipping and delivery",
    paragraphs: [
      "Orders are typically dispatched within 24–48 hours of confirmation, with delivery usually within 2–4 business days depending on your location. Delivery times are estimates and may vary due to courier or circumstances beyond our control.",
    ],
  },
  {
    heading: "7. Returns and refunds",
    paragraphs: [
      "If your product arrives damaged, incorrect, or defective, contact us on WhatsApp within 48 hours of delivery with your order details and a photo. We will arrange a replacement or resolution. For hygiene and safety reasons, opened or used products cannot be returned unless they are faulty.",
    ],
  },
  {
    heading: "8. Cancellations",
    paragraphs: [
      "You may cancel your order before it has been dispatched by messaging us on WhatsApp. Once an order has been handed to the courier, it cannot be cancelled but may be refused at delivery.",
    ],
  },
  {
    heading: "9. Acceptable use",
    paragraphs: [
      "You agree to provide accurate information when ordering and not to misuse the website or place fraudulent orders. We may decline service to anyone who abuses these terms.",
    ],
  },
  {
    heading: "10. Limitation of liability",
    paragraphs: [
      `To the extent permitted by law, ${site.brand} is not liable for any indirect or consequential loss arising from the use of our products or website. Always use products as directed and perform a patch test if you have sensitive skin.`,
    ],
  },
  {
    heading: "11. Changes to these terms",
    paragraphs: [
      "We may update these Terms & Conditions at any time. The version published on this page at the time of your order applies to that order.",
    ],
  },
  {
    heading: "12. Contact us",
    paragraphs: [
      `For any questions about these terms or your order, contact us on WhatsApp at +${site.whatsappNumber} or by email at ${site.supportEmail}.`,
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated={LAST_UPDATED}
      intro={`Please review these terms before ordering from ${site.brand}.`}
      sections={sections}
    />
  );
}
