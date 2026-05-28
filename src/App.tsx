/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import TrustpilotReviews from './components/TrustpilotReviews';
import ExperienceTimeline from './components/Experience';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUp, Terminal, ShieldCheck, Cpu } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to a modern dark theme
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [preloaderStep, setPreloaderStep] = useState(0);

  const preloaderLogs = [
    "Establishing handshake with Cebu regional DNS resolver hub...",
    "Verifying web hosting cPanel account partition configuration... [SUCCESS]",
    "Auditing SPF, DKIM & DMARC mail deliverability parameters... [OK]",
    "Installing Let's Encrypt SSL certificate zones... [SECURED]",
    "Booting Rey Purgatorio's Support Portfolio Cluster... [ALIVE]"
  ];

  // Dynamic theme selector configuration sync on mount
  useEffect(() => {
    // Check local storage or default to dark
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Theme Toggle control
  const toggleDarkMode = () => {
    const updatedTheme = !isDarkMode;
    setIsDarkMode(updatedTheme);
    if (updatedTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Preloader step sequence control
  useEffect(() => {
    if (preloaderStep < preloaderLogs.length) {
      const delay = preloaderStep === 0 ? 300 : preloaderStep === 4 ? 400 : 250;
      const timer = setTimeout(() => {
        setPreloaderStep((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [preloaderStep]);

  // Floating button visible scroll trigger
  useEffect(() => {
    const triggerFloat = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', triggerFloat);
    return () => window.removeEventListener('scroll', triggerFloat);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <div 
        id="app-preloader"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0F19] text-slate-100 px-4 select-none font-mono"
      >
        <div className="w-full max-w-md bg-slate-950/80 rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* preloader blinking red/green header */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4 text-xs text-slate-500">
            <div className="flex items-center space-x-1.5 font-bold">
              <Terminal className="w-4 h-4 text-blue-500 animate-pulse" />
              <span>REY_PURGATORIO_SUPPORT_BOOTSTRAP</span>
            </div>
            <span className="flex items-center text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
              ONLINE_PORT:3000
            </span>
          </div>

          {/* Sequential server logs print simulation */}
          <div className="space-y-2 text-[10px] sm:text-xs">
            {preloaderLogs.slice(0, preloaderStep).map((log, index) => {
              const isLast = index === preloaderStep - 1;
              return (
                <div key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2 shrink-0 select-none">&gt;&gt;</span>
                  <p className={`${isLast ? 'text-blue-400 font-extrabold animate-pulse' : 'text-slate-350'}`}>
                    {log}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Static progress percentage */}
          <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
            <span>Systems Audit Index</span>
            <span className="font-extrabold text-blue-550">
              {Math.min(Math.round((preloaderStep / preloaderLogs.length) * 100), 100)}%
            </span>
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-slate-900 h-1 overflow-hidden mt-2 rounded-full">
            <div 
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${(preloaderStep / preloaderLogs.length) * 100}%` }}
            />
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-205 transition-colors duration-300 font-sans antialiased">
      
      {/* Sticky navigation and responsive menus */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Visual content blocks */}
      <main id="app-main-content">
        <Hero />
        <About />
        <Skills />
        <TrustpilotReviews />
        <ExperienceTimeline />
        <Certifications />
        <Projects />
        <Resume />
        <Contact />
      </main>

      {/* Footer disclaimer and authors details */}
      <Footer />

      {/* Floating Scroll To Top cursor trigger button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-full shadow-lg shadow-blue-500/10 cursor-pointer transition-all duration-150 flex items-center justify-center focus:outline-none"
          title="Jump back to top area"
          id="scroll-back-to-top-hud"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
