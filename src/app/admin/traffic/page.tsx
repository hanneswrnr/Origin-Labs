"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";

// Empty initial data
const pageViewsData = [
  { date: "Mo", views: 0 },
  { date: "Di", views: 0 },
  { date: "Mi", views: 0 },
  { date: "Do", views: 0 },
  { date: "Fr", views: 0 },
  { date: "Sa", views: 0 },
  { date: "So", views: 0 },
];

const topPages: { path: string; views: number; percentage: number }[] = [];

const referrers: { source: string; visits: number; color: string; icon: string }[] = [];

const recentSubmissions: {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  source: string;
  createdAt: string;
}[] = [];

// Simple Card Component
function Card({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stat Card Component
function StatCard({ label, value, change, positive, index, icon }: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  index: number;
  icon: React.ReactNode;
}) {
  return (
    <Card delay={index * 0.1}>
      <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-grey/10
                 shadow-xl shadow-slate-grey/5 p-6 overflow-hidden group">
        {/* Background effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary-cyan/10 to-primary-blue/10 blur-2xl opacity-20" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-grey/60 text-sm font-medium">{label}</p>
            <div className="p-2 bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10 rounded-xl">
              {icon}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold text-slate-grey font-montserrat">
              {value}
            </span>

            <span
              className={`flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-full
                        ${positive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                        }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={positive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                />
              </svg>
              {change}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function AdminTrafficPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredPage, setHoveredPage] = useState<string | null>(null);
  const [hoveredSubmission, setHoveredSubmission] = useState<string | null>(null);
  const maxViews = Math.max(...pageViewsData.map((d) => d.views));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminDashboardWrapper>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-slate-grey font-montserrat"
          >
            Traffic & Analytics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-grey/60 mt-2"
          >
            Übersicht über Ihre Website-Besucher und Anfragen.
          </motion.p>
        </div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-2xl rounded-2xl p-2
                    border-2 border-slate-grey/10 shadow-lg shadow-slate-grey/5"
        >
          {[
            { value: "7d", label: "7 Tage" },
            { value: "30d", label: "30 Tage" },
            { value: "90d", label: "90 Tage" },
          ].map((range) => (
            <motion.button
              key={range.value}
              onClick={() => setTimeRange(range.value as typeof timeRange)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden
                        ${timeRange === range.value
                          ? "text-white shadow-lg shadow-primary-blue/30"
                          : "text-slate-grey hover:bg-slate-grey/5"
                        }`}
            >
              {timeRange === range.value && (
                <motion.div
                  layoutId="activeTimeRange"
                  className="absolute inset-0 gradient-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{range.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Page Views",
            value: "0",
            change: "-",
            positive: true,
            icon: <svg className="w-5 h-5 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
          },
          {
            label: "Unique Visitors",
            value: "0",
            change: "-",
            positive: true,
            icon: <svg className="w-5 h-5 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
          },
          {
            label: "Anfragen",
            value: "0",
            change: "-",
            positive: true,
            icon: <svg className="w-5 h-5 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
          },
          {
            label: "Bounce Rate",
            value: "-",
            change: "-",
            positive: true,
            icon: <svg className="w-5 h-5 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
          },
        ].map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Page Views Chart */}
        <Card delay={0.2} className="lg:col-span-2">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-grey/10
                       shadow-xl shadow-slate-grey/5 p-8 overflow-hidden group">
            {/* Decorative background */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-primary-cyan/5 to-primary-blue/5 blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
            />

            <h2 className="relative z-10 text-xl font-bold text-slate-grey mb-8 font-montserrat flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-xl shadow-lg shadow-primary-cyan/30">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Page Views (letzte 7 Tage)
            </h2>

            {/* Bar Chart */}
            <div className="relative z-10 flex items-end justify-between gap-4 h-56">
              {pageViewsData.map((day, i) => (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-3"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Value tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredBar === i ? 1 : 0,
                      y: hoveredBar === i ? 0 : 10,
                    }}
                    className="px-3 py-1.5 bg-slate-grey text-white text-sm font-bold rounded-xl shadow-lg"
                  >
                    {day.views}
                  </motion.div>

                  {/* Bar */}
                  <motion.div
                    className="w-full relative cursor-pointer"
                    style={{ height: `${(day.views / maxViews) * 100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.views / maxViews) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className={`w-full h-full rounded-t-xl transition-all duration-300 relative overflow-hidden
                                ${hoveredBar === i
                                  ? "gradient-primary shadow-lg shadow-primary-cyan/30"
                                  : "bg-gradient-to-t from-primary-cyan/60 to-primary-blue/60"
                                }`}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent"
                        animate={{
                          y: hoveredBar === i ? ["100%", "-100%"] : "100%",
                        }}
                        transition={{ duration: 0.8, repeat: hoveredBar === i ? Infinity : 0 }}
                      />
                    </div>
                  </motion.div>

                  <span className={`text-sm font-medium transition-colors duration-300
                                  ${hoveredBar === i ? "text-primary-blue" : "text-slate-grey/60"}`}>
                    {day.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Referrers */}
        <Card delay={0.3}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-grey/10
                       shadow-xl shadow-slate-grey/5 p-8 overflow-hidden">
            <h2 className="text-xl font-bold text-slate-grey mb-8 font-montserrat flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg shadow-violet-500/30">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              Traffic-Quellen
            </h2>

            <div className="space-y-5">
              {referrers.map((ref, i) => (
                <motion.div
                  key={ref.source}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="group cursor-default"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-grey font-semibold flex items-center gap-2">
                      <span className="text-lg">{ref.icon}</span>
                      {ref.source}
                    </span>
                    <span className="text-sm text-slate-grey/60 font-bold">
                      {ref.visits}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-grey/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(ref.visits / referrers[0].visits) * 100}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${ref.color} rounded-full relative overflow-hidden
                                group-hover:shadow-lg group-hover:shadow-primary-cyan/20 transition-shadow`}
                    >
                      {/* Animated shine */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <Card delay={0.4}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-grey/10
                       shadow-xl shadow-slate-grey/5 overflow-hidden">
            <div className="p-6 border-b-2 border-slate-grey/5">
              <h2 className="text-xl font-bold text-slate-grey font-montserrat flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Top-Seiten
              </h2>
            </div>

            <div className="divide-y-2 divide-slate-grey/5">
              {topPages.map((page, i) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.4 }}
                  onMouseEnter={() => setHoveredPage(page.path)}
                  onMouseLeave={() => setHoveredPage(null)}
                  className={`relative flex items-center justify-between p-5 transition-all duration-300 cursor-default
                            ${hoveredPage === page.path ? "bg-gradient-to-r from-primary-cyan/5 to-primary-blue/5" : ""}`}
                >
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-cyan to-primary-blue rounded-r-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: hoveredPage === page.path ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />

                  <div className="flex items-center gap-4">
                    <span
                      className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-xl transition-all duration-300
                                ${hoveredPage === page.path
                                  ? "bg-gradient-to-r from-primary-cyan to-primary-blue text-white shadow-lg shadow-primary-cyan/30"
                                  : "bg-slate-grey/5 text-slate-grey/60"
                                }`}
                    >
                      {i + 1}
                    </span>
                    <span className={`font-semibold transition-colors duration-300
                                   ${hoveredPage === page.path ? "text-primary-blue" : "text-slate-grey"}`}>
                      {page.path}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-28 h-2.5 bg-slate-grey/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${page.percentage}%` }}
                        transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                        className={`h-full rounded-full transition-all duration-300
                                  ${hoveredPage === page.path
                                    ? "gradient-primary"
                                    : "bg-gradient-to-r from-slate-grey/30 to-slate-grey/50"
                                  }`}
                      />
                    </div>
                    <span className="text-sm text-slate-grey/60 w-12 text-right font-bold">
                      {page.views}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Form Submissions */}
        <Card delay={0.5}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-grey/10
                       shadow-xl shadow-slate-grey/5 overflow-hidden">
            <div className="p-6 border-b-2 border-slate-grey/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-grey font-montserrat flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg shadow-pink-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Kontakt-Anfragen
              </h2>
              <span className="px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-pink-500/10 to-rose-500/10
                         text-pink-600 rounded-full border border-pink-500/20">
                {recentSubmissions.length} neu
              </span>
            </div>

            <div className="divide-y-2 divide-slate-grey/5 max-h-[450px] overflow-y-auto">
              {recentSubmissions.map((sub, i) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.5 }}
                  onMouseEnter={() => setHoveredSubmission(sub.id)}
                  onMouseLeave={() => setHoveredSubmission(null)}
                  className={`relative p-5 transition-all duration-300 cursor-default
                            ${hoveredSubmission === sub.id ? "bg-gradient-to-r from-pink-50/50 to-rose-50/50" : ""}`}
                >
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-rose-500 rounded-r-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: hoveredSubmission === sub.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />

                  <div className="flex items-start justify-between">
                    <div>
                      <motion.h4
                        className="font-bold text-slate-grey"
                        animate={{ x: hoveredSubmission === sub.id ? 5 : 0 }}
                      >
                        {sub.name}
                      </motion.h4>
                      <p className="text-sm text-slate-grey/60">{sub.email}</p>
                    </div>
                    <span className="text-xs text-slate-grey/40 font-medium">
                      {formatDate(sub.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10
                               text-primary-blue rounded-xl border border-primary-cyan/20">
                      {sub.service}
                    </span>
                    <span className="px-3 py-1.5 text-xs font-medium bg-slate-grey/5
                               text-slate-grey/60 rounded-xl">
                      {sub.budget}
                    </span>
                    <span className="px-3 py-1.5 text-xs font-medium bg-green-50
                               text-green-600 rounded-xl">
                      via {sub.source}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-5 border-t-2 border-slate-grey/5 bg-slate-grey/[0.02] hover:bg-primary-cyan/5 transition-colors">
              <button className="w-full text-center text-sm font-bold text-primary-blue
                         hover:text-primary-cyan transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                CSV exportieren
              </button>
            </div>
          </div>
        </Card>
      </div>

    </AdminDashboardWrapper>
  );
}
