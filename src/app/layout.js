import './globals.css';
import { CartProvider } from '@/context/CartContext';
import SiteHeader from '@/components/shared/SiteHeader';
import SiteFooter from '@/components/shared/SiteFooter';
import ScrollAnimations from '@/components/shared/ScrollAnimations';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: { default: 'Dishanth Enterprises | Thoughtful pantry favourites', template: '%s | Dishanth Enterprises' },
  description: 'Explore nuts, dry fruits, seeds, snacks, honey and curated combinations from Dishanth Enterprises.',
  icons: { icon: siteConfig.logo },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ScrollAnimations />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
