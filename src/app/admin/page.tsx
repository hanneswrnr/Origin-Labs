"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";

// Stat Card Component
function StatCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-grey/10
                shadow-lg shadow-slate-grey/5 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-grey/60 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-slate-grey mt-2 font-montserrat">
            {value}
          </h3>
          {change && (
            <p className="text-sm mt-2 text-green-500 font-medium">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      </div>
    </motion.div>
  );
}

// Quick Action Button
function QuickAction({
  href,
  icon,
  label,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-4 p-4 bg-white/60 hover:bg-white/80 backdrop-blur-xl
                  rounded-xl border border-slate-grey/10 transition-all duration-200 cursor-pointer"
      >
        <div className="p-3 bg-gradient-to-br from-primary-cyan/10 to-primary-blue/10 rounded-xl">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-slate-grey">{label}</h4>
          <p className="text-sm text-slate-grey/60">{description}</p>
        </div>
        <svg
          className="w-5 h-5 text-slate-grey/40 ml-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <AdminDashboardWrapper>
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-grey font-montserrat"
        >
          Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-grey/60 mt-2"
        >
          Willkommen zurück! Hier ist eine Übersicht Ihrer Website.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Projekte"
          value="6"
          change="+2 diesen Monat"
          color="bg-gradient-to-br from-violet-500/10 to-purple-500/10"
          icon={
            <svg
              className="w-6 h-6 text-violet-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          }
        />
        <StatCard
          title="Anfragen"
          value="12"
          change="+5 diese Woche"
          color="bg-gradient-to-br from-primary-cyan/10 to-primary-blue/10"
          icon={
            <svg
              className="w-6 h-6 text-primary-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <StatCard
          title="Page Views"
          value="1.2k"
          change="+18% vs. letzter Monat"
          color="bg-gradient-to-br from-green-500/10 to-emerald-500/10"
          icon={
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
        />
        <StatCard
          title="Google Bewertung"
          value="4.9"
          color="bg-gradient-to-br from-amber-500/10 to-orange-500/10"
          icon={
            <svg
              className="w-6 h-6 text-amber-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-slate-grey mb-4 font-montserrat">
            Schnellaktionen
          </h2>
          <div className="space-y-3">
            <QuickAction
              href="/admin/projekte/neu"
              icon={
                <svg
                  className="w-5 h-5 text-primary-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              }
              label="Neues Projekt erstellen"
              description="Fügen Sie ein neues Projekt zur Portfolio-Seite hinzu"
            />
            <QuickAction
              href="/admin/preise"
              icon={
                <svg
                  className="w-5 h-5 text-primary-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              label="Preise bearbeiten"
              description="Aktualisieren Sie Ihre Preise und Angebote"
            />
            <QuickAction
              href="/admin/kontakt"
              icon={
                <svg
                  className="w-5 h-5 text-primary-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              label="Kontaktdaten ändern"
              description="Aktualisieren Sie Ihre Kontaktinformationen"
            />
            <QuickAction
              href="/admin/traffic"
              icon={
                <svg
                  className="w-5 h-5 text-primary-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
              label="Traffic analysieren"
              description="Sehen Sie Ihre Website-Statistiken ein"
            />
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-slate-grey mb-4 font-montserrat">
            Letzte Anfragen
          </h2>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-grey/10 shadow-lg shadow-slate-grey/5 overflow-hidden">
            {/* Placeholder for recent submissions */}
            <div className="divide-y divide-slate-grey/10">
              {[
                {
                  name: "Max Mustermann",
                  email: "max@example.com",
                  service: "Website",
                  time: "vor 2 Stunden",
                },
                {
                  name: "Anna Schmidt",
                  email: "anna@example.com",
                  service: "Webapp",
                  time: "vor 5 Stunden",
                },
                {
                  name: "Peter Weber",
                  email: "peter@example.com",
                  service: "Mobile App",
                  time: "gestern",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 hover:bg-slate-grey/[0.02] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-grey">{item.name}</h4>
                      <p className="text-sm text-slate-grey/60">{item.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-cyan/10 text-primary-blue rounded-full">
                        {item.service}
                      </span>
                      <p className="text-xs text-slate-grey/40 mt-1">
                        {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <Link
              href="/admin/traffic"
              className="block p-4 text-center text-sm font-medium text-primary-blue hover:bg-primary-cyan/5
                       border-t border-slate-grey/10 transition-colors"
            >
              Alle Anfragen anzeigen &rarr;
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Database Status Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800">
              Datenbank-Konfiguration erforderlich
            </h3>
            <p className="text-amber-700 mt-1 text-sm">
              Um das Admin Dashboard vollständig zu nutzen, müssen Sie die
              Datenbank-Verbindung in der{" "}
              <code className="px-1.5 py-0.5 bg-amber-100 rounded">.env</code>{" "}
              Datei konfigurieren. Aktuell werden Placeholder-Daten angezeigt.
            </p>
            <ol className="mt-3 text-sm text-amber-700 space-y-1 list-decimal list-inside">
              <li>
                Erstellen Sie eine MySQL-Datenbank in Ihrem Hostinger Dashboard
              </li>
              <li>
                Kopieren Sie die Zugangsdaten in die{" "}
                <code className="px-1.5 py-0.5 bg-amber-100 rounded">
                  DATABASE_URL
                </code>{" "}
                Variable
              </li>
              <li>
                Führen Sie{" "}
                <code className="px-1.5 py-0.5 bg-amber-100 rounded">
                  npm run db:push
                </code>{" "}
                aus
              </li>
              <li>
                Führen Sie{" "}
                <code className="px-1.5 py-0.5 bg-amber-100 rounded">
                  npm run db:seed
                </code>{" "}
                aus
              </li>
            </ol>
          </div>
        </div>
      </motion.div>
    </AdminDashboardWrapper>
  );
}
