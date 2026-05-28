import React from 'react';
import { Server, ArrowUp, Mail, Terminal, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-10 mb-8 max-w-6xl mx-auto">
          
          {/* brand column */}
          <div className="md:col-span-5 space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Server className="w-4 h-4" />
              </div>
              <span className="font-display font-black text-white text-base tracking-widest leading-none">
                REY PURGATORIO
              </span>
            </div>
            
            <p className="font-sans text-xs text-slate-400 max-w-xs leading-relaxed font-normal">
              Hosting Technical Support Analyst • cPanel Specialist • Microsoft 365, Mail configurations and systems security auditing.
            </p>
          </div>

          {/* navigation column */}
          <div className="md:col-span-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-sans font-semibold">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#reviews" className="hover:text-blue-400 transition-colors">Reviews</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* back to top column */}
          <div className="md:col-span-3 flex justify-center md:justify-end">
            <button
              onClick={scrollBackToTop}
              className="p-3 bg-slate-800 hover:bg-slate-750 text-slate-205 dark:text-slate-300 rounded-xl hover:text-white transition-all duration-150 flex items-center space-x-2 border border-slate-750 cursor-pointer text-xs font-semibold"
              title="Return to top coordinates"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* author credits and disclaimer zone */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center max-w-6xl mx-auto text-[11px] font-mono">
          <div>
            <span>&copy; {new Date().getFullYear()} REY PURGATORIO. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center text-slate-500">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span>Cebu, PH Hub</span>
            </span>
            <span className="flex items-center text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
              PORTFOLIO STATIC LIVE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
