import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface VendorListProps {
  selectedCategory: string | null;
  searchTerm: string;
}

export default function VendorList({ selectedCategory, searchTerm }: VendorListProps) {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  
  const { data, isLoading } = useQuery({
    queryKey: ["/api/vendors"],
  });
  
  const allVendors = data?.vendors || [];
  
  // Filter vendors by category and search term
  const filteredVendors = allVendors.filter(vendor => {
    const matchesCategory = selectedCategory ? vendor.categories.includes(selectedCategory) : true;
    const matchesSearch = searchTerm 
      ? vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });
  
  // Get only the first 3 vendors for display when not showing all
  const displayVendors = showAll ? filteredVendors : filteredVendors.slice(0, 3);
  
  return (
    <section id="vendors" className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="font-heading text-2xl font-bold">{t("culinaryVendors")}</h2>
        <p className="text-neutral-600">{t("exploreVendors")}</p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-neutral-200 animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-6 bg-neutral-200 animate-pulse rounded w-3/4 mb-3"></div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-5 w-16 bg-neutral-200 animate-pulse rounded-full"></div>
                  ))}
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <div className="h-5 bg-neutral-200 animate-pulse rounded w-1/2 mb-3"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex justify-between">
                        <div className="h-4 bg-neutral-200 animate-pulse rounded w-1/3"></div>
                        <div className="h-4 bg-neutral-200 animate-pulse rounded w-1/4"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-10 bg-neutral-200 animate-pulse rounded mt-4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredVendors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-neutral-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2">{t("noVendorsFound")}</h3>
          <p className="text-neutral-600 mb-4">{t("tryDifferentSearch")}</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowAll(false);
              // Reset filters
              if (typeof window !== 'undefined') {
                const event = new CustomEvent('resetFilters');
                window.dispatchEvent(event);
              }
            }}
          >
            {t("clearFilters")}
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayVendors.map((vendor) => (
              <Card key={vendor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                <div className="relative h-48">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name} 
                    className="w-full h-full object-cover"
                  />
                  {vendor.isPopular && (
                    <div className="absolute top-0 right-0 m-3">
                      <Badge className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
                        {t("popular")}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="font-heading font-bold text-white text-lg">{vendor.name}</h3>
                    <p className="text-white text-sm opacity-90">{vendor.location}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {vendor.categories.map((category, index) => (
                      <Badge key={index} variant={index === 0 ? "secondary" : "outline"} className="px-2 py-1 text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="border-t border-neutral-200 pt-3">
                    <h4 className="font-medium mb-2">{t("featuredMenu")}:</h4>
                    <ul className="space-y-2">
                      {/* This will be populated by the menu items per vendor */}
                    </ul>
                  </div>
                  <Link to={`/vendor/${vendor.id}`}>
                    <Button className="w-full mt-4">{t("viewDetails")}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredVendors.length > 3 && (
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline" 
                className="px-6 py-3 bg-white text-primary border border-primary rounded-lg font-medium hover:bg-neutral-50 flex items-center gap-2"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? t("showLess") : t("viewAllVendors")}</span>
                <ChevronRight className={`h-5 w-5 transition-transform ${showAll ? 'rotate-90' : ''}`} />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
