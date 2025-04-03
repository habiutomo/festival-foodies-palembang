import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export default function LocaleToggle() {
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="px-3 py-1 text-sm border border-neutral-300 rounded-full hover:bg-neutral-100 flex items-center gap-1"
    >
      <i className="ri-translate-2 text-accent"></i>
      <span className="hidden md:inline">{language === 'id' ? 'English' : 'Bahasa'}</span>
    </Button>
  );
}
