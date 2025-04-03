import { Icon } from "./ui/icon";
import { useTranslation } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import type { Category } from "@shared/schema";

interface SearchFilterProps {
  categories: Category[];
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  isLangId: boolean;
}

export default function SearchFilter({ 
  categories, 
  searchQuery, 
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  isLangId 
}: SearchFilterProps) {
  const { t } = useTranslation(isLangId);
  
  return (
    <section className="bg-white py-6 shadow-md sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("search.placeholder")}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200"
              />
              <Icon 
                name="search" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" 
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="pl-4 pr-8 py-3 rounded-lg border border-gray-200 w-[200px]">
                <SelectValue placeholder={t("search.all_categories")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("search.all_categories")}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {isLangId ? category.name : category.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
              <Icon name="filter" className="mr-2" />
              <span>{t("search.filter")}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
