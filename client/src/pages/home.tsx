import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import SearchFilter from "@/components/SearchFilter";
import FestivalMap from "@/components/FestivalMap";
import VendorListings from "@/components/VendorListings";
import FestivalSchedule from "@/components/FestivalSchedule";
import PhotoGallery from "@/components/PhotoGallery";
import CulinaryCulture from "@/components/CulinaryCulture";
import AppFooter from "@/components/AppFooter";
import MobileNavigation from "@/components/MobileNavigation";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [isLangId, setIsLangId] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    },
  });

  // Fetch vendors
  const { data: vendors, isLoading: isLoadingVendors } = useQuery({
    queryKey: ["/api/vendors"],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load vendors",
        variant: "destructive",
      });
    },
  });

  // Fetch events
  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["/api/events"],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    },
  });

  // Fetch photos
  const { data: photos, isLoading: isLoadingPhotos } = useQuery({
    queryKey: ["/api/photos"],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load photos",
        variant: "destructive",
      });
    },
  });

  // Fetch festival info
  const { data: festivalInfo } = useQuery({
    queryKey: ["/api/festival-info"],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load festival information",
        variant: "destructive",
      });
    },
  });

  // Filter vendors based on search query and category
  const filteredVendors = vendors?.filter((vendor) => {
    const matchesSearch = searchQuery === "" || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "" || selectedCategory === "all" || 
      vendor.tags.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Handle language toggle
  const toggleLanguage = () => {
    setIsLangId(!isLangId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ultra-light">
      <AppHeader isLangId={isLangId} onToggleLanguage={toggleLanguage} />
      
      <main className="flex-grow">
        <HeroSection isLangId={isLangId} />
        
        <SearchFilter 
          categories={categories || []} 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          isLangId={isLangId}
        />
        
        <FestivalMap 
          vendors={vendors || []} 
          isLoading={isLoadingVendors}
          isLangId={isLangId}
        />
        
        <VendorListings 
          vendors={vendors || []} 
          filteredVendors={filteredVendors || []}
          isLoading={isLoadingVendors}
          isLangId={isLangId}
        />
        
        <FestivalSchedule 
          events={events || []} 
          isLoading={isLoadingEvents}
          isLangId={isLangId}
        />
        
        <PhotoGallery 
          photos={photos || []} 
          isLoading={isLoadingPhotos}
          isLangId={isLangId}
        />
        
        <CulinaryCulture 
          festivalInfo={festivalInfo}
          isLangId={isLangId}
        />
      </main>
      
      <AppFooter isLangId={isLangId} />
      <MobileNavigation isLangId={isLangId} />
    </div>
  );
}
