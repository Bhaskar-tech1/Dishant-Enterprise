import { notFound } from 'next/navigation';
import ProductDetail from '@/components/products/ProductDetail';
import { categories } from '@/data/categories';
import { getAllProducts, getProductById } from '@/lib/products-store';
import { getRelatedProducts } from '@/lib/recommendations';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, createPageMetadata, productJsonLd } from '@/lib/seo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  let product;
  try {
    product = await getProductById(id);
  } catch {
    return { title: 'Product not found', robots: { index: false, follow: false } };
  }
  if (!product) return { title: 'Product not found', robots: { index: false, follow: false } };
  return createPageMetadata({
    title: product.name,
    description: product.description || `Explore ${product.name} from Dishanth Enterprise in Rajampet.`,
    path: `/products/${id}`,
    image: product.image,
  });
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const products = await getAllProducts();
  const category = categories.find((item) => item.id === product.category);
  const relatedProducts = getRelatedProducts(product, products);

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    ...(category ? [{ name: category.label, path: `/products?category=${category.id}` }] : []),
    { name: product.name, path: `/products/${product.id}` },
  ]);

  return <><JsonLd data={[breadcrumbs, productJsonLd(product, category)]} /><ProductDetail product={product} category={category} relatedProducts={relatedProducts} /></>;
}
