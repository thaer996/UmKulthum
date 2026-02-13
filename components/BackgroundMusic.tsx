
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using a cleaner, more direct Archive.org link
  const audioUrl = "https://archive.org/download/OmKalthoum-EntaOmry/OmKalthoum-EntaOmry.mp3";

  const togglePlay = async () => {
    if (!audioRef.current) return;
    setError(null);

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsBuffering(true);
        // Force a reload if it previously failed
        if (audioRef.current.readyState === 0) {
          audioRef.current.load();
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
      setHasInteracted(true);
    } catch (err: any) {
      console.error("Playback failed:", err);
      setError("Source unavailable. Please try again.");
      setIsPlaying(false);
    } finally {
      setIsBuffering(false);
    }
  };

  const handleAudioError = (e: any) => {
    console.error("Audio element error:", e);
    setError("Error loading audio source.");
    setIsPlaying(false);
    setIsBuffering(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', handleAudioError);

    return () => {
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', handleAudioError);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className={`relative group flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 p-2 pr-6 rounded-full transition-all duration-500 hover:border-[#FF9D00]/50 ${isPlaying ? 'glow-border' : ''} ${error ? 'border-red-500/50' : ''}`}>
        
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={isBuffering}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg relative ${
            isPlaying ? 'bg-[#FF9D00] text-black scale-110' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
          } ${isBuffering ? 'opacity-80' : ''}`}
          aria-label={isPlaying ? "Mute Music" : "Play Enta Omri"}
        >
          {isBuffering ? (
            <Loader2 size={20} className="animate-spin" />
          ) : isPlaying ? (
            <Volume2 size={20} />
          ) : (
            <VolumeX size={20} />
          )}
        </button>

        {/* Info & Visualizer */}
        <div className="flex flex-col">
          <span className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-1 ${error ? 'text-red-400' : 'text-[#FF9D00]'}`}>
            {error ? 'Playback Error' : 'Now Playing'}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium transition-colors ${isPlaying ? 'text-white' : 'text-neutral-500'} ${error ? 'text-red-300' : ''}`}>
              {error || 'Enta Omri — إنت عمري'}
            </span>
            {isPlaying && !isBuffering && (
              <div className="flex items-end gap-[2px] h-3 w-4">
                <div className="w-[2px] bg-[#FF9D00] animate-[music-bar_0.8s_ease-in-out_infinite] h-full" />
                <div className="w-[2px] bg-[#FF9D00] animate-[music-bar_1.2s_ease-in-out_infinite] h-2/3" />
                <div className="w-[2px] bg-[#FF9D00] animate-[music-bar_1s_ease-in-out_infinite] h-1/2" />
              </div>
            )}
          </div>
        </div>

        <audio
          ref={audioRef}
          loop
          preload="metadata"
          crossOrigin="anonymous"
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <style>{`
          @keyframes music-bar {
            0%, 100% { height: 4px; }
            50% { height: 12px; }
          }
        `}</style>
      </div>
      
      {/* Small floating tip for first-time visitors */}
      {!hasInteracted && !error && (
        <div className="absolute -top-12 left-0 w-max bg-[#FF9D00] text-black text-[10px] font-bold px-3 py-1 rounded-md animate-bounce shadow-xl after:content-[''] after:absolute after:top-full after:left-4 after:border-8 after:border-transparent after:border-t-[#FF9D00]">
          EXPERIENCE WITH SOUND
        </div>
      )}
    </div>
  );
};
