"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const services = [
  {
    id: "websites",
    title: "Websites",
    subtitle: "Ihr digitales Aushängeschild",
    description:
      "Wir entwickeln moderne, responsive Websites, die nicht nur gut aussehen, sondern auch performen. Von der Landing Page bis zur komplexen Unternehmenswebsite.",
    features: [
      {
        title: "Responsive Design",
        description: "Perfekte Darstellung auf allen Geräten",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: "SEO-Optimierung",
        description: "Bessere Sichtbarkeit in Suchmaschinen",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ),
      },
      {
        title: "Performance",
        description: "Blitzschnelle Ladezeiten",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      },
      {
        title: "CMS-Integration",
        description: "Einfache Inhaltsverwaltung",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        ),
      },
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Sanity", "WordPress"],
    color: "from-blue-500 to-cyan-500",
    price: "ab 800€",
  },
  {
    id: "webapps",
    title: "Webapps",
    subtitle: "Maßgeschneiderte Softwarelösungen",
    description:
      "Komplexe Webanwendungen, die Ihre Geschäftsprozesse digitalisieren und automatisieren. Von Dashboards bis zu vollständigen SaaS-Plattformen.",
    features: [
      {
        title: "Custom Development",
        description: "Individuelle Funktionen nach Maß",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
      },
      {
        title: "API-Integration",
        description: "Nahtlose Systemanbindung",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: "Datenbank-Design",
        description: "Skalierbare Datenarchitektur",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        ),
      },
      {
        title: "Cloud-Hosting",
        description: "Zuverlässige Infrastruktur",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        ),
      },
    ],
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
    color: "from-violet-500 to-purple-600",
    price: "ab 8.000€",
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    subtitle: "Apps, die begeistern",
    description:
      "Native und Cross-Platform Apps für iOS und Android. Von der Idee bis zur Veröffentlichung im App Store – wir begleiten Sie.",
    features: [
      {
        title: "Cross-Platform",
        description: "Eine Codebasis, alle Plattformen",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: "Offline-Support",
        description: "Funktioniert auch ohne Internet",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
          </svg>
        ),
      },
      {
        title: "Push-Notifications",
        description: "Direkte Nutzeransprache",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        ),
      },
      {
        title: "App Store",
        description: "Veröffentlichung & Support",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        ),
      },
    ],
    technologies: ["React Native", "Flutter", "Firebase", "Swift", "Kotlin"],
    color: "from-green-500 to-emerald-500",
    price: "ab 15.000€",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Beratung",
    description: "Wir lernen Ihr Projekt kennen und definieren gemeinsam Ziele und Anforderungen.",
  },
  {
    number: "02",
    title: "Konzept",
    description: "Wir erstellen Wireframes und ein detailliertes Konzept für Ihre Lösung.",
  },
  {
    number: "03",
    title: "Design",
    description: "Ihr individuelles Design entsteht – modern, benutzerfreundlich und markenkonform.",
  },
  {
    number: "04",
    title: "Entwicklung",
    description: "Wir setzen Ihr Projekt mit modernsten Technologien um.",
  },
  {
    number: "05",
    title: "Testing",
    description: "Umfangreiche Tests garantieren Qualität und Performance.",
  },
  {
    number: "06",
    title: "Launch",
    description: "Ihr Projekt geht live – mit unserer vollen Unterstützung.",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <Header />

      <main className="bg-white overflow-hidden">
        {/* Hero Section - Full height like other pages */}
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
                Full-Service Digitalagentur
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
              <span className="gradient-text">Leistungen</span>
            </motion.h1>

            <motion.p
              className="font-body text-xl md:text-2xl text-slate-grey/60 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Von der Website bis zur Mobile App – wir entwickeln digitale
              Lösungen, die Ihr Business voranbringen.
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
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
          {/* Floating dots */}
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

          {/* Floating Service Icons */}
          <motion.div
            className="absolute bottom-1/3 left-[15%] text-primary-cyan/35 hidden lg:block"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-[15%] text-primary-blue/30 hidden lg:block"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-[22%] text-primary-cyan/25 hidden lg:block"
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-32">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}>
                      {/* Visual */}
                      <div className="w-full lg:w-1/2">
                        <motion.div
                          className={`relative aspect-square max-w-lg mx-auto rounded-3xl bg-gradient-to-br ${service.color} p-1`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="absolute inset-0 rounded-3xl opacity-20">
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
                                backgroundSize: "24px 24px",
                              }}
                            />
                          </div>

                          {/* Feature Grid Inside */}
                          <div className="relative h-full bg-white/95 backdrop-blur rounded-[22px] p-8 lg:p-10">
                            <div className="grid grid-cols-2 gap-4 h-full">
                              {service.features.map((feature, featureIndex) => (
                                <motion.div
                                  key={feature.title}
                                  className="bg-slate-grey/[0.03] rounded-2xl p-5 flex flex-col"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: featureIndex * 0.1 }}
                                >
                                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center mb-4`}>
                                    {feature.icon}
                                  </div>
                                  <h4 className="font-heading font-semibold text-slate-grey mb-1">
                                    {feature.title}
                                  </h4>
                                  <p className="font-body text-sm text-slate-grey/60">
                                    {feature.description}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Price Badge */}
                          <div className="absolute -bottom-4 -right-4 px-6 py-3 bg-white rounded-2xl shadow-xl border border-slate-grey/10">
                            <span className={`font-heading text-2xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                              {service.price}
                            </span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="w-full lg:w-1/2 space-y-6">
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.color} text-white`}
                        >
                          <span className="text-sm font-medium">{service.title}</span>
                        </motion.div>

                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="font-heading text-4xl lg:text-5xl font-bold text-slate-grey"
                        >
                          {service.subtitle}
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                          className="font-body text-lg text-slate-grey/70 leading-relaxed"
                        >
                          {service.description}
                        </motion.p>

                        {/* Technologies */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.45 }}
                        >
                          <p className="font-body text-sm text-slate-grey/50 mb-3">Technologien:</p>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-4 py-2 bg-slate-grey/5 border border-slate-grey/10 text-slate-grey/80 text-sm font-medium rounded-xl"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                              href="/kontakt"
                              className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${service.color} text-white font-heading font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow`}
                            >
                              <span>Projekt anfragen</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-32 bg-off-white relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary-cyan/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                Prozess
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                So arbeiten <span className="gradient-text">wir</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-2xl mx-auto">
                Ein transparenter Prozess für erfolgreiche Projekte – von der ersten Idee bis zum Go-Live.
              </p>
            </motion.div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    className="relative h-full p-8 bg-white rounded-3xl border border-slate-grey/10 hover:border-primary-cyan/30 hover:shadow-xl hover:shadow-primary-cyan/5 transition-all duration-500"
                    whileHover={{ y: -8 }}
                  >
                    {/* Number */}
                    <span className="font-heading text-6xl font-bold text-slate-grey/5 absolute top-4 right-6">
                      {step.number}
                    </span>

                    {/* Gradient line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-heading font-bold mb-6 shadow-lg shadow-primary-blue/20">
                        {step.number}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-slate-grey mb-3">
                        {step.title}
                      </h3>
                      <p className="font-body text-slate-grey/60">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Background */}
              <div className="absolute inset-0 gradient-primary" />
              <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Content */}
              <div className="relative p-10 lg:p-16 text-center">
                <motion.h2
                  className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Bereit für Ihr Projekt?
                </motion.h2>
                <motion.p
                  className="font-body text-white/80 text-lg mb-10 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Lassen Sie uns gemeinsam Ihre digitale Vision verwirklichen.
                  Wir freuen uns auf Ihre Anfrage!
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/kontakt"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-blue font-heading font-semibold rounded-full shadow-xl"
                    >
                      Kostenloses Erstgespräch
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                  <motion.a
                    href="/preise"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-heading font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Preise ansehen
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
