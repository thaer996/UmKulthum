import { useState, useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

export type IMenu = {
    id: number;
    title: string;
    url: string;
    dropdown?: boolean;
    items?: IMenu[];
};

type MenuProps = {
    list: IMenu[];
    lang?: 'en' | 'ar';
};

const Navbar = ({ list, lang = 'en' }: MenuProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Improved Scroll Spy using explicit calculations
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2; // Center of viewport

            // Find the section that contains the center line
            let currentActiveId: number | null = null;

            // We process lists in reverse or search for the "best" match
            // A simple check is: find the section where (top < center) and (bottom > center)

            for (const item of list) {
                if (!item.url.startsWith('#')) continue;
                const element = document.querySelector(item.url);
                if (element instanceof HTMLElement) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    // Check if scrollPosition is within this element
                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        currentActiveId = item.id;
                        break; // Found the one containing center
                    }
                }
            }

            // Fallback: If no section contains center (e.g. gaps), find closest?
            // Or just keep previous. 
            // Actually, standard behavior: if we are at top, 'Home' is active.
            if (window.scrollY < 100 && list.length > 0) {
                // Force Home active at very top if not already set calculated
                const homeItem = list.find(i => i.url === '#hero');
                if (homeItem) currentActiveId = homeItem.id;
            }

            if (currentActiveId !== null) {
                setActiveId(currentActiveId);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [list]);

    // Determine which ID to highlight: hover takes precedence over active
    const targetId = hovered ?? activeId;

    return (
        <MotionConfig transition={{ bounce: 0, type: 'tween' }}>
            <nav className="relative z-50 w-full">
                <div className="flex items-center justify-between md:justify-center">

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-2">
                        {list?.map((item) => {
                            const isActive = activeId === item.id;
                            const isHovered = hovered === item.id;
                            const isTarget = targetId === item.id;

                            return (
                                <li key={item.id} className="relative">
                                    <a
                                        className={`
                        relative flex items-center justify-center rounded px-4 py-2 transition-all font-medium text-sm lg:text-base
                        hover:text-[#FF9D00] 
                        ${isActive || isHovered ? 'text-white' : 'text-white/80'}
                    `}
                                        style={{
                                            textShadow: isActive || isHovered ? '0 0 10px rgba(255,157,0,0.5)' : 'none'
                                        }}
                                        onMouseEnter={() => setHovered(item.id)}
                                        onMouseLeave={() => setHovered(null)}
                                        href={item?.url}
                                    >
                                        {item?.title}
                                        {item.dropdown && <ChevronDown size={14} className="ml-1 opacity-50" />}
                                    </a>
                                    {isTarget && !item?.dropdown && (
                                        <motion.div
                                            layout
                                            layoutId="cursor"
                                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF9D00] shadow-[0_0_8px_#FF9D00]"
                                        />
                                    )}
                                    {item?.dropdown && hovered === item?.id && (
                                        <div
                                            className="absolute left-0 top-full pt-2"
                                            onMouseEnter={() => setHovered(item.id)}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                                            <motion.div
                                                layout
                                                transition={{ bounce: 0 }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="flex w-56 flex-col rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl"
                                                layoutId="cursor"
                                            >
                                                {item?.items?.map((nav) => {
                                                    return (
                                                        <a
                                                            key={`link-${nav?.id}`}
                                                            href={`${nav?.url}`}
                                                            className="w-full p-4 hover:bg-white/10 text-white/80 hover:text-[#FF9D00] transition-colors text-sm"
                                                        >
                                                            {nav?.title}
                                                        </a>
                                                    );
                                                })}
                                            </motion.div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex w-full justify-end">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-white hover:text-[#FF9D00] transition-colors bg-white/5 rounded-full backdrop-blur-md border border-white/10"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <motion.div
                    initial={false}
                    animate={isMobileMenuOpen ? { height: 'auto', opacity: 1, display: 'block' } : { height: 0, opacity: 0, transitionEnd: { display: 'none' } }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 absolute top-full right-0 mt-4 w-64 shadow-2xl z-50 origin-top-right"
                >
                    <ul className="flex flex-col py-2">
                        {list?.map((item) => (
                            <li key={item.id} className="border-b border-white/5 last:border-none">
                                <a
                                    href={item.url}
                                    onClick={handleLinkClick}
                                    className={`block px-6 py-4 text-white active:bg-white/5 active:text-[#FF9D00] transition-colors font-medium ${lang === 'ar' ? 'text-right' : 'text-left'} ${activeId === item.id ? 'text-[#FF9D00]' : ''}`}
                                >
                                    {item.title}
                                </a>
                                {item.dropdown && item.items && (
                                    <ul className="bg-white/5">
                                        {item.items.map(subItem => (
                                            <li key={subItem.id}>
                                                <a
                                                    href={subItem.url}
                                                    onClick={handleLinkClick}
                                                    className={`block px-8 py-3 text-sm text-neutral-300 active:text-[#FF9D00] active:bg-white/5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                                >
                                                    {subItem.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </nav>
        </MotionConfig>
    );
};

export default Navbar;
