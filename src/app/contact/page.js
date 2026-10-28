import { ArrowUpRight, Clock3, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'Contact' };

function SocialIcon({ type }) {
  if (type === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="17.6" cy="6.5" r="1.2" fill="currentColor" /></svg>;
  if (type === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.6 1.7-1.6h1.8V3.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H8.1V13h2.7v8h2.9Z" /></svg>;
  if (type === 'whatsapp') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.8 9.8 0 0 0-8.5 14.7L2.1 21.9l5.1-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.3.2-.3.7-1.1.1-.2 0-.3 0-.5l-.4-1.5c-.1-.4-.3-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.9 4.5 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.7.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.2-.3-.2-.5-.3Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.1a2.9 2.9 0 0 0-2-2C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 1.9 12a30 30 0 0 0 .5 4.9 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2 30 30 0 0 0 .5-4.9 30 30 0 0 0-.5-4.9ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z" /></svg>;
}

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}`;

  return (
    <main className="contact-page">
      <section className="section contact-page-section">
        <div className="container contact-card">
          <aside className="contact-card__aside">
            <p className="eyebrow">We’re here to help</p>
            <h1>Get in touch</h1>
            <p className="contact-card__intro">Whether you’re choosing something for home or planning a larger order, our team is ready to help.</p>
            <div className="contact-card__details">
              <a className="contact-card__detail" href={siteConfig.locationUrl} target="_blank" rel="noreferrer">
                <span><MapPin size={19} /></span><span><small>Visit our store</small><strong>{siteConfig.address}</strong></span>
              </a>
              <a className="contact-card__detail" href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>
                <span><Phone size={19} /></span><span><small>Call us</small><strong>{siteConfig.phone}</strong></span>
              </a>
            </div>
            <div className="contact-card__note">
              <span><Clock3 size={19} /></span>
              <div><strong>Store hours</strong><p>Message us on WhatsApp to confirm today’s opening hours before your visit.</p></div>
            </div>
            <div className="contact-card__actions">
              <a className="button button--light" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp us <ArrowUpRight size={15} /></a>
              <a className="button button--outline-light" href={siteConfig.locationUrl} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={15} /></a>
            </div>
            <div className="footer-socials contact-socials" aria-label="Follow Dishanth Enterprise">
              {siteConfig.socials.map((social) => <a key={social.href} className={`footer-socials__link footer-socials__link--${social.icon}`} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}><SocialIcon type={social.icon} /></a>)}
            </div>
          </aside>
          <div className="contact-card__form">
            <div className="contact-card__form-heading"><p className="eyebrow">A note to our team</p><h2>Send an enquiry</h2><p>Fill out the form and we’ll prepare your message in WhatsApp.</p></div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
