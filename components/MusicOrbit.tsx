
import React, { useEffect, useState } from 'react';

export const MusicOrbit: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-[#FF9D00]/10 rounded-full blur-3xl"></div>
      
      {/* Orbits */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="absolute border border-[#FF9D00]/20 rounded-full"
          style={{
            width: `${i * 120}px`,
            height: `${i * 120}px`,
            transform: `scaleX(1.8) rotateX(60deg) rotateZ(${rotation * (i * 0.2)}deg)`,
            opacity: 1 - i * 0.15
          }}
        >
          {/* Orbital Dot */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF9D00] rounded-full shadow-[0_0_10px_#FF9D00]"
            style={{ transform: `scaleX(${1 / 1.8})` }}
          />
        </div>
      ))}

      {/* Center Image */}
      <div className="relative z-10 w-48 h-48 rounded-full border-2 border-[#FF9D00] overflow-hidden shadow-[0_0_30px_rgba(255,157,0,0.3)] group cursor-pointer transition-transform hover:scale-105">
        <img 
          src="https://picsum.photos/id/101/400/400" 
          alt="Um Kalthoum Tribute"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
          <span className="text-[#FF9D00] text-xs tracking-widest font-bold">PLAY TRIBUTE</span>
        </div>
      </div>
    </div>
  );
};
