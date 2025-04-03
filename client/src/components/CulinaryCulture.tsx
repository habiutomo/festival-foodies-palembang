import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "./ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/i18n";
import type { FestivalInfo } from "@shared/schema";

interface CulinaryCultureProps {
  festivalInfo?: FestivalInfo;
  isLangId: boolean;
}

export default function CulinaryCulture({ festivalInfo, isLangId }: CulinaryCultureProps) {
  const { t } = useTranslation(isLangId);
  
  return (
    <section id="kuliner" className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-dark">
            {t("culinary.title")}
          </h2>
          <p className="text-gray-700 mt-2">{t("culinary.subtitle")}</p>
        </div>
        
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <h3 className="font-montserrat font-bold text-xl text-dark mb-4">
                {t("culinary.about_title")}
              </h3>
              
              <p className="text-gray-700 mb-4">
                {t("culinary.about_paragraph1")}
              </p>
              
              <p className="text-gray-700 mb-4">
                {t("culinary.about_paragraph2")}
              </p>
              
              <p className="text-gray-700 mb-4">
                {t("culinary.about_paragraph3")}
              </p>
              
              <div className="mt-6">
                <h4 className="font-montserrat font-semibold text-lg text-dark mb-3">
                  {t("culinary.dishes_title")}
                </h4>
                
                <ul className="space-y-3">
                  <li className="flex">
                    <Icon name="utensils" className="text-primary mt-1 mr-3" />
                    <div>
                      <span className="font-medium text-dark">Pempek</span> - {t("culinary.pempek_desc")}
                    </div>
                  </li>
                  <li className="flex">
                    <Icon name="utensils" className="text-primary mt-1 mr-3" />
                    <div>
                      <span className="font-medium text-dark">Tekwan</span> - {t("culinary.tekwan_desc")}
                    </div>
                  </li>
                  <li className="flex">
                    <Icon name="utensils" className="text-primary mt-1 mr-3" />
                    <div>
                      <span className="font-medium text-dark">Mie Celor</span> - {t("culinary.mie_celor_desc")}
                    </div>
                  </li>
                  <li className="flex">
                    <Icon name="utensils" className="text-primary mt-1 mr-3" />
                    <div>
                      <span className="font-medium text-dark">Pindang Patin</span> - {t("culinary.pindang_desc")}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-8">
              <h3 className="font-montserrat font-bold text-xl text-dark mb-4">
                {t("culinary.festival_title")}
              </h3>
              
              <p className="text-gray-700 mb-4">
                {t("culinary.festival_paragraph1")}
              </p>
              
              <p className="text-gray-700 mb-4">
                {t("culinary.festival_paragraph2")}
              </p>
              
              <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <h4 className="font-montserrat font-semibold text-dark mb-2">
                  {t("culinary.info_title")}
                </h4>
                {!festivalInfo ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ) : (
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Icon name="calendar" className="text-primary mr-3" />
                      <span>{festivalInfo.startDate} - {festivalInfo.endDate}</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="clock" className="text-primary mr-3" />
                      <span>{festivalInfo.hours}</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="map-pin" className="text-primary mr-3" />
                      <span>{festivalInfo.location}</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="ticket" className="text-primary mr-3" />
                      <span>{t("culinary.ticket_price")}: {festivalInfo.ticketPrice}</span>
                    </li>
                  </ul>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button className="bg-primary text-white font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                  {t("culinary.download_brochure")}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
