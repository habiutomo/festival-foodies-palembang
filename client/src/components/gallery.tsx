import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Gallery() {
  const { t, currentLang } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ["/api/gallery"],
  });
  
  const galleryImages = data?.galleryImages || [];
  const displayImages = showAll ? galleryImages : galleryImages.slice(0, 6);
  
  return (
    <section id="gallery" className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="font-heading text-2xl font-bold">{t("festivalGallery")}</h2>
        <p className="text-neutral-600">{t("visualMemories")}</p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-neutral-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div 
                    className="relative overflow-hidden rounded-xl h-64 group cursor-pointer"
                    onClick={() => setSelectedImage(image.image)}
                  >
                    <img 
                      src={image.image} 
                      alt={currentLang === "id" ? image.title : image.titleEn} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                      <p className="text-white font-medium">
                        {currentLang === "id" ? image.title : image.titleEn}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="p-0 max-w-4xl overflow-hidden">
                  <img 
                    src={image.image} 
                    alt={currentLang === "id" ? image.title : image.titleEn} 
                    className="w-full h-auto"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          {galleryImages.length > 6 && (
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline"
                className="px-6 py-3 bg-white text-primary border border-primary rounded-lg font-medium hover:bg-neutral-50 flex items-center gap-2"
                onClick={() => setShowAll(!showAll)}
              >
                <Image className="h-4 w-4" />
                <span>{showAll ? t("showLess") : t("viewAllPhotos")}</span>
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
