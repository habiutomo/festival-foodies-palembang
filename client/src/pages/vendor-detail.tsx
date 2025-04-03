import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function VendorDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { t, currentLang } = useLanguage();
  const numericId = parseInt(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/vendors', numericId],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{t("errorOccurred")}</h1>
        <p className="text-neutral-600 mb-6">{t("vendorNotFound")}</p>
        <Button onClick={() => navigate("/")} variant="outline">
          {t("backToHome")}
        </Button>
      </div>
    );
  }

  const { vendor, menuItems } = data;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 pl-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToAllVendors")}
          </Button>
          
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
            <img 
              src={vendor.image} 
              alt={vendor.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{vendor.name}</h1>
                  <div className="flex items-center text-white opacity-90">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{vendor.location}</span>
                  </div>
                </div>
                
                {vendor.isPopular && (
                  <Badge className="bg-primary hover:bg-primary/90">
                    <Star className="h-3 w-3 mr-1" />
                    {t("popular")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">{t("about")}</h2>
                <p className="text-neutral-600 mb-6">{vendor.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {vendor.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <h2 className="text-xl font-bold mb-4">{t("featuredMenu")}</h2>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="border-b border-neutral-200 pb-4 last:border-0">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-medium">Rp {item.price.toLocaleString()}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-neutral-500">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">{t("locationInfo")}</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">{t("zone")}</p>
                    <p>{vendor.zone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">{t("boothNumber")}</p>
                    <p>{vendor.boothNumber}</p>
                  </div>
                  <Separator />
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">{t("findOnMap")}</h3>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        navigate("/");
                        setTimeout(() => {
                          document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {t("viewOnMap")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">{t("shareVendor")}</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Instagram
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
}
