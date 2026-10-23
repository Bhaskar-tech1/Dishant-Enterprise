export const metadata = {
  title: 'Admin Portal | Dishanth Enterprise',
  description: 'Manage products, stock status, and catalog for Dishanth Enterprise.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="admin-root-layout">{children}</div>;
}
