"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "websites" | "webapps" | "mobile";
  tags: string[];
  color: string;
  year: string;
  link?: string;
  imageUrl?: string;
  published: boolean;
  order: number;
}

// Placeholder data
const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    subtitle: "Online Shop für Mode & Lifestyle",
    description: "Eine vollständige E-Commerce-Lösung mit Warenkorbfunktion, Zahlungsintegration und Bestandsverwaltung.",
    category: "webapps",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    color: "from-violet-500 to-purple-600",
    year: "2024",
    link: "#",
    published: true,
    order: 0,
  },
  {
    id: "2",
    title: "Corporate Website",
    subtitle: "Unternehmenswebsite für Beratungsfirma",
    description: "Moderne Unternehmenswebsite mit Fokus auf Conversion-Optimierung und SEO.",
    category: "websites",
    tags: ["Next.js", "Framer Motion", "SEO"],
    color: "from-cyan-500 to-blue-600",
    year: "2024",
    link: "#",
    published: true,
    order: 1,
  },
  {
    id: "3",
    title: "Fitness Tracker App",
    subtitle: "Mobile App für Gesundheit & Fitness",
    description: "Cross-Platform App zur Erfassung von Workouts, Ernährung und Gesundheitsdaten.",
    category: "mobile",
    tags: ["React Native", "Firebase", "HealthKit"],
    color: "from-green-500 to-emerald-600",
    year: "2024",
    link: "#",
    published: true,
    order: 2,
  },
  {
    id: "4",
    title: "SaaS Dashboard",
    subtitle: "Analytics Platform für Startups",
    description: "Datenvisualisierung und Reporting-Tool für Business Analytics.",
    category: "webapps",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    color: "from-orange-500 to-red-600",
    year: "2023",
    link: "#",
    published: true,
    order: 3,
  },
  {
    id: "5",
    title: "Restaurant Website",
    subtitle: "Online-Präsenz für Gastronomie",
    description: "Elegante Website mit Online-Reservierung und digitaler Speisekarte.",
    category: "websites",
    tags: ["Next.js", "Sanity CMS", "Calendly"],
    color: "from-amber-500 to-orange-600",
    year: "2023",
    link: "#",
    published: false,
    order: 4,
  },
  {
    id: "6",
    title: "Banking App",
    subtitle: "Mobile Banking für Neobank",
    description: "Sichere Mobile-Banking-App mit biometrischer Authentifizierung und Echtzeit-Transaktionen.",
    category: "mobile",
    tags: ["Flutter", "Kotlin", "Swift", "Plaid"],
    color: "from-blue-500 to-indigo-600",
    year: "2023",
    link: "#",
    published: true,
    order: 5,
  },
];

const categoryLabels = {
  websites: "Website",
  webapps: "Webapp",
  mobile: "Mobile App",
};

export default function AdminProjektePage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState<"all" | "websites" | "webapps" | "mobile">("all");

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  const togglePublished = async (id: string) => {
    // Simulate API call
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Möchten Sie dieses Projekt wirklich löschen?")) return;
    // Simulate API call
    setProjects((prev) => prev.filter((p) => p.id !== id));
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
            Projekte verwalten
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-grey/60 mt-2"
          >
            {projects.length} Projekte insgesamt, {projects.filter(p => p.published).length} veröffentlicht
          </motion.p>
        </div>

        <Link href="/admin/projekte/neu">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 gradient-primary text-white font-semibold
                     rounded-xl shadow-lg shadow-primary-blue/25 hover:shadow-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Neues Projekt
          </motion.button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { value: "all", label: "Alle" },
          { value: "websites", label: "Websites" },
          { value: "webapps", label: "Webapps" },
          { value: "mobile", label: "Mobile Apps" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as typeof filter)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
                      ${filter === tab.value
                        ? "gradient-primary text-white shadow-lg shadow-primary-blue/25"
                        : "bg-white/80 text-slate-grey hover:bg-white border border-slate-grey/10"
                      }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-grey/10
                     shadow-lg shadow-slate-grey/5 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Project Color Header */}
            <div className={`h-24 bg-gradient-to-br ${project.color} relative`}>
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-xl
                              ${project.published
                                ? "bg-white/90 text-green-600"
                                : "bg-white/90 text-amber-600"
                              }`}>
                  {project.published ? "Veröffentlicht" : "Entwurf"}
                </span>
              </div>

              {/* Year Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 text-xs font-medium bg-white/90 text-slate-grey rounded-full">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-grey text-lg">{project.title}</h3>
                  <p className="text-slate-grey/60 text-sm">{project.subtitle}</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium bg-primary-cyan/10 text-primary-blue rounded-lg">
                  {categoryLabels[project.category]}
                </span>
              </div>

              <p className="text-slate-grey/70 text-sm line-clamp-2 mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-slate-grey/5 text-slate-grey/60 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-slate-grey/5 text-slate-grey/40 rounded-md">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-grey/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublished(project.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      project.published
                        ? "text-green-500 hover:bg-green-50"
                        : "text-amber-500 hover:bg-amber-50"
                    }`}
                    title={project.published ? "Als Entwurf markieren" : "Veröffentlichen"}
                  >
                    {project.published ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Löschen"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <Link
                  href={`/admin/projekte/${project.id}`}
                  className="flex items-center gap-1 text-sm text-primary-blue hover:text-primary-cyan
                           font-medium transition-colors"
                >
                  Bearbeiten
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-slate-grey/5 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-grey/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <p className="text-slate-grey/60 text-center">
              Keine Projekte in dieser Kategorie gefunden.
            </p>
          </div>
        )}
      </div>
    </AdminDashboardWrapper>
  );
}
