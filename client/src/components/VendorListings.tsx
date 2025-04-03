import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/i18n";
import type { Vendor } from "@shared/schema";

interface VendorListingsProps {
  vendors: Vendor[];
  filteredVendors: Vendor[];
  isLoading: boolean;
  isLangId: boolean;
}

export default function VendorListings({ 
  vendors, 
  filteredVendors, 
  isLoading, 
  isLangId 
}: VendorListingsProps) {
  const { t } = useTranslation(isLangId);
  
  return (
    <section id="vendors" className="py-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-dark">
            {t("vendors.title")}
          </h2>
          <p className="text-gray-700 mt-2">{t("vendors.subtitle")}</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-5">
                  <Skeleton className="h-6 w-4/5 mb-4" />
                  <Skeleton className="h-4 w-3/5 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.slice(0, 6).map((vendor) => (
                <Card key={vendor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-48">
                    <img 
                      src={vendor.imageUrl}
                      alt={vendor.name} 
                      className="w-full h-full object-cover"
                    />
                    {vendor.isPopular && (
                      <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 rounded-br-lg font-medium text-sm">
                        {t("vendors.popular")}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-montserrat font-bold text-lg text-dark">{vendor.name}</h3>
                      <div className="flex items-center">
                        <Icon name="star" className="text-amber-400" />
                        <span className="ml-1 text-gray-700">{vendor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {vendor.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4">{vendor.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-medium">
                        {t("vendors.starting_at")} Rp {vendor.startingPrice.toLocaleString('id-ID')}
                      </span>
                      <Button size="sm" className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition">
                        {t("vendors.detail")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredVendors.length > 6 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="border border-primary text-primary font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition">
                  {t("vendors.view_more")}
                </Button>
              </div>
            )}
            
            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <Icon name="search-x" className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">{t("vendors.no_results")}</h3>
                <p className="text-gray-600">{t("vendors.try_different")}</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
