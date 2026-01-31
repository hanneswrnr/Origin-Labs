"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Language = "de" | "en" | "fr" | "it" | "nl" | "pl";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "de", name: "German", nativeName: "Deutsch", flag: "/flags/de.svg" },
  { code: "en", name: "English", nativeName: "English", flag: "/flags/en.svg" },
  { code: "fr", name: "French", nativeName: "Français", flag: "/flags/fr.svg" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "/flags/it.svg" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "/flags/nl.svg" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "/flags/pl.svg" },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isHydrated: boolean;
  languages: LanguageOption[];
  currentLanguage: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "origin-labs-language";
const DEFAULT_LANGUAGE: Language = "de";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize language from cookie or browser preference
  useEffect(() => {
    // Check cookie first
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${STORAGE_KEY}=`))
      ?.split("=")[1] as Language | undefined;

    if (cookieValue && LANGUAGES.find((l) => l.code === cookieValue)) {
      setLanguageState(cookieValue);
    } else {
      // Fallback to browser language detection
      const browserLang = navigator.language.split("-")[0] as Language;
      if (LANGUAGES.find((l) => l.code === browserLang)) {
        setLanguageState(browserLang);
      }
    }

    setIsHydrated(true);
  }, []);

  // Update cookie and html lang attribute when language changes
  useEffect(() => {
    if (!isHydrated) return;

    // Set cookie (expires in 1 year)
    document.cookie = `${STORAGE_KEY}=${language}; path=/; max-age=31536000; SameSite=Lax`;

    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language, isHydrated]);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
  }, []);

  const currentLanguage = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isHydrated,
        languages: LANGUAGES,
        currentLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
