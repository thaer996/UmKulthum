
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Try to play local file first, fallback to remote if error (handled by error listener)
    // For now, we set the source to the expected local file
    const audioPath = '/audio/howa-sahih.mp3';
    audioRef.current = new Audio(audioPath);

    // Fallback to Enta Omri if local file not found (optional, but good for demo)
    audioRef.current.onerror = () => {
      console.warn("Local audio not found, trying fallback");
      if (audioRef.current && audioRef.current.src.includes('howa-sahih')) {
        audioRef.current.src = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Enta_Omri.ogg';
      } else {
        setHasError(true);
      }
    };

    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;

    // Hide tooltip after 6 seconds
    const timer = setTimeout(() => setShowTooltip(false), 6000);

    // Listen for external pause events (e.g. from MusicOrbit)
    const handleExternalPause = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('pause-background-music', handleExternalPause);

    return () => {
      audioRef.current?.pause();
      clearTimeout(timer);
      window.removeEventListener('pause-background-music', handleExternalPause);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setHasError(true));
    }
    setIsPlaying(!isPlaying);
    setShowTooltip(false);
  };

  if (hasError) return null;

  return (
    <div className="relative">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -bottom-14 right-0 whitespace-nowrap glass rounded-lg px-3 py-2 text-xs text-neutral-300 pointer-events-none animate-pulse z-50">
          <span className="gradient-text font-semibold">♪ Experience with Sound</span>
        </div>
      )}

      <button
        onClick={toggle}
        className="relative w-9 h-9 rounded-full glass flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 group"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-3">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="w-[2px] bg-[#FF9D00] rounded-full"
                style={{
                  animation: `music-bar ${0.5 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 100}ms`,
                  height: '4px',
                }}
              />
            ))}
          </div>
        ) : (
          <Volume2 size={14} className="text-neutral-400 group-hover:text-[#FF9D00] transition-colors" />
        )}
      </button>
    </div>
  );
};
