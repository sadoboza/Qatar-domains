import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../data/translations';
import { BROKERAGE_CONFIG } from '../data/domains';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = getT(language);
  const isAr = language === 'ar';

  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600 py-10 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="inline-block text-start">
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-slate-900 block">
                {isAr ? (
                  <>
                    منصة النطاقات <span className="text-[#560018]">القطرية والعالمية والمتميزة</span>
                  </>
                ) : (
                  <>
                    Qatar & Global <span className="text-[#560018]">Premium Domains Platform</span>
                  </>
                )}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              {isAr ? (
                <>
                  <span>نطاقات قطرية </span>
                  <span dir="ltr" className="inline-block font-mono font-bold text-slate-700">.qa</span>
                  <span> مميزة معروضة للبيع وتقديم العروض.</span>
                </>
              ) : (
                'Premium Qatar (.qa) domain assets available for acquisition and offers.'
              )}
            </p>
          </div>

          {/* Contact Details (Icons & Clean Labels Only, No Raw Phone Digits) */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            {/* WhatsApp */}
            <a
              id="footer-whatsapp-btn"
              href={`https://wa.me/${BROKERAGE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
            </a>

            {/* Email */}
            <a
              id="footer-email-btn"
              href={`mailto:${BROKERAGE_CONFIG.email}`}
              className="flex items-center gap-2 text-[#8A1538] hover:text-[#70102d] bg-[#8A1538]/5 px-4 py-2 rounded-xl border border-[#8A1538]/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-[#8A1538]" />
              <span>{isAr ? 'إيميل' : 'Email'}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p dir="ltr" className="font-sans">
            © {new Date().getFullYear()} qatar-domains.tech - {t.rightsReserved}
          </p>
          <p>{isAr ? 'نقل ملكية رسمي وسريع عبر المسجل المعتمد' : 'Official Registrar Transfer Protocol'}</p>
        </div>
      </div>
    </footer>
  );
};
