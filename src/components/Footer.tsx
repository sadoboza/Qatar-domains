import React from 'react';
import {
  Mail,
  MessageSquare,
  ShieldCheck,
  Lock,
  Globe2,
  ChevronUp,
} from 'lucide-react';
import { Language } from '../types';
import { getT } from '../data/translations';
import { BROKERAGE_CONFIG } from '../data/domains';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = getT(language);
  const isAr = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="about-us-section"
      className="relative w-full border-t border-slate-800/80 bg-[#070A10] text-slate-300 pt-16 pb-12 mt-20 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#8A1538]/15 via-rose-900/5 to-transparent blur-3xl opacity-60" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ========================================================= */}
        {/* SECTION: Simplified & Realistic "نبذة عن المنصة / About Us" */}
        {/* ========================================================= */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8A1538] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-7 space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-bold text-rose-300 tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span>{t.aboutUsBadge}</span>
              </div>

              {/* Title with Unified Bubble Pill */}
              <div className="space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {isAr ? (
                    <>
                      عن منصة{' '}
                      <span
                        dir="ltr"
                        className="inline-flex items-center gap-1.5 align-middle px-3.5 sm:px-4 py-1 rounded-full bg-gradient-to-r from-rose-600 via-[#8A1538] to-amber-500 text-white text-xl sm:text-2xl font-black shadow-[0_3px_12px_rgba(225,29,72,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.4)] border border-rose-300/40"
                      >
                        Qatar Domains
                      </span>
                    </>
                  ) : (
                    <>
                      About{' '}
                      <span
                        dir="ltr"
                        className="inline-flex items-center gap-1.5 align-middle px-3.5 sm:px-4 py-1 rounded-full bg-gradient-to-r from-rose-600 via-[#8A1538] to-amber-500 text-white text-xl sm:text-2xl font-black shadow-[0_3px_12px_rgba(225,29,72,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.4)] border border-rose-300/40"
                      >
                        Qatar Domains
                      </span>
                    </>
                  )}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-rose-300/90">
                  {t.aboutUsTagline}
                </p>
              </div>

              {/* Body Paragraphs - Simple, Direct, and Realistic */}
              <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                <p>{t.aboutUsParagraph1}</p>
                <p className="text-slate-400">{t.aboutUsParagraph2}</p>
              </div>
            </div>

            {/* Right Column: 3 Practical Pillars */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Pillar 1 */}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-0.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8A1538]/20 border border-[#8A1538]/40 text-rose-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    {t.aboutUsPillar1Title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.aboutUsPillar1Desc}
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-0.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Lock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    {t.aboutUsPillar2Title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.aboutUsPillar2Desc}
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-0.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <Globe2 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    {t.aboutUsPillar3Title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.aboutUsPillar3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION: Branding & Direct Contact Channels */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4 border-t border-slate-800/80">
          {/* Bubble Logo & Brief Info */}
          <div className="space-y-2 text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start">
              <span
                dir="ltr"
                className="relative inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-rose-600 via-[#8A1538] to-amber-500 text-white font-display text-lg sm:text-xl font-black shadow-[0_3px_12px_rgba(225,29,72,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.4)] border border-rose-300/40 tracking-tight"
              >
                Qatar Domains
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md font-medium">
              {isAr
                ? 'منصة لعرض واقتناء نخبة النطاقات القطرية والعالمية مع تنسيق آمن لنقل الملكية.'
                : 'Platform showcasing distinctive Qatar & global domain names with coordinated secure transfer.'}
            </p>
          </div>

          {/* Action Contact Badges (High Contrast Luxury Dark) */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
            {/* WhatsApp */}
            <a
              id="footer-whatsapp-btn"
              href={`https://wa.me/${BROKERAGE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 px-4 py-2.5 rounded-xl border border-emerald-500/30 transition-all duration-200 shadow-sm"
              aria-label="WhatsApp"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>{isAr ? 'محادثة واتساب' : 'WhatsApp'}</span>
            </a>

            {/* Email */}
            <a
              id="footer-email-btn"
              href={`mailto:${BROKERAGE_CONFIG.email}`}
              className="flex items-center gap-2 text-rose-300 hover:text-white bg-[#8A1538]/25 hover:bg-[#8A1538]/40 px-4 py-2.5 rounded-xl border border-[#8A1538]/40 transition-all duration-200 shadow-sm"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-rose-400" />
              <span>{isAr ? 'البريد الإلكتروني' : 'Email'}</span>
            </a>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center justify-center h-10 w-10 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={isAr ? 'العودة للأعلى' : 'Back to top'}
              aria-label="Back to top"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Bottom Bar: Copyright & Realistic Transfer Note */}
        {/* ========================================================= */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p dir="ltr" className="font-sans text-slate-400">
            © {new Date().getFullYear()} <span className="text-white font-semibold">Qatar Domains</span>. {t.rightsReserved}
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{isAr ? 'إجراءات نقل موثوقة ومنسقة بعد الاتفاق وإتمام الصفقة' : 'Secure transfer process coordinated upon agreed transaction'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

