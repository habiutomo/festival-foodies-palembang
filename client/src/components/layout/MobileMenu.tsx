import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-64 h-full p-4 flex flex-col gap-4 slide-in">
        <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
          <h2 className="font-heading font-bold text-lg">Menu</h2>
          <button 
            className="p-2 text-neutral-700 hover:text-primary"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <nav className="flex flex-col gap-3 font-medium">
          <a 
            href="#map" 
            className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
            onClick={onClose}
          >
            <i className="ri-map-pin-line text-primary"></i> {t.nav_map}
          </a>
          <a 
            href="#vendors" 
            className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
            onClick={onClose}
          >
            <i className="ri-store-2-line text-primary"></i> {t.nav_vendors}
          </a>
          <a 
            href="#schedule" 
            className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
            onClick={onClose}
          >
            <i className="ri-calendar-event-line text-primary"></i> {t.nav_schedule}
          </a>
          <a 
            href="#about" 
            className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
            onClick={onClose}
          >
            <i className="ri-information-line text-primary"></i> {t.nav_about}
          </a>
          <a 
            href="#gallery" 
            className="py-2 px-3 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
            onClick={onClose}
          >
            <i className="ri-gallery-line text-primary"></i> {t.nav_gallery}
          </a>
        </nav>
        <div className="mt-auto border-t border-neutral-200 pt-4">
          <button
            onClick={() => {
              const { language, setLanguage } = useTranslation();
              setLanguage(language === 'id' ? 'en' : 'id');
              onClose();
            }}
            className="w-full py-2 px-3 bg-accent text-white rounded-lg flex justify-center items-center gap-2"
          >
            <i className="ri-translate-2"></i> 
            {t.language === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian'}
          </button>
        </div>
      </div>
    </div>
  );
}
