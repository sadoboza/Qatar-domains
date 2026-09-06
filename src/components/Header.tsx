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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Deep Dark Qatar Flag Maroon Top Accent Line */}
      <div className="h-2 w-full bg-[#560018]" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#root"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
            id="brand-header-link"
          >
            <span
              dir="ltr"
              className="inline-block font-display text-xl sm:text-2xl font-black tracking-tight text-slate-900"
            >
              qatar-domains<span className="text-[#560018]">.com</span>
            </span>
          </a>
        </div>

        {/* Live Qatar Clock & Language Toggle (Clean Header, No WhatsApp/Email icons) */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Live Qatar Clock */}
          <div className="flex items-center gap-2 rounded-full border border-[#560018]/25 bg-[#560018]/5 px-3 sm:px-4 py-1.5 text-xs font-semibold text-[#560018]">
            <Clock className="h-3.5 w-3.5 text-[#560018] animate-pulse" />
            <span>{isAr ? 'توقيت الدوحة:' : 'Doha Time:'}</span>
            <span dir="ltr" className="font-mono font-bold tracking-wider">
              {dohaTime || '12:00:00'}
            </span>
          </div>

          {/* Language Toggle */}
          <button
            id="language-toggle-btn"
            type="button"
            onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 hover:border-slate-300 cursor-pointer shadow-2xs"
            title="Language"
          >
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <span>{t.langToggle}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
