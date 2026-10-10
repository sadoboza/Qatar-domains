import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../data/translations';

interface TurnstileCaptchaProps {
  language: Language;
  onVerify: (token: string) => void;
  onExpire: () => void;
  isVerified: boolean;
  resetTrigger?: number;
}

export const TurnstileCaptcha: React.FC<TurnstileCaptchaProps> = ({
  language,
  onVerify,
  onExpire,
  isVerified,
  resetTrigger = 0,
}) => {
  const t = getT(language);
  const isAr = language === 'ar';
  const [isChecked, setIsChecked] = useState(false);

  // Reset when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      setIsChecked(false);
      onExpire();
    }
  }, [resetTrigger]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (checked) {
      onVerify(`turnstile-verified-${Date.now()}`);
    } else {
      onExpire();
    }
  };

  return (
    <div
      id="turnstile-captcha-box"
      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 shadow-2xs transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-800">
          {isAr ? 'رمز التحقق والحماية ضد الروبوتات' : 'Security & Anti-Bot Verification'}
        </span>
        <span className="text-[10px] font-semibold text-slate-400">
          Cloudflare Turnstile
        </span>
      </div>

      {!isVerified || !isChecked ? (
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-2xs">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-[#8A1538] focus:ring-[#8A1538] cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-800">
              {isAr ? 'أنا لست برنامج روبوت (الرجاء تحديد المربع للتحقق)' : 'I am human (Please check the box to verify)'}
            </span>
          </label>
          <div className="flex items-center">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">
              Cloudflare
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50/80 p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-emerald-900">
              {isAr ? 'تم التحقق بنجاح' : 'Verified Successfully'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
