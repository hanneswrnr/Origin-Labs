"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
  discountBadge: string | null;
  discountActive: boolean;
  order: number;
}

// Initial placeholder data (will be replaced with DB data)
const initialPricingTiers: PricingTier[] = [
  {
    id: "1",
    name: "Websites",
    description: "Professionelle Websites für Ihr Unternehmen – von der Visitenkarte bis zum komplexen Webauftritt.",
    price: "ab 800",
    priceNote: "zzgl. MwSt.",
    features: [
      "Responsive Design für alle Geräte",
      "SEO-Grundoptimierung",
      "Content Management System",
      "SSL-Zertifikat inklusive",
      "DSGVO-konforme Umsetzung",
      "Kontaktformular Integration",
      "3 Monate Support inklusive",
    ],
    highlighted: false,
    ctaText: "Projekt anfragen",
    discountBadge: null,
    discountActive: false,
    order: 0,
  },
  {
    id: "2",
    name: "Webapps",
    description: "Maßgeschneiderte Webanwendungen für Ihre individuellen Geschäftsprozesse.",
    price: "ab 8.000",
    priceNote: "zzgl. MwSt.",
    features: [
      "Individuelle Entwicklung",
      "Benutzer-Authentifizierung",
      "Datenbank-Integration",
      "API-Entwicklung",
      "Cloud-Hosting Setup",
      "Automatisierte Tests",
      "6 Monate Support inklusive",
      "Skalierbare Architektur",
    ],
    highlighted: true,
    ctaText: "Projekt anfragen",
    discountBadge: null,
    discountActive: false,
    order: 1,
  },
  {
    id: "3",
    name: "Mobile Apps",
    description: "Native und Cross-Platform Apps für iOS und Android.",
    price: "ab 15.000",
    priceNote: "zzgl. MwSt.",
    features: [
      "iOS & Android Entwicklung",
      "Cross-Platform (React Native)",
      "Push-Benachrichtigungen",
      "Offline-Funktionalität",
      "App Store Veröffentlichung",
      "Analytics Integration",
      "12 Monate Support inklusive",
      "Regelmäßige Updates",
    ],
    highlighted: false,
    ctaText: "Projekt anfragen",
    discountBadge: null,
    discountActive: false,
    order: 2,
  },
];

