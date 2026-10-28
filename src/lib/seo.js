import { siteConfig } from '@/config/site';

export const SITE_URL = siteConfig.url.replace(/\/$/, '');

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function createPageMetadata({ title, description, path, image = siteConfig.ogImage }) {
  const canonical = absoluteUrl(path);
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: canonical,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${SITE_URL}/#business`,
    name: siteConfig.name,
    url: `${SITE_URL}/`,
    logo: siteConfig.logo,
    image: siteConfig.storeImage,
    description: 'Dishanth Enterprise is a dry fruit store and wholesale supplier in Rajampet, Andhra Pradesh, offering dry fruits, nuts, seeds, honey and combo packs.',
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6533+GR9, Mannuru',
      addressLocality: 'Rajampet',
      addressRegion: 'Andhra Pradesh',
      postalCode: '516115',
      addressCountry: 'IN',
    },
    sameAs: siteConfig.socials.map((social) => social.href),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: siteConfig.name,
    url: `${SITE_URL}/`,
    publisher: { '@id': `${SITE_URL}/#business` },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product, category) {
  const image = product.image ? absoluteUrl(product.image) : undefined;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: image ? [image] : undefined,
    sku: product.id,
    brand: { '@type': 'Brand', name: siteConfig.name },
    category: category?.label,
  };

  const price = Number(product.salePrice || product.variants?.[0]?.salePrice);
  if (Number.isFinite(price) && price > 0) {
    schema.offers = {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.id}`),
      priceCurrency: 'INR',
      price,
      availability: product.inStock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#business` },
    };
  }

  return Object.fromEntries(Object.entries(schema).filter(([, value]) => value !== undefined && value !== ''));
}
