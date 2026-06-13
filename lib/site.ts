/**
 * Global site / brand configuration.
 * Edit these values to rebrand the whole store in one place.
 */
export const site = {
  brand: "Herbavia",
  tagline: "Trusted natural relief",
  /**
   * WhatsApp number that receives orders, in international format,
   * digits only (no "+", spaces, or dashes). Used to build wa.me links.
   * Example: +92 311 0645820  ->  "923110645820"
   */
  whatsappNumber: "923110645820",
  supportEmail: "care@herbavia.example",
  /** Used for canonical URLs / SEO. Update after you deploy. */
  url: "https://herbavia.example",
  currency: "Rs", // currency label shown next to prices

  // NOTE: Order delivery is handled server-side by /api/order, which reads the
  // Google Sheet Web App URL from the GOOGLE_SHEET_WEBHOOK_URL environment
  // variable (kept secret, not shipped to the browser). See .env.example.
} as const;
