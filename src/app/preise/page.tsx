"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfekt für kleine Unternehmen und Startups",
    price: "ab 2.500",
    priceNote: "einmalig",
    features: [
      "Bis zu 5 Seiten",
      "Responsive Design",
      "SEO-Grundoptimierung",
      "Kontaktformular",
      "1 Monat Support",
      "SSL-Zertifikat",
      "Basic Analytics",
    ],
    ctaText: "Projekt anfragen",
  },
  {
    name: "Professional",
    description: "Für wachsende Unternehmen mit höheren Ansprüchen",
    price: "ab 5.000",
    priceNote: "einmalig",
    features: [
      "Bis zu 15 Seiten",
      "Custom Design & Animationen",
      "Erweiterte SEO-Optimierung",
      "CMS-Integration",
      "3 Monate Support",
      "Performance-Optimierung",
      "Blog-Funktionalität",
      "Mehrsprachigkeit",
    ],
    highlighted: true,
    popular: true,
    ctaText: "Projekt anfragen",
  },
  {
    name: "Enterprise",
    description: "Maßgeschneiderte Lösungen für große Projekte",
    price: "Individuell",
    priceNote: "auf Anfrage",
    features: [
      "Unbegrenzte Seiten",
      "Komplexe Web-Applikationen",
      "API-Entwicklung",
      "Datenbank-Integration",
      "12 Monate Premium Support",
      "Dedizierter Projektmanager",
      "SLA-Garantie",
      "Schulungen & Dokumentation",
    ],
    ctaText: "Beratung anfragen",
  },
];

