"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const stats = [
  { number: "50+", label: "Projekte", suffix: "" },
  { number: "100", label: "Zufriedene Kunden", suffix: "%" },
  { number: "5", label: "Jahre Erfahrung", suffix: "+" },
  { number: "24", label: "Stunden Antwortzeit", suffix: "h" },
];

const values = [
  {
    title: "Innovation",
    description: "Wir nutzen modernste Technologien und bleiben stets am Puls der Zeit, um zukunftssichere Lösungen zu entwickeln.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Qualität",
    description: "Jedes Projekt wird mit höchster Sorgfalt und Aufmerksamkeit für Details umgesetzt – Kompromisse gibt es nicht.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Transparenz",
    description: "Offene Kommunikation und faire Preise sind für uns selbstverständlich. Sie wissen immer, woran Sie sind.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Partnerschaft",
    description: "Wir sehen uns als verlängerter Arm Ihres Teams und arbeiten eng mit Ihnen zusammen für den gemeinsamen Erfolg.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-500",
  },
];

const whyUsReasons = [
  {
    title: "Persönlicher Ansprechpartner",
    description: "Bei uns sind Sie keine Nummer. Ein fester Ansprechpartner begleitet Sie durch das gesamte Projekt.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: "Schnelle Reaktionszeiten",
    description: "Wir antworten innerhalb von 24 Stunden – garantiert. Dringende Anliegen behandeln wir noch schneller.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    highlight: true,
  },
  {
    title: "Faire & transparente Preise",
    description: "Keine versteckten Kosten, keine bösen Überraschungen. Sie wissen von Anfang an, was Ihr Projekt kostet.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: "Zukunftssichere Technologien",
    description: "Wir setzen auf moderne, etablierte Technologien, die auch in 5 Jahren noch relevant sind.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: "Langfristige Partnerschaft",
    description: "Wir denken über das Projekt hinaus. Support, Updates und Weiterentwicklung – wir sind für Sie da.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: "Made in Germany",
    description: "Lokaler Support, deutsche Qualität und DSGVO-konforme Lösungen – ohne Umwege über Drittanbieter.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    highlight: false,
  },
];

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "React Native", category: "Mobile" },
  { name: "Flutter", category: "Mobile" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Vercel", category: "Hosting" },
  { name: "Figma", category: "Design" },
];

