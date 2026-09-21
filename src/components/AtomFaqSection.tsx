import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Lock,
  CreditCard,
  Zap,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../types';

interface AtomFaqSectionProps {
  language: Language;
}

interface FaqItem {
  id: string;
  icon: React.ElementType;
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'how-to-buy',
    icon: Lock,
    question: {
      ar: 'كيف يمكنني شراء النطاق؟',
      en: 'How can I purchase a domain?',
    },
    answer: {
      ar: 'بكل بساطة، اضغط على زر "تواصل للشراء" في بطاقة أي نطاق، وسيفتح لك نافذة إرسال بريد إلكتروني مباشر إلى إدارة الموقع sales@qatar-domains.tech لتقديم عرضك وبدء إجراءات النقل والاتفاق المباشر.',
      en: 'Simply click the "Contact to Buy" button on any domain card to open a direct email to our management at sales@qatar-domains.tech to submit your offer and start the direct transfer and agreement process.',
    },
  },
  {
    id: 'escrow-protection',
    icon: ShieldCheck,
    question: {
      ar: 'كيف يضمن نظام الضمان المالي (Escrow) حماية أموالي بنسبة 100%؟',
      en: 'How does the Escrow system guarantee 100% buyer protection?',
    },
    answer: {
      ar: 'عند الاتفاق على السعر، نستخدم خدمات وساطة مالية معتمدة وعالمية مثل (Escrow.com). يقوم المشتري بإيداع الثمن في حساب الوسيط الآمن، ولا يتم تحرير الأموال للبائع إلا بعد إتمام نقل ملكية النطاق بالكامل إلى حساب المشتري وتأكيده لاستلامه.',
      en: 'Once the price is agreed upon, we use accredited global escrow services such as Escrow.com. The buyer deposits funds into the secure escrow account, and funds are only released to the seller after the domain ownership is fully transferred to the buyer\'s account and confirmed received.',
    },
  },
  {
    id: 'payment-methods',
    icon: CreditCard,
    question: {
      ar: 'ما هي طرق الدفع المعتمدة؟',
      en: 'What are the approved payment methods?',
    },
    answer: {
      ar: 'نقبل الدفع عبر بوابات الضمان المالي المعتمدة (Escrow)، والتحويلات البنكية المباشرة، بالإضافة إلى وسائل الدفع الرقمية المتاحة عند الاتفاق عبر البريد الإلكتروني.',
      en: 'We accept payment via accredited Escrow services, direct bank wire transfers, and digital payment options agreed upon via email.',
    },
  },
  {
    id: 'transfer-timeline',
    icon: Zap,
    question: {
      ar: 'كم تستغرق عملية نقل ملكية النطاق إلى حسابي؟',
      en: 'How long does domain ownership transfer take?',
    },
    answer: {
      ar: 'تستغرق العملية عادةً من 24 إلى 48 ساعة عمل بمجرد تأكيد إيداع الأموال في نظام الوساطة (Escrow) وإرسال كود النقل (Auth Code) الخاص بالنطاق.',
      en: 'The process typically takes 24 to 48 business hours once funds deposit is confirmed in the Escrow system and the domain Auth Code is dispatched.',
    },
  },
];

export const AtomFaqSection: React.FC<AtomFaqSectionProps> = ({ language }) => {
  const isAr = language === 'ar';
  // Open the first item by default
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'how-to-buy': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="atom-faq-section"
      className="mt-14 rounded-3xl border border-slate-200 bg-gradient-to-b from-white via-slate-50/50 to-white p-6 sm:p-8 md:p-10 shadow-xs"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#8A1538]/10 px-3.5 py-1 text-xs font-bold text-[#8A1538]">
            <HelpCircle className="h-3.5 w-3.5 text-[#8A1538]" />
            <span>{isAr ? 'الأسئلة الشائعة حول الشراء' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            {isAr ? (
              <>كيف تضمن عملية شراء آمنة وسريعة؟</>
            ) : (
              <>How to Ensure a Safe & Fast Purchase Process?</>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto">
            {isAr
              ? 'إجابات مختصرة وشاملة توضح آلية الشراء المعتمدة، حماية أموالك بنظام الضمان، وخطوات نقل ملكية النطاق.'
              : 'Clear answers on how your transaction is secured with escrow protection and how transfer of ownership is handled.'}
          </p>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openItems[item.id];
            const Icon = item.icon;
            const q = isAr ? item.question.ar : item.question.en;
            const a = isAr ? item.answer.ar : item.answer.en;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-200 shadow-xs hover:border-slate-300"
              >
                <button
                  id={`faq-btn-${item.id}`}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-start font-bold text-slate-900 transition-all cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#8A1538]/10 text-[#8A1538]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {q}
                    </span>
                  </div>

                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#8A1538]/10 text-[#8A1538]' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p className="ps-11">{a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Small reassurance banner below FAQ */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 sm:p-4 text-xs font-semibold text-emerald-950">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              {isAr
                ? 'جميع الصفقات تتم وفق أعلى المعايير الدولية لحماية المشتري ونقل الملكية الموثق عبر نظام الوساطة (Escrow).'
                : 'All transactions adhere to strict international buyer protection and verified escrow transfer.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
