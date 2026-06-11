import React, { useState, useEffect } from 'react';

// Helper component to parse and render "**bold**" text
const HighlightedText = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*|__.*?__)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('__') && part.endsWith('__')) {
          return (
            <span key={i} className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 drop-shadow-sm">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const StackedCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when switching projects
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Auto-scroll
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 40000);
    return () => clearInterval(interval);
  }, [images, currentIndex]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full mb-8 flex flex-col items-center">
      <div
        className="relative w-full aspect-video cursor-pointer group mb-8"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
      >
        {images.map((img, index) => {
          const offset = (currentIndex - index + images.length) % images.length;

          let slotClass = "slot-hidden";
          if (offset === 0) slotClass = "slot-top";
          else if (offset === 1) slotClass = "slot-middle";
          else if (offset === 2) slotClass = "slot-bottom";

          return (
            <div
              key={img}
              className={`absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden shadow-2xl border border-borderLine ring-1 ring-foreground/5 origin-top ${slotClass}`}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover object-top"
              />
              {/* Depth overlay for images further back */}
              {offset > 0 && <div className="absolute inset-0 bg-background/40 pointer-events-none transition-opacity duration-500"></div>}
            </div>
          );
        })}
      </div>

      {/* Global Numbering Indicator placed under the stack in normal flow */}
      <div className="px-4 py-1.5 rounded-full bg-foreground/5 border border-borderLine text-[10px] md:text-xs font-mono font-medium tracking-widest text-foreground/70 shadow-sm transition-all duration-300">
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>
  );
};

const Projects = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="projects" className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground">Projects</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 border structural-border backdrop-blur-md bg-background/60 rounded-xl">
        {/* Index Sidebar */}
        <div className="lg:w-1/3 flex flex-col border-r border-b lg:border-b-0 structural-border">
          {data.map((project, index) => (
            <button
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`text-left p-6 md:p-8 border-b structural-border last:border-b-0 transition-colors duration-300 ${activeIndex === index ? 'bg-foreground text-background' : 'hover:bg-foreground/[0.03]'
                }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono opacity-50">0{index + 1}</span>
                {activeIndex === index && <span className="text-xs uppercase tracking-widest font-mono">Active</span>}
              </div>
              <h4 className="text-xl md:text-2xl font-light leading-tight">
                {project.name.split(': ')[0]}
              </h4>
            </button>
          ))}
        </div>

        {/* Central Canvas */}
        <div className="lg:w-2/3 p-6 md:p-12 xl:p-16 relative overflow-hidden bg-foreground/[0.01]">
          <div className="relative z-10 flex flex-col h-full justify-center min-h-[400px]">
            {data[activeIndex].images && data[activeIndex].images.length > 0 && (
              <StackedCarousel images={data[activeIndex].images} />
            )}

            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-10">
              <div className="flex-1">
                <h4 className="text-2xl md:text-4xl font-light mb-4">
                  {data[activeIndex].name}
                </h4>
                <div className="flex flex-wrap gap-3">
                  <span className="text-[10px] md:text-xs uppercase font-mono tracking-widest border border-borderLine px-3 py-1.5 rounded-sm">
                    {data[activeIndex].techStack}
                  </span>
                </div>
              </div>

              <div className="flex gap-6 shrink-0 mt-2 xl:mt-0">
                {data[activeIndex].github && (
                  <a href={data[activeIndex].github} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-emerald-500 transition-colors">
                    GitHub
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">↗</span>
                  </a>
                )}
                {data[activeIndex].live && (
                  <a href={data[activeIndex].live} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-emerald-500 transition-colors">
                    Live Demo
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">↗</span>
                  </a>
                )}
              </div>
            </div>

            <ul className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-foreground/80">
              {data[activeIndex].highlights.map((point, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-emerald-500">—</span>
                  <span><HighlightedText text={point} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
