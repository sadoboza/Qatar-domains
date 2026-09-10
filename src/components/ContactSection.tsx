import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, Tag, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../data/translations';
import { BROKERAGE_CONFIG, PORTFOLIO_DOMAINS } from '../data/domains';

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
  const [customDomain, setCustomDomain] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    domain: string;
    waUrl: string;
    mailUrl: string;
  } | null>(null);

  // Synchronize when initialDomainName prop updates
  useEffect(() => {
    if (initialDomainName) {
      setSelectedDomain(initialDomainName);
    }
  }, [initialDomainName]);

  const qaDomains = PORTFOLIO_DOMAINS.filter((d) => d.tld === '.qa');
  const globalDomains = PORTFOLIO_DOMAINS.filter((d) => d.tld !== '.qa');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetDomainName =
      selectedDomain === 'other'
        ? customDomain.trim() || (isAr ? 'نطاق آخر / استفسار عام' : 'Other Domain / General Inquiry')
        : selectedDomain.trim() || (isAr ? 'استفسار عام' : 'General Inquiry');

    // Pre-build WhatsApp direct confirmation URL with appropriate language
    const waText = encodeURIComponent(
      isAr
        ? `السلام عليكم ورحمة الله،\n` +
          `أود تقديم عرض شراء رسمي للنطاق:\n` +
          `🌐 النطاق: ${targetDomainName}\n` +
          `👤 الاسم: ${fullName}\n` +
          `📧 البريد الإلكتروني: ${email}\n` +
          `📱 الهاتف / واتساب: ${phone}\n` +
          `💰 قيمة العرض المقترح: ${offerAmount}\n` +
          (message ? `📝 ملاحظات إضافية: ${message}\n` : '') +
          `\nمرسل عبر منصة Qatar Domains`
        : `Hello,\n` +
          `I would like to submit a formal acquisition offer for the domain:\n` +
          `🌐 Domain: ${targetDomainName}\n` +
          `👤 Name: ${fullName}\n` +
          `📧 Email: ${email}\n` +
          `📱 Phone / WhatsApp: ${phone}\n` +
          `💰 Proposed Offer: ${offerAmount}\n` +
          (message ? `📝 Additional Notes: ${message}\n` : '') +
          `\nSent via Qatar Domains platform (https://qatar-domains.tech)`
    );
    const waUrl = `https://wa.me/${BROKERAGE_CONFIG.whatsappNumber}?text=${waText}`;

    // Pre-build Mailto direct link with appropriate language
    const mailSub = encodeURIComponent(
      isAr
        ? `عرض شراء رسمي لنطاق: ${targetDomainName} - ${fullName}`
        : `Formal Acquisition Offer for Domain: ${targetDomainName} - ${fullName}`
    );
    const mailBody = encodeURIComponent(
      isAr
        ? `بيانات العرض الرسمي المقدم:\n` +
          `========================\n` +
          `النطاق المطلوب: ${targetDomainName}\n` +
          `اسم المشتري / مقدم العرض: ${fullName}\n` +
          `البريد الإلكتروني: ${email}\n` +
          `رقم الهاتف / واتساب: ${phone}\n` +
          `قيمة العرض المقترح: ${offerAmount}\n` +
          `الملاحظات والرسالة: ${message || 'لا توجد'}\n\n` +
          `مرسل عبر منصة: https://qatar-domains.tech`
        : `Official Offer Details:\n` +
          `========================\n` +
          `Target Domain: ${targetDomainName}\n` +
          `Buyer / Offeror: ${fullName}\n` +
          `Email Address: ${email}\n` +
          `Phone / WhatsApp: ${phone}\n` +
          `Proposed Offer: ${offerAmount}\n` +
          `Notes / Comments: ${message || 'None'}\n\n` +
          `Sent via: https://qatar-domains.tech`
    );
    const mailUrl = `mailto:${BROKERAGE_CONFIG.email}?cc=sadoox911@gmail.com&subject=${mailSub}&body=${mailBody}`;

    setSubmittedData({
      domain: targetDomainName,
      waUrl,
      mailUrl,
    });

    try {
      // Send real email via FormSubmit API to sales@qatar-domains.tech with CC to sadoox911@gmail.com
      await fetch('https://formsubmit.co/ajax/sales@qatar-domains.tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: isAr
            ? `عرض شراء جديد لنطاق [${targetDomainName}] من ${fullName}`
            : `New Acquisition Offer for [${targetDomainName}] from ${fullName}`,
          _cc: 'sadoox911@gmail.com',
          _template: 'table',
          _captcha: 'false',
          'Target Domain / النطاق المطلوب': targetDomainName,
          'Buyer Name / اسم المشتري': fullName,
          'Email / البريد الإلكتروني': email,
          'Phone / رقم الهاتف': phone,
          'Proposed Offer / قيمة العرض': offerAmount,
          'Notes / الملاحظات': message || (isAr ? 'لا توجد ملاحظات إضافية' : 'No additional notes'),
          'Submission Date / تاريخ الإرسال': new Date().toLocaleString(isAr ? 'ar-QA' : 'en-US'),
        }),
      });
    } catch (err) {
      console.warn('FormSubmit network dispatch:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setOfferAmount('');
    setMessage('');
    setCustomDomain('');
    setSubmittedData(null);
  };

  return (
    <section
      id="contact-section"
      className="relative rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 md:p-12 shadow-xs"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Direct Action Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8A1538]/10 px-3 py-1 text-xs font-semibold text-[#8A1538]">
              <Tag className="h-3 w-3 text-[#8A1538]" />
              <span>{t.contactSectionBadge}</span>
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {t.contactSectionTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {t.contactSectionSubtitle}
            </p>
          </div>

          {/* Direct Action Cards */}
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
                  {t.whatsAppCardTitle}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {t.whatsAppCardSubtitle}
                </span>
              </div>
            </a>

            {/* Email Link Card */}
            <a
              id="contact-email-link"
              href={`mailto:${BROKERAGE_CONFIG.email}?cc=sadoox911@gmail.com`}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all hover:bg-slate-100 hover:border-slate-300 group"
              aria-label="Email"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8A1538] text-white shadow-2xs group-hover:scale-105 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A1538] block">
                  {t.emailCardTitle}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {t.emailCardSubtitle}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Offer Form */}
        <div className="lg:col-span-7">
          {isSuccess ? (
            <div
              className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 space-y-5 text-slate-800"
              id="contact-form-success-banner"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-emerald-950">
                    {t.successTitle}
                  </h3>
                  <p className="mt-1 text-sm text-emerald-800 font-medium leading-relaxed">
                    {isAr
                      ? `تم توجيه بيانات عرضك بخصوص النطاق (${submittedData?.domain || ''}) إلى إدارة المبيعات عبر البريد الإلكتروني (sales@qatar-domains.tech).`
                      : `Your offer details for (${submittedData?.domain || ''}) have been forwarded to sales@qatar-domains.tech.`}
                  </p>
                </div>
              </div>

              {/* Instant WhatsApp & Email Action Shortcuts */}
              <div className="rounded-xl border border-emerald-200/80 bg-white p-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {t.instantConfirmTitle}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {submittedData?.waUrl && (
                    <a
                      href={submittedData.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-2xs"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{t.confirmViaWhatsApp}</span>
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    </a>
                  )}

                  {submittedData?.mailUrl && (
                    <a
                      href={submittedData.mailUrl}
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-[#8A1538]" />
                      <span>{t.openInEmail}</span>
                    </a>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {t.submitAnotherOffer}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 space-y-4"
              id="offer-form"
            >
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
                    {t.targetDomainLabel} *
                  </label>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    dir="ltr"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-[#8A1538] focus:outline-none focus:ring-2 focus:ring-[#8A1538]/20 text-left"
                  >
                    <option value="">
                      {t.selectDomainOption}
                    </option>

                    {/* Section 1: Qatar National Domains (.qa) */}
                    <optgroup label={t.groupQaDomains}>
                      {qaDomains.map((dom) => (
                        <option key={dom.id} value={dom.name}>
                          {dom.name} {isAr && dom.typeAr ? `(${dom.typeAr})` : !isAr && dom.type ? `(${dom.type})` : ''}
                        </option>
                      ))}
                    </optgroup>

                    {/* Section 2: Global & Tech Domains (.com, .ai, .energy, .company) */}
                    <optgroup label={t.groupGlobalDomains}>
                      {globalDomains.map((dom) => (
                        <option key={dom.id} value={dom.name}>
                          {dom.name}
                        </option>
                      ))}
                    </optgroup>

                    {/* Section 3: Custom / General Inquiry */}
                    <option value="other">
                      {t.otherDomainOption}
                    </option>
                  </select>
                </div>
              </div>

              {/* Custom Domain Input if 'other' is selected */}
              {selectedDomain === 'other' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t.customDomainLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder={t.customDomainPlaceholder}
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-[#8A1538] focus:outline-none focus:ring-2 focus:ring-[#8A1538]/20 text-left"
                  />
                </div>
              )}

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
                  {isSubmitting ? t.submitSending : t.submitInquiry}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

