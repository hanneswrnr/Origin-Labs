"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type ProjectCategory = "alle" | "websites" | "webapps" | "mobile";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: Exclude<ProjectCategory, "alle">;
  tags: string[];
  color: string;
  year: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    subtitle: "Online Shopping neu definiert",
    description: "Moderner Online-Shop mit Echtzeit-Inventar, personalisierten Empfehlungen und nahtloser Checkout-Experience. Die Plattform verarbeitet tausende Transaktionen täglich mit 99.9% Uptime.",
    category: "webapps",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    color: "from-violet-500 to-purple-600",
    year: "2024",
  },
  {
    id: 2,
    title: "Corporate Website",
    subtitle: "Digitale Unternehmensidentität",
    description: "Elegante Unternehmenswebsite mit Fokus auf Storytelling, Performance und Conversion-Optimierung. Lighthouse Score von 100 in allen Kategorien.",
    category: "websites",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Sanity"],
    color: "from-blue-500 to-cyan-500",
    year: "2024",
  },
  {
    id: 3,
    title: "Fitness Tracker App",
    subtitle: "Gesundheit in der Hosentasche",
    description: "Native Mobile App mit Workout-Tracking, Ernährungsplanung und Social Features. Über 50.000 aktive Nutzer und 4.8 Sterne im App Store.",
    category: "mobile",
    tags: ["React Native", "Firebase", "HealthKit", "Charts"],
    color: "from-green-500 to-emerald-500",
    year: "2024",
  },
  {
    id: 4,
    title: "SaaS Dashboard",
    subtitle: "Daten, die Geschichten erzählen",
    description: "Komplexes Analytics-Dashboard mit Echtzeit-Daten, interaktiven Visualisierungen und Team-Kollaboration. Verarbeitet über 1 Million Datenpunkte pro Tag.",
    category: "webapps",
    tags: ["TypeScript", "D3.js", "WebSocket", "GraphQL"],
    color: "from-orange-500 to-red-500",
    year: "2023",
  },
  {
    id: 5,
    title: "Restaurant Website",
    subtitle: "Kulinarik trifft Digital",
    description: "Appetitliche Website mit Online-Reservierung, interaktivem Menü-Showcase und Instagram-Integration. Conversion-Rate um 340% gesteigert.",
    category: "websites",
    tags: ["Next.js", "Sanity CMS", "OpenTable API"],
    color: "from-amber-500 to-orange-500",
    year: "2023",
  },
  {
    id: 6,
    title: "Banking App",
    subtitle: "Finanzen, einfach gemacht",
    description: "Sichere Mobile-Banking-Lösung mit biometrischer Authentifizierung und Echtzeit-Transaktionen. Höchste Sicherheitsstandards nach PSD2.",
    category: "mobile",
    tags: ["Flutter", "Node.js", "Plaid API", "Encryption"],
    color: "from-slate-600 to-slate-800",
    year: "2023",
  },
];

