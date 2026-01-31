"use client";

import { useLanguage, Language } from "@/contexts/LanguageContext";
import { translations } from "@/i18n";

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to German if key not found
        value = translations.de;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return { t, language };
}
