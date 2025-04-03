import { useState } from "react";
import { Link } from "wouter";
import LanguageSwitcher from "./language-switcher";
import { useLanguage } from "@/hooks/use-language";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">FF</span>
            </div>
            <h1 className="text-lg md:text-xl font-heading font-bold text-neutral-800">
              <span className="text-primary">Festival</span> Foodies <span className="text-accent">Palembang</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher />
            
            <button 
              className="p-2 text-neutral-700 hover:text-primary md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <nav className="hidden md:flex items-center gap-4 font-medium text-sm">
              <a href="#map" className="hover:text-primary">{t("map")}</a>
              <a href="#vendors" className="hover:text-primary">{t("vendors")}</a>
              <a href="#schedule" className="hover:text-primary">{t("schedule")}</a>
              <a href="#about" className="hover:text-primary">{t("about")}</a>
              <a href="#gallery" className="hover:text-primary">{t("gallery")}</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-neutral-900 bg-opacity-50 z-40 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white w-64 h-full p-4 flex flex-col gap-4 slide-in">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
            <h2 className="font-heading font-bold text-lg">{t("menu")}</h2>
            <button 
              className="p-2 text-neutral-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-3 font-medium">
            <a 
              href="#map" 
              className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {t("map")}
            </a>
            <a 
              href="#vendors" 
              className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              {t("vendors")}
            </a>
            <a 
              href="#schedule" 
              className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {t("schedule")}
            </a>
            <a 
              href="#about" 
              className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              {t("about")}
            </a>
            <a 
              href="#gallery" 
              className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              {t("gallery")}
            </a>
          </nav>
          <div className="mt-auto border-t border-neutral-200 pt-4">
            <LanguageSwitcher fullWidth />
          </div>
        </div>
      </div>
    </>
  );
}
