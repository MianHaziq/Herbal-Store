import type { Metadata } from "next";

import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.brand} collects, uses, and protects the information you share when placing an order.`,
};

const LAST_UPDATED = "July 1, 2026";

const sections: LegalSection[] = [
  {
    heading: "1. Introduction",
    paragraphs: [
      `This Privacy Policy describes how ${site.brand} ("we", "us", or "our") collects, uses, stores, and protects your personal information when you visit our website, place an order, or contact us. By using our website or placing an order, you consent to the practices described in this policy.`,
      "We are committed to protecting your privacy and only collect information that is necessary to process and deliver your orders and to provide customer support.",
    ],
  },
  {
    heading: "2. Information we collect",
    paragraphs: [
      "When you place an order or get in touch with us, you provide information directly through our order form, on WhatsApp, by phone, or by email. We collect:",
    ],
    bullets: [
      "Your full name",
      "Phone number",
      "Delivery address and city",
      "Order details (product, size, quantity, order number, and date)",
      "Any messages or information you share with us when you contact us",
    ],
  },
  {
    heading: "3. How we collect information",
    paragraphs: [
      "We collect information in the following ways:",
    ],
    bullets: [
      "Directly from you when you submit the order form or message us",
      "Automatically, in a limited way, such as basic technical data your browser sends (e.g. device type) when loading the page",
    ],
  },
  {
    heading: "4. How we use your information",
    paragraphs: ["We use the information you provide to:"],
    bullets: [
      "Confirm, prepare, and deliver your order",
      "Contact you about your order via WhatsApp, phone, or SMS",
      "Provide customer support and handle returns, replacements, or complaints",
      "Keep a record of orders for accounting and after-sales service",
      "Improve our products, website, and overall service",
    ],
  },
  {
    heading: "5. How your order is processed and stored",
    paragraphs: [
      "When you submit the order form, your order details are sent securely to our own server, which records the order in a private Google Sheet that only our team can access. We may also receive your order as a WhatsApp message so our team can confirm it with you.",
      "We do not run a public customer database on this website, and your payment is handled in cash at delivery — we never collect card or bank details on this site.",
    ],
  },
  {
    heading: "6. Sharing your information",
    paragraphs: [
      "We do not sell or rent your personal information. We only share it where necessary to fulfil your order or operate our service, including with:",
    ],
    bullets: [
      "Courier and delivery partners, to deliver your package and collect cash on delivery",
      "Google (Google Sheets / Apps Script), which stores your order record on our behalf as a data processor",
      "WhatsApp / Meta, when you choose to message us, governed by their own privacy policy",
      "Authorities or advisors where we are legally required to do so",
    ],
  },
  {
    heading: "7. Cookies and analytics",
    paragraphs: [
      "Our website is a lightweight, mostly static page and does not set advertising cookies. If we add analytics in the future to understand visits, it will be used only in aggregate and never to personally identify you.",
    ],
  },
  {
    heading: "8. Data retention",
    paragraphs: [
      "We keep your order details only for as long as needed to fulfil your order, provide after-sales support, and meet our record-keeping obligations. You may ask us to delete your information at any time, subject to any records we are required to keep.",
    ],
  },
  {
    heading: "9. Data security",
    paragraphs: [
      "We take reasonable technical and organisational measures to protect your information against loss, misuse, and unauthorised access. Order data is transmitted over an encrypted (HTTPS) connection. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "10. Your rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of the personal information you have shared with us. You may also ask us to stop contacting you for marketing purposes. To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    heading: "11. Children's privacy",
    paragraphs: [
      "Our products and store are intended for adults. We do not knowingly collect information from children. Orders should be placed by an adult (18 years or older).",
    ],
  },
  {
    heading: "12. Third-party links",
    paragraphs: [
      "Our website or messages may contain links to third-party sites or services (such as WhatsApp). We are not responsible for the privacy practices or content of those third parties; please review their policies separately.",
    ],
  },
  {
    heading: "13. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a new \"last updated\" date. Your continued use of our website after changes are posted means you accept the updated policy.",
    ],
  },
  {
    heading: "14. Contact us",
    paragraphs: [
      `If you have any questions about this Privacy Policy or your information, contact us on WhatsApp at +${site.whatsappNumber}, by phone at ${site.supportPhone}, or by email at ${site.supportEmail}.`,
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
