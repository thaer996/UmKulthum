
import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { Music, Calendar, MapPin, Award } from 'lucide-react';

interface TimelineEvent {
    year: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    icon: React.ReactNode;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
    {
        year: '1904',
        titleEn: 'Birth of a Legend',
        titleAr: 'ميلاد أسطورة',
        descEn: 'Born Fatima Ibrahim in Tamay ez-Zahayra, a small village in the Nile Delta. Her father, an imam, taught her to recite the Quran from a young age.',
        descAr: 'وُلدت فاطمة إبراهيم في تماي الزهايرة، قرية صغيرة في دلتا النيل. علّمها والدها، الإمام، تلاوة القرآن منذ صغرها.',
        icon: <Calendar className="text-[#FF9D00]" size={20} />
    },
    {
        year: '1923',
        titleEn: 'The Move to Cairo',
        titleAr: 'الانتقال إلى القاهرة',
        descEn: 'Moved to Cairo to pursue a professional singing career, mentored by composers Zakariyya Ahmad and Abu al-Ila Muhammad.',
        descAr: 'انتقلت إلى القاهرة لتبدأ مسيرتها المهنية في الغناء، بإرشاد الملحنين زكريا أحمد وأبو العلا محمد.',
        icon: <MapPin className="text-[#FF9D00]" size={20} />
    },
    {
        year: '1934',
        titleEn: 'Voice of Egyptian Radio',
        titleAr: 'صوت الإذاعة المصرية',
        descEn: 'Inaugurated the Egyptian State Radio with a live performance on May 31st, becoming the most recognized voice in the Arab world.',
        descAr: 'افتتحت الإذاعة المصرية بأداء حي في 31 مايو، لتصبح أشهر صوت في العالم العربي.',
        icon: <Award className="text-[#FF9D00]" size={20} />
    },
    {
        year: '1937',
        titleEn: 'First Thursday Concerts',
        titleAr: 'حفلات أول خميس',
        descEn: 'Began her legendary "First Thursday of the Month" live concerts, broadcast across the Arab world, becoming a cultural tradition for decades.',
        descAr: 'بدأت حفلاتها الأسطورية "أول خميس من كل شهر" المُذاعة عبر الراديو، والتي أصبحت تقليداً ثقافياً لعقود.',
        icon: <Music className="text-[#FF9D00]" size={20} />
    },
    {
        year: '1944',
        titleEn: 'Royal Honor',
        titleAr: 'تكريم ملكي',
        descEn: 'Awarded the Order of the Virtues (Nishan el-Kamal) by King Farouk, the highest state honor for an artist.',
        descAr: 'مُنحت نيشان الكمال من الملك فاروق، أعلى وسام في الدولة لفنان.',
        icon: <Award className="text-[#FF9D00]" size={20} />
    },
    {
        year: '1964',
        titleEn: 'Enta Omri',
        titleAr: 'إنت عمري',
        descEn: 'Released "Enta Omri" — her first collaboration with Mohamed Abdel Wahab, ending years of artistic rivalry. Considered one of the greatest Arabic songs ever recorded.',
        descAr: 'أصدرت "إنت عمري" — أول تعاون مع محمد عبد الوهاب، منهيةً سنوات من التنافس الفني. تُعدّ من أعظم الأغاني العربية.',
        icon: <Music className="text-[#FF9D00]" size={20} />
    },
    {
        year: '1966',
        titleEn: 'Al Atlal',
        titleAr: 'الأطلال',
        descEn: 'Released "Al Atlal" (The Ruins), widely regarded as her greatest masterpiece, with lyrics by Ibrahim Nagi and composed by Riyad al-Sunbati.',
        descAr: 'أصدرت "الأطلال"، التي تُعتبر أعظم روائعها، بكلمات إبراهيم ناجي وألحان رياض السنباطي.',
        icon: <Music className="text-[#FF9D00]" size={20} />
    },
    {
        year: '1967',
        titleEn: 'Concerts for Egypt',
        titleAr: 'حفلات من أجل مصر',
        descEn: 'After the Six-Day War, she embarked on a historic series of benefit concerts across the Arab world and Europe to raise funds for Egypt.',
        descAr: 'بعد نكسة 67، أقامت سلسلة تاريخية من الحفلات الخيرية في العالم العربي وأوروبا لدعم مصر.',
        icon: <Award className="text-[#FF9D00]" size={20} />
    },
    {
        year: '1975',
        titleEn: 'Eternal Legacy',
        titleAr: 'الإرث الخالد',
        descEn: 'Passed away on February 3rd. Her funeral was attended by over 4 million mourners — one of the largest in history. Her voice continues to inspire generations.',
        descAr: 'رحلت في 3 فبراير. حضر جنازتها أكثر من 4 ملايين مشيّع — واحدة من أكبر الجنازات في التاريخ. صوتها يستمر في إلهام الأجيال.',
        icon: <Calendar className="text-[#FF9D00]" size={20} />
    }
];

