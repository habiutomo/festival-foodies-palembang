import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { Vendor } from '@shared/schema';

interface VendorMarkerProps {
  vendor: Vendor;
}

function VendorMarker({ vendor }: VendorMarkerProps) {
  const initial = vendor.name.charAt(0);
  const position = vendor.location;
  
  return (
    <button className="vendor-marker absolute z-10 group" style={{ left: `${position.x}%`, top: `${position.y}%` }}>
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">{initial}</div>
      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white p-2 rounded-lg shadow-lg w-48">
        <h4 className="font-bold text-sm">{vendor.name}</h4>
        <p className="text-xs text-neutral-600">Zona {vendor.zone} - Kios {vendor.boothNumber}</p>
      </div>
    </button>
  );
}

export default function InteractiveMap() {
  const { t } = useTranslation();
  const [scale, setScale] = useState(1);
  
  const { data: vendors, isLoading } = useQuery<Vendor[]>({
    queryKey: ['/api/vendors'],
  });

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.8));
  };

  const resetZoom = () => {
    setScale(1);
  };

  return (
    <section id="map" className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="font-heading text-2xl font-bold">{t.map_title}</h2>
        <p className="text-neutral-600">{t.map_subtitle}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
        <div className="map-container w-full h-96 md:h-[500px] relative" style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md z-10">
            <h3 className="font-bold text-sm mb-2">{t.map_legend}</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs">{t.map_food_vendors}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="text-xs">{t.map_eating_area}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-xs">{t.map_toilets}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-xs">{t.map_entrance}</span>
              </div>
            </div>
          </div>
          
          {/* Map Markers */}
          {!isLoading && vendors && vendors.map(vendor => (
            <VendorMarker key={vendor.id} vendor={vendor} />
          ))}
          
          {/* Eating Area */}
          <div className="absolute left-[40%] top-[70%] z-10">
            <div className="w-24 h-16 bg-secondary bg-opacity-50 rounded-lg border-2 border-dashed border-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-neutral-800">{t.map_eating_area}</span>
            </div>
          </div>
          
          {/* Toilets */}
          <div className="absolute right-[10%] top-[80%] z-10">
            <div className="flex flex-col items-center">
              <div className="w-10 h-12 bg-accent bg-opacity-50 rounded-lg border-2 border-dashed border-accent"></div>
              <span className="text-xs font-bold mt-1">{t.map_toilets}</span>
            </div>
          </div>
          
          {/* Entrance */}
          <div className="absolute left-[10%] top-[80%] z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-8 bg-success bg-opacity-50 rounded-lg border-2 border-dashed border-success"></div>
              <span className="text-xs font-bold mt-1">{t.map_entrance}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-neutral-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-neutral-600">{t.map_instruction}</p>
            </div>
            <div className="flex gap-2">
              <button 
                className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200"
                onClick={zoomIn}
                aria-label="Zoom in"
              >
                <i className="ri-zoom-in-line"></i>
              </button>
              <button 
                className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200"
                onClick={zoomOut}
                aria-label="Zoom out"
              >
                <i className="ri-zoom-out-line"></i>
              </button>
              <button 
                className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200"
                onClick={resetZoom}
                aria-label="Reset zoom"
              >
                <i className="ri-refresh-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
