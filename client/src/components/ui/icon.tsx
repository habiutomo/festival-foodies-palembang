import React from "react";
import { 
  Search, X, Menu, Globe, MapPin, Info, 
  Clock, Star, StarHalf, Filter, Plus, Minus, 
  Target, Coffee, Cookie, ChevronLeft, ChevronRight,
  Calendar, CalendarX, Tag, ArrowRight, Phone, 
  Mail, Send, Facebook, Instagram, Twitter, Youtube,
  Map, Store, Image, Ticket, Utensils, Info as InfoIcon,
  Maximize, SearchX
} from "lucide-react";
import { cn } from "@/lib/utils";

export type IconName = 
  | "search" | "x" | "menu" | "globe" | "map-pin" | "info" 
  | "clock" | "star" | "star-half" | "filter" | "plus" | "minus" 
  | "target" | "coffee" | "cookie" | "chevron-left" | "chevron-right"
  | "calendar" | "calendar-x" | "tag" | "arrow-right" | "phone" 
  | "mail" | "send" | "facebook" | "instagram" | "twitter" | "youtube"
  | "map" | "store" | "image" | "ticket" | "utensils" | "maximize"
  | "search-x";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconName;
  size?: number;
}

const iconComponents = {
  "search": Search,
  "x": X,
  "menu": Menu,
  "globe": Globe,
  "map-pin": MapPin,
  "info": InfoIcon,
  "clock": Clock,
  "star": Star,
  "star-half": StarHalf,
  "filter": Filter,
  "plus": Plus,
  "minus": Minus,
  "target": Target,
  "coffee": Coffee,
  "cookie": Cookie,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "calendar": Calendar,
  "calendar-x": CalendarX,
  "tag": Tag,
  "arrow-right": ArrowRight,
  "phone": Phone,
  "mail": Mail,
  "send": Send,
  "facebook": Facebook,
  "instagram": Instagram,
  "twitter": Twitter,
  "youtube": Youtube,
  "map": Map,
  "store": Store,
  "image": Image,
  "ticket": Ticket,
  "utensils": Utensils,
  "maximize": Maximize,
  "search-x": SearchX
};

export function Icon({ name, size = 18, className, ...props }: IconProps) {
  const IconComponent = iconComponents[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return (
    <IconComponent 
      size={size} 
      className={cn("inline-block", className)} 
      {...props} 
    />
  );
}
