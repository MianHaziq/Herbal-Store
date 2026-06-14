import { site } from "@/lib/site";

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  total: number;
}

/**
 * Builds a click-to-chat WhatsApp URL with the order details pre-filled
 * as the message. No backend needed — submitting the form just opens
 * this link, which starts a WhatsApp chat to {site.whatsappNumber}.
 *
 * @see https://faq.whatsapp.com/5913398998672934 (wa.me link format)
 */
export function buildWhatsAppOrderUrl(order: OrderDetails): string {
  const lines = [
    `*New Order — ${site.brand}*`,
    "",
    `*Product:* ${order.productName} (${order.variantLabel})`,
    `*Quantity:* ${order.quantity}`,
    `*Total:* ${site.currency} ${order.total.toLocaleString()}`,
    "",
    `*Name:* ${order.name}`,
    `*Phone:* ${order.phone}`,
    `*Address:* ${order.address}`,
  ];

  const message = lines.join("\n");
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * A general "chat with us" WhatsApp link with a friendly pre-filled message.
 * Used by the floating sticky WhatsApp button (not tied to a placed order).
 */
export function buildWhatsAppInquiryUrl(productName: string): string {
  const message = `Assalam o Alaikum! I'm interested in ${productName}. Could you please share more details?`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
