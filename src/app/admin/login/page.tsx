"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary-cyan/20 to-primary-blue/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-primary-blue/20 to-primary-cyan/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-grey/10 border border-white/50 p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-full.png"
              alt="Origin Labs"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-grey font-montserrat">
              Admin Dashboard
            </h1>
            <p className="text-slate-grey/60 mt-2">
              Melden Sie sich an, um fortzufahren
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-grey mb-2"
              >
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-grey/[0.03] border border-slate-grey/10 rounded-xl
                         focus:outline-none focus:border-primary-cyan focus:bg-white focus:shadow-lg
                         focus:shadow-primary-cyan/10 transition-all duration-300 text-slate-grey"
                placeholder="admin@origin-labs.de"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-grey mb-2"
              >
                Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-grey/[0.03] border border-slate-grey/10 rounded-xl
                         focus:outline-none focus:border-primary-cyan focus:bg-white focus:shadow-lg
                         focus:shadow-primary-cyan/10 transition-all duration-300 text-slate-grey"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-3.5 mt-2 gradient-primary text-white font-semibold rounded-xl
                       shadow-lg shadow-primary-blue/25 hover:shadow-xl hover:shadow-primary-blue/30
                       transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Wird angemeldet...</span>
                </>
              ) : (
                "Anmelden"
              )}
            </motion.button>
          </form>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-sm text-slate-grey/60 hover:text-primary-blue transition-colors"
            >
              &larr; Zurück zur Website
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-grey/40 text-sm mt-6">
          &copy; {new Date().getFullYear()} Origin Labs. Alle Rechte vorbehalten.
        </p>
      </motion.div>
    </div>
  );
}
