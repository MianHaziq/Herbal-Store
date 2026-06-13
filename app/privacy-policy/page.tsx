import type { Metadata } from "next";

import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.brand} collects, uses, and protects the information you share when placing an order.`,
};

const LAST_UPDATED = "June 12, 2026";

const sections: LegalSection[] = [
  {
    heading: "1. Information we collect",
    paragraphs: [
      `When you place an order with ${site.brand}, you provide details directly through our order form and WhatsApp. We only collect what we need to process and deliver your order.`,
    ],
    bullets: [
      "Your name",
      "Phone number",
      "Delivery address",
      "Order details (product, size, quantity)",
      "Any messages you send us on WhatsApp",
    ],
  },
  {
    heading: "2. How we use your information",
    paragraphs: ["We use the information you provide to:"],
    bullets: [
      "Confirm, prepare, and deliver your order",
      "Contact you about your order via WhatsApp, phone, or SMS",
      "Provide customer support and handle returns or complaints",
      "Improve our products and service",
    ],
  },
  {
    heading: "3. How orders are processed",
    paragraphs: [
      `Our website does not store your information in a database. When you submit the order form, your details are sent as a WhatsApp message to our team, and the conversation takes place inside WhatsApp. WhatsApp's own handling of your data is governed by its privacy policy.`,
    ],
  },
  {
    heading: "4. Sharing your information",
    paragraphs: [
      "We do not sell or rent your personal information. We only share it where necessary to fulfil your order — for example, with the courier or delivery partner that brings your package to you.",
    ],
  },
  {
    heading: "5. Data retention",
    paragraphs: [
      "Because we operate on a cash-on-delivery, WhatsApp-based model, your order details remain in our WhatsApp chat history. You may ask us to delete your conversation and details at any time.",
    ],
  },
  {
    heading: "6. Cookies and analytics",
    paragraphs: [
      "Our website is a static page and does not set advertising cookies. If we add analytics in the future to understand visits, it will be used only in aggregate and never to identify you personally.",
    ],
  },
  {
    heading: "7. Your rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of the personal information you have shared with us. To do so, contact us using the details below.",
    ],
  },
  {
    heading: "8. Children's privacy",
    paragraphs: [
      "Our products and store are intended for adults. We do not knowingly collect information from children. Orders should be placed by an adult.",
    ],
  },
  {
    heading: "9. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a new \"last updated\" date.",
    ],
  },
  {
    heading: "10. Contact us",
    paragraphs: [
      `If you have any questions about this Privacy Policy or your information, contact us on WhatsApp at +${site.whatsappNumber} or by email at ${site.supportEmail}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={`This Privacy Policy explains how ${site.brand} collects, uses, and protects your information when you visit our website and place an order.`}
      sections={sections}
    />
  );
}
