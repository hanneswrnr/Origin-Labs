"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";

// Animated Counter Component
function AnimatedValue({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      className="text-4xl font-bold bg-gradient-to-r from-slate-grey to-slate-grey/80 bg-clip-text text-transparent font-montserrat"
    >
      {value}
    </motion.span>
  );
}

// Modern Stat Card Component
function StatCard({
  title,
  value,
  change,
  icon,
  gradient,
  delay = 0,
}: {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-6 border border-white/50
                overflow-hidden shadow-xl shadow-slate-grey/5 hover:shadow-2xl hover:shadow-primary-cyan/10
                transition-all duration-500"
    >
      {/* Gradient Orb Background */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${gradient} opacity-20
                      blur-2xl group-hover:opacity-40 group-hover:scale-150 transition-all duration-700`} />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                       -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-2xl ${gradient} shadow-lg`}>
            {icon}
          </div>
          {change && (
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3 }}
              className="px-3 py-1.5 text-xs font-semibold bg-green-100 text-green-600 rounded-full
                        flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {change}
            </motion.span>
          )}
        </div>

        <AnimatedValue value={value} />
        <p className="text-slate-grey/60 text-sm font-medium mt-2">{title}</p>
      </div>
    </motion.div>
  );
}

// Modern Quick Action Button
function QuickAction({
  href,
  icon,
  label,
  description,
  gradient,
  delay = 0,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        className="group flex items-center gap-4 p-5 bg-white/60 hover:bg-white/90 backdrop-blur-xl
                  rounded-2xl border border-white/50 hover:border-primary-cyan/30
                  shadow-lg shadow-slate-grey/5 hover:shadow-xl hover:shadow-primary-cyan/10
                  transition-all duration-300 cursor-pointer relative overflow-hidden"
      >
        {/* Hover Gradient Line */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${gradient} opacity-0
                        group-hover:opacity-100 transition-opacity duration-300`} />

        <div className={`p-3.5 ${gradient} rounded-xl shadow-lg group-hover:shadow-xl transition-shadow`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-grey group-hover:text-primary-blue transition-colors">
            {label}
          </h4>
          <p className="text-sm text-slate-grey/60">{description}</p>
        </div>
        <svg
          className="w-5 h-5 text-slate-grey/30 group-hover:text-primary-cyan transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <AdminDashboardWrapper>
      {/* Modern Header with Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 relative"
      >
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary-cyan/30 to-primary-blue/30
                       rounded-full blur-3xl opacity-50" />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10
                      rounded-full border border-primary-cyan/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-primary-blue">System Online</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-grey font-montserrat">
            Willkommen zurück
          </h1>
          <p className="text-slate-grey/60 mt-2 text-lg">
            Hier ist Ihre Übersicht für heute.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid with Staggered Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Projekte"
          value="0"
          gradient="bg-gradient-to-br from-violet-500 to-purple-600"
          delay={0}
          icon={
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Anfragen"
          value="0"
          gradient="bg-gradient-to-br from-primary-cyan to-primary-blue"
          delay={0.1}
          icon={
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="Page Views"
          value="0"
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          delay={0.2}
          icon={
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        <StatCard
          title="Google Rating"
          value="-"
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
          delay={0.3}
          icon={
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-bold text-slate-grey mb-5 font-montserrat flex items-center gap-3"
          >
            <span className="p-2 bg-gradient-to-br from-primary-cyan/10 to-primary-blue/10 rounded-xl">
              <svg className="w-5 h-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Schnellaktionen
          </motion.h2>
          <div className="space-y-4">
            <QuickAction
              href="/admin/projekte/neu"
              gradient="bg-gradient-to-br from-violet-500 to-purple-600"
              delay={0.5}
              icon={<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>}
              label="Neues Projekt erstellen"
              description="Portfolio-Seite erweitern"
            />
            <QuickAction
              href="/admin/preise"
              gradient="bg-gradient-to-br from-primary-cyan to-primary-blue"
              delay={0.6}
              icon={<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
              label="Preise bearbeiten"
              description="Angebote aktualisieren"
            />
            <QuickAction
              href="/admin/kontakt"
              gradient="bg-gradient-to-br from-green-500 to-emerald-600"
              delay={0.7}
              icon={<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>}
              label="Kontaktdaten ändern"
              description="Informationen anpassen"
            />
            <QuickAction
              href="/admin/traffic"
              gradient="bg-gradient-to-br from-amber-500 to-orange-600"
              delay={0.8}
              icon={<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>}
              label="Traffic analysieren"
              description="Statistiken einsehen"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-bold text-slate-grey mb-5 font-montserrat flex items-center gap-3"
          >
            <span className="p-2 bg-gradient-to-br from-primary-cyan/10 to-primary-blue/10 rounded-xl">
              <svg className="w-5 h-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Letzte Anfragen
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50
                      shadow-xl shadow-slate-grey/5 overflow-hidden"
          >
            <div className="divide-y divide-slate-grey/5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-10 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-grey/10 to-slate-grey/5
                               flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-grey/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-slate-grey/50 font-medium">Keine Anfragen vorhanden</p>
              </motion.div>
            </div>

            <Link
              href="/admin/traffic"
              className="block p-5 text-center font-semibold text-primary-blue hover:text-primary-cyan
                       bg-gradient-to-r from-primary-cyan/5 to-primary-blue/5 hover:from-primary-cyan/10 hover:to-primary-blue/10
                       border-t border-slate-grey/5 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center gap-2">
                Alle Anfragen anzeigen
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

    </AdminDashboardWrapper>
  );
}
