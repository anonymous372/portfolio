import React from 'react';

const Navigation = ({ isDarkMode, toggleTheme }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b structural-border">
      <div className="flex justify-between items-center px-6 md:px-16 h-16 md:h-20">
        <div className="text-sm md:text-base font-mono font-medium tracking-tight">
          <span className="hover-shift cursor-pointer" onClick={() => scrollTo('hero')}>
            S. SHUKLA
          </span>
        </div>
        
        <div className="hidden md:flex gap-10 text-base tracking-wide font-medium">
          {['experience', 'projects', 'skills'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)}
              className="hover:text-emerald-500 transition-colors duration-300"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <button 
          onClick={toggleTheme}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono group"
        >
          <span className="opacity-50 group-hover:opacity-100 transition-opacity">Theme</span>
          <div className="w-8 h-4 border structural-border rounded-full relative flex items-center p-[2px]">
            <div className={`w-3 h-3 bg-foreground rounded-full transition-transform duration-500 ease-in-out ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
