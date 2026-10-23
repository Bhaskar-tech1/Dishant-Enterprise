import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { categories } from '@/data/categories';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-brand__lockup"><Image src={siteConfig.logo} alt="Dishanth Enterprises" width={68} height={68} /><span>Dishanth<span>Enterprises</span></span></Link>
            <p>A considered collection of nuts, dry fruits, seeds, snacks and pantry favourites for homes and businesses.</p>
            <Link className="footer-cta" href="/bulk-orders">Planning a larger order? <ArrowUpRight size={16} /></Link>
          </div>
          <div className="footer-column"><h3>Collections</h3><Link href="/products">All products</Link><Link href="/combos">Curated combos</Link><Link href="/bulk-orders">Bulk orders</Link></div>
          <div className="footer-column"><h3>Shop categories</h3>{categories.map((category) => <Link key={category.id} href={`/products?category=${category.id}`}>{category.label}</Link>)}<Link href="/combos">Combos</Link></div>
          <div className="footer-column footer-quick-contact">
            <h3>Quick links</h3><Link href="/about">About us</Link><Link href="/contact">Contact us</Link>
            <div className="footer-contact-details">
              <h3>Contact</h3>
              {siteConfig.address && (siteConfig.locationUrl ? <a href={siteConfig.locationUrl} target="_blank" rel="noreferrer"><MapPin size={15} />{siteConfig.address}</a> : <span><MapPin size={15} />{siteConfig.address}</span>)}
              {siteConfig.phone && <a href={`tel:${siteConfig.phone}`}><Phone size={15} />{siteConfig.phone}</a>}
              {siteConfig.email && <a href={`mailto:${siteConfig.email}`}><Mail size={15} />{siteConfig.email}</a>}
              {siteConfig.whatsappNumber && <a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={14} /></a>}
              {siteConfig.website && <a href={siteConfig.website} target="_blank" rel="noreferrer">Visit our store <ArrowUpRight size={14} /></a>}
              {siteConfig.socials.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer"><Instagram size={15} />{social.label}</a>)}
              {!siteConfig.phone && !siteConfig.email && !siteConfig.whatsappNumber && !siteConfig.address && <Link className="footer-contact__link" href="/contact">Open the contact form <ArrowUpRight size={14} /></Link>}
            </div>
          </div>
        </div>
        <div className="footer-bottom"><span>© {year} {siteConfig.name}. All rights reserved.</span><span>Thoughtfully selected. Simply shared.</span></div>
      </div>
    </footer>
  );
}