export default function UeberUnsPage() {
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
                Ihre Digitalagentur aus Deutschland
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-slate-grey leading-[1.1]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Über
              <br />
              <span className="gradient-text">Origin Labs</span>
            </motion.h1>

            <motion.p
              className="font-body text-xl md:text-2xl text-slate-grey/60 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Wir sind ein junges, dynamisches Team mit der Mission, digitale
              Exzellenz für jeden zugänglich zu machen.
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

          {/* Floating Icons */}
          <motion.div
            className="absolute bottom-1/3 left-[15%] text-primary-cyan/35 hidden lg:block"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-[15%] text-primary-blue/30 hidden lg:block"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-[22%] text-primary-cyan/25 hidden lg:block"
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <motion.div
                    className="inline-flex items-baseline gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold gradient-text">
                      {stat.number}
                    </span>
                    {stat.suffix && (
                      <span className="font-heading text-2xl md:text-3xl font-bold text-primary-cyan">
                        {stat.suffix}
                      </span>
                    )}
                  </motion.div>
                  <p className="font-body text-slate-grey/60 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:py-32 bg-off-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-cyan/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary-blue/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                  Unsere Mission
                </span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-grey mb-6">
                  Digitale Exzellenz für <span className="gradient-text">jeden</span>
                </h2>
                <p className="font-body text-lg text-slate-grey/70 leading-relaxed mb-6">
                  Bei Origin Labs glauben wir, dass erstklassige digitale Lösungen nicht nur
                  großen Unternehmen vorbehalten sein sollten. Unsere Mission ist es,
                  Unternehmen jeder Größe dabei zu helfen, ihr volles digitales Potenzial
                  zu entfalten.
                </p>
                <p className="font-body text-lg text-slate-grey/70 leading-relaxed mb-8">
                  Mit einem tiefen Verständnis für moderne Technologien und einem
                  leidenschaftlichen Team schaffen wir maßgeschneiderte Lösungen, die
                  nicht nur funktionieren, sondern begeistern.
                </p>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-3 px-8 py-4 gradient-primary text-white font-heading font-semibold rounded-full shadow-lg shadow-primary-blue/25"
                  >
                    <span>Projekt starten</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image/Visual */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/20 to-primary-blue/20 rounded-3xl rotate-6" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-cyan/20 rounded-3xl -rotate-3" />

                  {/* Main card */}
                  <div className="relative h-full bg-white rounded-3xl border border-slate-grey/10 p-8 shadow-2xl overflow-hidden">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                      <div className="relative w-64 h-20">
                        <Image
                          src="/logo-full.png"
                          alt="Origin Labs Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="text-center">
                      <svg className="w-10 h-10 mx-auto mb-4 text-primary-cyan/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="font-body text-lg text-slate-grey/80 italic mb-4">
                        &ldquo;Jedes Problem ist eine Chance für Innovation. Wir verstehen Ihre Herausforderungen
                        und entwickeln maßgeschneiderte Lösungen, die echten Mehrwert schaffen.&rdquo;
                      </p>
                      <p className="font-heading font-semibold text-slate-grey">
                        Origin Labs Team
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-cyan/10 to-transparent rounded-bl-[100px]" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-blue/10 to-transparent rounded-tr-[80px]" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary-cyan/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-l from-primary-blue/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                Warum wir
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                Was uns <span className="gradient-text">auszeichnet</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-2xl mx-auto">
                Es gibt viele Digitalagenturen – aber nur wenige, die wirklich verstehen, was Sie brauchen.
              </p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyUsReasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  className={`group relative ${reason.highlight ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <motion.div
                    className={`relative h-full p-6 lg:p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${
                      reason.highlight
                        ? 'bg-gradient-to-br from-primary-cyan to-primary-blue text-white border-transparent shadow-2xl shadow-primary-blue/20'
                        : 'bg-white border-slate-grey/10 hover:border-primary-cyan/30 hover:shadow-xl hover:shadow-primary-cyan/5'
                    }`}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Glow effect for highlighted card */}
                    {reason.highlight && (
                      <>
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                      </>
                    )}

                    {/* Icon */}
                    <div className={`relative mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl ${
                      reason.highlight
                        ? 'bg-white/20 text-white'
                        : 'bg-gradient-to-br from-primary-cyan/10 to-primary-blue/10 text-primary-blue'
                    }`}>
                      {reason.icon}
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className={`font-heading text-xl font-bold mb-3 ${
                        reason.highlight ? 'text-white' : 'text-slate-grey group-hover:text-primary-blue transition-colors'
                      }`}>
                        {reason.title}
                      </h3>
                      <p className={`font-body leading-relaxed ${
                        reason.highlight ? 'text-white/90' : 'text-slate-grey/60'
                      }`}>
                        {reason.description}
                      </p>
                    </div>

                    {/* Decorative corner element */}
                    {!reason.highlight && (
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-cyan/5 to-transparent rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Stats Banner */}
            <motion.div
              className="mt-12 p-6 lg:p-8 bg-gradient-to-r from-slate-grey/[0.02] to-slate-grey/[0.05] rounded-3xl border border-slate-grey/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="font-heading text-xl font-bold text-slate-grey mb-1">
                    Überzeugt?
                  </h3>
                  <p className="font-body text-slate-grey/60">
                    Lassen Sie uns gemeinsam Ihr nächstes Projekt besprechen.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-3 px-8 py-4 gradient-primary text-white font-heading font-semibold rounded-full shadow-lg shadow-primary-blue/25 whitespace-nowrap"
                  >
                    <span>Kostenloses Erstgespräch</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-32 relative bg-off-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                Unsere Werte
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                Wofür wir <span className="gradient-text">stehen</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-2xl mx-auto">
                Diese Grundsätze leiten uns bei allem, was wir tun – von der ersten Idee bis zur finalen Auslieferung.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <motion.div
                    className="relative h-full p-8 bg-white rounded-3xl border border-slate-grey/10 hover:border-transparent hover:shadow-2xl hover:shadow-slate-grey/10 transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -8 }}
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                    {/* Gradient line on top */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl`} />

                    <div className="relative flex gap-6">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white shadow-lg`}>
                        {value.icon}
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="font-heading text-xl font-bold text-slate-grey mb-2 group-hover:text-primary-blue transition-colors">
                          {value.title}
                        </h3>
                        <p className="font-body text-slate-grey/60 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                Tech Stack
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                Unsere <span className="gradient-text">Technologien</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-2xl mx-auto">
                Wir arbeiten mit modernsten Technologien, um zukunftssichere Lösungen zu entwickeln.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <motion.div
                    className="px-6 py-3 bg-white rounded-full border border-slate-grey/10 shadow-sm hover:shadow-lg hover:border-primary-cyan/30 transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.05 }}
                  >
                    <span className="font-body font-medium text-slate-grey group-hover:text-primary-blue transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
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
                  Bereit für die Zusammenarbeit?
                </motion.h2>
                <motion.p
                  className="font-body text-white/80 text-lg mb-10 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Lassen Sie uns gemeinsam Ihre digitale Vision verwirklichen.
                  Wir freuen uns darauf, Sie kennenzulernen!
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
                      Kontakt aufnehmen
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                  <motion.a
                    href="/projekte"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-heading font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Projekte ansehen
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
