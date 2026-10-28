'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { homeSliderImages } from '@/data/images';
import { Autoplay, Pagination, A11y, EffectFade, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  { kicker: 'THOUGHTFUL GIFTING', title: 'A beautiful box of good things.', copy: 'Bring together premium nuts and naturally sweet treats for celebrations, visits and everyday generosity.', image: homeSliderImages[0], alt: 'A premium gift box filled with almonds, cashews, pistachios and dried fruits', cta: 'Explore dry fruits', href: '/products?category=dry-fruits', secondary: 'View our combos', secondaryHref: '/combos', position: '58% 52%' },
  { kicker: 'SEEDS & HONEY', title: 'Small additions, lasting goodness.', copy: 'Choose wholesome seeds and golden honey to add texture, flavour and nourishment to your everyday routine.', image: homeSliderImages[1], alt: 'Bowls of pumpkin, sunflower, flax and mixed seeds beside a jar of honey', cta: 'Shop seeds', href: '/products?category=seeds', secondary: 'Explore honey', secondaryHref: '/products?category=honey-items', position: '58% 50%' },
  { kicker: 'NUTRIENT-RICH BITES', title: 'A better kind of sweet treat.', copy: 'Enjoy nut-and-seed laddus made for sharing, gifting and those moments when you want something genuinely satisfying.', image: homeSliderImages[2], alt: 'A bowl of nut-and-seed laddus surrounded by almonds, cashews and dates', cta: 'Explore laddus', href: '/products?category=laddus-snacks', secondary: 'See our combos', secondaryHref: '/combos', position: '58% 52%' },
  { kicker: 'COLOURFUL & NATURAL', title: 'Fruitful flavour, beautifully kept.', copy: 'Add a bright, naturally sweet touch to your pantry with carefully prepared dehydrated fruits and vegetables.', image: homeSliderImages[3], alt: 'Colourful dehydrated fruits and vegetables arranged in bowls and glass jars', cta: 'Shop dried produce', href: '/products?category=dehydrated-fruits-veggies', secondary: 'Browse everything', secondaryHref: '/products', position: '60% 50%' },
];

export default function HeroSlider() {
  return (
    <section className="hero-slider" aria-label="Featured collections">
      <Swiper modules={[Autoplay, Pagination, A11y, EffectFade, Keyboard]} effect="fade" fadeEffect={{ crossFade: true }} loop autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: false }} pagination={{ clickable: true }} speed={1000} keyboard={{ enabled: true, onlyInViewport: true }} a11y={{ enabled: true }}>
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className={`hero-slide ${index === 3 ? 'hero-slide--soft' : ''}`}>
              <picture>
                <source media="(max-width: 767px)" srcSet={slide.image.mobile} />
                <Image className="hero-slide__image" src={slide.image.desktop} alt={slide.alt} fill priority={index === 0} sizes="100vw" style={{ objectPosition: slide.position }} />
              </picture>
              <div className="hero-slide__veil" />
              <div className="container hero-slide__content">
                <p className="hero-kicker"><span />{slide.kicker}<span /></p>
                <h1>{slide.title}</h1>
                <p className="hero-slide__copy">{slide.copy}</p>
                <div className="hero-actions">
                  <Link className="button button--light" href={slide.href}>{slide.cta}<ArrowRight size={17} /></Link>
                  <Link className="button button--outline-light" href={slide.secondaryHref}>{slide.secondary}</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
