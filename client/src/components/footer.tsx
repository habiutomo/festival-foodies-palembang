import { useLanguage } from "@/hooks/use-language";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-neutral-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Festival Foodies Palembang</h3>
            <p className="text-neutral-400 mb-4">Jaka Baring Sports City, Palembang, Sumatera Selatan, Indonesia</p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t("information")}</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-neutral-400 hover:text-white">{t("aboutFestival")}</a></li>
              <li><a href="#map" className="text-neutral-400 hover:text-white">{t("locationDirections")}</a></li>
              <li><a href="#schedule" className="text-neutral-400 hover:text-white">{t("eventSchedule")}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t("privacyPolicy")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t("participation")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white">{t("registerAsVendor")}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t("volunteerRegistration")}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t("partnershipsSponsorship")}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t("mediaPartner")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t("contact")}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-neutral-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:info@festivalfoodiesplg.com" className="text-neutral-400 hover:text-white">info@festivalfoodiesplg.com</a>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-neutral-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+6282112345678" className="text-neutral-400 hover:text-white">+62 821-1234-5678</a>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-neutral-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                <span className="text-neutral-400">{t("liveChat")}: 09.00 - 17.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-700 text-center text-neutral-500 text-sm">
          <p>© 2023 Festival Foodies Palembang. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  );
}
