"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
}

function CustomSelect({ name, value, onChange, options, placeholder, required }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden input for form validation */}
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />

      {/* Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3.5 bg-slate-grey/[0.03] border rounded-xl font-body text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
          isOpen
            ? "border-primary-cyan bg-white shadow-lg shadow-primary-cyan/10"
            : "border-slate-grey/10 hover:border-slate-grey/20"
        }`}
        whileTap={{ scale: 0.995 }}
      >
        <span className={selectedOption ? "text-slate-grey" : "text-slate-grey/40"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.svg
          className="w-5 h-5 text-slate-grey/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-slate-grey/10 shadow-2xl shadow-slate-grey/15 overflow-hidden"
          >
            {/* Gradient accent line */}
            <div className="h-0.5 bg-gradient-to-r from-primary-cyan to-primary-blue" />

            <div className="py-2 max-h-60 overflow-auto">
              {options.map((option, index) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left font-body transition-all duration-200 flex items-center gap-3 ${
                    value === option.value
                      ? "bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10 text-primary-blue"
                      : "text-slate-grey hover:bg-slate-grey/5"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  {/* Selection indicator */}
                  <motion.span
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-cyan to-primary-blue"
                    initial={false}
                    animate={{
                      scale: value === option.value ? 1 : 0,
                      opacity: value === option.value ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                  />
                  <span className={value !== option.value ? "ml-5" : ""}>
                    {option.label}
                  </span>
                  {/* Checkmark for selected */}
                  {value === option.value && (
                    <motion.svg
                      className="w-4 h-4 ml-auto text-primary-cyan"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dropdown options
  const serviceOptions: SelectOption[] = [
    { value: "website", label: "Website" },
    { value: "webapp", label: "Webapp" },
    { value: "mobile", label: "Mobile App" },
    { value: "other", label: "Sonstiges" },
  ];

  const budgetOptions: SelectOption[] = [
    { value: "small", label: "Unter 2.000 EUR" },
    { value: "medium", label: "2.000 - 10.000 EUR" },
    { value: "large", label: "10.000 - 50.000 EUR" },
    { value: "enterprise", label: "Über 50.000 EUR" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten.");
      }

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const faqs = [
    {
      question: "Wie läuft ein Projekt bei Origin Labs ab?",
      answer: "Nach Ihrer Anfrage führen wir ein kostenloses Erstgespräch, um Ihre Anforderungen zu verstehen. Dann erstellen wir ein individuelles Angebot. Nach Beauftragung starten wir mit Design, Entwicklung und Testing. Sie sind während des gesamten Prozesses eingebunden.",
    },
    {
      question: "Wie lange dauert die Entwicklung einer Website?",
      answer: "Die Dauer hängt vom Umfang ab. Eine einfache Website ist in 2-4 Wochen fertig. Komplexere Webapps oder Mobile Apps können 2-6 Monate dauern. Wir geben Ihnen im Erstgespräch eine realistische Einschätzung.",
    },
    {
      question: "Bieten Sie auch Support nach dem Launch?",
      answer: "Ja, wir bieten verschiedene Support-Pakete an. Von einfachen Updates bis hin zu umfassenden Wartungsverträgen mit garantierten Reaktionszeiten. Auch nach Projektabschluss sind wir für Sie da.",
    },
    {
      question: "Kann ich meine bestehende Website redesignen lassen?",
      answer: "Absolut! Wir analysieren Ihre bestehende Website und entwickeln ein modernes, benutzerfreundliches Design. Dabei können wir bestehende Inhalte übernehmen und die SEO-Performance verbessern.",
    },
  ];

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
                background:
                  "radial-gradient(circle, rgba(45,212,224,0.15) 0%, transparent 70%)",
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
                background:
                  "radial-gradient(circle, rgba(0,85,255,0.1) 0%, transparent 70%)",
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
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-body text-sm text-slate-grey font-medium">
                Antwort innerhalb 24 Stunden
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-slate-grey leading-[1.1]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Lassen Sie uns
              <br />
              <span className="gradient-text">sprechen</span>
            </motion.h1>

            <motion.p
              className="font-body text-xl md:text-2xl text-slate-grey/60 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Bereit, Ihre digitale Vision zu verwirklichen? Wir verwandeln
              Ihre Ideen in beeindruckende Realität.
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

          {/* Floating Contact Icons - larger and more visible */}
          <motion.div
            className="absolute bottom-1/3 left-[15%] text-primary-cyan/35 hidden lg:block"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-[15%] text-primary-blue/30 hidden lg:block"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-[22%] text-primary-cyan/25 hidden lg:block"
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="py-20 relative">
          {/* Side decoration */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-64 bg-gradient-to-b from-transparent via-primary-cyan/30 to-transparent rounded-full hidden xl:block" />
          <div className="absolute right-0 top-1/3 w-1 h-48 bg-gradient-to-b from-transparent via-primary-blue/30 to-transparent rounded-full hidden xl:block" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Contact Form - Takes 3 columns */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Decorative corner */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary-cyan/30 rounded-tl-lg" />
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-primary-blue/30 rounded-br-lg" />

                  <div className="bg-card-bg rounded-3xl p-8 lg:p-10 shadow-2xl shadow-slate-grey/5 border border-divider relative overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-cyan/5 to-transparent rounded-full blur-2xl" />

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-blue/20">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <h2 className="font-heading text-2xl font-bold text-slate-grey">
                          Projekt anfragen
                        </h2>
                      </div>
                      <p className="font-body text-slate-grey/60 mb-8 pl-13">
                        Erzählen Sie uns von Ihrem Vorhaben.
                      </p>

                      <AnimatePresence mode="wait">
                        {isSubmitted ? (
                          <motion.div
                            key="success"
                            className="text-center py-20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                          >
                            <motion.div
                              className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary-blue/30"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                              <motion.svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                              >
                                <motion.path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M5 13l4 4L19 7"
                                />
                              </motion.svg>
                            </motion.div>
                            <h3 className="font-heading text-2xl font-bold text-slate-grey mb-3">
                              Vielen Dank!
                            </h3>
                            <p className="font-body text-slate-grey/60 text-lg">
                              Wir melden uns in Kürze bei Ihnen.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {/* Error Message */}
                            {error && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border border-red-200 rounded-xl"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <p className="font-body text-red-600 text-sm">{error}</p>
                                </div>
                              </motion.div>
                            )}

                            {/* Name & Email Row */}
                            <div className="grid sm:grid-cols-2 gap-5">
                              <div className="group">
                                <label className="block font-body text-sm font-medium text-slate-grey mb-2">
                                  Name <span className="text-primary-cyan">*</span>
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 bg-slate-grey/[0.03] border border-slate-grey/10 rounded-xl font-body text-slate-grey placeholder:text-slate-grey/40 focus:outline-none focus:border-primary-cyan focus:bg-white focus:shadow-lg focus:shadow-primary-cyan/10 transition-all duration-300"
                                    placeholder="Max Mustermann"
                                  />
                                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-cyan to-primary-blue opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300" />
                                </div>
                              </div>
                              <div className="group">
                                <label className="block font-body text-sm font-medium text-slate-grey mb-2">
                                  E-Mail <span className="text-primary-cyan">*</span>
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3.5 bg-slate-grey/[0.03] border border-slate-grey/10 rounded-xl font-body text-slate-grey placeholder:text-slate-grey/40 focus:outline-none focus:border-primary-cyan focus:bg-white focus:shadow-lg focus:shadow-primary-cyan/10 transition-all duration-300"
                                  placeholder="max@beispiel.de"
                                />
                              </div>
                            </div>

                            {/* Company & Phone Row */}
                            <div className="grid sm:grid-cols-2 gap-5">
                              <div>
                                <label className="block font-body text-sm font-medium text-slate-grey mb-2">
                                  Unternehmen
                                </label>
                                <input
                                  type="text"
                                  name="company"
                                  value={formData.company}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3.5 bg-slate-grey/[0.03] border border-slate-grey/10 rounded-xl font-body text-slate-grey placeholder:text-slate-grey/40 focus:outline-none focus:border-primary-cyan focus:bg-white focus:shadow-lg focus:shadow-primary-cyan/10 transition-all duration-300"
                                  placeholder="Firma GmbH"
                                />
                              </div>
                              <div>
                                <label className="block font-body text-sm font-medium text-slate-grey mb-2">
                                  Telefon
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3.5 bg-slate-grey/[0.03] border border-slate-grey/10 rounded-xl font-body text-slate-grey placeholder:text-slate-grey/40 focus:outline-none focus:border-primary-cyan focus:bg-white focus:shadow-lg focus:shadow-primary-cyan/10 transition-all duration-300"
                                  placeholder="+49 123 456789"
                                />
                              </div>
                            </div>

                            {/* Service & Budget Row */}
                            <div className="grid sm:grid-cols-2 gap-5">
                              <div>
                                <label className="block font-body text-sm font-medium text-slate-grey mb-2">
                                  Gewünschte Leistung <span className="text-primary-cyan">*</span>
                                </label>
                                <CustomSelect
                                  name="service"
                                  value={formData.service}
                                  onChange={(value) => setFormData({ ...formData, service: value })}
                                  options={serviceOptions}
                                  placeholder="Bitte wählen..."
                                  required
                                />
                              </div>
                              <div>
                                <label className="block font-body text-sm font-medium text-slate-grey mb-2">
                                  Budget
                                </label>
                                <CustomSelect
                                  name="budget"
                                  value={formData.budget}
                                  onChange={(value) => setFormData({ ...formData, budget: value })}
                                  options={budgetOptions}
                                  placeholder="Bitte wählen..."
                                />
                              </div>
                            </div>

                            {/* Message */}
                            <div>
                              <label className="block font-body text-sm font-medium text-slate-grey mb-2">
                                Ihre Nachricht <span className="text-primary-cyan">*</span>
                              </label>
                              <textarea
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-slate-grey/[0.03] border border-slate-grey/10 rounded-xl font-body text-slate-grey placeholder:text-slate-grey/40 focus:outline-none focus:border-primary-cyan focus:bg-white focus:shadow-lg focus:shadow-primary-cyan/10 transition-all duration-300 resize-none"
                                placeholder="Beschreiben Sie Ihr Projekt..."
                              />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              className="group w-full py-4 gradient-primary text-white font-heading font-semibold rounded-xl shadow-xl shadow-primary-blue/25 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                              whileHover={{ scale: isSubmitting ? 1 : 1.01, y: isSubmitting ? 0 : -2 }}
                              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                              {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2 relative z-10">
                                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Wird gesendet...
                                </span>
                              ) : (
                                <span className="flex items-center justify-center gap-2 relative z-10">
                                  Nachricht senden
                                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </span>
                              )}
                            </motion.button>

                            <p className="font-body text-xs text-slate-grey/50 text-center">
                              Mit dem Absenden stimmen Sie unserer{" "}
                              <a href="/privacy" className="text-primary-blue hover:underline">
                                Datenschutzerklärung
                              </a>{" "}
                              zu.
                            </p>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Contact Info - Takes 2 columns */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {/* Direct Contact Cards */}
                <div className="space-y-4">
                  <a
                    href="tel:+4915203037738"
                    className="group flex items-center gap-4 p-5 bg-card-bg rounded-2xl border border-divider hover:border-primary-cyan/30 shadow-lg shadow-slate-grey/5 hover:shadow-xl hover:shadow-primary-cyan/10 transition-all duration-300"
                  >
                    <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-blue/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm text-slate-grey/50 mb-0.5">Telefon</p>
                      <p className="font-heading font-bold text-lg text-slate-grey group-hover:text-primary-blue transition-colors">
                        +49 152 03037738
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-slate-grey/30 group-hover:text-primary-blue group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    href="mailto:info@origin-labs.de"
                    className="group flex items-center gap-4 p-5 bg-card-bg rounded-2xl border border-divider hover:border-primary-cyan/30 shadow-lg shadow-slate-grey/5 hover:shadow-xl hover:shadow-primary-cyan/10 transition-all duration-300"
                  >
                    <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-blue/25 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm text-slate-grey/50 mb-0.5">E-Mail</p>
                      <p className="font-heading font-bold text-lg text-slate-grey group-hover:text-primary-blue transition-colors">
                        info@origin-labs.de
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-slate-grey/30 group-hover:text-primary-blue group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Address & Map Card */}
                <div className="bg-card-bg rounded-2xl border border-divider shadow-lg shadow-slate-grey/5 overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-blue/20 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-body text-sm text-slate-grey/50 mb-1">Adresse</p>
                        <p className="font-heading font-bold text-slate-grey">Origin Labs</p>
                        <p className="font-body text-slate-grey/70 text-sm">Karl-Marx-Weg 20</p>
                        <p className="font-body text-slate-grey/70 text-sm">06242 Krumpa, Deutschland</p>
                      </div>
                    </div>
                  </div>
                  {/* Google Maps */}
                  <div className="relative group">
                    <iframe
                      src="https://maps.google.com/maps?q=Karl-Marx-Weg+20,+06242+Krumpa,+Germany&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Response Time Badge */}
                <div className="relative p-5 bg-gradient-to-br from-primary-cyan/10 via-background to-primary-blue/10 rounded-2xl border border-primary-cyan/10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-cyan/20 to-transparent rounded-full blur-2xl" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 bg-card-bg rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-slate-grey">Schnelle Antwort</p>
                      <p className="font-body text-sm text-slate-grey/60">
                        Innerhalb von 24 Stunden
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-5 bg-card-bg rounded-2xl border border-divider shadow-lg shadow-slate-grey/5">
                  <p className="font-body text-sm text-slate-grey/50 mb-4">Folgen Sie uns</p>
                  <div className="flex gap-3">
                    {[
                      {
                        name: "LinkedIn",
                        href: "#",
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        ),
                      },
                      {
                        name: "Instagram",
                        href: "#",
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                          </svg>
                        ),
                      },
                      {
                        name: "GitHub",
                        href: "#",
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        ),
                      },
                    ].map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        className="w-11 h-11 bg-slate-grey/5 hover:bg-gradient-to-br hover:from-primary-cyan hover:to-primary-blue rounded-xl flex items-center justify-center text-slate-grey/60 hover:text-white transition-all duration-300"
                        aria-label={social.name}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Modern Accordion */}
        <section className="py-24 bg-gradient-to-b from-white via-off-white to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-cyan/5 via-transparent to-primary-blue/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block font-body text-primary-blue font-semibold tracking-wide uppercase text-sm mb-4">
                FAQ
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-grey mb-4">
                Häufig gestellte <span className="gradient-text">Fragen</span>
              </h2>
              <p className="font-body text-lg text-slate-grey/60 max-w-xl mx-auto">
                Schnelle Antworten auf die wichtigsten Fragen
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className={`w-full text-left bg-card-bg rounded-2xl p-6 border transition-all duration-300 ${
                      openFaq === index
                        ? "border-primary-cyan/30 shadow-xl shadow-primary-cyan/10"
                        : "border-divider shadow-lg shadow-slate-grey/5 hover:border-slate-grey/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className={`font-heading font-semibold text-lg transition-colors ${
                        openFaq === index ? "text-primary-blue" : "text-slate-grey"
                      }`}>
                        {faq.question}
                      </h3>
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          openFaq === index
                            ? "bg-gradient-to-r from-primary-cyan to-primary-blue text-white"
                            : "bg-slate-grey/5 text-slate-grey/50"
                        }`}
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="font-body text-slate-grey/60 leading-relaxed mt-4 pt-4 border-t border-slate-grey/10">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* CTA after FAQ */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-body text-slate-grey/60 mb-4">
                Haben Sie weitere Fragen?
              </p>
              <motion.a
                href="tel:+4915203037738"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-blue/20 text-primary-blue font-heading font-semibold rounded-full hover:bg-primary-blue hover:text-white transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Rufen Sie uns an
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
