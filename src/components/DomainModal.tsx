import React from 'react';
import {
  X,
  MessageSquare,
  Mail,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import { DomainItem, Language } from '../types';
import { getT } from '../data/translations';
import { BROKERAGE_CONFIG } from '../data/domains';

interface DomainModalProps {
  domain: DomainItem | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DomainModal: React.FC<DomainModalProps> = ({
  domain,
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen || !domain) return null;

  const t = getT(language);
  const isAr = language === 'ar';
  const subtext = isAr ? domain.subtext.ar : domain.subtext.en;
  const domainType = isAr ? domain.typeAr : domain.type;
  const imageAlt = domain.imageAlt ? (isAr ? domain.imageAlt.ar : domain.imageAlt.en) : domain.name;

  // Domain Atom.com landing page URL
  const atomUrl =
    domain.atomUrl || `https://domains.atom.com/lpd/name/${domain.name.toLowerCase()}`;

  // WhatsApp link
  const waMessage = encodeURIComponent(
    isAr
      ? `السلام عليكم، أود الاستفسار بخصوص شراء النطاق المعروض: ${domain.name}`
      : `Hello, I would like to inquire about purchasing the domain: ${domain.name}`
  );
  const waUrl = `https://wa.me/${BROKERAGE_CONFIG.whatsappNumber}?text=${waMessage}`;

  // Email mailto link
  const mailSubject = encodeURIComponent(
    isAr ? `استفسار شراء النطاق: ${domain.name}` : `Inquiry for domain: ${domain.name}`
  );
  const mailBody = encodeURIComponent(
    isAr
      ? `السلام عليكم،\n\nأود الاستفسار بخصوص شراء النطاق: ${domain.name}\n\nمع الشكر،`
      : `Hello,\n\nI would like to inquire about acquiring the domain: ${domain.name}\n\nRegards,`
  );
  const mailtoUrl = `mailto:${BROKERAGE_CONFIG.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      id="domain-offer-modal"
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl text-slate-900 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Top Header Image in Bright Daylight */}
        {domain.imageUrl && (
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100">
            <img
              src={domain.imageUrl}
              alt={imageAlt}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-3 start-4">
              <span className="rounded-md bg-[#560018] px-2.5 py-1 text-xs font-bold text-white shadow-xs">
                {domainType}
              </span>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          id="modal-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-3 end-3 z-10 rounded-full border border-white/30 bg-black/40 p-2 text-white hover:bg-black/60 transition-colors cursor-pointer"
          aria-label={t.closeModal}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Modal Header Title */}
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-0.5 text-xs font-semibold">
                {isAr ? 'متاح للبيع الفوري' : 'Available for Acquisition'}
              </span>
              <span className="rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 text-xs font-medium font-mono">
                {domain.tld}
              </span>
            </div>

            {/* Domain name with strict LTR */}
            <div className="mt-2.5">
              <div dir="ltr" className="inline-flex items-baseline gap-0.5 text-left">
                <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                  {domain.name.split('.')[0]}
                </h2>
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#8A1538]">
                  .{domain.name.split('.').slice(1).join('.')}
                </span>
              </div>
            </div>

            <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              {subtext}
            </p>
          </div>

          {/* Primary Action: Buy on Atom.com (No Form) */}
          <div className="rounded-2xl border-2 border-[#8A1538]/20 bg-gradient-to-b from-[#8A1538]/5 to-slate-50 p-5 text-center space-y-3.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#8A1538]/10 px-3 py-1 text-xs font-bold text-[#8A1538]">
              <Sparkles className="h-3.5 w-3.5 text-[#8A1538]" />
              <span>{isAr ? 'منصة Atom.com الرسمية' : 'Official Atom.com Marketplace'}</span>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                {isAr ? 'إتمام الشراء ونقل الملكية المباشر' : 'Instant Acquisition & Escrow Transfer'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                {isAr
                  ? 'عند النقر على الزر أدناه سيتم توجيهك مباشرة إلى صفحة هبوط النطاق في منصة Atom.com للشراء الآمن مع حماية المشتري الكاملة.'
                  : 'Click the button below to be redirected to the official Atom.com landing page for this domain with full buyer protection and escrow.'}
              </p>
            </div>

            {/* Main Buy Button pointing to Atom landing page */}
            <a
              id="modal-atom-buy-button"
              href={atomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#8A1538] via-[#70102d] to-[#560018] px-6 py-3.5 text-base sm:text-lg font-bold text-white shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5 shrink-0" />
              <span>{isAr ? 'الشراء عبر منصة Atom.com' : 'Buy via Atom.com'}</span>
              <ExternalLink className="h-4 w-4 shrink-0 opacity-85" />
            </a>

            {/* Trust and safety points */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 font-medium pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{isAr ? 'حماية المشتري 100%' : '100% Buyer Protection'}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                <span>{isAr ? 'إسكرو رسمي معتمد' : 'Accredited Escrow'}</span>
              </span>
            </div>
          </div>

          {/* Domain Highlights */}
          {domain.highlights && (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                {t.assetOverview}
              </h4>
              <ul className="space-y-2">
                {(isAr ? domain.highlights.ar : domain.highlights.en).map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8A1538]" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Secondary Inquiries (WhatsApp & Email) */}
          <div>
            <p className="text-xs font-bold text-slate-500 mb-2">
              {isAr ? 'أو تواصل مباشرة مع وسيط المحفظة:' : 'Or inquire directly with the broker:'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                id="modal-cta-whatsapp"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 p-2.5 sm:p-3 text-xs sm:text-sm font-bold text-emerald-900 hover:bg-emerald-100 transition-all"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{isAr ? 'تواصل عبر واتساب' : 'Chat via WhatsApp'}</span>
              </a>

              <a
                id="modal-cta-email"
                href={mailtoUrl}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 sm:p-3 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-100 transition-all"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-[#8A1538] shrink-0" />
                <span>{isAr ? 'تواصل عبر الإيميل' : 'Contact via Email'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
