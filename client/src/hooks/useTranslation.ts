import { useLanguageContext } from "../context/LanguageContext";

export function useTranslation() {
  const { translations, language, setLanguage } = useLanguageContext();
  
  return {
    t: translations,
    language,
    setLanguage,
  };
}
