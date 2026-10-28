import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';
import ComboProducts from '@/components/products/ComboProducts';

export const metadata = { title: 'Curated combos' };

export default function CombosPage() {
  return (
    <>
      <section className="products-hero combos-page-hero">
        <picture>
          <source media="(max-width: 767px)" srcSet="https://res.cloudinary.com/sdca0kub/image/upload/f_auto,q_auto/v1793200708/dishanth-enterprise/assets/combos_page_banner_mobile.png" />
          <Image src="https://res.cloudinary.com/sdca0kub/image/upload/f_auto,q_auto/v1793200704/dishanth-enterprise/assets/combos_page_banner_laptop.png" alt="Curated dry fruit and snack combinations arranged for gifting" fill priority sizes="100vw" />
        </picture>
        <div className="products-hero__shade" />
        <div className="container products-hero__content">
          <p className="eyebrow">A little of everything</p>
          <h1>Meet the combinations</h1>
          <p>Thoughtfully gathered selections for sharing, gifting and every occasion worth celebrating.</p>
        </div>
      </section>
      <section className="section section--combo-list" id="combo-list">
        <div className="container">
          <div className="combo-value-strip"><span><Gift size={18} /> Ready-to-browse selections</span><i /><span><Sparkles size={18} /> Good for sharing or gifting</span><i /><span><ArrowRight size={18} /> Ask us about a larger order</span></div>
          <ComboProducts />
          <div className="combo-contact-strip"><p><span>Have a specific mix in mind?</span> We can start with your requirements and talk through the options.</p><Link className="button button--navy" href="/bulk-orders">Ask about a custom selection <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}
