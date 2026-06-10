import React from 'react';

const Navigation = ({ isDarkMode, toggleTheme }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-max min-w-[320px] md:min-w-[600px] z-50 bg-background/60 backdrop-blur-xl border border-foreground/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full transition-all duration-500">
      <div className="flex justify-between items-center px-6 md:px-8 h-14 md:h-16 gap-8">
        <div className="flex items-center text-base md:text-lg font-sans font-bold tracking-tighter">
          <span className="cursor-pointer text-foreground drop-shadow-sm hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] hover:text-indigo-500 transition-all duration-300 block leading-none pt-[2px]" onClick={() => scrollTo('hero')}>
            S. SHUKLA
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-foreground/5 p-1 rounded-full border border-foreground/5">
          {['experience', 'projects', 'skills'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)}
              className="relative px-5 py-2 text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-full transition-all duration-300 group"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-0 group-hover:w-[40%] group-hover:opacity-100 transition-all duration-300"></span>
            </button>
          ))}
        </div>

        <button 
          onClick={toggleTheme}
          className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-mono group p-2 rounded-full hover:bg-foreground/5 transition-colors"
        >
          <span className="opacity-50 group-hover:opacity-100 transition-opacity hidden md:inline">Theme</span>
          <div className="w-8 h-4 border border-foreground/20 rounded-full relative flex items-center p-[2px] bg-foreground/5">
            <div className={`w-3 h-3 rounded-full transition-transform duration-500 ease-in-out shadow-sm ${isDarkMode ? 'translate-x-4 bg-sky-100 shadow-[0_0_8px_rgba(186,230,253,0.8)]' : 'translate-x-0 bg-slate-700'}`}></div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
