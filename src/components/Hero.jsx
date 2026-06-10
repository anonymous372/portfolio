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

        <div className="flex flex-col md:flex-row gap-6 md:gap-0 mt-8 md:mt-12 p-6 md:p-8 rounded-2xl bg-foreground/[0.02] border border-borderLine backdrop-blur-md shadow-2xl relative overflow-hidden group">
          {/* Subtle gradient sheen inside the dock */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
          
          {/* Location */}
          <div className="flex-1 md:pr-8 flex flex-col justify-start relative z-10">
             <span className="text-[11px] uppercase tracking-[0.2em] font-mono font-bold text-foreground/70 dark:text-foreground/60 mb-2">Location</span>
             <span className="text-lg font-medium text-foreground/90">{data.location}</span>
          </div>
          
          {/* Contact */}
          <div className="flex-1 md:px-8 flex flex-col justify-start border-t md:border-t-0 md:border-l border-borderLine relative z-10 py-6 md:py-0">
             <span className="text-[11px] uppercase tracking-[0.2em] font-mono font-bold text-foreground/70 dark:text-foreground/60 mb-2">Contact</span>
             <a href={`mailto:${data.email}`} className="text-base hover:text-indigo-500 transition-colors truncate mb-1">{data.email}</a>
             <span className="text-sm text-foreground/60">{data.phone}</span>
          </div>

          {/* Profiles */}
          <div className="flex-1 md:pl-8 flex flex-col justify-start border-t md:border-t-0 md:border-l border-borderLine relative z-10 pt-6 md:pt-0">
             <span className="text-[11px] uppercase tracking-[0.2em] font-mono font-bold text-foreground/70 dark:text-foreground/60 mb-3">Profiles</span>
             <div className="flex flex-wrap gap-4 md:gap-6">
                <a href={`https://linkedin.com/in/${data.links.linkedin}`} target="_blank" rel="noreferrer" className="text-sm md:text-base font-medium text-foreground/70 hover:text-indigo-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-indigo-500 hover:after:w-full after:transition-all">LinkedIn</a>
                <a href={`https://github.com/${data.links.github}`} target="_blank" rel="noreferrer" className="text-sm md:text-base font-medium text-foreground/70 hover:text-indigo-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-indigo-500 hover:after:w-full after:transition-all">GitHub</a>
                <a href={`https://leetcode.com/u/${data.links.leetcode}`} target="_blank" rel="noreferrer" className="text-sm md:text-base font-medium text-foreground/70 hover:text-indigo-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-indigo-500 hover:after:w-full after:transition-all">LeetCode</a>
                <a href={`https://codeforces.com/profile/${data.links.codeforces}`} target="_blank" rel="noreferrer" className="text-sm md:text-base font-medium text-foreground/70 hover:text-indigo-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-indigo-500 hover:after:w-full after:transition-all">Codeforces</a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
