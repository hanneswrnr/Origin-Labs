"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/app/admin/actions";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    gradient: "from-violet-500 to-purple-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    name: "Preise",
    href: "/admin/preise",
    gradient: "from-primary-cyan to-primary-blue",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Projekte",
    href: "/admin/projekte",
    gradient: "from-green-500 to-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    name: "Kontakt",
    href: "/admin/kontakt",
    gradient: "from-pink-500 to-rose-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Traffic",
    href: "/admin/traffic",
    gradient: "from-amber-500 to-orange-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Previews",
    href: "/admin/previews",
    gradient: "from-indigo-500 to-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-admin-surface/90 backdrop-blur-2xl rounded-2xl
                   shadow-xl shadow-black/30 border border-white/10 hover:bg-admin-surface-hover transition-colors"
      >
        <svg className="w-6 h-6 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 88 : 288,
          x: isMobileOpen ? 0 : typeof window !== 'undefined' && window.innerWidth < 1024 ? -288 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-0 h-screen z-50 flex flex-col
                   lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Glass Background */}
        <div className="absolute inset-0 bg-admin-surface/90 backdrop-blur-2xl border-r border-white/10" />

        {/* Decorative Gradient Orbs */}
        <div className="absolute top-20 -right-10 w-40 h-40 bg-gradient-to-br from-primary-cyan/20 to-primary-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-10 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <Link href="/admin" className="flex items-center">
                <AnimatePresence mode="wait">
                  {isCollapsed ? (
                    <motion.div
                      key="icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan to-primary-blue rounded-2xl blur-lg opacity-50" />
                      <Image
                        src="/logo-icon.png"
                        alt="Origin Labs"
                        width={48}
                        height={48}
                        className="rounded-2xl relative z-10 shadow-lg"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="full"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Image
                        src="/logo-full-dark.png"
                        alt="Origin Labs"
                        width={160}
                        height={40}
                        className="h-10 w-auto"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>

              {/* Collapse Button */}
              <motion.button
                onClick={() => setIsCollapsed(!isCollapsed)}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(45, 212, 224, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                className="hidden lg:flex p-2.5 rounded-xl transition-colors"
              >
                <motion.svg
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-5 h-5 text-slate-300/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </motion.svg>
              </motion.button>
            </div>

            {/* Admin Badge */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold
                                 bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10
                                 text-primary-blue rounded-xl border border-primary-cyan/20">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Admin Dashboard
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              const isHovered = hoveredItem === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300
                              ${isCollapsed ? "justify-center px-3" : ""}
                              ${active ? "text-white" : "text-slate-300 hover:text-white"}`}
                  >
                    {/* Active Background - Always visible for active item */}
                    {active && (
                      <motion.div
                        layoutId="activeBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg`}
                        style={{
                          boxShadow: `0 10px 30px -10px ${item.gradient.includes('cyan') ? 'rgba(45, 212, 224, 0.4)' : 'rgba(139, 92, 246, 0.4)'}`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Hover Background - Only for non-active items */}
                    <AnimatePresence>
                      {isHovered && !active && (
                        <motion.div
                          layoutId="hoverBackground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 rounded-2xl bg-white/10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Icon */}
                    <motion.span
                      className="relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.span>

                    {/* Label */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="relative z-10 font-semibold whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Active Indicator Dot */}
                    {active && isCollapsed && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 mt-auto">
            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

            {/* View Website Link */}
            <motion.a
              href="/"
              whileHover={{ x: 4 }}
              className={`flex items-center gap-3 px-4 py-3 text-slate-300/70 hover:text-primary-cyan
                         bg-white/5 hover:bg-primary-cyan/10 rounded-xl transition-all duration-300
                         ${isCollapsed ? "justify-center px-3" : ""}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium whitespace-nowrap"
                  >
                    Website ansehen
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>

            {/* Sign Out Button */}
            <motion.button
              onClick={handleSignOut}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 mt-2 text-red-500
                         bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-all duration-300
                         ${isCollapsed ? "justify-center px-3" : ""}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-semibold whitespace-nowrap"
                  >
                    Abmelden
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
