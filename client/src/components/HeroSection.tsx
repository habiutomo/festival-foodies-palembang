import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface HeroSectionProps {
  isLangId: boolean;
}

export default function HeroSection({ isLangId }: HeroSectionProps) {
  const { t } = useTranslation(isLangId);
  
  return (
    <section className="relative bg-primary text-white">
      <div className="absolute inset-0 bg-dark opacity-30"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-montserrat font-bold text-3xl md:text-5xl mb-4">
            Festival Foodies Palembang
          </h1>
          <p className="text-lg md:text-xl mb-8">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-white text-primary font-montserrat font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-50 transition"
            >
              <a href="#peta">{t("hero.view_map")}</a>
            </Button>
            <Button
              asChild
              className="bg-secondary text-white font-montserrat font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition"
            >
              <a href="#jadwal">{t("hero.view_schedule")}</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&q=80&w=2080&fit=max"
          alt={t("hero.image_alt")}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
