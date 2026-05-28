import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Server, ShieldAlert, Cpu, CircleChevronRight, Linkedin, Github, Mail, ArrowDown } from 'lucide-react';
import { portfolioInfo } from '../portfolioConfig';

export default function Hero() {
  const [typedTitle, setTypedTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const rotatingTitles = [
    "Hosting Technical Support Analyst",
    "DNS Management & Propagation Specialist",
    "Email Transport & Security Expert (SPF/DKIM/DMARC)",
    "Microsoft 365 & Outlook Config Administrator",
    "cPanel, WHM & Server Migration Consultant"
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = rotatingTitles[currentIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedTitle(currentFullText.substring(0, typedTitle.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedTitle(currentFullText.substring(0, typedTitle.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && typedTitle === currentFullText) {
      // Pause at full text
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && typedTitle === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % rotatingTitles.length);
      setTypingSpeed(150);
    }

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, currentIndex]);

  const scrollToElement = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-blue-50/50 dark:from-[#0B0F19] dark:via-[#0F172A] dark:to-[#090C15]"
    >
      {/* Network Server Nodes Background Drawing Grid */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/20 dark:text-blue-500/10" />
              <circle cx="0" cy="0" r="1.5" className="fill-blue-500/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-grid)" />
        </svg>
      </div>

      {/* Floating Abstract Server Blinks */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-lg border border-blue-500/10 dark:border-blue-500/5 bg-white/20 dark:bg-slate-900/10 backdrop-blur-[1px] p-2 flex items-center space-x-2 shadow-2xl transition-all duration-1000 select-none animate-float hidden md:flex"
            style={{
              top: `${15 + i * 13}%`,
              left: i % 2 === 0 ? `${5 + i * 4}%` : `${65 + i * 5}%`,
              transform: `scale(${0.8 + (i % 3) * 0.1})`,
            }}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${i % 3 === 0 ? 'bg-emerald-500' : i % 3 === 1 ? 'bg-blue-500' : 'bg-indigo-500'} dark:opacity-80 animate-pulse`} />
            <span className="font-mono text-[9px] text-slate-400 dark:text-slate-500 tracking-tight font-medium">
              {i % 3 === 0 ? 'STATUS: OK' : i % 3 === 1 ? 'DNS_RESOLVED' : 'SSL: SECURED'}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 md:py-20">
        
        {/* Dynamic Support Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/50 rounded-full px-4 py-1.5 mb-6 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs font-semibold text-blue-800 dark:text-blue-300 tracking-wider">
            HOSTING SUPPORT SPECIALIST • SYSTEM DIAGNOSTICS ACTIVE
          </span>
        </motion.div>

        {/* Big Name Tag */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white"
        >
          {portfolioInfo.name}
        </motion.h1>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="min-h-[40px] md:min-h-[48px] mt-4 flex justify-center items-center"
        >
          <span className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-blue-600 dark:text-blue-400 tracking-tight cursor-blink">
            {typedTitle}
          </span>
        </motion.div>

        {/* Supporting Details */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-6 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-normal"
        >
          {portfolioInfo.heroIntroduction}
        </motion.p>

        {/* Primary Action Button Suite */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <button
            onClick={() => scrollToElement('contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-sans font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-md hover:shadow-lg shadow-blue-500/10 cursor-pointer transition-all duration-150 flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </button>

          <button
            onClick={() => scrollToElement('resume')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-sans font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-98 shadow-sm hover:shadow-md cursor-pointer transition-all duration-150 flex items-center justify-center space-x-2"
          >
            <span>Download Resume</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <a
              href={portfolioInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 transition-colors shadow-sm"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={portfolioInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 transition-colors shadow-sm"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Scroll down trigger indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 hidden sm:block"
          onClick={() => scrollToElement('about')}
        >
          <div className="flex flex-col items-center space-y-1">
            <span className="font-mono text-[9px] font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
              RECRUITER OVERVIEW
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center p-1">
              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
