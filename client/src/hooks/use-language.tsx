import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "@/lib/translations";

type Language = "id" | "en";

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("id");

  // Load preferred language from localStorage when component mounts
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "id" || savedLang === "en")) {
      setCurrentLang(savedLang);
    }
  }, []);

  // Save language preference to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem("language", lang);
  };

  // Translate function
  const t = (key: string): string => {
    if (
      translations[currentLang] && 
      translations[currentLang][key]
    ) {
      return translations[currentLang][key];
    }
    
    // Fallback to ID if the key doesn't exist in current language
    if (translations.id && translations.id[key]) {
      return translations.id[key];
    }
    
    // Return the key itself if no translation is found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t }}>
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
