import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { useTranslation } from "@/lib/i18n";
import type { Vendor } from "@shared/schema";

interface MapPinProps {
  vendor: Vendor;
  onClick: () => void;
  isSelected: boolean;
  isLangId: boolean;
}

export function MapPin({ vendor, onClick, isSelected, isLangId }: MapPinProps) {
  const { t } = useTranslation(isLangId);
  
  // Determine the icon based on the pin type
  const getIconName = (pinType: string) => {
    switch (pinType) {
      case 'food': return 'utensils';
      case 'drink': return 'coffee';
      case 'snack': return 'cookie';
      default: return 'utensils';
    }
  };
  
  // Determine the background color based on the pin type
  const getBgColor = (pinType: string) => {
    switch (pinType) {
      case 'food': return 'bg-primary';
      case 'drink': return 'bg-secondary';
      case 'snack': return 'bg-amber-400';
      default: return 'bg-primary';
    }
  };
  
  // Determine text color for snacks (dark) vs others (white)
  const getTextColor = (pinType: string) => {
    return pinType === 'snack' ? 'text-dark' : 'text-white';
  };
  
  return (
    <button
      className={cn(
        "map-pin absolute transition-transform duration-200 ease-in-out",
        isSelected ? "scale-110 z-20" : "hover:scale-110 z-10"
      )}
      style={{ top: vendor.mapPosition.top, left: vendor.mapPosition.left }}
      onClick={onClick}
    >
      <div className={cn(
        getBgColor(vendor.pinType),
        getTextColor(vendor.pinType),
        "rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white"
      )}>
        <Icon name={getIconName(vendor.pinType) as any} />
      </div>
      <div className="bg-white px-2 py-1 rounded shadow-md mt-2 text-sm font-medium">
        {vendor.name}
      </div>
    </button>
  );
}
