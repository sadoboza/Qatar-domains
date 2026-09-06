import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, Tag } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../data/translations';
import { BROKERAGE_CONFIG } from '../data/domains';

interface ContactSectionProps {
  language: Language;
  initialDomainName?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  initialDomainName = '',
}) => {
  const t = getT(language);
  const isAr = language === 'ar';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(initialDomainName);
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFullName('');
        setEmail('');
        setPhone('');
        setOfferAmount('');
        setMessage('');
      }, 5000);
    }, 1000);
  };

  return (
    <section
      id="contact-section"
      className="relative rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 md:p-12 shadow-xs"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: WhatsApp & Email Action Cards (Icons & Labels only, No Phone Numbers) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8A1538]/10 px-3 py-1 text-xs font-semibold text-[#8A1538]">
              <Tag className="h-3 w-3 text-[#8A1538]" />
              <span>{isAr ? 'تقديم عرض مباشر' : 'Direct Offer'}</span>
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {t.contactSectionTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {t.contactSectionSubtitle}
            </p>
          </div>

          {/* Direct Action Cards with WhatsApp & Email Icons Only (No Phone Numbers printed) */}
          <div className="space-y-3">
            {/* WhatsApp Link Card */}
            <a
              id="contact-whatsapp-link"
              href={`https://wa.me/${BROKERAGE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 transition-all hover:bg-emerald-100 hover:border-emerald-300 group"
              aria-label="WhatsApp"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-2xs group-hover:scale-105 transition-transform">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  {isAr ? 'تواصل عبر واتساب' : 'WhatsApp'}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {isAr ? 'محادثة فورية لتقديم العرض' : 'Instant Chat to Present Offer'}
                </span>
              </div>
            </a>

            {/* Email Link Card */}
            <a
              id="contact-email-link"
              href={`mailto:${BROKERAGE_CONFIG.email}`}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all hover:bg-slate-100 hover:border-slate-300 group"
              aria-label="Email"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8A1538] text-white shadow-2xs group-hover:scale-105 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A1538] block">
                  {isAr ? 'البريد الإلكتروني' : 'Official Email'}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {isAr ? 'إرسال استفسار أو عرض رسمي' : 'Send Formal Inquiry or Offer'}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Offer Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 space-y-4"
            id="offer-form"
          >
            {isSuccess && (
              <div
                className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"
                id="contact-form-success-banner"
              >
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">{t.inquirySuccess}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#8A1538] focus:outline-none focus:ring-2 focus:ring-[#8A1538]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {t.emailAddress} *
                </label>
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#8A1538] focus:outline-none focus:ring-2 focus:ring-[#8A1538]/20 text-left"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {t.phoneLabel} *
                </label>
                {/* Phone Input with strict LTR so numbers and plus signs never reverse */}
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+968 ... / +974 ..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#8A1538] focus:outline-none focus:ring-2 focus:ring-[#8A1538]/20 text-left font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {isAr ? 'النطاق المراد تقديم عرض عليه' : 'Target Domain'}
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  dir="ltr"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-[#8A1538] focus:outline-none focus:ring-2 focus:ring-[#8A1538]/20 text-left"
                >
                  <option value="">{isAr ? '-- Select Domain / اختر النطاق --' : '-- Select Domain --'}</option>
                  <option value="H2.qa">H2.qa</option>
                  <option value="qev.qa">qev.qa</option>
                  <option value="evc.qa">evc.qa</option>
                  <option value="evai.qa">evai.qa</option>
                  <option value="cure.qa">cure.qa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                {t.offerAmount} *
              </label>
              <input
                type="text"
                required
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder={t.offerPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#8A1538] focus:outline-none focus:ring-2 focus:ring-[#8A1538]/20 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                {t.messageLabel}
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#8A1538] focus:outline-none focus:ring-2 focus:ring-[#8A1538]/20"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8A1538] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#70102d] disabled:opacity-50 shadow-sm cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>
                {isSubmitting
                  ? (isAr ? 'جارٍ إرسال العرض...' : 'Sending Offer...')
                  : (isAr ? 'إرسال العرض' : 'Submit Offer')}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
