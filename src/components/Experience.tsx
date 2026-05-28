import React from 'react';
import { Briefcase, MapPin, Calendar, CheckSquare, Terminal } from 'lucide-react';
import { experiences, Experience } from '../portfolioConfig';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-[#0E1322] border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-wider mb-2 font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>CHRONOLOGY OF WORK</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Professional Experience
          </h2>
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded mx-auto mt-4" />
          <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
            My detailed career progression as a specialist in cPanel, DNS, Outlook, Microsoft 365 and customer IT support.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative" id="timeline-container">
          
          {/* Vertical central backbone line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800 transform -translate-x-1/2 pointer-events-none" />

          {/* Timeline Node Listings */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  id={`timeline-node-${idx}`}
                >
                  {/* central badge circle icon */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#0A0E1A] border-2 border-blue-600 dark:border-blue-500 z-10 shadow shadow-blue-500/10">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* left/right spacer column */}
                  <div className="hidden md:block w-1/2" />

                  {/* interactive block card column */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="bg-white dark:bg-[#0B0F19] border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative group">
                      
                      {/* Active Live Status pulse locator */}
                      {exp.isCurrent && (
                        <span className="absolute top-4 right-4 inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-beacon mr-1" />
                          ACTIVE ROLE
                        </span>
                      )}

                      {/* Role & Company Header */}
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h3>
                      
                      <div className="font-display font-bold text-sm text-slate-700 dark:text-slate-200 mt-1">
                        {exp.company}
                      </div>

                      {/* Meta stats data */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-400 font-sans">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-slate-450 shrink-0" />
                          <span>{exp.dates}</span>
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-455 shrink-0" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Bulleted achievements */}
                      <div className="mt-6 space-y-3">
                        <div className="font-mono text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5 flex items-center">
                          <Terminal className="w-3.5 h-3.5 text-blue-500 mr-1.5" />
                          <span>Core Execution Logs</span>
                        </div>
                        {exp.achievements.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start space-x-2.5">
                            <CheckSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 opacity-80" />
                            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
