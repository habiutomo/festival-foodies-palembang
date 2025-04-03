import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';

export default function SearchFilter() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: Infinity,
  });

  const handleSearch = () => {
    // Handle search functionality
    console.log('Searching for:', searchTerm, 'Category:', selectedCategory);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"></i>
            <input 
              type="text" 
              placeholder={t.search_placeholder} 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 bg-neutral-100 rounded-lg hover:bg-neutral-200 flex items-center gap-2">
              <i className="ri-filter-3-line text-primary"></i>
              <span>{t.search_filter}</span>
            </button>
            <button 
              className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 shadow-sm"
              onClick={handleSearch}
            >
              {t.search_button}
            </button>
          </div>
        </div>
        
        <div className="pt-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-1">
            <span className="text-neutral-500 text-sm mt-1">{t.search_category}</span>
            {categories ? (
              categories.map((category: any) => (
                <button 
                  key={category.id}
                  className={`food-category-chip px-3 py-1 ${
                    selectedCategory === category.name 
                      ? 'bg-secondary text-neutral-800' 
                      : 'bg-neutral-100 text-neutral-800'
                  } rounded-full text-sm font-medium hover:bg-secondary/80 whitespace-nowrap`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {t.language === 'id' ? category.name : category.nameEn}
                </button>
              ))
            ) : (
              // Fallback static categories
              <>
                <button 
                  className={`food-category-chip px-3 py-1 ${selectedCategory === 'Pempek' ? 'bg-secondary' : 'bg-neutral-100'} text-neutral-800 rounded-full text-sm font-medium hover:bg-neutral-200 whitespace-nowrap`}
                  onClick={() => handleCategoryClick('Pempek')}
                >
                  Pempek
                </button>
                <button 
                  className={`food-category-chip px-3 py-1 ${selectedCategory === 'Tekwan' ? 'bg-secondary' : 'bg-neutral-100'} text-neutral-800 rounded-full text-sm font-medium hover:bg-neutral-200 whitespace-nowrap`}
                  onClick={() => handleCategoryClick('Tekwan')}
                >
                  Tekwan
                </button>
                <button 
                  className={`food-category-chip px-3 py-1 ${selectedCategory === 'Model' ? 'bg-secondary' : 'bg-neutral-100'} text-neutral-800 rounded-full text-sm font-medium hover:bg-neutral-200 whitespace-nowrap`}
                  onClick={() => handleCategoryClick('Model')}
                >
                  Model
                </button>
                <button 
                  className={`food-category-chip px-3 py-1 ${selectedCategory === 'Mie Celor' ? 'bg-secondary' : 'bg-neutral-100'} text-neutral-800 rounded-full text-sm font-medium hover:bg-neutral-200 whitespace-nowrap`}
                  onClick={() => handleCategoryClick('Mie Celor')}
                >
                  Mie Celor
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
