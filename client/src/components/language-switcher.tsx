import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface LanguageSwitcherProps {
  fullWidth?: boolean;
}

export default function LanguageSwitcher({ fullWidth = false }: LanguageSwitcherProps) {
  const { currentLang, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(currentLang === "id" ? "en" : "id");
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      className={`px-3 py-1 text-sm border border-neutral-300 rounded-full hover:bg-neutral-100 flex items-center gap-1 ${fullWidth ? 'w-full justify-center' : ''}`}
      onClick={toggleLanguage}
    >
      <Languages className="h-4 w-4 text-accent" />
      <span className={fullWidth ? 'inline' : 'hidden md:inline'}>
        {currentLang === "id" ? "English" : "Bahasa Indonesia"}
      </span>
    </Button>
  );
}
