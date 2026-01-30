"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";

interface ContactInfo {
  phone: string;
  email: string;
  companyName: string;
  street: string;
  city: string;
  country: string;
  responseTime: string;
  linkedIn: string;
  instagram: string;
  github: string;
  twitter: string;
}

// Magnetic Button Component
function MagneticButton({ children, className, onClick, disabled, type = "button" }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    x.set(deltaX * 0.15);
    y.set(deltaY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// 3D Card Component
function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 90 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 90 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AdminKontaktPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState<ContactInfo>({
    phone: "+49 152 03037738",
    email: "info@origin-labs.de",
    companyName: "Origin Labs",
    street: "Karl-Marx-Weg 20",
    city: "06242 Krumpa",
    country: "Deutschland",
    responseTime: "24 Stunden",
    linkedIn: "https://linkedin.com/company/origin-labs",
    instagram: "https://instagram.com/originlabs",
    github: "https://github.com/origin-labs",
    twitter: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Input field component with hover effects
  const InputField = ({
    label,
    field,
    type = "text",
    placeholder,
    icon,
    colSpan = 1,
  }: {
    label: string;
    field: keyof ContactInfo;
    type?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    colSpan?: number;
  }) => (
    <motion.div
      className={`relative group ${colSpan === 2 ? "md:col-span-2" : ""}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <label className="block text-sm font-semibold text-slate-grey mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative">
        {/* Animated border glow */}
        <motion.div
          className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary-cyan via-primary-blue to-violet-500 opacity-0 blur-sm transition-opacity duration-300"
          animate={{ opacity: focusedField === field ? 0.5 : 0 }}
        />
        <input
          type={type}
          value={form[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          className="relative w-full px-5 py-4 bg-white border-2 border-slate-grey/10 rounded-2xl
                   focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary-cyan/50
                   transition-all duration-300 group-hover:border-slate-grey/20 group-hover:shadow-lg
                   group-hover:shadow-slate-grey/5 placeholder:text-slate-grey/30"
          placeholder={placeholder}
        />

        {/* Shimmer effect on focus */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-cyan/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: focusedField === field ? "100%" : "-100%" }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <AdminDashboardWrapper>
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-grey font-montserrat"
        >
          Kontaktdaten verwalten
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-grey/60 mt-2"
        >
          Änderungen werden auf der Homepage und der Kontaktseite angezeigt.
        </motion.p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="mb-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200
                   rounded-2xl flex items-center gap-4 shadow-lg shadow-green-500/10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg shadow-green-500/30"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <div>
            <p className="text-green-700 font-bold">Erfolgreich gespeichert!</p>
            <p className="text-green-600/70 text-sm">Ihre Kontaktdaten wurden aktualisiert.</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ perspective: "1500px" }}>
          {/* Contact Details Card */}
          <Card3D>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-grey/10
                        shadow-xl shadow-slate-grey/5 p-8 overflow-hidden group"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-blue to-violet-500 rounded-3xl blur-xl opacity-30" />
              </div>

              {/* Decorative floating orb */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary-cyan/20 to-primary-blue/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity }}
              />

              <h2 className="text-xl font-bold text-slate-grey mb-8 font-montserrat flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-xl shadow-lg shadow-primary-cyan/30"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </motion.div>
                Kontaktdaten
              </h2>

              <div className="space-y-6">
                <InputField label="Firmenname" field="companyName" />

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Telefon"
                    field="phone"
                    type="tel"
                    icon={
                      <svg className="w-4 h-4 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />
                  <InputField
                    label="E-Mail"
                    field="email"
                    type="email"
                    icon={
                      <svg className="w-4 h-4 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                </div>

                <InputField label="Straße & Hausnummer" field="street" />

                <div className="grid grid-cols-2 gap-4">
                  <InputField label="PLZ & Stadt" field="city" />
                  <InputField label="Land" field="country" />
                </div>

                <InputField
                  label="Antwortzeit"
                  field="responseTime"
                  placeholder="z.B. 24 Stunden"
                  icon={
                    <svg className="w-4 h-4 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
              </div>
            </motion.div>
          </Card3D>

          {/* Social Links Card */}
          <Card3D>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-grey/10
                        shadow-xl shadow-slate-grey/5 p-8 overflow-hidden group"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30" />
              </div>

              {/* Decorative floating orb */}
              <motion.div
                className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl"
                animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
                transition={{ duration: 25, repeat: Infinity }}
              />

              <h2 className="text-xl font-bold text-slate-grey mb-8 font-montserrat flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg shadow-violet-500/30"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </motion.div>
                Social Media Links
              </h2>

              <div className="space-y-6">
                {[
                  { field: "linkedIn" as const, label: "LinkedIn", color: "#0A66C2", placeholder: "https://linkedin.com/company/...", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { field: "instagram" as const, label: "Instagram", color: "#E4405F", placeholder: "https://instagram.com/...", icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" },
                  { field: "github" as const, label: "GitHub", color: "#333333", placeholder: "https://github.com/...", icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
                  { field: "twitter" as const, label: "X (Twitter)", color: "#000000", placeholder: "https://x.com/...", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                ].map((social, i) => (
                  <motion.div
                    key={social.field}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="block text-sm font-semibold text-slate-grey mb-2 flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        style={{ color: social.color }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={social.icon} />
                        </svg>
                      </motion.div>
                      {social.label}
                    </label>
                    <div className="relative">
                      <motion.div
                        className="absolute -inset-[2px] rounded-2xl opacity-0 blur-sm transition-opacity duration-300"
                        style={{ background: `linear-gradient(135deg, ${social.color}40, ${social.color}20)` }}
                        animate={{ opacity: focusedField === social.field ? 0.7 : 0 }}
                      />
                      <input
                        type="url"
                        value={form[social.field]}
                        onChange={(e) => handleChange(social.field, e.target.value)}
                        onFocus={() => setFocusedField(social.field)}
                        onBlur={() => setFocusedField(null)}
                        className="relative w-full px-5 py-4 bg-white border-2 border-slate-grey/10 rounded-2xl
                                 focus:outline-none focus:border-transparent focus:ring-2 transition-all duration-300
                                 group-hover:border-slate-grey/20 group-hover:shadow-lg group-hover:shadow-slate-grey/5
                                 placeholder:text-slate-grey/30"
                        style={{
                          "--tw-ring-color": `${social.color}50`,
                        } as React.CSSProperties}
                        placeholder={social.placeholder}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="mt-8 p-5 bg-gradient-to-r from-primary-cyan/5 to-primary-blue/5
                         border-2 border-primary-cyan/20 rounded-2xl"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-primary-cyan"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <p className="text-sm text-slate-grey/70">
                    <span className="font-semibold text-slate-grey">Hinweis:</span> Die Social Media Links werden im Footer
                    der Website und auf der Kontaktseite angezeigt. Leer gelassene Felder werden nicht angezeigt.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </Card3D>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end mt-10"
        >
          <MagneticButton
            type="submit"
            disabled={isSaving}
            className="relative flex items-center gap-3 px-10 py-4 gradient-primary text-white font-bold
                     rounded-2xl shadow-2xl shadow-primary-blue/30 overflow-hidden group
                     disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {/* Animated background particles */}
            <span className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                  initial={{ opacity: 0, y: "100%", x: `${i * 12}%` }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: ["100%", "-100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "linear",
                  }}
                />
              ))}
            </span>

            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                           -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {isSaving ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full relative z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">Wird gespeichert...</span>
              </>
            ) : (
              <>
                <motion.svg
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
                <span className="relative z-10">Änderungen speichern</span>
              </>
            )}
          </MagneticButton>
        </motion.div>
      </form>
    </AdminDashboardWrapper>
  );
}
