
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface Image {
  url: string;
  caption: string;
}

const IMAGES: Image[] = [
  {
    url: "https://images.unsplash.com/photo-1514525253344-99a4299965d2?q=80&w=1000&auto=format&fit=crop",
    caption: "The iconic stage performance"
  },
  {
    url: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
    caption: "The Star of the Orient"
  },
  {
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    caption: "A legacy in every note"
  },
  {
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    caption: "Recording at the Cairo studios"
  }
];

export const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // Track which images have been "discovered" and should be loaded
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set([0]));

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + IMAGES.length) % IMAGES.length);
  };

  // Update loaded indices when index changes to pre-fetch neighbors
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % IMAGES.length;
    const prevIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
    
    setLoadedIndices(prev => {
      if (prev.has(currentIndex) && prev.has(nextIndex) && prev.has(prevIndex)) {
        return prev;
      }
      const newSet = new Set(prev);
      newSet.add(currentIndex);
      newSet.add(nextIndex);
      newSet.add(prevIndex);
      return newSet;
    });
  }, [currentIndex]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, nextSlide]);

  return (
    <div 
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group border border-neutral-800 shadow-2xl bg-neutral-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      {IMAGES.map((image, index) => {
        const isRequested = loadedIndices.has(index);
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {isRequested ? (
              <img
                src={image.url}
                alt={image.caption}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-1000"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                <Loader2 className="text-neutral-700 animate-spin" size={32} />
              </div>
            )}
            
            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-20">
              <p className="text-[#FF9D00] text-xs font-bold uppercase tracking-[0.2em] mb-1">
                {image.caption}
              </p>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF9D00] hover:text-black focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF9D00] hover:text-black focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 transition-all duration-300 rounded-full ${
              index === currentIndex ? 'w-8 bg-[#FF9D00]' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
