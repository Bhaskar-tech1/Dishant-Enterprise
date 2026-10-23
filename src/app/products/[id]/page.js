import { notFound } from 'next/navigation';
import ProductDetail from '@/components/products/ProductDetail';
import { categories } from '@/data/categories';
import { findProduct } from '@/data/products';
import { getRelatedProducts } from '@/lib/recommendations';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return { title: 'Product not found' };
  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const category = categories.find((item) => item.id === product.category);
  const relatedProducts = getRelatedProducts(product);

  return <ProductDetail product={product} category={category} relatedProducts={relatedProducts} />;
}
