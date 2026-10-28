import './globals.css';
import { CartProvider } from '@/context/CartContext';
import StoreShell from '@/components/shared/StoreShell';
import ScrollAnimations from '@/components/shared/ScrollAnimations';
import { siteConfig } from '@/config/site';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Dishanth Enterprise | Dry Fruits Wholesale & Bulk Orders in Rajampet', template: '%s | Dishanth Enterprise' },
  description: 'Discover dry fruits, nuts, seeds, honey and combo packs from Dishanth Enterprise in Rajampet, Andhra Pradesh. Contact us for wholesale and bulk-order enquiries.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: siteConfig.name,
    title: 'Dishanth Enterprise | Dry Fruits Wholesale & Bulk Orders in Rajampet',
    description: 'Discover dry fruits, nuts, seeds, honey and combo packs from Dishanth Enterprise in Rajampet, Andhra Pradesh.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Dishanth Enterprise dry fruits and pantry collection' }],
  },
  twitter: { card: 'summary_large_image', title: 'Dishanth Enterprise | Dry Fruits Wholesale & Bulk Orders in Rajampet', description: 'Dry fruits, nuts, seeds, honey and combo packs from Rajampet, Andhra Pradesh.', images: [siteConfig.ogImage] },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' }, { url: '/images/dishanth-logo.png', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#07183d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>
        <CartProvider>
          <ScrollAnimations />
          <StoreShell>{children}</StoreShell>
        </CartProvider>
      </body>
    </html>
  );
}
