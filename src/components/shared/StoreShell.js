'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '@/components/shared/SiteHeader';
import SiteFooter from '@/components/shared/SiteFooter';

export default function StoreShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <div className="store-shell">
      {!isAdmin && <SiteHeader />}
      <main className="store-main">{children}</main>
      {!isAdmin && <SiteFooter />}
    </div>
  );
}
