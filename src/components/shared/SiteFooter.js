import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { categories } from '@/data/categories';

function SocialIcon({ type }) {
  if (type === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="17.6" cy="6.5" r="1.2" fill="currentColor" /></svg>;
  if (type === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.6 1.7-1.6h1.8V3.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H8.1V13h2.7v8h2.9Z" /></svg>;
  if (type === 'whatsapp') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.8 9.8 0 0 0-8.5 14.7L2.1 21.9l5.1-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.3.2-.3.7-1.1.1-.2 0-.3 0-.5l-.4-1.5c-.1-.4-.3-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.9 4.5 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.7.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.2-.3-.2-.5-.3Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.1a2.9 2.9 0 0 0-2-2C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 1.9 12a30 30 0 0 0 .5 4.9 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2 30 30 0 0 0 .5-4.9 30 30 0 0 0-.5-4.9ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z" /></svg>;
}

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-brand__lockup"><Image src={siteConfig.logo} alt="Dishanth Enterprise" width={68} height={68} /><span>Dishanth<span>Enterprise</span></span></Link>
            <p>A considered collection of nuts, dry fruits, seeds, snacks and pantry favourites for homes and businesses.</p>
            <Link className="footer-cta" href="/bulk-orders">Planning a larger order? <ArrowUpRight size={16} /></Link>
            <div className="footer-socials" aria-label="Follow Dishanth Enterprise">
              {siteConfig.socials.map((social) => {
                return <a key={social.href} className={`footer-socials__link footer-socials__link--${social.icon}`} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}><SocialIcon type={social.icon} /><span className="sr-only">{social.label}</span></a>;
              })}
            </div>
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
              {!siteConfig.phone && !siteConfig.email && !siteConfig.whatsappNumber && !siteConfig.address && <Link className="footer-contact__link" href="/contact">Open the contact form <ArrowUpRight size={14} /></Link>}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom__credits">
            <span>© {year} {siteConfig.name}. All rights reserved.</span>
            <span className="footer-developer">Developed by <a href="mailto:panjaabhishek57@gmail.com">Panja Abhishek</a> and <a href="mailto:bhaskarvanjarapu207@gmail.com">Bhaskar Vanjarapu</a>.</span>
          </div>
          <span>Thoughtfully selected. Simply shared.</span>
        </div>
      </div>
    </footer>
  );
}
