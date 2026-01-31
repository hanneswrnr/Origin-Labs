import de from "./de.json";
import en from "./en.json";
import fr from "./fr.json";
import it from "./it.json";
import nl from "./nl.json";
import pl from "./pl.json";
import { Language } from "@/contexts/LanguageContext";

export type TranslationKeys = typeof de;

export const translations: Record<Language, TranslationKeys> = {
  de,
  en,
  fr,
  it,
  nl,
  pl,
};
