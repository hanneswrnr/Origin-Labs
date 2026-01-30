import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Admin Dashboard | Origin Labs",
  description: "Origin Labs Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if this is the login page
  const isLoginPage =
    typeof window !== "undefined"
      ? window.location.pathname === "/admin/login"
      : false;

  // For server-side, we'll handle this differently
  // The middleware will handle redirects, so we just render

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {children}
      </div>
    </SessionProvider>
  );
}
