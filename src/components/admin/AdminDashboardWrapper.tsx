"use client";

import AdminSidebar from "./AdminSidebar";

export default function AdminDashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-admin-bg via-[#0d0d0d] to-admin-surface relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] dark:invert"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Gradient Orbs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-cyan/10 via-primary-blue/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-[288px] min-h-screen transition-all duration-500 relative z-10">
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
