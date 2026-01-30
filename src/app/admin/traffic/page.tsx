"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";

// Placeholder data for demonstration
const pageViewsData = [
  { date: "Mo", views: 45 },
  { date: "Di", views: 52 },
  { date: "Mi", views: 38 },
  { date: "Do", views: 65 },
  { date: "Fr", views: 48 },
  { date: "Sa", views: 29 },
  { date: "So", views: 35 },
];

const topPages = [
  { path: "/", views: 450, percentage: 35 },
  { path: "/kontakt", views: 280, percentage: 22 },
  { path: "/projekte", views: 195, percentage: 15 },
  { path: "/preise", views: 165, percentage: 13 },
  { path: "/leistungen", views: 120, percentage: 10 },
  { path: "/ueber-uns", views: 65, percentage: 5 },
];

const referrers = [
  { source: "Google", visits: 320, color: "from-blue-500 to-blue-600" },
  { source: "Direkt", visits: 180, color: "from-green-500 to-emerald-600" },
  { source: "LinkedIn", visits: 95, color: "from-cyan-500 to-blue-500" },
  { source: "Instagram", visits: 45, color: "from-pink-500 to-purple-600" },
  { source: "Andere", visits: 35, color: "from-slate-400 to-slate-500" },
];

const recentSubmissions = [
  {
    id: "1",
    name: "Max Mustermann",
    email: "max@example.com",
    service: "Website",
    budget: "2.000 - 10.000 EUR",
    source: "Google",
    createdAt: "2024-01-15T10:30:00",
  },
  {
    id: "2",
    name: "Anna Schmidt",
    email: "anna@example.com",
    service: "Webapp",
    budget: "10.000 - 50.000 EUR",
    source: "LinkedIn",
    createdAt: "2024-01-14T14:15:00",
  },
  {
    id: "3",
    name: "Peter Weber",
    email: "peter@example.com",
    service: "Mobile App",
    budget: "Über 50.000 EUR",
    source: "Direkt",
    createdAt: "2024-01-13T09:45:00",
  },
  {
    id: "4",
    name: "Lisa Müller",
    email: "lisa@example.com",
    service: "Website",
    budget: "Unter 2.000 EUR",
    source: "Google",
    createdAt: "2024-01-12T16:20:00",
  },
  {
    id: "5",
    name: "Thomas Klein",
    email: "thomas@example.com",
    service: "Webapp",
    budget: "2.000 - 10.000 EUR",
    source: "Instagram",
    createdAt: "2024-01-11T11:00:00",
  },
];

export default function AdminTrafficPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");
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
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-xl p-1.5
                      border border-slate-grey/10">
          {[
            { value: "7d", label: "7 Tage" },
            { value: "30d", label: "30 Tage" },
            { value: "90d", label: "90 Tage" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value as typeof timeRange)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${timeRange === range.value
                          ? "gradient-primary text-white shadow-lg shadow-primary-blue/25"
                          : "text-slate-grey hover:bg-slate-grey/5"
                        }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Page Views", value: "1.275", change: "+18%", positive: true },
          { label: "Unique Visitors", value: "843", change: "+12%", positive: true },
          { label: "Anfragen", value: "12", change: "+5", positive: true },
          { label: "Bounce Rate", value: "42%", change: "-3%", positive: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-grey/10
                     shadow-lg shadow-slate-grey/5 p-6"
          >
            <p className="text-slate-grey/60 text-sm">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-3xl font-bold text-slate-grey font-montserrat">
                {stat.value}
              </span>
              <span className={`text-sm font-medium ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Page Views Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-grey/10
                   shadow-lg shadow-slate-grey/5 p-6"
        >
          <h2 className="text-lg font-bold text-slate-grey mb-6 font-montserrat">
            Page Views (letzte 7 Tage)
          </h2>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-48">
            {pageViewsData.map((day, i) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.views / maxViews) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full gradient-primary rounded-t-lg relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-grey
                                text-white text-xs rounded opacity-0 group-hover:opacity-100
                                transition-opacity whitespace-nowrap">
                    {day.views} Views
                  </div>
                </motion.div>
                <span className="text-xs text-slate-grey/60">{day.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Referrers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-grey/10
                   shadow-lg shadow-slate-grey/5 p-6"
        >
          <h2 className="text-lg font-bold text-slate-grey mb-6 font-montserrat">
            Traffic-Quellen
          </h2>

          <div className="space-y-4">
            {referrers.map((ref, i) => (
              <div key={ref.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-grey font-medium">{ref.source}</span>
                  <span className="text-sm text-slate-grey/60">{ref.visits}</span>
                </div>
                <div className="h-2 bg-slate-grey/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ref.visits / referrers[0].visits) * 100}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${ref.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-grey/10
                   shadow-lg shadow-slate-grey/5 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-grey/10">
            <h2 className="text-lg font-bold text-slate-grey font-montserrat">
              Top-Seiten
            </h2>
          </div>

          <div className="divide-y divide-slate-grey/10">
            {topPages.map((page, i) => (
              <div
                key={page.path}
                className="flex items-center justify-between p-4 hover:bg-slate-grey/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center text-xs font-medium
                                 bg-slate-grey/5 text-slate-grey/60 rounded-full">
                    {i + 1}
                  </span>
                  <span className="text-slate-grey font-medium">{page.path}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2 bg-slate-grey/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${page.percentage}%` }}
                      transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                      className="h-full gradient-primary rounded-full"
                    />
                  </div>
                  <span className="text-sm text-slate-grey/60 w-12 text-right">
                    {page.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Form Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-grey/10
                   shadow-lg shadow-slate-grey/5 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-grey/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-grey font-montserrat">
              Kontakt-Anfragen
            </h2>
            <span className="px-3 py-1 text-xs font-medium bg-primary-cyan/10 text-primary-blue rounded-full">
              {recentSubmissions.length} neu
            </span>
          </div>

          <div className="divide-y divide-slate-grey/10 max-h-[400px] overflow-y-auto">
            {recentSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 hover:bg-slate-grey/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-slate-grey">{sub.name}</h4>
                    <p className="text-sm text-slate-grey/60">{sub.email}</p>
                  </div>
                  <span className="text-xs text-slate-grey/40">
                    {formatDate(sub.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2.5 py-1 text-xs font-medium bg-primary-cyan/10
                                 text-primary-blue rounded-full">
                    {sub.service}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-slate-grey/5
                                 text-slate-grey/60 rounded-full">
                    {sub.budget}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-green-50
                                 text-green-600 rounded-full">
                    via {sub.source}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-grey/10 bg-slate-grey/[0.02]">
            <button className="w-full text-center text-sm font-medium text-primary-blue
                             hover:text-primary-cyan transition-colors">
              CSV exportieren
            </button>
          </div>
        </motion.div>
      </div>

      {/* Placeholder Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800">
              Demo-Daten
            </h3>
            <p className="text-amber-700 mt-1 text-sm">
              Diese Seite zeigt aktuell Placeholder-Daten. Sobald die Datenbank konfiguriert ist,
              werden hier echte Analytics-Daten angezeigt. Das Tracking wird automatisch aktiviert,
              wenn Sie die öffentlichen Seiten auf die Datenbankanbindung umstellen.
            </p>
          </div>
        </div>
      </motion.div>
    </AdminDashboardWrapper>
  );
}
