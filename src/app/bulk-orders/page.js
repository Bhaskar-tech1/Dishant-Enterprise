import Image from 'next/image';
import { BadgePercent, Boxes, Building2, Gift, Store } from 'lucide-react';
import BulkEnquiryForm from '@/components/forms/BulkEnquiryForm';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({ title: 'Wholesale & Bulk Dry Fruit Orders', description: 'Enquire about dry fruits, nuts, seeds, honey and curated packs for wholesale, retailers, gifting, events and larger requirements.', path: '/bulk-orders' });

const services = [
  { title: 'Corporate gifting', description: 'Thoughtful gifts for teams and clients', icon: Gift },
  { title: 'Wholesale supply', description: 'Pantry favourites in larger quantities', icon: Store },
  { title: 'Custom packs', description: 'Curated mixes for your occasion', icon: Boxes },
  { title: 'Bulk pricing', description: 'Good value for larger requirements', icon: BadgePercent },
];

export default function BulkOrdersPage() {
  return (
    <main className="bulk-orders-page">
      <section className="bulk-orders-hero">
        <picture>
          <source media="(max-width: 767px)" srcSet="https://res.cloudinary.com/sdca0kub/image/upload/f_auto,q_auto/v1793200457/dishanth-enterprise/assets/Bulkorder_page_banner_mobil.png" />
          <Image src="https://res.cloudinary.com/sdca0kub/image/upload/f_auto,q_auto/v1793200433/dishanth-enterprise/assets/Bulkorder_page_banner_laptop.png" alt="Dry fruits, gift packs and pantry products prepared for bulk orders" fill priority sizes="100vw" />
        </picture>
        <div className="bulk-orders-hero__shade" />
        <div className="bulk-orders-hero__content">
          <span className="bulk-orders-hero__badge"><Building2 size={15} /> Premium partners</span>
          <h1>Corporate &amp; Bulk Orders</h1>
          <p>Authentic Indian snacks and dry fruits for gifting, events and wholesale, prepared with care by Dishanth Enterprise.</p>
        </div>
      </section>

      <section className="bulk-orders-services container" aria-label="Ways we can help">
        {services.map(({ title, description, icon: Icon }) => (
          <article className="bulk-service-card" key={title}>
            <span className="bulk-service-card__icon"><Icon size={20} strokeWidth={1.8} /></span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <section className="bulk-orders-enquiry container" aria-labelledby="bulk-enquiry-title">
        <div className="bulk-orders-enquiry__heading">
          <p className="eyebrow">Plan something good</p>
          <h2 id="bulk-enquiry-title">Tell us your requirement</h2>
          <span aria-hidden="true" />
          <p>Share a few details and our team can help with the right products, quantity and packing.</p>
        </div>
        <BulkEnquiryForm />
      </section>
    </main>
  );
}
