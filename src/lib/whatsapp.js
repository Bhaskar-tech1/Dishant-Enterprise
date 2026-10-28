import { siteConfig } from '@/config/site';
import { formatCurrency } from '@/lib/pricing';

export function buildWhatsAppUrl(message) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, '');
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppMessage(message) {
  const url = buildWhatsAppUrl(message);
  if (!url) return 'missing-number';
  const chat = window.open(url, '_blank');
  if (!chat) return 'blocked';
  chat.opener = null;
  return 'opened';
}

export function buildOrderMessage(lines, subtotal, customer = {}) {
  const items = lines.map(({ product, variantLabel, quantity, price }) => {
    const lineTotal = quantity * price;
    return `• ${product.name}${variantLabel ? ` (${variantLabel})` : ''}\n  ${quantity} × ${formatCurrency(price)} = ${formatCurrency(lineTotal)}`;
  }).join('\n');
  const customerDetails = customer.name ? `Customer details:\nName: ${customer.name}\nPhone: ${customer.phone}\nDelivery address: ${customer.address}\nPIN code: ${customer.pin}\n\n` : '';
  return `Hello ${siteConfig.name}, I would like to enquire about this order:\n\n${customerDetails}${items}\n\nCart subtotal: ${formatCurrency(subtotal)}\n\nPlease share availability and delivery details.`;
}
