
import React from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const LanguageToggle: React.FC<Props> = ({ lang, setLang }) => {
  return (
    <div className="flex items-center rounded-full glass overflow-hidden relative flex-shrink-0" dir="ltr" role="radiogroup" aria-label="Language selector">
      {/* Sliding indicator */}
      <div
        className="absolute top-0.5 bottom-0.5 w-1/2 rounded-full transition-all duration-300 ease-out"
        style={{
          left: lang === 'en' ? '2px' : 'calc(50% - 2px)',
          background: 'linear-gradient(135deg, rgba(255, 157, 0, 0.2), rgba(212, 175, 55, 0.15))',
          border: '1px solid rgba(255, 157, 0, 0.25)',
        }}
      />
      <button
        onClick={() => setLang('en')}
        className={`relative z-10 px-3 py-1.5 text-xs font-medium transition-colors duration-200 cursor-pointer rounded-full min-w-[60px] text-center ${lang === 'en' ? 'text-[#FF9D00]' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        role="radio"
        aria-checked={lang === 'en'}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`relative z-10 px-3 py-1.5 text-xs font-medium transition-colors duration-200 cursor-pointer rounded-full min-w-[60px] text-center ${lang === 'ar' ? 'text-[#FF9D00]' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        role="radio"
        aria-checked={lang === 'ar'}
        aria-label="التبديل إلى العربية"
      >
        عربي
      </button>
    </div>
  );
};
