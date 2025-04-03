import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface SearchFilterProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
  onSearch: (term: string) => void;
  searchTerm: string;
}

export default function SearchFilter({
  onCategorySelect,
  selectedCategory,
  onSearch,
  searchTerm
}: SearchFilterProps) {
  const { t, currentLang } = useLanguage();
  const [searchInputValue, setSearchInputValue] = useState(searchTerm);
  
  const { data, isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });
  
  const categories = data?.categories || [];
  
  useEffect(() => {
    setSearchInputValue(searchTerm);
  }, [searchTerm]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInputValue);
  };
  
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-md p-4">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="px-4 py-3 flex items-center gap-2"
            >
              <Filter className="h-4 w-4 text-primary" />
              <span>{t("filter")}</span>
            </Button>
            <Button
              type="submit"
              className="px-4 py-3 bg-primary text-white"
            >
              {t("search")}
            </Button>
          </div>
        </form>
        
        <div className="pt-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-1">
            <span className="text-neutral-500 text-sm mt-1">{t("categories")}:</span>
            {isLoading ? (
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 w-16 animate-pulse bg-neutral-200 rounded-full"></div>
                ))}
              </div>
            ) : (
              <>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategorySelect(selectedCategory === category.name ? null : category.name)}
                    className={`food-category-chip px-3 py-1 ${
                      selectedCategory === category.name 
                        ? "bg-secondary text-neutral-800" 
                        : "bg-neutral-100 text-neutral-800"
                    } rounded-full text-sm font-medium hover:bg-secondary/80 whitespace-nowrap transition-colors`}
                  >
                    {currentLang === "id" ? category.name : category.nameEn}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
