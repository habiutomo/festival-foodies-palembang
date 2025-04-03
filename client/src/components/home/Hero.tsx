import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-primary text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1562607635-4608ff48a859?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Makanan Palembang" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
        <div className="max-w-2xl flex flex-col gap-4">
          <h1 className="font-accent text-3xl md:text-5xl font-bold">{t.hero_title}</h1>
          <p className="text-lg md:text-xl opacity-90">{t.hero_subtitle}</p>
          <div className="flex gap-3 mt-3 flex-wrap">
            <a href="#map">
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-bold font-heading shadow-lg hover:shadow-xl transition duration-200">
                {t.hero_button_map}
              </button>
            </a>
            <a href="#vendors">
              <button className="bg-accent text-white px-6 py-3 rounded-lg font-bold font-heading shadow-lg hover:shadow-xl transition duration-200">
                {t.hero_button_vendors}
              </button>
            </a>
          </div>
          <div className="bg-white text-neutral-800 p-4 rounded-lg mt-2 shadow-lg flex justify-between items-center">
            <div className="flex-1">
              <h3 className="font-bold text-lg">17-24 Agustus 2023</h3>
              <p className="text-neutral-600">Jaka Baring Sports City, Palembang</p>
            </div>
            <button className="text-accent hover:underline font-medium">
              {t.hero_view_details}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