interface Props {
    lang: Language;
}

export const TimelineSection: React.FC<Props> = ({ lang }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;

            // Start filling when the top of the section hits 60% of the viewport (closer to middle)
            // or when it enters. Let's say when element top reaches center screen.
            const startOffset = windowHeight * 0.5;

            // Calculate progress
            // We want it to be 0 when element top is at window bottom (or startOffset)
            // And 100% when element bottom is at window bottom?
            // Actually, simply: how far down have we scrolled past the start of the section?

            const elementTopRelativeToView = rect.top;

            // Let's make it fill based on how much of the section has passed the "reading line" (e.g. center of screen)
            const scrollPos = windowHeight / 2 - elementTopRelativeToView;

            const progress = (scrollPos / elementHeight) * 100;

            setLineHeight(Math.min(Math.max(progress, 0), 100));
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="timeline" className="py-32 px-6 relative overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#FF9D00]/3 rounded-full blur-[150px] -z-10" />

            <div className="max-w-5xl mx-auto" ref={containerRef}>
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <span className="text-[#FF9D00] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            {lang === 'ar' ? 'رحلة عبر الزمن' : 'A Journey Through Time'}
                        </span>
                        <h2 className={`text-4xl md:text-6xl font-bold text-white ${lang === 'en' ? 'font-serif italic' : ''}`}>
                            {lang === 'ar' ? 'المحطات الخالدة' : 'Timeless Milestones'}
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="relative">
                    {/* Vertical timeline line background */}
                    <div className={`absolute top-0 bottom-0 w-px bg-white/10 ${lang === 'ar' ? 'right-6 md:right-1/2' : 'left-6 md:left-1/2'}`} />

                    {/* Filling timeline line */}
                    <div
                        className={`absolute top-0 w-px bg-[#FF9D00] transition-all duration-100 ease-out ${lang === 'ar' ? 'right-6 md:right-1/2' : 'left-6 md:left-1/2'}`}
                        style={{ height: `${lineHeight}%` }}
                    />

                    {TIMELINE_EVENTS.map((event, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <ScrollReveal key={event.year} direction={isEven ? (lang === 'ar' ? 'right' : 'left') : (lang === 'ar' ? 'left' : 'right')} delay={index * 100}>
                                <div className={`relative flex items-start mb-16 md:mb-20 ${isEven ? 'flex-row' : 'flex-row-reverse'
                                    }`}>
                                    {/* Content */}
                                    <div className={`md:w-5/12 ${isEven
                                        ? (lang === 'ar' ? 'ml-auto pl-12 text-right' : 'mr-auto pr-12 text-right')
                                        : (lang === 'ar' ? 'mr-auto pr-12 text-left' : 'ml-auto pl-12 text-left')
                                        } ${lang === 'ar' ? 'mr-14 md:mr-0' : 'ml-14 md:ml-0'}`}>
                                        <div className="glass-strong rounded-2xl p-6 hover:border-[#FF9D00]/20 transition-all duration-300 group cursor-pointer">
                                            <span className="text-[#FF9D00] font-bold text-lg">{event.year}</span>
                                            <h3 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-[#FF9D00] transition-colors">
                                                {lang === 'ar' ? event.titleAr : event.titleEn}
                                            </h3>
                                            <p className="text-neutral-400 text-sm leading-relaxed">
                                                {lang === 'ar' ? event.descAr : event.descEn}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline dot replaced with image */}
                                    <div className={`absolute top-0 ${lang === 'ar' ? 'right-3 md:right-1/2 md:translate-x-1/2' : 'left-3 md:left-1/2 md:-translate-x-1/2'} w-12 h-12 rounded-full bg-[#050505] border-2 flex items-center justify-center z-10 overflow-hidden transition-all duration-300 ${lineHeight >= (index / TIMELINE_EVENTS.length) * 100 ? 'border-[#FF9D00] shadow-[0_0_15px_rgba(255,157,0,0.5)]' : 'border-white/20 grayscale'}`}>
                                        <img
                                            src="/images/image copy 8.png"
                                            alt="Timeline"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
