import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

interface MarkerPosition {
  type: string;
  x: number;
  y: number;
  vendorId?: number;
  label?: string;
}

export default function FestivalMap() {
  const { t, currentLang } = useLanguage();
  const [scale, setScale] = useState(1);
  
  const { data, isLoading } = useQuery({
    queryKey: ["/api/map-markers"],
  });
  
  const markers = data?.mapMarkers || [];
  
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2));
  };
  
  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.6));
  };
  
  const resetZoom = () => {
    setScale(1);
  };
  
  return (
    <section id="map" className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="font-heading text-2xl font-bold">{t("festivalMap")}</h2>
        <p className="text-neutral-600">{t("findVendorLocation")}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
        <div className="map-container w-full h-96 md:h-[500px] relative overflow-hidden">
          <div 
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `scale(${scale})` }}
          >
            {/* Map Legend */}
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md z-10">
              <h3 className="font-bold text-sm mb-2">{t("legend")}</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-xs">{t("foodVendor")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-xs">{t("eatingArea")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span className="text-xs">{t("toilet")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs">{t("entrance")}</span>
                </div>
              </div>
            </div>
            
            {/* Map Markers */}
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {markers.map((marker) => {
                  if (marker.type === "vendor") {
                    return (
                      <Link key={marker.id} to={`/vendor/${marker.vendorId}`}>
                        <button 
                          className="vendor-marker absolute z-10 group cursor-pointer" 
                          style={{ left: `${marker.positionX}%`, top: `${marker.positionY}%` }}
                        >
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {marker.label?.charAt(0)}
                          </div>
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white p-2 rounded-lg shadow-lg w-48">
                            <h4 className="font-bold text-sm">{currentLang === "id" ? marker.label : marker.labelEn}</h4>
                            <p className="text-xs text-neutral-600">{marker.vendorId}</p>
                          </div>
                        </button>
                      </Link>
                    );
                  }
                  
                  if (marker.type === "eating_area") {
                    return (
                      <div 
                        key={marker.id} 
                        className="absolute z-10"
                        style={{ left: `${marker.positionX}%`, top: `${marker.positionY}%` }}
                      >
                        <div className="w-24 h-16 bg-secondary bg-opacity-50 rounded-lg border-2 border-dashed border-secondary flex items-center justify-center">
                          <span className="text-xs font-bold text-neutral-800">
                            {currentLang === "id" ? marker.label : marker.labelEn}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  
                  if (marker.type === "toilet") {
                    return (
                      <div 
                        key={marker.id} 
                        className="absolute z-10"
                        style={{ left: `${marker.positionX}%`, top: `${marker.positionY}%` }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-12 bg-accent bg-opacity-50 rounded-lg border-2 border-dashed border-accent"></div>
                          <span className="text-xs font-bold mt-1">
                            {currentLang === "id" ? marker.label : marker.labelEn}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  
                  if (marker.type === "entrance") {
                    return (
                      <div 
                        key={marker.id} 
                        className="absolute z-10"
                        style={{ left: `${marker.positionX}%`, top: `${marker.positionY}%` }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-8 bg-success bg-opacity-50 rounded-lg border-2 border-dashed border-success"></div>
                          <span className="text-xs font-bold mt-1">
                            {currentLang === "id" ? marker.label : marker.labelEn}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  
                  return null;
                })}
              </>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-neutral-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-neutral-600">{t("clickMarkerToSeeDetails")}</p>
            </div>
            <div className="flex gap-2">
              <button 
                className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200"
                onClick={zoomIn}
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button 
                className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200"
                onClick={zoomOut}
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button 
                className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200"
                onClick={resetZoom}
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
