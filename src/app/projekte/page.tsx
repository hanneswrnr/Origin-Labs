"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type ProjectCategory = "alle" | "websites" | "webapps" | "mobile";

interface Project {
  id: number;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "alle">;
  image: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Moderner Online-Shop mit Echtzeit-Inventar, personalisierten Empfehlungen und nahtloser Checkout-Experience.",
    category: "webapps",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    featured: true,
  },
  {
    id: 2,
    title: "Corporate Website",
    description: "Elegante Unternehmenswebsite mit Fokus auf Storytelling, Performance und Conversion-Optimierung.",
    category: "websites",
    image: "/projects/corporate.jpg",
    tags: ["React", "Tailwind", "Framer Motion"],
  },
  {
    id: 3,
    title: "Fitness Tracker App",
    description: "Native Mobile App mit Workout-Tracking, Ernährungsplanung und Social Features.",
    category: "mobile",
    image: "/projects/fitness.jpg",
    tags: ["React Native", "Firebase", "HealthKit"],
    featured: true,
  },
  {
    id: 4,
    title: "SaaS Dashboard",
    description: "Komplexes Analytics-Dashboard mit Echtzeit-Daten, Visualisierungen und Team-Kollaboration.",
    category: "webapps",
    image: "/projects/dashboard.jpg",
    tags: ["TypeScript", "D3.js", "WebSocket"],
  },
  {
    id: 5,
    title: "Restaurant Website",
    description: "Appetitliche Website mit Online-Reservierung, Menü-Showcase und Instagram-Integration.",
    category: "websites",
    image: "/projects/restaurant.jpg",
    tags: ["Next.js", "Sanity CMS", "OpenTable"],
  },
  {
    id: 6,
    title: "Banking App",
    description: "Sichere Mobile-Banking-Lösung mit biometrischer Authentifizierung und Echtzeit-Transaktionen.",
    category: "mobile",
    image: "/projects/banking.jpg",
    tags: ["Flutter", "Node.js", "Plaid API"],
  },
  {
    id: 7,
    title: "Portfolio Website",
    description: "Kreatives Portfolio für Fotografen mit immersiver Galerie und Kontaktmanagement.",
    category: "websites",
    image: "/projects/portfolio.jpg",
    tags: ["Astro", "Three.js", "Cloudinary"],
  },
  {
    id: 8,
    title: "Project Management Tool",
    description: "Kollaboratives Projektmanagement mit Kanban-Boards, Zeiterfassung und Integrationen.",
    category: "webapps",
    image: "/projects/projectmgmt.jpg",
    tags: ["React", "GraphQL", "Redis"],
    featured: true,
  },
  {
    id: 9,
    title: "Delivery App",
    description: "Lieferservice-App mit Live-Tracking, Push-Benachrichtigungen und Zahlungsintegration.",
    category: "mobile",
    image: "/projects/delivery.jpg",
    tags: ["React Native", "Maps API", "Stripe"],
  },
];

const categories = [
  { id: "alle" as const, label: "Alle Projekte", count: projects.length },
  { id: "websites" as const, label: "Websites", count: projects.filter(p => p.category === "websites").length },
  { id: "webapps" as const, label: "Web Apps", count: projects.filter(p => p.category === "webapps").length },
  { id: "mobile" as const, label: "Mobile Apps", count: projects.filter(p => p.category === "mobile").length },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative ${project.featured ? "md:col-span-2 md:row-span-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative bg-white rounded-3xl overflow-hidden border border-slate-grey/5 shadow-lg hover:shadow-2xl hover:shadow-primary-cyan/10 transition-all duration-500 h-full ${project.featured ? "min-h-[500px]" : "min-h-[320px]"}`}>
        {/* Project Image / Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-grey/5 via-primary-cyan/5 to-primary-blue/10">
          {/* Animated Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,85,255,1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,85,255,1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Animated Gradient Orb */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(45,212,224,0.15) 0%, transparent 50%)",
            }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Category Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-20 h-20 bg-white/80 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {project.category === "websites" && (
                <svg className="w-10 h-10 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              )}
              {project.category === "webapps" && (
                <svg className="w-10 h-10 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
              {project.category === "mobile" && (
                <svg className="w-10 h-10 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              )}
            </motion.div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-white via-white/95 to-transparent">
          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-primary-cyan to-primary-blue text-white text-xs font-semibold rounded-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Featured
            </motion.div>
          )}

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-cyan/10 rounded-full w-fit mb-3">
            <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full" />
            <span className="text-xs font-medium text-primary-blue capitalize">
              {project.category === "websites" ? "Website" : project.category === "webapps" ? "Web App" : "Mobile App"}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl font-bold text-slate-grey mb-2 group-hover:text-primary-blue transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-body text-sm text-slate-grey/60 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-slate-grey/5 text-slate-grey/70 text-xs font-medium rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            className="inline-flex items-center gap-2 text-primary-blue font-semibold text-sm group/btn"
            whileHover={{ x: 5 }}
          >
            <span>Projekt ansehen</span>
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjektePage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("alle");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const filteredProjects = activeCategory === "alle"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />

      <main className="bg-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-cyan/10 via-white to-white" />

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
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-xl rounded-full border border-primary-cyan/20 shadow-lg shadow-primary-cyan/10 mb-8"
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

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-28 left-[6%] w-28 h-28 border-2 border-primary-cyan/30 rounded-3xl hidden lg:block"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.05, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-32 right-[8%] w-20 h-20 bg-gradient-to-br from-primary-blue/20 to-primary-cyan/10 rounded-full blur-sm hidden md:block"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
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
          <motion.div
            className="absolute bottom-28 right-[6%] w-24 h-24 border-2 border-primary-blue/20 rounded-full hidden lg:block"
            animate={{ scale: [1, 1.15, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
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
        </section>

        {/* Projects Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filter Tabs */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                      layoutId="activeFilter"
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

            {/* Projects Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-slate-grey/60 font-body">
                  Keine Projekte in dieser Kategorie gefunden.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-off-white relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary-cyan/10 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                Ihr Projekt ist das
                <br />
                <span className="gradient-text">Nächste?</span>
              </h2>
              <p className="font-body text-xl text-slate-grey/60 mb-10 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihre digitale Vision verwirklichen.
                Wir freuen uns auf Ihr Projekt.
              </p>
              <motion.a
                href="/kontakt"
                className="inline-flex items-center gap-3 px-10 py-5 gradient-primary text-white font-heading font-semibold rounded-full shadow-xl shadow-primary-blue/30"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Projekt starten</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
