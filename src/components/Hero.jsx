import React, { useEffect, useState } from 'react';

const HighlightedText = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <span key={i} className="font-bold text-foreground">{part.slice(2, -2)}</span>;
        }
        return part;
      })}
    </>
  );
};

const Hero = ({ data }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Slight delay to allow CSS transitions to catch
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="min-h-[80vh] flex flex-col justify-center relative">
      {/* Decorative colorful glowing blob in the background - slow ambient movement */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[30rem] md:h-[30rem] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-teal-500/20 rounded-full blur-3xl -z-10 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-64 h-64 md:w-[30rem] md:h-[30rem] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-emerald-500/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl relative z-10 backdrop-blur-[2px] p-4 md:p-8 rounded-2xl border border-white/5 shadow-2xl bg-background/40">
        <div className="reveal-wrap mb-4 md:mb-6">
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-foreground reveal-inner ${revealed ? 'revealed' : ''}`}>
            Sourabh Shukla
          </h1>
        </div>
        
        <div className="reveal-wrap mb-10 md:mb-16">
          <p className={`text-lg md:text-xl lg:text-2xl font-sans font-light leading-relaxed text-foreground/80 reveal-inner ${revealed ? 'revealed' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <HighlightedText text={data.summary} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-foreground/5 border border-borderLine hover:bg-foreground/10 transition-colors">
            <span className="text-sm uppercase tracking-widest text-indigo-500 font-mono font-semibold">Location</span>
            <span className="text-base font-medium">{data.location}</span>
          </div>
          
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-foreground/5 border border-borderLine hover:bg-foreground/10 transition-colors">
            <span className="text-sm uppercase tracking-widest text-purple-500 font-mono font-semibold">Contact</span>
            <a href={`mailto:${data.email}`} className="text-base hover:text-purple-500 transition-colors">{data.email}</a>
            <span className="text-base text-foreground/70">{data.phone}</span>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded-xl bg-foreground/5 border border-borderLine hover:bg-foreground/10 transition-colors">
            <span className="text-sm uppercase tracking-widest text-emerald-600 font-mono font-semibold">Profiles</span>
            <div className="flex flex-col gap-1">
              <a href={`https://linkedin.com/in/${data.links.linkedin}`} target="_blank" rel="noreferrer" className="text-base hover:text-emerald-600 transition-colors flex justify-between items-center group">
                LinkedIn 
                <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">↗</span>
              </a>
              <a href={`https://github.com/${data.links.github}`} target="_blank" rel="noreferrer" className="text-base hover:text-emerald-600 transition-colors flex justify-between items-center group">
                GitHub
                <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">↗</span>
              </a>
              <a href={`https://leetcode.com/u/${data.links.leetcode}`} target="_blank" rel="noreferrer" className="text-base hover:text-emerald-600 transition-colors flex justify-between items-center group">
                LeetCode
                <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
