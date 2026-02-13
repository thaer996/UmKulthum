
import React from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const LanguageToggle: React.FC<Props> = ({ lang, setLang }) => {
  return (
    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1 rounded-full">
      <button
        onClick={() => setLang('en')}
        className={`px-4 py-1.5 rounded-full transition-all text-sm font-medium ${
          lang === 'en' ? 'bg-[#FF9D00] text-black shadow-lg' : 'text-white hover:bg-neutral-800'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`px-4 py-1.5 rounded-full transition-all text-sm font-arabic ${
          lang === 'ar' ? 'bg-[#FF9D00] text-black shadow-lg' : 'text-white hover:bg-neutral-800'
        }`}
      >
        عربي
      </button>
    </div>
  );
};
