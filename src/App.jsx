import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import SpaceBackground from './components/SpaceBackground';
import DayBackground from './components/DayBackground';
import resumeData from './data.json';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen w-full relative flex flex-col md:flex-row">
      {/* Structural left border on desktop */}
      <div className="hidden md:block w-12 border-r border-borderLine fixed h-full left-0 top-0 z-50"></div>
      
      {isDarkMode ? <SpaceBackground /> : <DayBackground />}
      {/* Top Navigation Matrix */}
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-12 pt-24 md:pt-32 pb-24 px-6 md:px-16 xl:px-32 flex flex-col gap-16 md:gap-24 relative">
        <Hero data={resumeData.personal} />
        
        <div className="w-full border-t structural-border"></div>
        <Experience data={resumeData.experience} />
        
        <div className="w-full border-t structural-border"></div>
        <Projects data={resumeData.projects} />
        
        <div className="w-full border-t structural-border"></div>
        <Skills skills={resumeData.skills} achievements={resumeData.achievements} />
      </main>

      {/* Structural right border on desktop */}
      <div className="hidden md:block w-12 border-l structural-border fixed h-full right-0 top-0 z-50">
      </div>
    </div>
  );
}

export default App;
