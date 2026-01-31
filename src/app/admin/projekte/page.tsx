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

// Empty initial data
const initialProjects: Project[] = [];

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
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Möchten Sie dieses Projekt wirklich löschen?")) return;
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
            className="text-3xl font-bold text-slate-grey dark:text-white font-montserrat"
          >
            Projekte verwalten
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-grey/60 dark:text-slate-300/70 mt-2"
          >
            {projects.length} Projekte insgesamt, {projects.filter(p => p.published).length} veröffentlicht
          </motion.p>
        </div>

        <Link href="/admin/projekte/neu">
          <button className="flex items-center gap-3 px-6 py-3 gradient-primary text-white font-semibold
                     rounded-2xl shadow-xl shadow-primary-blue/30 hover:shadow-2xl transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Neues Projekt</span>
          </button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        {[
          { value: "all", label: "Alle", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
          { value: "websites", label: "Websites", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
          { value: "webapps", label: "Webapps", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
          { value: "mobile", label: "Mobile Apps", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as typeof filter)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold
                      whitespace-nowrap transition-all duration-300
                      ${filter === tab.value
                        ? "text-white gradient-primary"
                        : "bg-white/90 dark:bg-admin-surface/90 text-slate-grey dark:text-slate-200 border-2 border-slate-grey/10 dark:border-white/10 hover:border-primary-cyan/30"
                      }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white/95 dark:bg-admin-surface/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-grey/10 dark:border-white/10
                       shadow-xl shadow-slate-grey/5 dark:shadow-black/20 overflow-hidden group hover:shadow-2xl hover:border-primary-cyan/30 transition-all duration-300"
          >

              {/* Project Color Header */}
              <div className={`relative h-28 bg-gradient-to-br ${project.color} overflow-hidden`}>
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 text-xs font-bold rounded-full backdrop-blur-2xl shadow-lg
                                ${project.published
                                  ? "bg-white/95 text-green-600"
                                  : "bg-white/95 text-amber-600"
                                }`}>
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${project.published ? "bg-green-500" : "bg-amber-500"}`} />
                    {project.published ? "Live" : "Entwurf"}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-1.5 text-xs font-bold bg-white/95 text-slate-grey rounded-full shadow-lg">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 bg-white dark:bg-admin-surface">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-grey dark:text-white text-xl">
                      {project.title}
                    </h3>
                    <p className="text-slate-grey/60 dark:text-slate-300/70 text-sm mt-1">{project.subtitle}</p>
                  </div>
                  <span className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10
                             text-primary-blue rounded-xl border border-primary-cyan/20">
                    {categoryLabels[project.category]}
                  </span>
                </div>

                <p className="text-slate-grey/70 dark:text-slate-300/70 text-sm line-clamp-2 mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-grey/5 dark:bg-white/5 text-slate-grey/70 dark:text-slate-300/70
                               rounded-lg transition-all duration-300 hover:bg-gradient-to-r
                               hover:from-primary-cyan/10 hover:to-primary-blue/10 hover:text-primary-blue
                               cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1.5 text-xs font-medium bg-slate-grey/5 dark:bg-white/5 text-slate-grey/40 dark:text-slate-500 rounded-lg">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-5 border-t-2 border-slate-grey/5 dark:border-white/10">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePublished(project.id)}
                      className={`p-3 rounded-xl transition-all duration-300 ${
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
                      className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                      title="Löschen"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <Link href={`/admin/projekte/${project.id}`}>
                    <span className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-blue
                               hover:text-white bg-gradient-to-r from-transparent to-transparent
                               hover:from-primary-cyan hover:to-primary-blue rounded-xl transition-all duration-300">
                      Bearbeiten
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
        ))}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-br from-slate-grey/5 to-slate-grey/10 dark:from-white/5 dark:to-white/10 rounded-3xl
                       flex items-center justify-center mb-6"
            >
              <svg className="w-10 h-10 text-slate-grey/30 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </motion.div>
            <p className="text-slate-grey/60 dark:text-slate-400 text-center text-lg">
              Keine Projekte in dieser Kategorie gefunden.
            </p>
          </motion.div>
        )}
      </div>
    </AdminDashboardWrapper>
  );
}
