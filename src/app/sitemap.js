import { getAllProducts } from '@/lib/products-store';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

const publicRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/products', priority: .9, changeFrequency: 'daily' },
  { path: '/combos', priority: .8, changeFrequency: 'weekly' },
  { path: '/bulk-orders', priority: .8, changeFrequency: 'monthly' },
  { path: '/about', priority: .7, changeFrequency: 'monthly' },
  { path: '/contact', priority: .7, changeFrequency: 'monthly' },
];

function modificationDate(value) {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (typeof value === 'number') return new Date(value);
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }
  if (typeof value.toDate === 'function') return value.toDate();
  if (typeof value.toMillis === 'function') return new Date(value.toMillis());
  return undefined;
}

export default async function sitemap() {
  let products = [];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }

  return [
    ...publicRoutes.map((route) => ({ url: `${SITE_URL}${route.path}`, priority: route.priority, changeFrequency: route.changeFrequency })),
    ...products.filter((product) => product?.id).map((product) => ({
      url: `${SITE_URL}/products/${product.id}`,
      lastModified: modificationDate(product.updatedAt || product.createdAt),
      changeFrequency: 'weekly',
      priority: .7,
    })),
  ];
}
