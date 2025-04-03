import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-neutral-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t.festival_title}</h3>
            <p className="text-neutral-400 mb-4">{t.footer_address}</p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t.footer_information}</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-neutral-400 hover:text-white">{t.footer_about_festival}</a></li>
              <li><a href="#map" className="text-neutral-400 hover:text-white">{t.footer_location}</a></li>
              <li><a href="#schedule" className="text-neutral-400 hover:text-white">{t.footer_schedule}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t.footer_faq}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t.footer_privacy}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t.footer_participation}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white">{t.footer_register_vendor}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t.footer_register_volunteer}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t.footer_sponsorship}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">{t.footer_media_partner}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t.footer_contact}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <i className="ri-mail-line mt-1 text-neutral-400"></i>
                <a href="mailto:info@festivalfoodiesplg.com" className="text-neutral-400 hover:text-white">info@festivalfoodiesplg.com</a>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-phone-line mt-1 text-neutral-400"></i>
                <a href="tel:+6282112345678" className="text-neutral-400 hover:text-white">+62 821-1234-5678</a>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-customer-service-2-line mt-1 text-neutral-400"></i>
                <span className="text-neutral-400">{t.footer_chat_hours}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-700 text-center text-neutral-500 text-sm">
          <p>{t.footer_copyright}</p>
        </div>
      </div>
    </footer>
  );
}