export default function AdminPreisePage() {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(initialPricingTiers);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PricingTier | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleEdit = (tier: PricingTier) => {
    setEditingTier(tier.id);
    setEditForm({ ...tier });
  };

  const handleSave = async () => {
    if (!editForm) return;

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPricingTiers((prev) =>
      prev.map((t) => (t.id === editForm.id ? editForm : t))
    );
    setEditingTier(null);
    setEditForm(null);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditingTier(null);
    setEditForm(null);
  };

  const addFeature = () => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      features: [...editForm.features, ""],
    });
  };

  const removeFeature = (index: number) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      features: editForm.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editForm) return;
    const newFeatures = [...editForm.features];
    newFeatures[index] = value;
    setEditForm({ ...editForm, features: newFeatures });
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
            Preise verwalten
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-grey/60 mt-2"
          >
            Bearbeiten Sie Ihre Preise, Features und Rabattaktionen.
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-xl rounded-xl
                   border border-slate-grey/10 hover:border-primary-cyan/30 text-slate-grey
                   font-medium transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {showPreview ? "Editor anzeigen" : "Vorschau anzeigen"}
        </motion.button>
      </div>

      {/* Preview Mode */}
      <AnimatePresence mode="wait">
        {showPreview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border
                          ${tier.highlighted
                            ? "border-primary-cyan shadow-xl shadow-primary-cyan/10"
                            : "border-slate-grey/10 shadow-lg shadow-slate-grey/5"
                          }`}
              >
                {tier.discountActive && tier.discountBadge && (
                  <span className="absolute -top-3 left-4 px-3 py-1 text-xs font-bold text-white
                                 gradient-primary rounded-full">
                    {tier.discountBadge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-grey">{tier.name}</h3>
                <p className="text-slate-grey/60 text-sm mt-2">{tier.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-slate-grey">{tier.price}</span>
                  <span className="text-slate-grey/40 text-sm ml-2">{tier.priceNote}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-grey/80">
                      <svg className="w-5 h-5 text-primary-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all
                                  ${tier.highlighted
                                    ? "gradient-primary text-white shadow-lg shadow-primary-blue/25"
                                    : "bg-slate-grey/5 text-slate-grey hover:bg-slate-grey/10"
                                  }`}>
                  {tier.ctaText}
                </button>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-grey/10
                         shadow-lg shadow-slate-grey/5 overflow-hidden"
              >
                {/* Tier Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-grey/10">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${tier.highlighted ? "gradient-primary" : "bg-slate-grey/20"}`} />
                    <div>
                      <h3 className="font-bold text-slate-grey text-lg">{tier.name}</h3>
                      <p className="text-slate-grey/60 text-sm">{tier.price} {tier.priceNote}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {tier.highlighted && (
                      <span className="px-3 py-1 text-xs font-medium bg-primary-cyan/10 text-primary-blue rounded-full">
                        Hervorgehoben
                      </span>
                    )}
                    <button
                      onClick={() => handleEdit(tier)}
                      className="p-2 hover:bg-slate-grey/5 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-slate-grey/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Edit Form */}
                <AnimatePresence>
                  {editingTier === tier.id && editForm && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-6 bg-slate-grey/[0.02]">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-grey mb-2">Name</label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-grey/10 rounded-xl
                                       focus:outline-none focus:border-primary-cyan transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-grey mb-2">Preis</label>
                            <input
                              type="text"
                              value={editForm.price}
                              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-grey/10 rounded-xl
                                       focus:outline-none focus:border-primary-cyan transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-grey mb-2">Beschreibung</label>
                          <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2.5 bg-white border border-slate-grey/10 rounded-xl
                                     focus:outline-none focus:border-primary-cyan transition-colors resize-none"
                          />
                        </div>

                        {/* Features */}
                        <div>
                          <label className="block text-sm font-medium text-slate-grey mb-2">Features</label>
                          <div className="space-y-2">
                            {editForm.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => updateFeature(i, e.target.value)}
                                  className="flex-1 px-4 py-2 bg-white border border-slate-grey/10 rounded-lg
                                           focus:outline-none focus:border-primary-cyan transition-colors text-sm"
                                  placeholder="Feature..."
                                />
                                <button
                                  onClick={() => removeFeature(i)}
                                  className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={addFeature}
                            className="mt-3 flex items-center gap-2 text-sm text-primary-blue hover:text-primary-cyan
                                     font-medium transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Feature hinzufügen
                          </button>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`highlighted-${tier.id}`}
                              checked={editForm.highlighted}
                              onChange={(e) => setEditForm({ ...editForm, highlighted: e.target.checked })}
                              className="w-5 h-5 rounded border-slate-grey/20 text-primary-cyan
                                       focus:ring-primary-cyan/20"
                            />
                            <label htmlFor={`highlighted-${tier.id}`} className="text-sm text-slate-grey">
                              Als hervorgehoben markieren
                            </label>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`discount-${tier.id}`}
                              checked={editForm.discountActive}
                              onChange={(e) => setEditForm({ ...editForm, discountActive: e.target.checked })}
                              className="w-5 h-5 rounded border-slate-grey/20 text-primary-cyan
                                       focus:ring-primary-cyan/20"
                            />
                            <label htmlFor={`discount-${tier.id}`} className="text-sm text-slate-grey">
                              Rabatt-Badge anzeigen
                            </label>
                          </div>
                        </div>

                        {editForm.discountActive && (
                          <div>
                            <label className="block text-sm font-medium text-slate-grey mb-2">
                              Rabatt-Badge Text
                            </label>
                            <input
                              type="text"
                              value={editForm.discountBadge || ""}
                              onChange={(e) => setEditForm({ ...editForm, discountBadge: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-grey/10 rounded-xl
                                       focus:outline-none focus:border-primary-cyan transition-colors"
                              placeholder="z.B. 20% Rabatt"
                            />
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-grey/10">
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-slate-grey/60 hover:text-slate-grey font-medium
                                     transition-colors"
                          >
                            Abbrechen
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2.5 gradient-primary text-white
                                     font-semibold rounded-xl shadow-lg shadow-primary-blue/25
                                     hover:shadow-xl transition-all duration-200 disabled:opacity-70"
                          >
                            {isSaving ? (
                              <>
                                <motion.div
                                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Speichern...
                              </>
                            ) : (
                              "Speichern"
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Feature Preview (when not editing) */}
                {editingTier !== tier.id && (
                  <div className="p-6 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {tier.features.slice(0, 4).map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-slate-grey/5 text-slate-grey/70 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {tier.features.length > 4 && (
                        <span className="px-3 py-1 text-xs bg-slate-grey/5 text-slate-grey/50 rounded-full">
                          +{tier.features.length - 4} mehr
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </AdminDashboardWrapper>
  );
}
