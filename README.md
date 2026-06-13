# Herbavia — Single-Product Store

A clean, fast, mobile-responsive single-product landing page with **WhatsApp-based ordering** (no backend, no database). Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Deploys free on Vercel/Netlify/GitHub Pages.

## How ordering works

When a customer fills the form and clicks **Place Order**:

1. They immediately see an **order receipt** (order #, items, total, their details) — **no new tab opens**.
2. The browser sends the order to a small **serverless API route** (`app/api/order/route.ts`, free on Vercel/Netlify).
3. That route writes the order to your **Google Sheet server-side**, with **automatic retry** and a **real success check** — then returns the true result. The receipt updates to "received" only when the write is actually confirmed (otherwise it asks the customer to tap "Chat on WhatsApp").
4. The receipt also shows a **"Chat on WhatsApp"** button (order pre-filled) as an optional contact.

Why a serverless route instead of calling Google directly from the browser? Google Apps Script doesn't send CORS headers, so a browser can only "fire and forget" (it can't tell if Google accepted the order, and may show a false success). Doing the write server-side gives real confirmation + retry — important for paid ad traffic. The Sheet URL also stays secret (server env var, not in the public bundle).

Each order includes: order number, date, product + size, quantity, total, and the customer's name, phone, and address.

> ⚠️ **You must set the `GOOGLE_SHEET_WEBHOOK_URL` environment variable** (locally in `.env.local`, and in your host's dashboard for production), or order delivery is disabled and the receipt falls back to the "Chat on WhatsApp" button.

## Set up order delivery (Google Sheet — free & unlimited)

**One-time, ~3 minutes:**

1. Create a new **Google Sheet** (sheets.new). Optional header row:
   `Order #` · `Date` · `Product` · `Qty` · `Total` · `Name` · `Phone` · `Address`
2. In the sheet: **Extensions → Apps Script**. Delete any code there and paste this (the `LockService` lines prevent two simultaneous orders from clashing during traffic spikes):
   ```js
   function doPost(e) {
     const lock = LockService.getScriptLock();
     lock.waitLock(30000); // wait up to 30s for other writes to finish
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       const d = JSON.parse(e.postData.contents);
       sheet.appendRow([d.order_id, d.date, d.product, d.quantity, d.total, d.name, d.phone, d.address]);
       return ContentService.createTextOutput("ok");
     } finally {
       lock.releaseLock();
     }
   }
   ```
3. **Deploy → New deployment → type: Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Deploy, authorize (click *Advanced → Go to … (unsafe)* — it's your own script), and **copy the Web app URL**.
4. Put that URL in your environment (NOT in `lib/site.ts`):
   - **Local:** create `.env.local` (copy `.env.example`) with
     `GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec`
   - **Vercel:** Project → **Settings → Environment Variables** → add `GOOGLE_SHEET_WEBHOOK_URL` with the same value → redeploy.
5. Done. Every order now lands as a new row in your Sheet, confirmed.

> 💡 **Want an instant alert** (not just a sheet row)? Add to the Apps Script `doPost` (before `return`):
> `MailApp.sendEmail("you@gmail.com", "New order " + d.order_id, JSON.stringify(d, null, 2));`
> ⚠️ Free Gmail caps this at **~100 emails/day** — fine for alerts but the **Sheet** is your reliable record at 500/day. For instant push beyond that, ask to add **Telegram**.

The number used by the receipt's WhatsApp confirmation button is `site.whatsappNumber` (in `lib/site.ts`).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # lint
```

## Editing the product (do this here)

Everything you'll want to change lives in two files:

### 1. `lib/site.ts` — brand + WhatsApp number

```ts
export const site = {
  brand: "Herbavia",
  whatsappNumber: "923110645820", // ← digits only, international format, no "+"
  currency: "Rs",
  url: "https://herbavia.example", // ← set to your deployed URL (for SEO)
  ...
};
```

> **WhatsApp number format:** international, digits only. `+92 311 0645820` → `923110645820`.

### 2. `data/products.tsx` — the product itself

All product content is here: name, tagline, description, prices, sizes, benefits, usage steps, ingredients, FAQs, and reviews. Change the `name`, `price`, etc., and the whole page updates.

**Adding more products later:** push another object onto the `products` array (give it a unique `slug`). Read it with `getProduct(slug)`. The data model (`lib/types.ts`) and all section components already take a `product` prop, so a future per-product route (`app/[slug]/page.tsx`) is a small step.

## Project structure

```
app/
  layout.tsx              root layout, fonts, SEO metadata
  page.tsx                product page (assembles sections + JSON-LD)
  globals.css             theme tokens (medical palette) + utilities
lib/
  site.ts                 brand + WhatsApp config
  types.ts                Product type definitions
  whatsapp.ts             builds the wa.me order link
data/
  products.tsx            ← PRODUCT CONTENT (edit here)
components/
  Navbar.tsx, Footer.tsx
  icons/                  inline SVG icon set
  product/                BottleImage, ProductGallery, OrderForm, StickyOrderBar
  sections/product/       Hero, Benefits, Usage, Trust, Faq, FinalCta
```

## Deploy free

**Vercel (recommended):** push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new). Zero config — it detects Next.js. Done.

**Netlify:** import the repo; build command `npm run build`, the Next.js plugin is auto-added.

**GitHub Pages / fully static:** the site is 100% static. Add `output: "export"` to `next.config.ts`, run `npm run build`, and deploy the generated `out/` folder.

After deploying, set `site.url` in `lib/site.ts` to your live URL so SEO metadata and structured data point to the right place.

## Notes

- **No paid services, no backend, no database.** Orders go straight to WhatsApp.
- Responsive across mobile / tablet / desktop; sticky order bar on mobile.
- SEO: per-page metadata, Open Graph/Twitter tags, and Product JSON-LD structured data.
- The product image is a vector (SVG) illustration — swap it for a real photo by replacing `components/product/BottleImage.tsx` (or rendering `next/image` inside `ProductGallery`).
