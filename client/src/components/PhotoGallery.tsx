import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "./ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import type { Photo } from "@shared/schema";

interface PhotoGalleryProps {
  photos: Photo[];
  isLoading: boolean;
  isLangId: boolean;
}

export default function PhotoGallery({ photos, isLoading, isLangId }: PhotoGalleryProps) {
  const { t } = useTranslation(isLangId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  
  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      (prevIndex - 1 + photos.length) % photos.length
    );
  };
  
  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      (prevIndex + 1) % photos.length
    );
  };
  
  const currentPhoto = photos[currentPhotoIndex];
  
  return (
    <section id="galeri" className="py-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-dark">
            {t("gallery.title")}
          </h2>
          <p className="text-gray-700 mt-2">{t("gallery.subtitle")}</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="relative group overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-48 object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition duration-300">
                      <Icon name="maximize" className="text-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {photos.length > 8 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="border border-primary text-primary font-montserrat font-semibold px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition">
                  {t("gallery.view_more")}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Photo lightbox */}
      <div 
        className={cn(
          "fixed inset-0 bg-dark bg-opacity-90 z-50 flex items-center justify-center",
          !lightboxOpen && "hidden"
        )}
      >
        <div className="relative max-w-4xl w-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white text-2xl hover:text-amber-400 transition z-20" 
            onClick={closeLightbox}
          >
            <Icon name="x" className="h-6 w-6" />
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center z-20"
              onClick={prevPhoto}
            >
              <Icon name="chevron-left" />
            </Button>
            
            {currentPhoto && (
              <img 
                src={currentPhoto.imageUrl}
                alt={currentPhoto.caption}
                className="max-h-[80vh] mx-auto"
              />
            )}
            
            <Button
              variant="ghost"
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center z-20"
              onClick={nextPhoto}
            >
              <Icon name="chevron-right" />
            </Button>
          </div>
          
          <div className="text-white text-center mt-4">
            <p className="text-lg">{currentPhoto?.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
