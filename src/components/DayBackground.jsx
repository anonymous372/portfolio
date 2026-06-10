import React, { useEffect, useState } from 'react';

const DayBackground = () => {
  const [motes, setMotes] = useState([]);

  useEffect(() => {
    // Generate random dust motes catching the sunlight
    const numMotes = 50;
    const generatedMotes = Array.from({ length: numMotes }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 120, // Start slightly lower sometimes
      size: Math.random() * 5 + 2, // 2px to 7px
      opacity: Math.random() * 0.3 + 0.1,
      delay: Math.random() * 15,
      duration: Math.random() * 30 + 30, // 30s to 60s
    }));
    setMotes(generatedMotes);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-background transition-colors duration-500">
      {/* Subtle animated blueprint grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Floating dust motes */}
      <div className="absolute inset-0">
        {motes.map((mote, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-600/30 blur-[2px] animate-float"
            style={{
              left: `${mote.x}%`,
              top: `${mote.y}%`,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              opacity: mote.opacity,
              animationDuration: `${mote.duration}s`,
              animationDelay: `-${mote.delay}s`, // Negative delay so they are visible immediately
            }}
          />
        ))}
      </div>

      {/* Subtle sunlight gradient coming from top left */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent mix-blend-multiply"></div>
    </div>
  );
};

export default DayBackground;
