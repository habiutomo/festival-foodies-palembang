import { Link } from "wouter";
import { Icon } from "./ui/icon";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

interface MobileNavigationProps {
  isLangId: boolean;
}

export default function MobileNavigation({ isLangId }: MobileNavigationProps) {
  const { t } = useTranslation(isLangId);
  
  const navItems = [
    { id: "peta", icon: "map", label: t("map") },
    { id: "vendors", icon: "store", label: t("vendors") },
    { id: "jadwal", icon: "calendar", label: t("schedule") },
    { id: "galeri", icon: "image", label: t("gallery") }
  ];
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-200">
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <Link 
            key={item.id}
            href={`#${item.id}`} 
            className={cn(
              "flex flex-col items-center p-3",
              index === 0 ? "text-primary" : "text-gray-700 hover:text-primary"
            )}
          >
            <Icon name={item.icon as any} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
