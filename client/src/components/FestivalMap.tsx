import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "./ui/icon";
import { MapPin } from "./ui/map-pin";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import type { Vendor, MenuItem } from "@shared/schema";

interface FestivalMapProps {
  vendors: Vendor[];
  isLoading: boolean;
  isLangId: boolean;
}

export default function FestivalMap({ vendors, isLoading, isLangId }: FestivalMapProps) {
  const { t } = useTranslation(isLangId);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  
  // Fetch menu items for the selected vendor
  const { data: menuItems } = useQuery({
    queryKey: ['/api/vendors', selectedVendor?.id, 'menu'],
    queryFn: async () => {
      if (!selectedVendor) return null;
      const res = await fetch(`/api/vendors/${selectedVendor.id}/menu`);
      if (!res.ok) throw new Error('Failed to fetch menu items');
      return await res.json() as MenuItem[];
    },
    enabled: !!selectedVendor,
  });
  
  const selectVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };
  
  const closeVendorDetail = () => {
    setSelectedVendor(null);
  };
  
  return (
    <section id="peta" className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-dark">
            {t("map.title")}
          </h2>
          <p className="text-gray-700 mt-2">{t("map.subtitle")}</p>
        </div>
        
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Map Display */}
            <div className="w-full md:w-2/3 h-[400px] md:h-[600px] relative bg-cover bg-center"
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1577791465291-2c6ebe8bf4ea?auto=format&q=75&fit=crop&w=1000&h=600')` }}>
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : (
                <>
                  {/* Map pins */}
                  {vendors.map((vendor) => (
                    <MapPin
                      key={vendor.id}
                      vendor={vendor}
                      onClick={() => selectVendor(vendor)}
                      isSelected={selectedVendor?.id === vendor.id}
                      isLangId={isLangId}
                    />
                  ))}
                  
                  {/* Map controls */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <Button size="icon" variant="default" className="bg-white rounded-full w-10 h-10 shadow-md text-gray-700 hover:text-primary">
                      <Icon name="plus" />
                    </Button>
                    <Button size="icon" variant="default" className="bg-white rounded-full w-10 h-10 shadow-md text-gray-700 hover:text-primary">
                      <Icon name="minus" />
                    </Button>
                    <Button size="icon" variant="default" className="bg-white rounded-full w-10 h-10 shadow-md text-gray-700 hover:text-primary">
                      <Icon name="target" />
                    </Button>
                  </div>

                  {/* Key legend */}
                  <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <p className="font-medium text-sm mb-2">{t("map.legend")}:</p>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
                        <Icon name="utensils" className="text-xs" />
                      </div>
                      <span className="text-xs">{t("map.main_food")}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-secondary text-white rounded-full w-4 h-4 flex items-center justify-center">
                        <Icon name="coffee" className="text-xs" />
                      </div>
                      <span className="text-xs">{t("map.beverages")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-400 text-dark rounded-full w-4 h-4 flex items-center justify-center">
                        <Icon name="cookie" className="text-xs" />
                      </div>
                      <span className="text-xs">{t("map.snacks")}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Selected Vendor Info */}
            <div className="w-full md:w-1/3 p-6 border-t md:border-t-0 md:border-l border-gray-200">
              {!selectedVendor ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="text-gray-200 mb-4">
                    <Icon name="store" className="text-6xl" />
                  </div>
                  <h3 className="text-dark font-montserrat font-semibold text-xl">{t("map.select_vendor")}</h3>
                  <p className="text-gray-700 mt-2">{t("map.click_instruction")}</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-montserrat font-bold text-xl text-dark">{selectedVendor.name}</h3>
                    <Button variant="ghost" size="sm" className="text-gray-700 hover:text-primary" onClick={closeVendorDetail}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <img 
                      src={selectedVendor.imageUrl}
                      alt={selectedVendor.name} 
                      className="w-full h-48 object-cover rounded-lg" 
                    />
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <div className="flex text-amber-400">
                      {[...Array(Math.floor(parseFloat(selectedVendor.rating)))].map((_, i) => (
                        <Icon key={i} name="star" />
                      ))}
                      {parseFloat(selectedVendor.rating) % 1 !== 0 && (
                        <Icon name="star-half" />
                      )}
                    </div>
                    <span className="ml-2 text-gray-700">{selectedVendor.rating}</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Icon name="tag" className="mr-3 text-primary" />
                      <span>{selectedVendor.tags.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-gray-700 mb-2">
                      <Icon name="clock" className="mr-3 text-primary" />
                      <span>{selectedVendor.hours}</span>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <Icon name="info" className="mr-3 mt-1 text-primary" />
                      <p>{selectedVendor.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-montserrat font-semibold text-lg text-dark mb-3">{t("map.popular_menu")}</h4>
                    <div className="space-y-3">
                      {menuItems?.filter(item => item.isPopular).slice(0, 3).map((item) => (
                        <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-primary font-medium">Rp {item.price.toLocaleString('id-ID')}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-primary text-white text-center py-3 rounded-lg font-montserrat font-semibold hover:bg-opacity-90 transition">
                      {t("map.view_full_menu")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
