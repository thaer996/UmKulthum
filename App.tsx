
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from './constants';
import { Language } from './types';
import { LanguageToggle } from './components/LanguageToggle';
import { MusicOrbit } from './components/MusicOrbit';
import { AIChat } from './components/AIChat';
import { ImageCarousel } from './components/ImageCarousel';
import { BackgroundMusic } from './components/BackgroundMusic';
import { ArrowDown, Music, Disc, Star, Share2 } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [scrolled, setScrolled] = useState(false);
  const content = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#FF9D00] selection:text-black ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Background Music Controller */}
      <BackgroundMusic />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-neutral-800 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#FF9D00] flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Disc className="text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase hidden sm:block">Kalthoumiat</span>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
                <a href="#about" className="hover:text-white transition-colors">{lang === 'ar' ? 'عنها' : 'About'}</a>
                <a href="#chat" className="hover:text-white transition-colors">{lang === 'ar' ? 'الحوار' : 'Dialogue'}</a>
                <a href="#legacy" className="hover:text-white transition-colors">{lang === 'ar' ? 'الإرث' : 'Legacy'}</a>
             </div>
             <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[#FF9D00]/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        
        <div className="text-center space-y-6 max-w-4xl z-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#FF9D00]/30 bg-[#FF9D00]/5 text-[#FF9D00] text-xs font-bold uppercase tracking-widest mb-4">
            <Star size={12} fill="currentColor" />
            {content.heroTag}
          </div>
          
          <h1 className={`text-6xl md:text-8xl font-black leading-tight tracking-tighter glow-text ${lang === 'en' ? 'font-serif italic' : ''}`}>
            {content.title}
          </h1>
          
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            {content.subtitle}
          </p>

          <div className="pt-10">
            <MusicOrbit />
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
          <ArrowDown size={32} />
        </div>
      </section>

      {/* Bio Section */}
      <section id="about" className="py-32 px-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative group order-2 md:order-1">
            <div className="absolute -inset-4 bg-[#FF9D00]/10 rounded-3xl blur-2xl group-hover:bg-[#FF9D00]/20 transition-all duration-700 -z-10"></div>
            <ImageCarousel />
            <div className="absolute -bottom-6 -right-6 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hidden lg:block glow-border z-30">
              <div className="flex items-center gap-4">
                 <Music className="text-[#FF9D00]" size={40} />
                 <div>
                    <div className="text-xl font-bold">1904 — 1975</div>
                    <div className="text-xs text-neutral-500 tracking-widest uppercase">{lang === 'ar' ? 'الحقبة الخالدة' : 'The Eternal Era'}</div>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 order-1 md:order-2">
            <h2 className={`text-4xl md:text-5xl font-bold text-white ${lang === 'en' ? 'font-serif italic' : ''}`}>
              {content.bioTitle}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-[#FF9D00]">
              {content.bioContent}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                 <div className="text-[#FF9D00] font-bold text-2xl">300+</div>
                 <div className="text-neutral-500 text-xs uppercase tracking-wider">{lang === 'ar' ? 'أغنية مسجلة' : 'Recorded Songs'}</div>
              </div>
              <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                 <div className="text-[#FF9D00] font-bold text-2xl">50+</div>
                 <div className="text-neutral-500 text-xs uppercase tracking-wider">{lang === 'ar' ? 'عقود من الإبداع' : 'Years of Art'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="chat" className="py-32 bg-black/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AIChat lang={lang} content={content} />
        </div>
      </section>

      {/* Legacy Section */}
      <section id="legacy" className="py-32 px-6 text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex justify-center mb-4">
            <Disc className="text-[#FF9D00] animate-spin-slow" size={64} />
          </div>
          <h2 className={`text-5xl md:text-7xl font-black ${lang === 'en' ? 'font-serif italic' : ''}`}>
            {content.legacyTitle}
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            {content.legacyDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-10">
            {['Alf Leila wa Leila', 'Enta Omri', 'Baeed Anak', 'Al-Atlal'].map(song => (
              <span key={song} className="px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full text-sm hover:border-[#FF9D00] hover:text-[#FF9D00] transition-all cursor-pointer">
                {song}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-neutral-900 bg-black px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-8 h-8 rounded-full bg-[#FF9D00] flex items-center justify-center">
                <Disc className="text-black" size={16} />
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase">Kalthoumiat</span>
            </div>
            <p className="text-neutral-600 text-sm max-w-xs">
              Honoring the golden age of Arab culture through digital innovation.
            </p>
          </div>
          
          <div className="flex gap-6">
            <button className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-[#FF9D00] hover:text-black transition-all">
              <Share2 size={20} />
            </button>
            <button className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-[#FF9D00] hover:text-black transition-all">
              <Music size={20} />
            </button>
          </div>
          
          <div className="text-neutral-500 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} The Cosmic Tribute — Egypt
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