const categories = [
  { id: "alle" as const, label: "Alle Projekte", count: projects.length },
  { id: "websites" as const, label: "Websites", count: projects.filter(p => p.category === "websites").length },
  { id: "webapps" as const, label: "Web Apps", count: projects.filter(p => p.category === "webapps").length },
  { id: "mobile" as const, label: "Mobile Apps", count: projects.filter(p => p.category === "mobile").length },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}>
        {/* Preview/Mockup Area */}
        <motion.div
          className="w-full lg:w-3/5 relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <div className={`relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br ${project.color} p-8 lg:p-12 shadow-2xl`}>
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />
            </div>

            {/* Floating Shapes */}
            <motion.div
              className="absolute top-6 right-6 w-20 h-20 border-2 border-white/30 rounded-2xl"
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-8 left-8 w-12 h-12 bg-white/20 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Browser Mockup */}
            <div className="relative h-full bg-white rounded-2xl shadow-2xl overflow-hidden transform group-hover:translate-y-[-8px] transition-transform duration-500">
              {/* Browser Bar */}
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-slate-400 font-mono flex items-center gap-2 max-w-xs">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    origin-labs.de/{project.category}
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-6 bg-gradient-to-b from-slate-50 to-white h-full">
                {/* Skeleton UI Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} opacity-80`} />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                      <div className="h-3 bg-slate-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square rounded-xl bg-slate-100" />
                    ))}
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-4/5" />
                    <div className="h-3 bg-slate-100 rounded w-3/5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Year Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
              {project.year}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="w-full lg:w-2/5 space-y-6">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-grey/5 rounded-full"
          >
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`} />
            <span className="text-sm font-medium text-slate-grey capitalize">
              {project.category === "websites" ? "Website" : project.category === "webapps" ? "Web App" : "Mobile App"}
            </span>
          </motion.div>

          {/* Title & Subtitle */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-grey mb-3"
            >
              {project.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className={`font-heading text-lg lg:text-xl font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
            >
              {project.subtitle}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-body text-slate-grey/70 text-lg leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-card-bg border border-divider text-slate-grey/80 text-sm font-medium rounded-xl hover:border-primary-cyan/30 hover:bg-primary-cyan/5 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${project.color} text-white font-heading font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow`}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Case Study ansehen</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjektePage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("alle");

  const filteredProjects = activeCategory === "alle"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />

      <main className="bg-background overflow-hidden">
        {/* Hero Section - Full height like homepage */}
        <section className="relative min-h-screen flex items-center justify-center pt-20">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-cyan/10 via-background to-background" />

            {/* Floating Orbs */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(45,212,224,0.15) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,85,255,0.1) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                x: [0, -20, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,85,255,1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(0,85,255,1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-6xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-card-bg/80 backdrop-blur-xl rounded-full border border-primary-cyan/20 shadow-lg shadow-primary-cyan/10 mb-8"
            >
              <span className="w-2 h-2 bg-primary-cyan rounded-full animate-pulse" />
              <span className="font-body text-sm text-slate-grey font-medium">
                {projects.length}+ erfolgreiche Projekte
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-slate-grey leading-[1.1]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Unsere
              <br />
              <span className="gradient-text">Projekte</span>
            </motion.h1>

            <motion.p
              className="font-body text-xl md:text-2xl text-slate-grey/60 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Entdecken Sie eine Auswahl unserer erfolgreich umgesetzten
              digitalen Projekte und Lösungen.
            </motion.p>
          </motion.div>

          {/* Decorative Elements - More Visible */}
          {/* Large rotating square */}
          <motion.div
            className="absolute top-28 left-[6%] w-28 h-28 border-2 border-primary-cyan/30 rounded-3xl hidden lg:block"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.05, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          {/* Gradient circle top right */}
          <motion.div
            className="absolute top-32 right-[8%] w-20 h-20 bg-gradient-to-br from-primary-blue/20 to-primary-cyan/10 rounded-full blur-sm hidden md:block"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          {/* Floating dots - larger and more visible */}
          <motion.div
            className="absolute top-48 right-[15%] w-4 h-4 bg-primary-cyan/50 rounded-full"
            animate={{ y: [0, -40, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-60 left-[12%] w-3 h-3 bg-primary-blue/60 rounded-full"
            animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-40 left-[8%] w-5 h-5 bg-primary-cyan/40 rounded-full"
            animate={{ y: [0, -25, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-32 right-[10%] w-4 h-4 bg-primary-blue/50 rounded-full"
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
          />
          {/* Large ring bottom */}
          <motion.div
            className="absolute bottom-28 right-[6%] w-24 h-24 border-2 border-primary-blue/20 rounded-full hidden lg:block"
            animate={{ scale: [1, 1.15, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          {/* Side gradient lines */}
          <motion.div
            className="absolute top-1/2 left-[4%] w-1.5 h-48 bg-gradient-to-b from-transparent via-primary-cyan/40 to-transparent rounded-full hidden xl:block"
            animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-[4%] w-1.5 h-36 bg-gradient-to-b from-transparent via-primary-blue/40 to-transparent rounded-full hidden xl:block"
            animate={{ opacity: [0.4, 0.8, 0.4], scaleY: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          {/* Plus signs */}
          <motion.div
            className="absolute top-1/4 left-[18%] text-primary-cyan/40 hidden md:block"
            animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-[20%] text-primary-blue/35 hidden md:block"
            animate={{ rotate: [0, -90, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.div>

          {/* Floating Project Icons */}
          <motion.div
            className="absolute bottom-1/3 left-[15%] text-primary-cyan/35 hidden lg:block"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-[15%] text-primary-blue/30 hidden lg:block"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-[22%] text-primary-cyan/25 hidden lg:block"
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </motion.div>
        </section>

        {/* Filter Section */}
        <section className="py-8 sticky top-20 z-30 bg-card-bg/80 backdrop-blur-xl border-y border-divider">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-6 py-3 font-body text-sm font-medium rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? "text-white"
                      : "text-slate-grey/70 hover:text-slate-grey bg-slate-grey/5 hover:bg-slate-grey/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeCategory === category.id && (
                    <motion.div
                      className="absolute inset-0 gradient-primary rounded-full"
                      layoutId="activeFilterPill"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {category.label}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeCategory === category.id
                        ? "bg-white/20"
                        : "bg-slate-grey/10"
                    }`}>
                      {category.count}
                    </span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-24 lg:space-y-40"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-slate-grey/60 font-body text-lg">
                  Keine Projekte in dieser Kategorie gefunden.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-b from-white via-off-white to-white relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary-cyan/8 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-cyan/10 rounded-full mb-8"
              >
                <span className="w-2 h-2 bg-primary-cyan rounded-full" />
                <span className="text-sm font-medium text-primary-blue">Bereit für Ihr Projekt?</span>
              </motion.div>

              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                Ihr Projekt ist das{" "}
                <span className="gradient-text">Nächste</span>
              </h2>
              <p className="font-body text-xl text-slate-grey/60 mb-10 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihre digitale Vision verwirklichen.
                Wir freuen uns auf Ihr Projekt.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 gradient-primary text-white font-heading font-semibold rounded-full shadow-xl shadow-primary-blue/30"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Projekt starten</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                <motion.a
                  href="tel:+4917647666407"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-card-bg border-2 border-divider text-slate-grey font-heading font-semibold rounded-full hover:border-primary-cyan/30 hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Jetzt anrufen</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
