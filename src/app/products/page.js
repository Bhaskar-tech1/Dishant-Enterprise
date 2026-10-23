import ProductCatalogue from '@/components/products/ProductCatalogue';

export const metadata = { title: 'Products' };

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  return (
    <>
      <section className="page-intro page-intro--catalogue">
        <div className="container page-intro__inner">
          <div><p className="eyebrow">The Dishanth collection</p><h1>Explore our products</h1><p>Browse pantry favourites, easy snacks and thoughtful selections for sharing.</p></div>
          <span className="page-intro__note"><span>01</span> A sample catalogue for preview</span>
        </div>
      </section>
      <section className="section section--catalogue"><div className="container"><ProductCatalogue initialCategory={params?.category || ''} /></div></section>
    </>
  );
}
