import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section section--not-found" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <p className="eyebrow" style={{ color: 'var(--color-primary, #07183d)', letterSpacing: '0.1em', fontWeight: 600 }}>404 ERROR</p>
        <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1rem', fontFamily: 'var(--font-heading, serif)' }}>Page Not Found</h1>
        <p style={{ color: 'var(--color-text-muted, #666)', marginBottom: '2rem' }}>
          The page you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/" className="button button--navy" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={18} /> Back to Home
          </Link>
          <Link href="/products" className="button button--outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
