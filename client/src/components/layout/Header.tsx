import React, { useState } from 'react';
import { Link } from 'wouter';
import LocaleToggle from '@/components/ui/LocaleToggle';
import { useTranslation } from '@/hooks/useTranslation';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <a className="flex items-center gap-2">
              <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V6c0-1.1-.9-2-2-2h-3z" />
              </svg>
              <h1 className="text-lg md:text-xl font-heading font-bold text-neutral-800">
                <span className="text-primary">Festival</span> Foodies <span className="text-accent">Palembang</span>
              </h1>
            </a>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <LocaleToggle />
          
          <button 
            className="p-2 text-neutral-700 hover:text-primary md:hidden" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
          
          <nav className="hidden md:flex items-center gap-4 font-medium text-sm">
            <a href="#map" className="hover:text-primary">{t.nav_map}</a>
            <a href="#vendors" className="hover:text-primary">{t.nav_vendors}</a>
            <a href="#schedule" className="hover:text-primary">{t.nav_schedule}</a>
            <a href="#about" className="hover:text-primary">{t.nav_about}</a>
            <a href="#gallery" className="hover:text-primary">{t.nav_gallery}</a>
          </nav>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
