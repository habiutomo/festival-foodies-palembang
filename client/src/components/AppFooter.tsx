import { Icon } from "./ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";

interface AppFooterProps {
  isLangId: boolean;
}

export default function AppFooter({ isLangId }: AppFooterProps) {
  const { t } = useTranslation(isLangId);
  
  const navItems = [
    { id: "peta", label: t("map") },
    { id: "vendors", label: t("vendors") },
    { id: "jadwal", label: t("schedule") },
    { id: "galeri", label: t("gallery") },
    { id: "kuliner", label: t("culinary") },
    { id: "faq", label: "FAQ" },
  ];
  
  const socialLinks = [
    { icon: "facebook", url: "#" },
    { icon: "instagram", url: "#" },
    { icon: "twitter", url: "#" },
    { icon: "youtube", url: "#" },
  ];
  
  const contactInfo = [
    { 
      icon: "map-pin", 
      content: "Benteng Kuto Besak, Palembang, Sumatera Selatan" 
    },
    { 
      icon: "phone", 
      content: "+62 711 123456" 
    },
    { 
      icon: "mail", 
      content: "info@festivalfoodiespalembang.id" 
    },
  ];
  
  return (
    <footer className="bg-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-primary mr-2">
                <Icon name="utensils" className="text-2xl" />
              </div>
              <div>
                <h2 className="font-montserrat font-bold text-xl text-white">Festival Foodies</h2>
                <p className="font-satisfy text-primary">Palembang</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-4">
              {t("footer.description")}
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.icon}
                  href={link.url} 
                  className="text-gray-400 hover:text-primary transition"
                >
                  <Icon name={link.icon as any} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">{t("footer.useful_links")}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link 
                    href={`#${item.id}`}
                    className="text-gray-400 hover:text-primary transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">{t("footer.contact_us")}</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex">
                  <Icon name={info.icon as any} className="text-primary mt-1 mr-3" />
                  <span className="text-gray-400">{info.content}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h4 className="font-montserrat font-medium mb-2">{t("footer.newsletter")}</h4>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder={t("footer.your_email")}
                  className="px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark w-full"
                />
                <Button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition">
                  <Icon name="send" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2023 Festival Foodies Palembang. {t("footer.rights")}</p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <a href="#" className="hover:text-primary transition">{t("footer.terms")}</a>
            <a href="#" className="hover:text-primary transition">{t("footer.privacy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
