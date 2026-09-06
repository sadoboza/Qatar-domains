import React from 'react';
import { MessageSquare, Mail, ShoppingCart, ExternalLink, Info } from 'lucide-react';
import { DomainItem, Language } from '../types';
import { BROKERAGE_CONFIG } from '../data/domains';

interface DomainCardProps {
  domain: DomainItem;
  language: Language;
  onMakeOffer: (domain: DomainItem) => void;
}

export const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  language,
  onMakeOffer,
}) => {
  const isAr = language === 'ar';
  const subtext = isAr ? domain.subtext.ar : domain.subtext.en;
  const domainType = isAr ? domain.typeAr : domain.type;
  const imageAlt = domain.imageAlt ? (isAr ? domain.imageAlt.ar : domain.imageAlt.en) : domain.name;

  // Atom.com landing page URL for this domain
  const atomUrl =
    domain.atomUrl || `https://domains.atom.com/lpd/name/${domain.name.toLowerCase()}`;

  // WhatsApp prefilled message
  const waMessage = encodeURIComponent(
    isAr
      ? `السلام عليكم، أود الاستفسار بخصوص شراء النطاق: ${domain.name}`
      : `Hello, I would like to inquire about purchasing the domain: ${domain.name}`
  );
  const waUrl = `https://wa.me/${BROKERAGE_CONFIG.whatsappNumber}?text=${waMessage}`;

  // Email mailto URL
  const mailSubject = encodeURIComponent(
    isAr ? `استفسار شراء النطاق: ${domain.name}` : `Inquiry for domain: ${domain.name}`
  );
  const mailBody = encodeURIComponent(
    isAr
      ? `السلام عليكم،\n\nأود الاستفسار بخصوص شراء النطاق: ${domain.name}\n\nمع الشكر،`
      : `Hello,\n\nI would like to inquire about acquiring: ${domain.name}\n\nRegards,`
  );
  const mailtoUrl = `mailto:${BROKERAGE_CONFIG.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div
      id={`domain-card-${domain.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8A1538]/50 hover:shadow-xl shadow-xs"
    >
      {/* Visual Header / Background Image specific to domain concept in bright daylight */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100">
        {domain.imageUrl ? (
          <img
            src={domain.imageUrl}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}

        {/* Crisp daylight view: subtle bottom gradient for text legibility without darkening the image */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

        {/* Top Badges over image */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-800 border border-slate-200/80 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isAr ? 'متاح للبيع' : 'For Sale'}</span>
          </span>

          <span className="rounded-lg bg-[#560018] px-2.5 py-1 text-xs font-bold text-white shadow-xs">
            {domainType}
          </span>
        </div>

        {/* Domain Name over the lower part of the image for high visual impact */}
        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between">
          <div dir="ltr" className="inline-flex items-baseline gap-0.5 text-left select-all">
            <h3 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              {domain.name.split('.')[0]}
            </h3>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#f39c12] drop-shadow-md">
              .{domain.name.split('.')[1]}
            </span>
          </div>

          <span className="text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 hidden sm:block">
            {imageAlt}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Subtext description */}
          <p className="text-sm leading-relaxed text-slate-600 font-medium line-clamp-2">
            {subtext}
          </p>

          {/* Quick highlights bullets */}
          <ul className="mt-3 space-y-1 text-xs text-slate-500 font-medium">
            {(isAr ? domain.highlights.ar : domain.highlights.en).slice(0, 2).map((hl, idx) => (
              <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8A1538]" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Actions: Buy via Atom.com + Details & Quick Contact */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
          {/* Primary Action: Direct Buy via Atom.com */}
          <a
            id={`card-atom-btn-${domain.id}`}
            href={atomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8A1538] via-[#70102d] to-[#560018] px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer"
            title={isAr ? 'الانتقال لصفحة الهبوط الرسمية في Atom.com للشراء' : 'Go to official Atom.com landing page'}
          >
            <ShoppingCart className="h-4 w-4 shrink-0" />
            <span>{isAr ? 'الشراء عبر منصة Atom.com' : 'Buy via Atom.com'}</span>
            <ExternalLink className="h-4 w-4 opacity-85 shrink-0" />
          </a>

          {/* Quick Actions: Details Modal + WhatsApp & Email */}
          <div className="grid grid-cols-3 gap-1.5">
            {/* View Details Button */}
            <button
              id={`card-details-btn-${domain.id}`}
              type="button"
              onClick={() => onMakeOffer(domain)}
              className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2 px-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 cursor-pointer"
              title={isAr ? 'عرض مميزات النطاق' : 'View Highlights'}
            >
              <Info className="h-3.5 w-3.5 text-slate-500 shrink-0" />
              <span>{isAr ? 'التفاصيل' : 'Details'}</span>
            </button>

            {/* WhatsApp Button */}
            <a
              id={`card-whatsapp-${domain.id}`}
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50/70 py-2 px-2 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-100 hover:border-emerald-300"
              title={isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
              aria-label="WhatsApp"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
            </a>

            {/* Email Button */}
            <a
              id={`card-email-${domain.id}`}
              href={mailtoUrl}
              className="flex items-center justify-center gap-1 rounded-xl border border-blue-200 bg-blue-50/70 py-2 px-2 text-xs font-bold text-blue-900 transition-all hover:bg-blue-100 hover:border-blue-300"
              title={isAr ? 'تواصل عبر البريد الإلكتروني' : 'Contact via Email'}
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span>{isAr ? 'إيميل' : 'Email'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
