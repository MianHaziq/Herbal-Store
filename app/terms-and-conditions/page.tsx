import type { Metadata } from "next";

import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that apply when you order from ${site.brand}, including pricing, payment, delivery, and returns.`,
};

const LAST_UPDATED = "July 1, 2026";

const sections: LegalSection[] = [
  {
    heading: "1. Introduction & acceptance",
    paragraphs: [
      `These Terms & Conditions ("Terms") govern your use of the ${site.brand} website and your purchase of products from us. By accessing our website or placing an order, you agree to be bound by these Terms. If you do not agree, please do not use the website or place an order.`,
    ],
  },
  {
    heading: "2. Eligibility",
    paragraphs: [
      "You must be at least 18 years old, or have the consent of a parent or guardian, to place an order. By ordering, you confirm that the information you provide is accurate and that you are legally able to enter into this agreement.",
    ],
  },
  {
    heading: "3. Products and descriptions",
    paragraphs: [
      "We aim to describe our products as accurately as possible. Images are for illustration only and actual packaging, colour, or appearance may vary slightly. Product availability is not guaranteed and may change without notice.",
    ],
  },
  {
    heading: "4. Health disclaimer",
    paragraphs: [
      "Our products are natural / herbal wellness products and are not medicines. They are not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person. The information on this website is for general purposes only and is not a substitute for professional medical advice. If you are pregnant, nursing, taking medication, or have a medical condition, consult a qualified doctor before use. Perform a small patch test before first use if you have sensitive skin, and discontinue use if irritation occurs.",
    ],
  },
  {
    heading: "5. Orders and acceptance",
    paragraphs: [
      "When you submit the order form, your details are recorded by us and may also be shared with our team on WhatsApp. Submitting an order is an offer to purchase; an order is only confirmed once our team has accepted and acknowledged it. We reserve the right to refuse or cancel any order — for example, due to stock availability, suspected fraud, pricing errors, or an incomplete or unreachable address.",
    ],
  },
  {
    heading: "6. Pricing",
    paragraphs: [
      `All prices are listed in ${site.currency} (Pakistani Rupees) and are inclusive of applicable charges unless stated otherwise. Delivery is free unless otherwise indicated. We may change prices and promotions at any time, but changes will not affect orders that have already been confirmed. In the event of an obvious pricing error, we are not obliged to honour it and will contact you before processing.`,
    ],
  },
  {
    heading: "7. Payment",
    paragraphs: [
      "We currently offer Cash on Delivery (COD) only. You pay in cash to the courier at the time your order is delivered. No online or card payment is collected on this website. Please keep the exact amount ready where possible.",
    ],
  },
  {
    heading: "8. Shipping and delivery",
    paragraphs: [
      "Orders are typically dispatched within 24–48 hours of confirmation, with delivery usually within 2–5 business days depending on your location. Delivery times are estimates only and may vary due to the courier, weather, public holidays, or other circumstances beyond our control. Please ensure someone is available at the delivery address to receive the order and make payment.",
    ],
  },
  {
    heading: "9. Returns, refunds & replacements",
    paragraphs: [
      "If your product arrives damaged, incorrect, or defective, contact us on WhatsApp within 48 hours of delivery with your order number and a clear photo. We will arrange a replacement or suitable resolution. For hygiene and safety reasons, opened or used products cannot be returned unless they are faulty. Because we operate on Cash on Delivery, refunds (where applicable) are handled on a case-by-case basis once the returned item is received and inspected.",
    ],
  },
  {
    heading: "10. Cancellations & refused deliveries",
    paragraphs: [
      "You may cancel your order before it has been dispatched by messaging us on WhatsApp. Once an order has been handed to the courier, it cannot be cancelled but may be refused at the time of delivery. Repeatedly refusing confirmed COD orders may result in us declining future orders.",
    ],
  },
  {
    heading: "11. Acceptable use",
    paragraphs: [
      "You agree to provide accurate information when ordering and not to misuse the website, place fraudulent or fake orders, or use the site for any unlawful purpose. We may decline service to, or restrict, anyone who abuses these Terms.",
    ],
  },
  {
    heading: "12. Intellectual property",
    paragraphs: [
      `All content on this website — including the brand name, logo, text, images, and design — is the property of ${site.brand} or its licensors and is protected by applicable laws. You may not copy, reproduce, or use our content for commercial purposes without our prior written permission.`,
    ],
  },
  {
    heading: "13. Limitation of liability",
    paragraphs: [
      `To the maximum extent permitted by law, ${site.brand} shall not be liable for any indirect, incidental, or consequential loss arising from the use of our products or website. Our total liability for any claim relating to a product is limited to the amount you paid for that product. Always use products strictly as directed.`,
    ],
  },
  {
    heading: "14. Indemnity",
    paragraphs: [
      `You agree to indemnify and hold ${site.brand} harmless from any claims, losses, or expenses arising out of your misuse of the website or breach of these Terms.`,
    ],
  },
  {
    heading: "15. Governing law",
    paragraphs: [
      "These Terms are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, and any disputes shall be subject to the exclusive jurisdiction of the courts of Pakistan.",
    ],
  },
  {
    heading: "16. Severability",
    paragraphs: [
      "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.",
    ],
  },
  {
    heading: "17. Changes to these terms",
    paragraphs: [
      "We may update these Terms & Conditions at any time. The version published on this page at the time of your order applies to that order. Please review this page periodically.",
    ],
  },
  {
    heading: "18. Contact us",
    paragraphs: [
      `For any questions about these Terms or your order, contact us on WhatsApp at +${site.whatsappNumber}, by phone at ${site.supportPhone}, or by email at ${site.supportEmail}.`,
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated={LAST_UPDATED}
      intro={`Please review these terms carefully before ordering from ${site.brand}.`}
      sections={sections}
    />
  );
}
