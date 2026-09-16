import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { DomainItem, Language } from '../types';
import { DomainCard } from './DomainCard';
import { getT } from '../data/translations';

interface DomainSliderProps {
  domains: DomainItem[];
  language: Language;
  onMakeOffer: (domain: DomainItem) => void;
}

export const DomainSlider: React.FC<DomainSliderProps> = ({
  domains,
  language,
  onMakeOffer,
}) => {
  const isAr = language === 'ar';
  const t = getT(language);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Check scroll position to update arrow states & active index
  const updateScrollState = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    
    // In RTL, scrollLeft can be negative or positive depending on the browser implementation
    const normalizedScroll = Math.abs(scrollLeft);
    setCanScrollLeft(normalizedScroll > 10);
    setCanScrollRight(normalizedScroll < maxScroll - 10);

    // Approximate active card index
    const cardWidth = el.querySelector('.slider-card')?.clientWidth || 320;
    const idx = Math.min(
      Math.max(0, Math.round(normalizedScroll / (cardWidth + 16))),
      domains.length - 1
    );
    setCurrentIndex(idx);
  }, [domains.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  // Smooth scroll by one card distance
  const scroll = (direction: 'next' | 'prev') => {
    const el = sliderRef.current;
    if (!el) return;

    const cardWidth = el.querySelector('.slider-card')?.clientWidth || 340;
    const scrollAmount = cardWidth + 20;

    // Adjust for RTL direction
    let multiplier = direction === 'next' ? 1 : -1;
    if (isAr) {
      multiplier = direction === 'next' ? -1 : 1;
    }

    el.scrollBy({
      left: scrollAmount * multiplier,
      behavior: 'smooth',
    });
  };

  // Autoplay functionality (OpenSooq-style slider movement)
  useEffect(() => {
    if (!isPlaying || domains.length <= 1) return;

    const timer = setInterval(() => {
      const el = sliderRef.current;
      if (!el) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      const normalizedScroll = Math.abs(scrollLeft);

      // If at end, loop back to start smoothly
      if (normalizedScroll >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('next');
      }
    }, 3800);

    return () => clearInterval(timer);
  }, [isPlaying, domains.length, isAr]);

  return (
    <div
      className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-slate-50/70 p-3 sm:p-7 shadow-xs"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      id="opensooq-domain-slider"
    >
      {/* Slider Header */}
      <div className="mb-3 sm:mb-6 flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h3 className="font-display text-base sm:text-xl font-black tracking-tight text-slate-900">
            {isAr ? 'نطاقات مميزة معروضة للبيع' : 'Featured Domains for Sale'}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            {isAr
              ? 'تصفح النطاقات وقدم عرضك فوراً على النطاق المناسب لمشروعك'
              : 'Browse all domains and submit your direct acquisition offer'}
          </p>
        </div>

        {/* Controls: Prev / Next + Autoplay toggle */}
        <div className="flex items-center gap-1.5 self-end xs:self-auto">
          {/* Autoplay Pause/Play button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            title={isPlaying ? (isAr ? 'إيقاف التحريك المؤقت' : 'Pause Autoplay') : (isAr ? 'تشغيل التحريك' : 'Start Autoplay')}
            aria-label="Toggle Autoplay"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={() => scroll('prev')}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer disabled:opacity-40"
            aria-label="Previous Domain"
          >
            {isAr ? <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={() => scroll('next')}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer disabled:opacity-40"
            aria-label="Next Domain"
          >
            {isAr ? <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="flex gap-3 sm:gap-6 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollBehavior: 'smooth' }}
      >
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="slider-card w-[80vw] max-w-[310px] sm:w-[330px] md:w-[350px] shrink-0 snap-start"
          >
            <DomainCard
              domain={domain}
              language={language}
              onMakeOffer={onMakeOffer}
            />
          </div>
        ))}
      </div>

      {/* Bottom Slider Indicators / Dots */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {domains.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              const el = sliderRef.current;
              if (!el) return;
              const cardWidth = el.querySelector('.slider-card')?.clientWidth || 340;
              const scrollPos = idx * (cardWidth + 20);
              el.scrollTo({
                left: isAr ? -scrollPos : scrollPos,
                behavior: 'smooth',
              });
            }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentIndex === idx
                ? 'w-6 bg-[#8A1538]'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
