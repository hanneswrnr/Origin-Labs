"use client";

import AdminSidebar from "./AdminSidebar";

export default function AdminDashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-[280px] min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
