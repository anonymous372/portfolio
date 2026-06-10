import React from 'react';

// Helper component to parse and render "**bold**" text
const HighlightedText = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
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
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const Experience = ({ data }) => {
  return (
    <section id="experience" className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground">Experience</h2>
      </div>

      <div className="flex flex-col border-t border-l structural-border backdrop-blur-md bg-background/60 rounded-xl">
        {data.map((job, index) => (
          <div
            key={index}
            className="group relative flex flex-col lg:flex-row border-b border-r structural-border p-6 md:p-12 transition-colors hover:bg-foreground/[0.02]"
          >
            {/* Timeline Column */}
            <div className="lg:w-1/4 mb-6 lg:mb-0 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-foreground/50">{job.duration}</span>
              <div className="mt-8 lg:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block">
                <span className="inline-block w-8 h-[1px] bg-foreground"></span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:w-3/4 flex flex-col">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-4">
                <h4 className="text-2xl md:text-4xl font-light tracking-tight group-hover:pl-4 transition-all duration-300">
                  {job.company}
                </h4>
                <span className="text-sm md:text-base font-sans font-medium tracking-tighter role-text scale-y-[1.15] origin-left md:origin-right inline-block mt-2 md:mt-0 transition-colors duration-500">
                  {job.role}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-foreground/40 border border-borderLine px-2 py-1 rounded-sm">
                  {job.techStack}
                </span>
              </div>

              <ul className="flex flex-col gap-4 text-sm md:text-base text-foreground/80 leading-relaxed max-w-3xl">
                {job.highlights.map((point, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-emerald-500">—</span>
                    <span><HighlightedText text={point} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
