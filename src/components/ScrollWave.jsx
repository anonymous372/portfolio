import React, { useEffect, useState } from 'react';

const ScrollWave = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateWavePath = () => {
    let path = "M 20 0";
    for (let i = 0; i < 20; i++) {
      const y1 = i * 100;
      const y2 = (i + 1) * 100;
      // Alternate control points left and right to create a continuous wave
      const xCtrl = i % 2 === 0 ? 40 : 0;
      path += ` C ${xCtrl} ${y1 + 25}, ${xCtrl} ${y2 - 25}, 20 ${y2}`;
    }
    return path;
  };

  const pathLength = 2500; // Approximate length for dasharray
  const wavePath = generateWavePath();

  return (
    <div className="fixed top-20 left-4 md:left-16 bottom-0 w-8 z-30 pointer-events-none opacity-80 mix-blend-screen">
      <svg 
        viewBox="0 0 40 2000" 
        preserveAspectRatio="none" 
        className="w-full h-[150vh] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      >
        {/* Background track (optional subtle line) */}
        <path
          d={wavePath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
        {/* Animated drawing line */}
        <path
          d={wavePath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - (scrollProgress * pathLength)}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>
    </div>
  );
};

export default ScrollWave;
