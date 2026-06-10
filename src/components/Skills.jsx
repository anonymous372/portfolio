import React from 'react';

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

const Skills = ({ skills, achievements }) => {
  return (
    <section id="skills" className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground">Skills</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 p-8 md:p-12 backdrop-blur-md bg-background/60 rounded-xl border structural-border">
        {/* Skills Section */}
        <div className="flex flex-col gap-8">
          <h4 className="text-xl font-light border-b border-borderLine pb-4 mb-4">Technical Stack</h4>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-foreground/50">Languages</span>
              <p className="text-sm md:text-base">{skills.languages}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-foreground/50">Frontend</span>
              <p className="text-sm md:text-base">{skills.frontend}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-foreground/50">Backend & Databases</span>
              <p className="text-sm md:text-base">{skills.backendAndDatabases}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-foreground/50">Tools & DevOps</span>
              <p className="text-sm md:text-base">{skills.toolsAndDevOps}</p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="flex flex-col gap-8">
          <h4 className="text-xl font-light border-b border-borderLine pb-4 mb-4">Achievements</h4>
          <ul className="flex flex-col gap-6">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 shrink-0"></div>
                <p className="text-sm md:text-base leading-relaxed text-foreground/90">
                  <HighlightedText text={achievement} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
