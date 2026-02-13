import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const NOTES = ['♪', '♫', '♩', '♬'];

export const MusicOrbit: React.FC = () => {
  const [playing, setPlaying] = useState(true); // Auto-play enabled
  const playerRef = useRef<any>(null); // Use any to avoid type issues with default import
  const [isReady, setIsReady] = useState(false);

  // Stop background music immediately when this component mounts/renders if playing
  useEffect(() => {
    if (playing) {
      try {
        window.dispatchEvent(new Event('pause-background-music'));
      } catch (e) {
        console.error("Error dispatching event", e);
      }
    }
  }, [playing]);

  const handleProgress = (state: any) => {
    const { playedSeconds } = state;
    // Loop between 5:00 (300s) and 6:00 (360s)
    if (playedSeconds >= 360) {
      playerRef.current?.seekTo(300, 'seconds');
    }
  };

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center" style={{ perspective: '800px' }}>

      {/* SoundCloud Player (Hidden) */}
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url="https://soundcloud.com/ummkulthum/igq8ndudt4iz?si=378d8ffbf6fe42b1aa414fe0acd7d7a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
          playing={playing}
          volume={1}
          width="0"
          height="0"
          onReady={() => setIsReady(true)}
          onProgress={handleProgress}
          config={{
            soundcloud: {
              options: {
                start_track: 300, // Start at 5:00
                auto_play: true,
                visual: false
              }
            }
          } as any}
        />
      </div>

      {/* Floating musical notes */}
      {NOTES.map((note, i) => (
        <span
          key={i}
          className={`absolute text-[#FF9D00]/40 text-lg pointer-events-none ${playing ? 'animate-bounce' : ''}`}
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
            animation: `floatNote ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            opacity: playing ? 1 : 0.5
          }}
        >
          {note}
        </span>
      ))}

      {/* Outer orbit ring */}
      <div
        className="absolute w-full h-full rounded-full border border-[#FF9D00]/10"
        style={{
          animation: `orbitSpin ${playing ? '10s' : '20s'} linear infinite`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FF9D00]/60 shadow-[0_0_10px_rgba(255,157,0,0.5)]" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D4AF37]/40" />
      </div>

      {/* Inner orbit ring */}
      <div
        className="absolute w-3/4 h-3/4 rounded-full border border-[#D4AF37]/8"
        style={{
          animation: `orbitSpin ${playing ? '7s' : '14s'} linear infinite reverse`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D4AF37]/50 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
      </div>

      {/* Center image (+ optional click to toggle if browser blocked autoplay) */}
      <div
        onClick={() => setPlaying(!playing)}
        className="relative z-10 w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden cursor-pointer group"
        style={{ animation: playing ? 'pulseRing 1.5s ease-in-out infinite' : 'pulseRing 3s ease-in-out infinite' }}
      >
        <img
          src="/images/image.png"
          alt="Um Kalthoum" // Simplified alt text
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Inner shadow overlay */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] pointer-events-none" />
      </div>

      {/* Glow behind center */}
      <div className={`absolute w-48 h-48 md:w-64 md:h-64 bg-[#FF9D00]/6 rounded-full blur-3xl -z-10 transition-all duration-1000 ${playing ? 'scale-125 opacity-100' : 'scale-100 opacity-70'}`} />
    </div>
  );
};