const faqs = [
  {
    question: "Wie lange dauert die Entwicklung einer Website?",
    answer: "Die Entwicklungszeit hängt vom Umfang des Projekts ab. Eine einfache Website kann in 2-4 Wochen fertiggestellt werden, während komplexere Projekte 2-3 Monate dauern können. Wir erstellen einen detaillierten Zeitplan nach dem Erstgespräch.",
  },
  {
    question: "Was ist im Support enthalten?",
    answer: "Unser Support umfasst technische Unterstützung, Bugfixes, kleinere Anpassungen und Sicherheitsupdates. Der Umfang variiert je nach gewähltem Paket. Wir sind per E-Mail und Telefon erreichbar.",
  },
  {
    question: "Kann ich meine Website später erweitern?",
    answer: "Absolut! Alle unsere Websites werden mit Skalierbarkeit im Hinterkopf entwickelt. Sie können jederzeit zusätzliche Funktionen, Seiten oder Module hinzufügen lassen.",
  },
  {
    question: "Welche Technologien verwendet ihr?",
    answer: "Wir setzen auf moderne Technologien wie Next.js, React, TypeScript und Tailwind CSS. Für CMS nutzen wir Sanity, Strapi oder WordPress - je nach Ihren Anforderungen.",
  },
  {
    question: "Bietet ihr auch Hosting an?",
    answer: "Ja, wir bieten professionelles Hosting über Vercel oder eigene Server an. Die Hosting-Kosten sind nicht in den Paketpreisen enthalten und werden separat berechnet (ab 29€/Monat).",
  },
  {
    question: "Wie läuft die Zusammenarbeit ab?",
    answer: "Nach dem Erstgespräch erstellen wir ein Konzept und Wireframes. Nach Ihrer Freigabe beginnt das Design, gefolgt von der Entwicklung. Sie erhalten regelmäßige Updates und können jederzeit Feedback geben.",
  },
];

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group ${tier.highlighted ? "lg:-mt-8 lg:mb-8" : ""}`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 gradient-primary text-white text-xs font-semibold rounded-full shadow-lg"
          >
            Beliebteste Wahl
          </motion.div>
        </div>
      )}

      <div
        className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${
          tier.highlighted
            ? "bg-gradient-to-b from-slate-grey to-slate-800 text-white shadow-2xl shadow-slate-grey/30 hover:shadow-3xl"
            : "bg-white border border-slate-grey/10 hover:border-primary-cyan/30 hover:shadow-2xl hover:shadow-primary-cyan/10"
        }`}
      >
        {/* Decorative gradient for highlighted */}
        {tier.highlighted && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 via-transparent to-primary-blue/10 opacity-50" />
        )}

        <div className="relative p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <h3
              className={`font-heading text-2xl font-bold mb-2 ${
                tier.highlighted ? "text-white" : "text-slate-grey"
              }`}
            >
              {tier.name}
            </h3>
            <p
              className={`font-body text-sm ${
                tier.highlighted ? "text-white/70" : "text-slate-grey/60"
              }`}
            >
              {tier.description}
            </p>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span
                className={`font-heading text-5xl lg:text-6xl font-bold ${
                  tier.highlighted ? "text-white" : "gradient-text"
                }`}
              >
                {tier.price}
              </span>
              {tier.price !== "Individuell" && (
                <span
                  className={`font-body text-lg ${
                    tier.highlighted ? "text-white/70" : "text-slate-grey/60"
                  }`}
                >
                  €
                </span>
              )}
            </div>
            <p
              className={`font-body text-sm mt-1 ${
                tier.highlighted ? "text-white/50" : "text-slate-grey/50"
              }`}
            >
              {tier.priceNote}
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-10">
            {tier.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    tier.highlighted
                      ? "bg-primary-cyan/20"
                      : "bg-primary-cyan/10"
                  }`}
                >
                  <svg
                    className={`w-3 h-3 ${
                      tier.highlighted ? "text-primary-cyan" : "text-primary-blue"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span
                  className={`font-body ${
                    tier.highlighted ? "text-white/90" : "text-slate-grey/80"
                  }`}
                >
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="/kontakt"
            className={`block w-full py-4 px-6 rounded-xl font-heading font-semibold text-center transition-all ${
              tier.highlighted
                ? "bg-white text-slate-grey hover:bg-primary-cyan hover:text-white shadow-lg"
                : "gradient-primary text-white shadow-lg shadow-primary-blue/25 hover:shadow-xl"
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {tier.ctaText}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-slate-grey/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between gap-4 text-left group"
      >
        <span className="font-heading text-lg font-semibold text-slate-grey group-hover:text-primary-blue transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen
              ? "bg-primary-cyan text-white"
              : "bg-slate-grey/5 text-slate-grey group-hover:bg-primary-cyan/10 group-hover:text-primary-blue"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="font-body text-slate-grey/70 pb-6 leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function PreisePage() {
  return (
    <>
      <Header />

      <main className="bg-white overflow-hidden">
        {/* Hero Section - Full height like homepage */}
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
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-body text-sm text-slate-grey font-medium">
                Transparente Preise, keine versteckten Kosten
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-slate-grey leading-[1.1]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Faire
              <br />
              <span className="gradient-text">Preise</span>
            </motion.h1>

            <motion.p
              className="font-body text-xl md:text-2xl text-slate-grey/60 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Wählen Sie das passende Paket für Ihr Projekt.
              Alle Preise sind Richtwerte – wir erstellen gerne ein individuelles Angebot.
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

          {/* Floating Price Icons */}
          <motion.div
            className="absolute bottom-1/3 left-[15%] text-primary-cyan/35 hidden lg:block"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-[15%] text-primary-blue/30 hidden lg:block"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-[22%] text-primary-cyan/25 hidden lg:block"
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
              {pricingTiers.map((tier, index) => (
                <PricingCard key={tier.name} tier={tier} index={index} />
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className="font-body text-slate-grey/60 max-w-2xl mx-auto">
                Alle Preise verstehen sich zzgl. MwSt. Die tatsächlichen Kosten hängen vom
                Projektumfang ab. Kontaktieren Sie uns für ein unverbindliches Angebot.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 lg:py-32 bg-off-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-grey mb-4">
                Was ist immer <span className="gradient-text">inklusive?</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-2xl mx-auto">
                Unabhängig vom gewählten Paket erhalten Sie diese Leistungen bei jedem Projekt.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Responsive Design",
                  description: "Perfekte Darstellung auf allen Geräten",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Blitzschnelle Ladezeiten",
                  description: "Optimierte Performance für beste UX",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "SSL-Verschlüsselung",
                  description: "Sichere HTTPS-Verbindung inklusive",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  title: "SEO-Grundlagen",
                  description: "Technische SEO-Optimierung von Anfang an",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  title: "Modernes Design",
                  description: "Zeitgemäßes, individuelles Webdesign",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  title: "Support & Wartung",
                  description: "Hilfe bei Fragen und Problemen",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-slate-grey/5 hover:border-primary-cyan/20 hover:shadow-xl hover:shadow-primary-cyan/5 transition-all group"
                >
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-slate-grey mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-slate-grey/60">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-grey mb-4">
                Häufige <span className="gradient-text">Fragen</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60">
                Antworten auf die wichtigsten Fragen zu unseren Preisen und Leistungen.
              </p>
            </motion.div>

            <div className="bg-white rounded-3xl border border-slate-grey/10 p-8 lg:p-10">
              {faqs.map((faq, index) => (
                <FAQItem key={faq.question} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-b from-white via-off-white to-white relative overflow-hidden">
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
                <span className="text-sm font-medium text-primary-blue">Kostenlose Erstberatung</span>
              </motion.div>

              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-grey mb-6">
                Noch <span className="gradient-text">Fragen?</span>
              </h2>
              <p className="font-body text-xl text-slate-grey/60 mb-10 max-w-2xl mx-auto">
                Lassen Sie uns über Ihr Projekt sprechen. Wir beraten Sie gerne
                unverbindlich und erstellen ein individuelles Angebot.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 gradient-primary text-white font-heading font-semibold rounded-full shadow-xl shadow-primary-blue/30"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Jetzt Angebot anfragen</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                <motion.a
                  href="tel:+4917647666407"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white border-2 border-slate-grey/10 text-slate-grey font-heading font-semibold rounded-full hover:border-primary-cyan/30 hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Direkt anrufen</span>
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
