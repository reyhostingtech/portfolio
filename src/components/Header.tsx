import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Server, Terminal } from 'lucide-react';
import { portfolioInfo } from '../portfolioConfig';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigationItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Resume', href: '#resume', id: 'resume' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section on scroll
      const scrollPosition = window.scrollY + 120;
      for (const item of navigationItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
      setIsOpen(false);
    }
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md shadow-md border-b border-slate-200/50 dark:border-slate-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center space-x-2 group focus:outline-none"
            id="nav-brand-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white transition-all duration-300 group-hover:bg-blue-700 shadow-sm shadow-blue-500/20">
              <Server className="w-5 h-5 group-hover:rotate-6 transition-transform" />
              {/* Virtual Server Pulsing Beacon */}
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white dark:border-slate-900 shadow">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              </span>
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                REY PURGATORIO
              </span>
              <div className="flex items-center space-x-1">
                <Terminal className="w-3 h-3 text-blue-500" />
                <span className="font-mono text-[9px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                  HOSTING.SUPPORT
                </span>
              </div>
            </div>
          </a>

          {/* Large Screen Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-1" id="nav-desktop">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-3 py-2 rounded-md font-sans text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Dark & Light Theme Switcher */}
            <button
              onClick={toggleDarkMode}
              className="ml-3 p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label="Toggle Theme Mode"
              id="theme-toggle-desktop"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>
          </nav>

          {/* Small Screen Control & Handlers */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Dynamic theme switch in mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="Toggle Theme Mode"
              id="theme-toggle-mobile"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:outline-none"
              aria-expanded={isOpen}
              id="mobile-menu-trigger"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Interaction Slide-down Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] ${
          isOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
        id="nav-mobile-drawer"
      >
        <div className="px-4 space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </a>
          ))}
          
          <div className="pt-2 px-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Currently Active: Cebu, PH</span>
            <span className="flex items-center text-emerald-500 font-mono">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Direct Status: Active
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
