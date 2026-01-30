"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Ungültige Anmeldedaten");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Ein Fehler ist aufgetreten");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary-cyan/20 to-primary-blue/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-violet-500/10 to-purple-600/5 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-cyan/5 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#4B5563 1px, transparent 1px),
                              linear-gradient(90deg, #4B5563 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary-cyan to-primary-blue opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md z-10"
      >
        {/* Card Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-cyan/20 via-primary-blue/20 to-violet-500/20 rounded-[2.5rem] blur-xl opacity-60" />

        {/* Glass Card */}
        <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-slate-grey/10 shadow-2xl shadow-slate-grey/10 p-10">
          {/* Inner Highlight */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/80 to-transparent pointer-events-none" />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative flex justify-center mb-10"
          >
            <Link href="/" className="block">
              <Image
                src="/logo-full.png"
                alt="Origin Labs"
                width={180}
                height={54}
                className="object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative text-center mb-10"
          >
            <h1 className="text-3xl font-bold text-slate-grey mb-3 font-montserrat">
              Admin Portal
            </h1>
            <p className="text-slate-grey/60 text-sm">
              Sichere Anmeldung zum Dashboard
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="p-4 rounded-2xl bg-red-50 border border-red-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-red-100 rounded-lg">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-red-600 text-sm font-medium">{error}</span>
                </div>
              </motion.div>
            )}

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-grey mb-2"
              >
                E-Mail Adresse
              </label>
              <div className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-2xl opacity-0 blur transition-opacity duration-300 ${
                  focusedField === "email" ? "opacity-40" : "group-hover:opacity-20"
                }`} />
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-slate-grey/40">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="relative w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50/50 border-2 border-slate-grey/10
                             focus:outline-none focus:border-primary-cyan focus:bg-white
                             transition-all duration-300 text-slate-grey placeholder:text-slate-grey/40"
                    placeholder="admin@origin-labs.de"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-grey mb-2"
              >
                Passwort
              </label>
              <div className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-2xl opacity-0 blur transition-opacity duration-300 ${
                  focusedField === "password" ? "opacity-40" : "group-hover:opacity-20"
                }`} />
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-slate-grey/40">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="relative w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50/50 border-2 border-slate-grey/10
                             focus:outline-none focus:border-primary-cyan focus:bg-white
                             transition-all duration-300 text-slate-grey placeholder:text-slate-grey/40"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full group overflow-hidden"
              >
                {/* Button Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-cyan via-primary-blue to-violet-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Button */}
                <div className="relative w-full py-4 px-6 rounded-2xl font-bold text-white
                             bg-gradient-to-r from-primary-cyan to-primary-blue
                             shadow-xl shadow-primary-blue/25 hover:shadow-2xl hover:shadow-primary-blue/30
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Wird angemeldet...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Anmelden</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </div>
              </button>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-grey/10" />
            </div>
          </div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-grey/50 hover:text-primary-cyan transition-colors duration-300 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Zurück zur Website</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary-cyan/50 to-transparent" />
      </motion.div>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-slate-grey/40"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Sichere Verbindung</span>
      </motion.div>
    </div>
  );
}
