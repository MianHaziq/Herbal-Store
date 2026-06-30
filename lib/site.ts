/**
 * Global site / brand configuration.
 * Edit these values to rebrand the whole store in one place.
 */
export const site = {
  /** Brand name. Shown in the navbar, footer, and order messages. */
  brand: "Dar-ul-Shifa",
  tagline: "Trusted natural skin care",
  /**
   * WhatsApp number that receives orders, in international format,
   * digits only (no "+", spaces, or dashes). Used to build wa.me links.
   * Example: +92 311 0645820  ->  "923110645820"
   */
  whatsappNumber: "923110645820",
  /** Phone number shown on the Contact page (display only). ← CHANGE THIS. */
  supportPhone: "+92 311 0645820",
  supportEmail: "care@darulshiffa.example",
  /** Business hours shown on the Contact page. */
  supportHours: "Mon–Sat, 10:00 AM – 7:00 PM (PKT)",
  /** Used for canonical URLs / SEO. Update after you deploy. */
  url: "https://darulshiffa.example",
  currency: "Rs", // currency label shown next to prices

  // NOTE: Order delivery is handled server-side by /api/order, which reads the
  // Google Sheet Web App URL from the GOOGLE_SHEET_WEBHOOK_URL environment
  // variable (kept secret, not shipped to the browser). See .env.example.
} as const;
