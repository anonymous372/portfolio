import React, { useEffect, useState } from 'react';

const SpaceBackground = () => {
  const [stars, setStars] = useState([]);
  const [comets, setComets] = useState([]);

  useEffect(() => {
    const numStars = 150;
    const generatedStars = Array.from({ length: numStars }).map(() => {
      const size = Math.random() * 2 + 1; // 1px to 3px
      
      let glowColor = 'transparent';
      if (size > 2.2) {
        const randGlow = Math.random();
        if (randGlow > 0.6) {
          glowColor = 'rgba(239, 68, 68, 0.5)';
        } else if (randGlow > 0.2) {
          glowColor = 'rgba(59, 130, 246, 0.5)';
        }
      }

      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        opacity: Math.random() * 0.6 + 0.2,
        delay: Math.random() * 5,
        glowColor
      };
    });
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const spawnComet = () => {
       if (!isMounted) return;
       const id = Date.now() + Math.random();
       const sizeRandom = Math.random();
       
       let sizeClass, duration;
       if (sizeRandom > 0.8) {
          // Large: faster
          sizeClass = 'comet-lg';
          duration = 10 + Math.random() * 4; // 10-14s
       } else if (sizeRandom > 0.4) {
          // Medium: medium speed
          sizeClass = 'comet-md';
          duration = 18 + Math.random() * 7; // 18-25s
       } else {
          // Small: slow
          sizeClass = 'comet-sm';
          duration = 30 + Math.random() * 10; // 30-40s
       }
       
       const isTop = Math.random() > 0.5;
       const top = isTop ? `${Math.random() * 20 - 10}%` : `${Math.random() * 80}%`;
       const left = isTop ? `${Math.random() * 80 + 20}%` : `${Math.random() * 20 + 100}%`;

       setComets(prev => [...prev, { id, sizeClass, duration, top, left }]);
       
       setTimeout(() => {
         if (isMounted) {
           setComets(prev => prev.filter(c => c.id !== id));
         }
       }, duration * 1000 + 1000);
    };

    spawnComet();

    const scheduleNext = () => {
      const nextTime = Math.random() * 6000 + 4000; // spawn every 4-10s
      timeoutId = setTimeout(() => {
        spawnComet();
        scheduleNext();
      }, nextTime);
    };
    
    scheduleNext();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      <div className="absolute inset-0 bg-slate-950/80 dark:bg-transparent transition-colors duration-500"></div>

      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            boxShadow: star.glowColor !== 'transparent' ? `0 0 ${star.size * 3}px ${star.size}px ${star.glowColor}` : 'none'
          }}
        />
      ))}

      <div className="absolute inset-0">
        {comets.map((comet) => (
          <div
            key={comet.id}
            className={`comet-dynamic ${comet.sizeClass}`}
            style={{
              top: comet.top,
              left: comet.left,
              animation: `shootingStarDynamic ${comet.duration}s linear forwards`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SpaceBackground;
