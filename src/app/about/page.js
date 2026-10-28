import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Boxes, Instagram, Leaf, MessageCircle, PackageCheck, Youtube } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'About us' };

const socialMedia = [
  { key: 'instagram', label: 'Instagram', eyebrow: 'Follow along', icon: Instagram },
  { key: 'whatsapp', label: 'WhatsApp community', eyebrow: 'Join the community', icon: MessageCircle },
  { key: 'youtube', label: 'YouTube', eyebrow: 'Watch with us', icon: Youtube },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__copy"><p className="eyebrow">A little about us</p><h1>Good things belong in everyday life.</h1><p>Dishanth Enterprise brings together a considered range of dry fruits, nuts, seeds, snacks, honey and curated combinations for homes and businesses.</p><Link className="button button--navy" href="/products">Browse the collection <ArrowRight size={17} /></Link></div>
          <div className="about-hero__image"><Image src="/images/shop-image.png" alt="Inside the Dishanth Enterprise dry fruits and pantry store" fill priority sizes="(max-width: 800px) 100vw, 50vw" /><span className="about-hero__caption">Visit the Dishanth Enterprise store</span></div>
          <span className="about-hero__index">01 / OUR APPROACH</span>
        </div>
      </section>
      <section className="section section--about-statement">
        <div className="container about-statement"><span className="about-statement__mark"><Image src={siteConfig.logo} alt={`${siteConfig.name} logo`} width={140} height={140} /></span><div><p className="eyebrow">Thoughtfully brought together</p><h2>A collection for the cupboard, the gathering and everything in between.</h2><p>We want it to be easy to explore a broad range in one place, whether you are choosing something for home, planning a celebration, or looking into a larger business requirement.</p></div></div>
      </section>
      <section className="section section--about-range">
        <div className="container"><div className="about-range-heading"><div><p className="eyebrow">A broad pantry</p><h2>One collection.<br /><em>Many good reasons.</em></h2></div><p>From familiar favourites to curated combinations, browse the range and find a starting point that feels right for you.</p></div>
          <div className="about-range-grid"><article><span><Leaf size={19} /></span><small>01</small><h3>Everyday favourites</h3><p>Nuts, dry fruits, seeds, honey and snack options for a well-stocked pantry.</p></article><article><span><Boxes size={19} /></span><small>02</small><h3>Selections to share</h3><p>Curated combinations that bring a few familiar things together in one place.</p></article><article><span><PackageCheck size={19} /></span><small>03</small><h3>Made for larger needs</h3><p>A straightforward enquiry path for businesses, events and gifting requirements.</p></article></div>
        </div>
      </section>
      <section className="section about-social" aria-labelledby="about-social-title">
        <div className="container">
          <div className="about-social__heading"><p className="eyebrow">Stay connected</p><h2 id="about-social-title">Find us beyond the store.</h2><p>Scan a QR code or tap a card to follow Dishanth Enterprise, join our community and see what we are sharing next.</p></div>
          <div className="about-social__grid">
            {socialMedia.map(({ key, label, eyebrow, icon: Icon }) => {
              const social = siteConfig.socials.find((item) => item.icon === key);
              if (!social) return null;
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(social.href)}`;
              return <a className={`about-social__card about-social__card--${key}`} key={social.href} href={social.href} target="_blank" rel="noreferrer"><span className="about-social__qr"><img src={qrUrl} alt={`${label} QR code`} loading="lazy" /></span><span className="about-social__copy"><small>{eyebrow}</small><strong><Icon size={17} />{label}</strong><span>Scan or tap to open <ArrowRight size={15} /></span></span></a>;
            })}
          </div>
        </div>
      </section>
      <section className="section about-store" aria-labelledby="about-store-title">
        <div className="container">
          <div className="about-store__heading"><h2 id="about-store-title">Visit our store</h2><span aria-hidden="true" /><p>Find Dishanth Enterprise in Rajampet, Andhra Pradesh.</p></div>
          <a className="about-store__address" href={siteConfig.locationUrl} target="_blank" rel="noreferrer">{siteConfig.address} <ArrowRight size={16} /></a>
          <div className="about-store__map"><iframe title="Map showing Dishanth Enterprise in Rajampet" src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
        </div>
      </section>
    </>
  );
}
