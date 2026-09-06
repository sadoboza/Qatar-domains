import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../data/translations';

interface SearchBarProps {
  language: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  resultsCount: number;
  totalCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  language,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  resultsCount,
}) => {
  const t = getT(language);
  const isAr = language === 'ar';

  const categories = [
    { id: 'all', labelEn: 'All Inventory', labelAr: 'كافة النطاقات' },
    { id: 'clean-energy', labelEn: 'Clean Energy & Hydrogen', labelAr: 'الطاقة النظيفة والهيدروجين' },
    { id: 'ai', labelEn: 'AI & Smart Mobility', labelAr: 'الذكاء الاصطناعي والمواقف' },
    { id: 'healthcare', labelEn: 'Healthcare & Biotech', labelAr: 'الرعاية الصحية' },
    { id: 'global-brands', labelEn: 'Global .COM & Media', labelAr: 'العلامات العالمية (.COM)' },
  ];

  return (
    <div className="w-full space-y-3.5" id="inventory-search-container">
      {/* Search Input */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-[#8A1538]">
          <Search className="h-4 w-4" />
        </div>
        <input
          id="portfolio-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pe-12 ps-11 font-sans text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all focus:border-[#8A1538] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#8A1538]/15 sm:text-base"
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 end-0 flex items-center pe-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2" id="category-filter-pills">
          <span className="hidden items-center gap-1 text-xs font-semibold text-slate-600 sm:flex me-1">
            <SlidersHorizontal className="h-3 w-3 text-[#8A1538]" />
            <span>{isAr ? 'تصنيف:' : 'Filter:'}</span>
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-pill-${cat.id}`}
                type="button"
                onClick={() => onCategorySelect(cat.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#8A1538] bg-[#8A1538] text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#8A1538]/40 hover:bg-[#8A1538]/5 hover:text-[#8A1538]'
                }`}
              >
                {language === 'ar' ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Live inventory badge */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8A1538] bg-[#8A1538]/10 px-2.5 py-1 rounded-full border border-[#8A1538]/20">
          <Sparkles className="h-3 w-3 text-[#8A1538]" />
          <span>
            {resultsCount} {t.resultsFound}
          </span>
        </div>
      </div>
    </div>
  );
};
