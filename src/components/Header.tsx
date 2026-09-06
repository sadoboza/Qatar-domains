import React, { useState, useEffect } from 'react';
import { Globe, Clock } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../data/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
}) => {
  const t = getT(language);
  const isAr = language === 'ar';

  // Live Doha / Qatar Time Clock (Asia/Qatar GMT+3)
  const [dohaTime, setDohaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Qatar',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setDohaTime(formatter.format(new Date()));
      } catch {
        const d = new Date();
        // Fallback GMT+3
        const utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const doha = new Date(utc + 3600000 * 3);
        setDohaTime(doha.toTimeString().split(' ')[0]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0A0E17]/95 backdrop-blur-xl transition-colors duration-300">
      {/* Qatar Flag Maroon & Ruby Radiant Top Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#560018] via-[#8A1538] via-rose-500 to-[#560018] shadow-[0_1px_8px_rgba(138,21,56,0.6)]" />

      <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand: Unified "Qatar Domains" Bubble Pill matching Footer, without AI icons */}
        <div className="flex items-center gap-4">
          <a
            href="#root"
            className="group relative flex items-center transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            id="brand-header-link"
          >
            {/* Unified Qatar Domains Bubble Pill */}
            <span
              dir="ltr"
              className="relative inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-rose-600 via-[#8A1538] to-amber-500 text-white font-display text-lg sm:text-xl md:text-2xl font-black shadow-[0_4px_14px_rgba(225,29,72,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.45)] border border-rose-300/40 tracking-tight transition-all duration-300 group-hover:shadow-[0_6px_20px_rgba(225,29,72,0.6)]"
            >
              {/* Glossy top sheen */}
              <span className="absolute top-0.5 left-3 right-3 h-2 rounded-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
              Qatar Domains
            </span>
          </a>
        </div>

        {/* Controls: Doha Live Clock & Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Live Qatar Clock (Dark Luxury Pill) */}
          <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 sm:px-4 py-1.5 text-xs font-semibold text-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.1)]">
            <Clock className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span className="hidden xs:inline text-amber-200/90">{isAr ? 'توقيت الدوحة:' : 'Doha:'}</span>
            <span dir="ltr" className="font-mono font-bold tracking-wider text-amber-300">
              {dohaTime || '12:00:00'}
            </span>
          </div>

          {/* Language Toggle (Sleek Dark Glass) */}
          <button
            id="language-toggle-btn"
            type="button"
            onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-slate-200 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            title="Language"
          >
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <span>{t.langToggle}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

