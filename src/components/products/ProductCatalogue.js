'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDownWideNarrow, ArrowUpDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories } from '@/data/categories';
import { standardProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

function lowestPrice(product) {
  return Math.min(...(product.variants || []).map((variant) => variant.salePrice));
}

export default function ProductCatalogue({ initialCategory = '' }) {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const initial = Array.isArray(initialCategory) ? initialCategory : [initialCategory];
    return [...new Set(initial.filter((value) => categories.some((item) => item.id === value)))];
  });
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = standardProducts.filter((product) => {
      const matchesSearch = !needle || `${product.name} ${product.description}`.toLowerCase().includes(needle);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const price = lowestPrice(product);
      return matchesSearch && matchesCategory && (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice));
    });
    if (sort === 'price-low') result.sort((a, b) => lowestPrice(a) - lowestPrice(b));
    if (sort === 'price-high') result.sort((a, b) => lowestPrice(b) - lowestPrice(a));
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'featured') result.sort((a, b) => Number(b.featured) - Number(a.featured));
    return result;
  }, [selectedCategories, query, minPrice, maxPrice, sort]);

  function updateCategory(value) {
    const nextCategories = !value
      ? []
      : selectedCategories.includes(value)
        ? selectedCategories.filter((item) => item !== value)
        : [...selectedCategories, value];

    setSelectedCategories(nextCategories);
    const params = new URLSearchParams();
    nextCategories.forEach((item) => params.append('category', item));
    router.replace(nextCategories.length ? `/products?${params.toString()}` : '/products', { scroll: false });
  }

  function clearFilters() {
    setQuery(''); setSelectedCategories([]); setMinPrice(''); setMaxPrice(''); setSort('featured');
    router.replace('/products', { scroll: false });
  }

  const activeCategories = categories.filter((item) => selectedCategories.includes(item.id));
  const hasFilters = Boolean(selectedCategories.length || query || minPrice || maxPrice);

  return (
    <div className="catalogue-layout">
      <div className="catalogue-toolbar">
        <label className="search-field"><Search size={19} /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search nuts, snacks, honey…" /></label>
        <button className={`filter-toggle ${filtersOpen ? 'is-active' : ''}`} type="button" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}><SlidersHorizontal size={17} />Filters <span>{hasFilters ? 'On' : ''}</span></button>
        <label className="sort-select"><ArrowUpDown size={16} /><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option></select></label>
      </div>
      <div className={`catalogue-filters ${filtersOpen ? 'is-open' : ''}`}>
        <div className="category-pills" aria-label="Filter by category">
          <button type="button" className={!selectedCategories.length ? 'is-selected' : ''} onClick={() => updateCategory('')} aria-pressed={!selectedCategories.length}>All products</button>
          {categories.map((item) => <button key={item.id} type="button" className={selectedCategories.includes(item.id) ? 'is-selected' : ''} onClick={() => updateCategory(item.id)} aria-pressed={selectedCategories.includes(item.id)}>{item.label}</button>)}
        </div>
        <div className="price-filter">
          <span><ArrowDownWideNarrow size={15} />Price range</span>
          <label><span className="sr-only">Minimum price in rupees</span><input type="number" min="0" placeholder="Min ₹" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} /></label>
          <span className="price-filter__dash">to</span>
          <label><span className="sr-only">Maximum price in rupees</span><input type="number" min="0" placeholder="Max ₹" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} /></label>
        </div>
      </div>
      {hasFilters && <div className="catalogue-active-chips" aria-label="Active filters">
        {activeCategories.map((item) => <button key={item.id} type="button" onClick={() => updateCategory(item.id)}>{item.label}<X size={12} /></button>)}
        {query && <button type="button" onClick={() => setQuery('')}>Search: {query}<X size={12} /></button>}
        {minPrice && <button type="button" onClick={() => setMinPrice('')}>From ₹{minPrice}<X size={12} /></button>}
        {maxPrice && <button type="button" onClick={() => setMaxPrice('')}>Up to ₹{maxPrice}<X size={12} /></button>}
      </div>}
      <div className="catalogue-result-row">
        <p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'item' : 'items'}{activeCategories.length ? <> in <strong>{activeCategories.map((item) => item.label).join(', ')}</strong></> : null}</p>
        {hasFilters && <button type="button" className="clear-filters" onClick={clearFilters}>Clear filters <X size={14} /></button>}
      </div>
      {filtered.length ? <div className="product-grid product-grid--catalogue">{filtered.map((product) => <ProductCard key={product.id} product={{ ...product, categoryLabel: categories.find((item) => item.id === product.category)?.label }} />)}</div> : <div className="empty-state"><span><Search size={22} /></span><h2>No products match those filters</h2><p>Try another search or clear the filters to see the full selection.</p><button className="button button--navy" type="button" onClick={clearFilters}>Clear filters</button></div>}
      <p className="demo-note demo-note--catalogue">Prices and catalogue items are editable examples for this frontend preview.</p>
    </div>
  );
}
