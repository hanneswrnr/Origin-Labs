"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const { language, setLanguage, isHydrated, languages, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  // Placeholder during SSR hydration (matches ThemeToggle pattern)
  if (!isHydrated) {
    return (
      <div className={`w-10 h-10 rounded-full bg-slate-grey/5 ${className}`} />
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full flex items-center justify-center
          hover:bg-hover-bg transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-cyan"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Sprache: ${currentLanguage.nativeName}`}
        aria-expanded={isOpen}
      >
        <Image
          src={currentLanguage.flag}
          alt={currentLanguage.nativeName}
          width={24}
          height={24}
          className="w-6 h-6 rounded-full object-cover ring-2 ring-black"
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-2 py-2 bg-card-bg backdrop-blur-xl rounded-2xl shadow-xl border border-divider min-w-[160px] z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  language === lang.code
                    ? "bg-gradient-to-r from-primary-cyan/10 to-primary-blue/10 text-primary-blue"
                    : "text-text-muted hover:bg-hover-bg hover:text-slate-grey"
                }`}
                whileHover={{ x: 2 }}
              >
                <Image
                  src={lang.flag}
                  alt={lang.nativeName}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full object-cover ring-2 ring-black"
                />
                <span className="font-body text-sm">{lang.nativeName}</span>
                {language === lang.code && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 ml-auto text-primary-cyan"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
