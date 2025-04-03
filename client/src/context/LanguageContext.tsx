import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations as id } from '../locale/id';
import { translations as en } from '../locale/en';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  translations: typeof id;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');
  
  // Get translations based on selected language
  const translations = language === 'id' ? id : en;
  
  const contextValue: LanguageContextType = {
    language,
    translations,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
