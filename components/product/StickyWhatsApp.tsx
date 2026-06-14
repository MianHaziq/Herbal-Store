import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { IconWhatsApp } from "@/components/icons";

interface StickyWhatsAppProps {
  productName: string;
}

/**
 * Floating WhatsApp button (always visible). Opens a chat with the store's
 * number, pre-filled with a friendly inquiry message. Sits above the mobile
 * order bar so the two don't overlap.
 */
export default function StickyWhatsApp({ productName }: StickyWhatsAppProps) {
  return (
    <a
      href={buildWhatsAppInquiryUrl(productName)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      {/* Gentle attention pulse */}
      <span
        className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-40"
        aria-hidden="true"
      />
      <span className="relative">
        <IconWhatsApp size={30} />
      </span>
    </a>
  );
}
