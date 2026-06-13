import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Nastaliq_Urdu } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { getDefaultProduct } from "@/data/products";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Urdu (Nastaliq) script font, used for the Urdu name/tagline.
const notoUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-urdu",
  subsets: ["arabic"],
  weight: ["400", "600"],
  display: "swap",
});

const product = getDefaultProduct();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${product.name} — ${site.brand}`,
    template: `%s | ${site.brand}`,
  },
  description: product.tagline,
  keywords: [product.name, site.brand, "natural relief oil", "herbal skin care"],
  openGraph: {
    title: `${product.name} — ${site.brand}`,
    description: product.tagline,
    type: "website",
    url: site.url,
    siteName: site.brand,
  },
  twitter: {
    card: "summary_large_image",
    title: `${product.name} — ${site.brand}`,
    description: product.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${notoUrdu.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-paper text-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
