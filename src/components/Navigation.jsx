import React from 'react';

const Navigation = ({ isDarkMode, toggleTheme }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[760px] max-w-4xl z-50 bg-background/40 backdrop-blur-2xl border border-foreground/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-full transition-all duration-500">
      <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center h-14 w-full px-6 md:px-8">
        
        {/* Logo */}
        <div className="flex items-center justify-start w-full h-full text-base md:text-lg font-sans font-bold tracking-tighter shrink-0">
          <span className="cursor-pointer text-foreground drop-shadow-sm hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] hover:text-indigo-500 transition-all duration-300 block leading-none pt-[2px]" onClick={() => scrollTo('hero')}>
            S. SHUKLA
          </span>
        </div>
        
        {/* Links (Perfectly Centered) */}
        <div className="hidden md:flex items-center justify-center w-full h-full gap-1">
          {['experience', 'projects', 'skills'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)}
              className="px-4 py-1.5 text-[15px] font-medium tracking-wide text-foreground/70 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10 border border-transparent hover:border-foreground/10 active:border-foreground/20 rounded-full transition-all duration-200 active:scale-95"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-end items-center w-full h-full">
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono group hover:bg-foreground/5 px-3 py-2 rounded-full transition-colors shrink-0"
          >
          <span className="opacity-50 group-hover:opacity-100 transition-opacity hidden md:inline">Theme</span>
          <div className="w-8 h-4 border border-foreground/20 rounded-full relative flex items-center p-[2px] bg-foreground/5">
            <div className={`w-3 h-3 rounded-full transition-transform duration-500 ease-in-out shadow-sm ${isDarkMode ? 'translate-x-4 bg-sky-100 shadow-[0_0_8px_rgba(186,230,253,0.8)]' : 'translate-x-0 bg-slate-700'}`}></div>
          </div>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
