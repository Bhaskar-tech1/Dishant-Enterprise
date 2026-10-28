import Image from 'next/image';
import ProductCatalogue from '@/components/products/ProductCatalogue';
import { getAllProducts } from '@/lib/products-store';

export const metadata = { title: 'Products' };
export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  let products = [];
  try {
    products = await getAllProducts();
  } catch (err) {
    console.error('Error fetching products on server:', err);
  }

  const standardProducts = products.filter((p) => p.type === 'product');

  return (
    <>
      <section className="products-hero">
        <picture>
          <source media="(max-width: 767px)" srcSet="https://res.cloudinary.com/sdca0kub/image/upload/f_auto,q_auto/v1793200602/dishanth-enterprise/assets/new_productspage_banner_mobile.png" />
          <Image src="https://res.cloudinary.com/sdca0kub/image/upload/f_auto,q_auto/v1793200597/dishanth-enterprise/assets/new_productspage_banner_laptop.png" alt="A colourful selection of dry fruits, seeds, snacks and pantry favourites" fill priority sizes="100vw" />
        </picture>
        <div className="products-hero__shade" />
        <div className="container products-hero__content">
          <p className="eyebrow">The Dishanth collection</p>
          <h1>Explore our products</h1>
          <p>Browse pantry favourites, easy snacks and thoughtful selections for sharing.</p>
        </div>
      </section>
      <section className="section section--catalogue">
        <div className="container">
          <ProductCatalogue
            initialCategory={params?.category || ''}
            initialProducts={standardProducts}
          />
        </div>
      </section>
    </>
  );
}
