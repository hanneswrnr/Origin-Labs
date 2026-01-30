export const metadata = {
  title: "Admin Dashboard | Origin Labs",
  description: "Origin Labs Admin Dashboard",
};

// Force dynamic rendering to ensure middleware auth check runs on every request
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {children}
    </div>
  );
}
