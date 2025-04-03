import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";

export default function MobileNav() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("map");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Get all sections
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + scrollPosition - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || "";
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on initial load
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-2 md:hidden z-30">
      <div className="flex justify-between">
        <a 
          href="#map" 
          className={`flex flex-col items-center p-2 ${activeSection === "map" ? "text-primary" : "text-neutral-700"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-inherit">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-xs mt-1">{t("map")}</span>
        </a>
        <a 
          href="#vendors" 
          className={`flex flex-col items-center p-2 ${activeSection === "vendors" ? "text-primary" : "text-neutral-700"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-inherit">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs mt-1">{t("vendors")}</span>
        </a>
        <a 
          href="#schedule" 
          className={`flex flex-col items-center p-2 ${activeSection === "schedule" ? "text-primary" : "text-neutral-700"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-inherit">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span className="text-xs mt-1">{t("schedule")}</span>
        </a>
        <a 
          href="#about" 
          className={`flex flex-col items-center p-2 ${activeSection === "about" ? "text-primary" : "text-neutral-700"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-inherit">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span className="text-xs mt-1">{t("about")}</span>
        </a>
        <a 
          href="#gallery" 
          className={`flex flex-col items-center p-2 ${activeSection === "gallery" ? "text-primary" : "text-neutral-700"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-inherit">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <span className="text-xs mt-1">{t("gallery")}</span>
        </a>
      </div>
    </div>
  );
}
