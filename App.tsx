
import React, { useState, useEffect } from 'react';
import { Music, MessageCircle, Globe } from 'lucide-react';
import { ImageCarousel } from './components/ImageCarousel';
import { BackgroundMusic } from './components/BackgroundMusic';
import { MusicOrbit } from './components/MusicOrbit';
import { AIChat } from './components/AIChat';
import { LanguageToggle } from './components/LanguageToggle';
import { ScrollReveal } from './components/ScrollReveal';
import { AnimatedCounter } from './components/AnimatedCounter';
import { TimelineSection } from './components/TimelineSection';
import { TRANSLATIONS, COLORS } from './constants';
import { Language } from './types';
import { CardStream } from './components/CardStream';
import Navbar, { IMenu } from './components/ui/Navbar';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [scrolled, setScrolled] = useState(false);
  const [activeSong, setActiveSong] = useState<string | null>(null);
  const hoveredSongRef = React.useRef<string | null>(null);
  const content = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect iframe clicks via window blur
  useEffect(() => {
    const handleBlur = () => {
      if (hoveredSongRef.current) {
        setActiveSong(hoveredSongRef.current);
      }
      // Re-focus window so future blur events still work
      setTimeout(() => window.focus(), 100);
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  const menus: IMenu[] = [
    { id: 1, title: lang === 'ar' ? 'الرئيسية' : 'Home', url: '#hero' },
    { id: 2, title: lang === 'ar' ? 'عن الأسطورة' : 'Biography', url: '#about' },
    { id: 4, title: lang === 'ar' ? 'المعرض' : 'Visuals', url: '#visuals' },
    { id: 3, title: lang === 'ar' ? 'محطات الحياة' : 'Timeline', url: '#timeline' },
    { id: 5, title: lang === 'ar' ? 'تحدث معها' : 'Chat', url: '#chat' },
    { id: 6, title: lang === 'ar' ? 'الأعمال' : 'Legacy', url: '#legacy' },
  ];

  return (
    <div className={`min-h-screen relative ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* ═══ Floating Navigation ═══ */}
      <nav className={`fixed top-4 left-4 right-4 z-50 floating-nav px-6 py-3 transition-all duration-500 ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo / Brand */}
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}>
                <Music size={16} className="text-black" />
              </div>
              <span className={`text-lg font-bold text-white ${lang === 'en' ? 'font-serif italic' : 'hidden md:block'}`}>
                {content.title}
              </span>
            </a>
          </div>

          {/* New Navbar Component */}
          <div className="flex-1 px-4 flex justify-center">
            <Navbar list={menus} lang={lang} />
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-[10px] text-white/50 tracking-wider ${lang === 'en' ? 'font-light' : 'font-bold'}`}>
              {lang === 'en' ? 'Dev by Thaer' : 'تطوير ثائر'}
            </span>
            <LanguageToggle lang={lang} setLang={setLang} />
            <BackgroundMusic />
          </div>
        </div>
      </nav>

      <main>
        {/* ═══ Hero Section ═══ */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-20">
          {/* Background glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-3xl max-h-3xl bg-[#FF9D00]/5 rounded-full blur-[200px]" />

          <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className={lang === 'ar' ? 'order-2 md:order-1 text-right' : 'order-2 md:order-1'}>
              <ScrollReveal delay={0}>
                <span className="text-[#FF9D00] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                  {lang === 'ar' ? 'كوكب الشرق' : 'Star of the East'}
                </span>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] ${lang === 'en' ? 'font-serif italic' : ''}`}>
                  <span className="gradient-text">{content.subtitle}</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-neutral-400 text-lg md:text-xl max-w-lg leading-relaxed mb-10">
                  {content.heroDescription}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex gap-4 flex-wrap">
                  <a href="#timeline" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-black font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF9D00]/20" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}>
                    {lang === 'ar' ? 'اكتشف رحلتها' : 'Explore Her Journey'}
                  </a>
                  <a href="#chat" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-700 text-white font-semibold cursor-pointer transition-all duration-300 hover:border-[#FF9D00]/50 hover:bg-white/5">
                    <MessageCircle size={16} />
                    {lang === 'ar' ? 'تحدث مع أم كلثوم' : 'Chat with Um Kalthoum'}
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Orbit Visual */}
            <div className="order-1 md:order-2 flex justify-center">
              <ScrollReveal direction="scale" delay={200}>
                <MusicOrbit />
              </ScrollReveal>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 text-xs animate-bounce z-20">
            <span>{lang === 'ar' ? 'اسحب للأسفل' : 'Scroll Down'}</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="opacity-50">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="2" fill="currentColor">
                <animate attributeName="cy" values="8;14;8" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>


        {/* ═══ Bio Section ═══ */}
        <section id="about" className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Carousel */}
            <ScrollReveal direction="left">
              <ImageCarousel />
            </ScrollReveal>

            {/* Bio text */}
            <div>
              <ScrollReveal>
                <span className="text-[#FF9D00] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                  {lang === 'ar' ? 'عن الأسطورة' : 'About The Legend'}
                </span>
                <h2 className={`text-4xl md:text-5xl font-bold text-white mb-8 ${lang === 'en' ? 'font-serif italic' : ''}`}>
                  {content.bioTitle}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-neutral-400 text-lg leading-relaxed mb-10">
                  {content.bioText}
                </p>
              </ScrollReveal>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <ScrollReveal delay={100}>
                  <div className="glass-strong rounded-2xl p-5 text-center group hover:border-[#FF9D00]/20 transition-all duration-300">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      <AnimatedCounter end={300} suffix="+" />
                    </div>
                    <div className="text-neutral-500 text-xs uppercase tracking-wider">
                      {lang === 'ar' ? 'أغنية' : 'Songs'}
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div className="glass-strong rounded-2xl p-5 text-center group hover:border-[#FF9D00]/20 transition-all duration-300">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      <AnimatedCounter end={50} suffix="+" />
                    </div>
                    <div className="text-neutral-500 text-xs uppercase tracking-wider">
                      {lang === 'ar' ? 'عام من الفن' : 'Years'}
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <div className="glass-strong rounded-2xl p-5 text-center group hover:border-[#FF9D00]/20 transition-all duration-300">
                    <div className="text-3xl font-bold gradient-text mb-1">∞</div>
                    <div className="text-neutral-500 text-xs uppercase tracking-wider">
                      {lang === 'ar' ? 'إرث خالد' : 'Legacy'}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Card Stream Section ═══ */}
        <section id="visuals" className="relative z-20">
          <CardStream />
        </section>

        {/* ═══ Timeline Section ═══ */}
        <TimelineSection lang={lang} />

        {/* ═══ AI Chat Section ═══ */}
        <section id="chat" className="py-32 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 gradient-divider" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#FF9D00]/3 rounded-full blur-[180px] -z-10" />

          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-[#FF9D00] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                  {lang === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered Experience'}
                </span>
                <h2 className={`text-4xl md:text-6xl font-bold text-white mb-4 ${lang === 'en' ? 'font-serif italic' : ''}`}>
                  {content.chatTitle}
                </h2>
                <p className="text-neutral-500 max-w-lg mx-auto">
                  {content.chatSubtitle}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <AIChat lang={lang} content={content} />
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ Legacy Section ═══ */}
        <section id="legacy" className="py-32 px-6 relative">
          <div className="absolute top-0 left-0 right-0 gradient-divider" />

          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-[#FF9D00] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                  {lang === 'ar' ? 'الأعمال الخالدة' : 'Timeless Works'}
                </span>
                <h2 className={`text-4xl md:text-6xl font-bold text-white ${lang === 'en' ? 'font-serif italic' : ''}`}>
                  {content.legacyTitle}
                </h2>
              </div>
            </ScrollReveal>

            {/* ─── Featured Song Cards ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {content.featuredSongs.map((song, i) => (
                <ScrollReveal key={song.url} delay={i * 150} direction="scale">
                  <div
                    className={`song-card group ${activeSong === song.url ? 'song-card-active' : ''}`}
                    onClick={() => setActiveSong(activeSong === song.url ? null : song.url)}
                  >
                    {/* Song header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}>
                        <Music size={18} className="text-black" />
                      </div>
                      <div className="min-w-0">
                        <h3 className={`text-lg font-bold text-white truncate ${lang === 'en' ? 'font-serif italic' : ''}`}>
                          {lang === 'ar' ? song.nameAr : song.nameEn}
                        </h3>
                        <span className="text-neutral-500 text-xs">
                          {lang === 'ar' ? 'أم كلثوم' : 'Um Kalthoum'}
                        </span>
                      </div>
                    </div>

                    {/* Embedded SoundCloud Player */}
                    <div
                      className="rounded-xl overflow-hidden"
                      onMouseEnter={() => { hoveredSongRef.current = song.url; }}
                      onMouseLeave={() => { hoveredSongRef.current = null; }}
                      onTouchStart={() => { hoveredSongRef.current = song.url; }}
                    >
                      <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(song.url)}&color=%23ff9d00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                        style={{ borderRadius: '12px' }}
                      />
                    </div>

                    {/* Open in SoundCloud link */}
                    <div className="mt-3 flex justify-end">
                      <a
                        href={song.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-500 hover:text-[#FF9D00] transition-colors duration-300 flex items-center gap-1"
                      >
                        {lang === 'ar' ? 'استمع على ساوند كلاود' : 'Listen on SoundCloud'}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* ─── Famous Songs Pills ─── */}
            <ScrollReveal delay={100}>
              <p className="text-center text-neutral-500 text-sm mb-6 uppercase tracking-[0.2em]">
                {lang === 'ar' ? 'من أشهر أغانيها' : 'More Famous Songs'}
              </p>
            </ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3">
              {content.famousSongs.map((song: string, i: number) => (
                <ScrollReveal key={song} delay={i * 60} direction="scale">
                  <span className="glass-strong px-5 py-2.5 rounded-full text-sm text-neutral-300 cursor-pointer transition-all duration-300 hover:border-[#FF9D00]/40 hover:text-[#FF9D00] hover:shadow-[0_0_15px_rgba(255,157,0,0.15)] inline-block">
                    {song}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="py-16 px-6 relative">
        <div className="gradient-divider mb-16" />
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}>
                <Music size={18} className="text-black" />
              </div>
              <span className={`text-2xl font-bold text-white ${lang === 'en' ? 'font-serif italic' : ''}`}>
                {content.title}
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-neutral-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              {content.footerText}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex items-center justify-center gap-6 text-neutral-600 text-xs">
              <span>© 2024 {content.title}</span>
              <span>•</span>
              <span>{lang === 'en' ? 'Dev by Thaer' : 'تطوير ثائر'}</span>
              <span>•</span>
              <span>{lang === 'ar' ? 'صُنع بحب' : 'Made with ♥'}</span>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div >
  );
};

export default App;
