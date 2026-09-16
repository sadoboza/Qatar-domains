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
    { id: 'ai', labelEn: 'AI & Semiconductors', labelAr: 'الذكاء الاصطناعي وأشباه الموصلات' },
    { id: 'healthcare', labelEn: 'Healthcare & Biotech', labelAr: 'الرعاية الصحية' },
    { id: 'global-brands', labelEn: 'Global .COM & Media', labelAr: 'العلامات العالمية (.COM)' },
    { id: 'dubai-hub', labelEn: 'Dubai & Regional Hub', labelAr: 'مشاريع دبي الإقليمية' },
    { id: 'fintech-web3', labelEn: 'FinTech & Web3 Gaming', labelAr: 'الفنتك وألعاب الويب 3' },
  ];

  return (
    <div className="w-full space-y-2.5 sm:space-y-3.5" id="inventory-search-container">
      {/* Search Input */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 sm:ps-4 text-[#8A1538]">
          <Search className="h-4 w-4" />
        </div>
        <input
          id="portfolio-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 sm:py-3.5 pe-10 sm:pe-12 ps-10 sm:ps-11 font-sans text-xs sm:text-base text-slate-900 placeholder-slate-400 shadow-xs transition-all focus:border-[#8A1538] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#8A1538]/15"
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 end-0 flex items-center pe-3 sm:pe-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        {/* Horizontal scroll on mobile with no scrollbar, wrapping on sm screens */}
        <div
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 sm:flex-wrap -mx-2 px-2 sm:mx-0 sm:px-0"
          id="category-filter-pills"
        >
          <span className="hidden items-center gap-1 text-xs font-semibold text-slate-600 sm:flex me-1 shrink-0">
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
                className={`shrink-0 whitespace-nowrap rounded-lg border px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
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
        <div className="flex items-center justify-end sm:justify-start">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#8A1538] bg-[#8A1538]/10 px-2.5 py-0.5 sm:py-1 rounded-full border border-[#8A1538]/20 shrink-0">
            <Sparkles className="h-3 w-3 text-[#8A1538]" />
            <span>
              {resultsCount} {t.resultsFound}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
