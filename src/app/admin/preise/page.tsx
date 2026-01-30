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

// Empty initial data
const initialPricingTiers: PricingTier[] = [];

export default function AdminPreisePage() {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(initialPricingTiers);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PricingTier | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
          onClick={() => setShowPreview(!showPreview)}
          className="relative flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-2xl
                   border border-slate-grey/10 text-slate-grey font-medium overflow-hidden group hover:border-primary-cyan/30 transition-all"
        >
          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-[-2px] bg-gradient-to-r from-primary-cyan via-primary-blue to-violet-500 rounded-2xl animate-spin-slow"
                 style={{ animationDuration: '3s' }} />
            <div className="absolute inset-[1px] bg-white rounded-2xl" />
          </div>

          <svg className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="relative z-10">{showPreview ? "Editor anzeigen" : "Vorschau anzeigen"}</span>
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pricingTiers.map((tier) => (
              <div key={tier.id}>
                <div
                  className={`relative bg-white/90 backdrop-blur-2xl rounded-3xl p-8 border-2 transition-all duration-500
                            ${tier.highlighted
                              ? "border-primary-cyan/50 shadow-2xl shadow-primary-cyan/20"
                              : "border-slate-grey/10 shadow-xl shadow-slate-grey/5 hover:border-primary-blue/30 hover:shadow-2xl hover:shadow-primary-blue/10"
                            }`}
                >

                  {tier.discountActive && tier.discountBadge && (
                    <motion.span
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-4 -right-4 px-4 py-2 text-sm font-bold text-white
                               gradient-primary rounded-full shadow-lg shadow-primary-blue/30"
                    >
                      {tier.discountBadge}
                    </motion.span>
                  )}

                  <h3 className="text-2xl font-bold text-slate-grey">{tier.name}</h3>
                  <p className="text-slate-grey/60 text-sm mt-3 leading-relaxed">{tier.description}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
                      {tier.price}
                    </span>
                    <span className="text-slate-grey/40 text-sm">{tier.priceNote}</span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {tier.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-sm text-slate-grey/80"
                      >
                        <div className="p-1 rounded-full bg-gradient-to-r from-primary-cyan to-primary-blue">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <button
                    className={`w-full mt-8 py-4 rounded-2xl font-semibold transition-all duration-300
                              ${tier.highlighted
                                ? "gradient-primary text-white shadow-xl shadow-primary-blue/30"
                                : "bg-slate-grey/5 text-slate-grey hover:bg-slate-grey/10"
                              }`}
                  >
                    {tier.ctaText}
                  </button>
                </div>
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
                onMouseEnter={() => setHoveredCard(tier.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Animated border glow */}
                <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-primary-cyan via-primary-blue to-violet-500 opacity-0 transition-opacity duration-500
                               ${hoveredCard === tier.id ? "opacity-100" : ""}`} />

                <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-grey/10
                             shadow-xl shadow-slate-grey/5 overflow-hidden">
                  {/* Tier Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-grey/10">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${tier.highlighted ? "gradient-primary" : "bg-slate-grey/20"}`} />
                      <div>
                        <h3 className="font-bold text-slate-grey text-lg">{tier.name}</h3>
                        <p className="text-slate-grey/60 text-sm">{tier.price} {tier.priceNote}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {tier.highlighted && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10
                                   text-primary-blue rounded-full border border-primary-cyan/20"
                        >
                          Hervorgehoben
                        </motion.span>
                      )}
                      <button
                        onClick={() => handleEdit(tier)}
                        className="p-3 hover:bg-gradient-to-r hover:from-primary-cyan/10 hover:to-primary-blue/10
                                 rounded-xl transition-all duration-300 group/btn"
                      >
                        <svg className="w-5 h-5 text-slate-grey/60 group-hover/btn:text-primary-blue transition-colors"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
                        <div className="p-6 space-y-6 bg-gradient-to-b from-slate-grey/[0.02] to-transparent">
                          {/* Basic Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group/input">
                              <label className="block text-sm font-medium text-slate-grey mb-2">Name</label>
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full px-4 py-3 bg-white border-2 border-slate-grey/10 rounded-xl
                                         focus:outline-none focus:border-primary-cyan focus:shadow-lg focus:shadow-primary-cyan/10
                                         transition-all duration-300 group-hover/input:border-slate-grey/20"
                              />
                            </div>
                            <div className="group/input">
                              <label className="block text-sm font-medium text-slate-grey mb-2">Preis</label>
                              <input
                                type="text"
                                value={editForm.price}
                                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                className="w-full px-4 py-3 bg-white border-2 border-slate-grey/10 rounded-xl
                                         focus:outline-none focus:border-primary-cyan focus:shadow-lg focus:shadow-primary-cyan/10
                                         transition-all duration-300 group-hover/input:border-slate-grey/20"
                              />
                            </div>
                          </div>

                          <div className="group/input">
                            <label className="block text-sm font-medium text-slate-grey mb-2">Beschreibung</label>
                            <textarea
                              value={editForm.description}
                              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                              rows={2}
                              className="w-full px-4 py-3 bg-white border-2 border-slate-grey/10 rounded-xl
                                       focus:outline-none focus:border-primary-cyan focus:shadow-lg focus:shadow-primary-cyan/10
                                       transition-all duration-300 resize-none group-hover/input:border-slate-grey/20"
                            />
                          </div>

                          {/* Features */}
                          <div>
                            <label className="block text-sm font-medium text-slate-grey mb-3">Features</label>
                            <div className="space-y-3">
                              {editForm.features.map((feature, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.03 }}
                                  className="flex items-center gap-3 group/feature"
                                >
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => updateFeature(i, e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border-2 border-slate-grey/10 rounded-xl
                                             focus:outline-none focus:border-primary-cyan focus:shadow-lg focus:shadow-primary-cyan/10
                                             transition-all duration-300 text-sm group-hover/feature:border-slate-grey/20"
                                    placeholder="Feature..."
                                  />
                                  <button
                                    onClick={() => removeFeature(i)}
                                    className="p-3 hover:bg-red-50 text-red-400 hover:text-red-500 rounded-xl transition-all duration-300"
                                  >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                            <button
                              onClick={addFeature}
                              className="mt-4 flex items-center gap-2 text-sm text-primary-blue hover:text-primary-cyan
                                       font-semibold transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Feature hinzufügen
                            </button>
                          </div>

                          {/* Options */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-grey/10
                                           hover:border-primary-cyan/30 transition-all duration-300 cursor-pointer group/check">
                              <input
                                type="checkbox"
                                checked={editForm.highlighted}
                                onChange={(e) => setEditForm({ ...editForm, highlighted: e.target.checked })}
                                className="w-5 h-5 rounded-lg border-slate-grey/20 text-primary-cyan
                                         focus:ring-primary-cyan/20 transition-all"
                              />
                              <span className="text-sm text-slate-grey group-hover/check:text-primary-blue transition-colors">
                                Als hervorgehoben markieren
                              </span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-grey/10
                                           hover:border-primary-cyan/30 transition-all duration-300 cursor-pointer group/check">
                              <input
                                type="checkbox"
                                checked={editForm.discountActive}
                                onChange={(e) => setEditForm({ ...editForm, discountActive: e.target.checked })}
                                className="w-5 h-5 rounded-lg border-slate-grey/20 text-primary-cyan
                                         focus:ring-primary-cyan/20 transition-all"
                              />
                              <span className="text-sm text-slate-grey group-hover/check:text-primary-blue transition-colors">
                                Rabatt-Badge anzeigen
                              </span>
                            </label>
                          </div>

                          {editForm.discountActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <label className="block text-sm font-medium text-slate-grey mb-2">
                                Rabatt-Badge Text
                              </label>
                              <input
                                type="text"
                                value={editForm.discountBadge || ""}
                                onChange={(e) => setEditForm({ ...editForm, discountBadge: e.target.value })}
                                className="w-full px-4 py-3 bg-white border-2 border-slate-grey/10 rounded-xl
                                         focus:outline-none focus:border-primary-cyan focus:shadow-lg focus:shadow-primary-cyan/10
                                         transition-all duration-300"
                                placeholder="z.B. 20% Rabatt"
                              />
                            </motion.div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-grey/10">
                            <button
                              onClick={handleCancel}
                              className="px-6 py-3 text-slate-grey/60 hover:text-slate-grey font-medium
                                       rounded-xl hover:bg-slate-grey/5 transition-all duration-300"
                            >
                              Abbrechen
                            </button>
                            <button
                              onClick={handleSave}
                              disabled={isSaving}
                              className="flex items-center gap-2 px-8 py-3 gradient-primary text-white
                                       font-semibold rounded-xl shadow-xl shadow-primary-blue/30
                                       hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
                            >
                              {isSaving ? (
                                <>
                                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span>Speichern...</span>
                                </>
                              ) : (
                                <span>Speichern</span>
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
                            className="px-4 py-2 text-xs bg-gradient-to-r from-slate-grey/5 to-slate-grey/10
                                     text-slate-grey/70 rounded-full cursor-default transition-all duration-300
                                     hover:from-primary-cyan/10 hover:to-primary-blue/10 hover:text-primary-blue"
                          >
                            {feature}
                          </span>
                        ))}
                        {tier.features.length > 4 && (
                          <span className="px-4 py-2 text-xs bg-slate-grey/5 text-slate-grey/50 rounded-full">
                            +{tier.features.length - 4} mehr
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </AdminDashboardWrapper>
  );
}
