
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
  caption: string;
}

const IMAGES: Image[] = [
  { src: '/images/image.png', alt: 'Um Kalthoum', caption: 'The Legend' },
  { src: '/images/image copy.png', alt: 'Um Kalthoum on stage', caption: 'Golden Era' },
  { src: '/images/image copy 2.png', alt: 'Classic Portrait', caption: 'Star of the East' },
  { src: '/images/image copy 3.png', alt: 'Rare Photo', caption: 'Timeless Voice' },
];

export const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  // Preload neighbors
  useEffect(() => {
    const toLoad = [
      (currentIndex + 1) % IMAGES.length,
      (currentIndex - 1 + IMAGES.length) % IMAGES.length,
    ];
    toLoad.forEach(idx => {
      if (!loadedImages.has(idx)) {
        const img = new window.Image();
        img.src = IMAGES[idx].src;
        img.onload = () => setLoadedImages(prev => new Set(prev).add(idx));
      }
    });
  }, [currentIndex, loadedImages]);

  const go = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 600);
    setCurrentIndex(prev =>
      direction === 'next'
        ? (prev + 1) % IMAGES.length
        : (prev - 1 + IMAGES.length) % IMAGES.length
    );
  }, [isTransitioning]);

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => go('next'), 5000);
    return () => clearInterval(timer);
  }, [isHovered, go]);

  const current = IMAGES[currentIndex];

  return (
    <div
      className="relative rounded-3xl overflow-hidden aspect-[3/4] md:aspect-[4/5] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ken Burns image */}
      {IMAGES.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: idx === currentIndex ? 1 : 0, zIndex: idx === currentIndex ? 1 : 0 }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
            style={{
              animation: idx === currentIndex ? `kenBurns${(idx % 2) + 1} 8s ease-in-out alternate infinite` : 'none',
            }}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <p className="text-white font-semibold text-lg mb-1 drop-shadow-md">{current.caption}</p>
        <div className="flex gap-1.5 mt-3">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'w-8 bg-[#FF9D00]' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => go('prev')}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => go('next')}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
