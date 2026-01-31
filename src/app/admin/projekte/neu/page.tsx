"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";

interface ProjectForm {
  title: string;
  subtitle: string;
  description: string;
  category: "websites" | "webapps" | "mobile";
  tags: string[];
  color: string;
  year: string;
  link: string;
  published: boolean;
}

const colorOptions = [
  { value: "from-violet-500 to-purple-600", label: "Violett", preview: "bg-gradient-to-br from-violet-500 to-purple-600" },
  { value: "from-cyan-500 to-blue-600", label: "Cyan-Blau", preview: "bg-gradient-to-br from-cyan-500 to-blue-600" },
  { value: "from-green-500 to-emerald-600", label: "Grün", preview: "bg-gradient-to-br from-green-500 to-emerald-600" },
  { value: "from-orange-500 to-red-600", label: "Orange-Rot", preview: "bg-gradient-to-br from-orange-500 to-red-600" },
  { value: "from-amber-500 to-orange-600", label: "Amber", preview: "bg-gradient-to-br from-amber-500 to-orange-600" },
  { value: "from-blue-500 to-indigo-600", label: "Blau-Indigo", preview: "bg-gradient-to-br from-blue-500 to-indigo-600" },
  { value: "from-pink-500 to-rose-600", label: "Pink", preview: "bg-gradient-to-br from-pink-500 to-rose-600" },
  { value: "from-teal-500 to-cyan-600", label: "Teal", preview: "bg-gradient-to-br from-teal-500 to-cyan-600" },
];

export default function NeuProjektPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState<ProjectForm>({
    title: "",
    subtitle: "",
    description: "",
    category: "websites",
    tags: [],
    color: "from-cyan-500 to-blue-600",
    year: new Date().getFullYear().toString(),
    link: "",
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real implementation, save to database
    console.log("Saving project:", form);

    setIsSaving(false);
    router.push("/admin/projekte");
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <AdminDashboardWrapper>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/projekte"
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white font-montserrat"
          >
            Neues Projekt
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300/70 mt-1"
          >
            Erstellen Sie ein neues Projekt für die Portfolio-Seite.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="bg-admin-surface/80 backdrop-blur-xl rounded-2xl border border-white/10
                        shadow-lg shadow-black/20 p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Titel <span className="text-primary-cyan">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                         focus:outline-none focus:border-primary-cyan focus:bg-admin-surface focus:shadow-lg
                         focus:shadow-primary-cyan/10 transition-all duration-300 text-white"
                placeholder="z.B. E-Commerce Platform"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Untertitel <span className="text-primary-cyan">*</span>
              </label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                         focus:outline-none focus:border-primary-cyan focus:bg-admin-surface focus:shadow-lg
                         focus:shadow-primary-cyan/10 transition-all duration-300 text-white"
                placeholder="z.B. Online Shop für Mode & Lifestyle"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Beschreibung <span className="text-primary-cyan">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                         focus:outline-none focus:border-primary-cyan focus:bg-admin-surface focus:shadow-lg
                         focus:shadow-primary-cyan/10 transition-all duration-300 resize-none text-white"
                placeholder="Beschreiben Sie das Projekt..."
              />
            </div>

            {/* Category & Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Kategorie <span className="text-primary-cyan">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProjectForm["category"] })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                           focus:outline-none focus:border-primary-cyan focus:bg-admin-surface transition-all duration-300 text-white"
                >
                  <option value="websites">Website</option>
                  <option value="webapps">Webapp</option>
                  <option value="mobile">Mobile App</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Jahr <span className="text-primary-cyan">*</span>
                </label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                           focus:outline-none focus:border-primary-cyan focus:bg-admin-surface transition-all duration-300 text-white"
                  placeholder="2024"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Tags / Technologien
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                           focus:outline-none focus:border-primary-cyan focus:bg-admin-surface transition-all duration-300 text-white"
                  placeholder="z.B. Next.js"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-primary-cyan/10 text-primary-blue font-medium rounded-xl
                           hover:bg-primary-cyan/20 transition-colors"
                >
                  Hinzufügen
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-grey/5 dark:bg-white/5
                               text-slate-200 text-sm rounded-lg"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-slate-grey/40 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Farbschema
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setForm({ ...form, color: color.value })}
                    className={`relative h-12 rounded-xl ${color.preview} transition-all duration-200
                              ${form.color === color.value
                                ? "ring-2 ring-offset-2 ring-primary-blue scale-105"
                                : "hover:scale-105"
                              }`}
                    title={color.label}
                  >
                    {form.color === color.value && (
                      <svg className="absolute inset-0 m-auto w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Projekt-Link (optional)
              </label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full px-4 py-3 bg-slate-grey/[0.03] border border-slate-grey/10 rounded-xl
                         focus:outline-none focus:border-primary-cyan focus:bg-white transition-all duration-300"
                placeholder="https://..."
              />
            </div>

            {/* Published Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="font-medium text-white">Sofort veröffentlichen</p>
                <p className="text-sm text-slate-300/70">Das Projekt wird direkt auf der Website angezeigt</p>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`relative w-14 h-8 rounded-full transition-colors duration-200
                          ${form.published ? "bg-primary-cyan" : "bg-slate-grey/20"}`}
              >
                <motion.div
                  layout
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: form.published ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/admin/projekte"
              className="px-6 py-3 text-slate-400 hover:text-slate-grey dark:hover:text-white font-medium
                       transition-colors"
            >
              Abbrechen
            </Link>
            <motion.button
              type="submit"
              disabled={isSaving || !form.title || !form.subtitle || !form.description}
              whileHover={{ scale: isSaving ? 1 : 1.02 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              className="flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold
                       rounded-xl shadow-lg shadow-primary-blue/25 hover:shadow-xl transition-all
                       duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Wird gespeichert...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Projekt erstellen
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky lg:top-8"
        >
          <h2 className="text-lg font-bold text-white mb-4 font-montserrat">
            Live-Vorschau
          </h2>

          {/* Preview Card - matches projekte/page.tsx style */}
          <div className="bg-admin-surface/80 backdrop-blur-xl rounded-2xl border border-white/10
                        shadow-lg shadow-black/20 overflow-hidden">
            {/* Project Color Header */}
            <div className={`h-32 bg-gradient-to-br ${form.color} relative`}>
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-xl
                              ${form.published
                                ? "bg-white/90 text-green-600"
                                : "bg-white/90 text-amber-600"
                              }`}>
                  {form.published ? "Veröffentlicht" : "Entwurf"}
                </span>
              </div>

              {/* Year Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 text-xs font-medium bg-white/90 text-slate-grey rounded-full">
                  {form.year || "Jahr"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white text-xl">
                    {form.title || "Projekttitel"}
                  </h3>
                  <p className="text-slate-300/70 text-sm mt-1">
                    {form.subtitle || "Untertitel des Projekts"}
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium bg-primary-cyan/10 text-primary-blue rounded-lg">
                  {form.category === "websites" ? "Website" : form.category === "webapps" ? "Webapp" : "Mobile App"}
                </span>
              </div>

              <p className="text-slate-grey/70 dark:text-slate-300/70 text-sm mb-4">
                {form.description || "Projektbeschreibung erscheint hier..."}
              </p>

              {/* Tags */}
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-slate-grey/5 dark:bg-white/5 text-slate-400 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-grey/40 dark:text-slate-500 text-center mt-4">
            So wird das Projekt auf der Portfolio-Seite angezeigt
          </p>
        </motion.div>
      </div>
    </AdminDashboardWrapper>
  );
}
