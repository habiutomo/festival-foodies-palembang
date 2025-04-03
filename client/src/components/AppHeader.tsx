import { useState } from "react";
import { Link } from "wouter";
import { Icon } from "./ui/icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface AppHeaderProps {
  isLangId: boolean;
  onToggleLanguage: () => void;
}

export default function AppHeader({ isLangId, onToggleLanguage }: AppHeaderProps) {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { t } = useTranslation(isLangId);
  
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };
  
  const navItems = [
    { id: "peta", label: t("map") },
    { id: "vendors", label: t("vendors") },
    { id: "jadwal", label: t("schedule") },
    { id: "galeri", label: t("gallery") },
    { id: "kuliner", label: t("culinary") }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <div className="text-primary mr-2">
              <Icon name="utensils" className="text-2xl" />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-xl sm:text-2xl text-dark">Festival Foodies</h1>
              <p className="font-satisfy text-sm text-primary">Palembang</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                href={`#${item.id}`} 
                className="font-montserrat font-medium hover:text-primary transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center bg-gray-50 rounded-full px-3 py-1 text-sm"
              onClick={onToggleLanguage}
            >
              <span>{isLangId ? "ID" : "EN"}</span>
              <Icon name="globe" className="ml-2 text-secondary" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-dark" 
              onClick={toggleMobileMenu}
            >
              <Icon name="menu" className="text-xl" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn("md:hidden", !mobileMenuVisible && "hidden")}>
        <div className="px-4 py-3 space-y-3 bg-gray-50 border-t border-gray-200">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              href={`#${item.id}`} 
              className="block font-montserrat font-medium hover:text-primary"
              onClick={() => setMobileMenuVisible(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
