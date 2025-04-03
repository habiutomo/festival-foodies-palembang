import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function MobileNavigation() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('map');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-2 md:hidden z-30">
      <div className="flex justify-between">
        <a 
          href="#map" 
          className={`flex flex-col items-center p-2 ${activeSection === 'map' ? 'text-primary' : 'text-neutral-700'}`}
        >
          <i className="ri-map-pin-line text-xl"></i>
          <span className="text-xs mt-1">{t.nav_map}</span>
        </a>
        <a 
          href="#vendors" 
          className={`flex flex-col items-center p-2 ${activeSection === 'vendors' ? 'text-primary' : 'text-neutral-700'}`}
        >
          <i className="ri-store-2-line text-xl"></i>
          <span className="text-xs mt-1">{t.nav_vendors}</span>
        </a>
        <a 
          href="#schedule" 
          className={`flex flex-col items-center p-2 ${activeSection === 'schedule' ? 'text-primary' : 'text-neutral-700'}`}
        >
          <i className="ri-calendar-event-line text-xl"></i>
          <span className="text-xs mt-1">{t.nav_schedule}</span>
        </a>
        <a 
          href="#about" 
          className={`flex flex-col items-center p-2 ${activeSection === 'about' ? 'text-primary' : 'text-neutral-700'}`}
        >
          <i className="ri-information-line text-xl"></i>
          <span className="text-xs mt-1">{t.nav_about}</span>
        </a>
        <a 
          href="#gallery" 
          className={`flex flex-col items-center p-2 ${activeSection === 'gallery' ? 'text-primary' : 'text-neutral-700'}`}
        >
          <i className="ri-gallery-line text-xl"></i>
          <span className="text-xs mt-1">{t.nav_gallery}</span>
        </a>
      </div>
    </div>
  );
}
