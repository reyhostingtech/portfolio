import React from 'react';
import { motion } from 'motion/react';
import { User, Target, BadgeCheck, Clock, Layers, Star } from 'lucide-react';
import { portfolioInfo } from '../portfolioConfig';

export default function About() {
  const metrics = [
    {
      label: "Hosting Experience",
      value: "8 Years",
      description: "Dedicated L1 technical hosting analyst at Fasthosts Ltd and customer handling foundation.",
      icon: Clock,
      iconColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/30 border-blue-200/50 dark:border-blue-900/50"
    },
    {
      label: "Solutions Advisory",
      value: "Sales & Support",
      description: "Successfully recommended hosting tier additions and product expansions after solving technical issues.",
      icon: Star,
      iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200/50 dark:border-amber-900/50"
    },
    {
      label: "DNS & Mail Diagnostics",
      value: "Expert",
      description: "Resolving complex domain delegation nameservers, SPF keys, and Microsoft 365 configuration queries.",
      icon: BadgeCheck,
      iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-900/50"
    },
    {
      label: "Control Panel & WHM",
      value: "cPanel Specialist",
      description: "Handling file directories, server resource limits, databases, and secure FTP account migrations.",
      icon: Layers,
      iconColor: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200/50 dark:border-indigo-900/50"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-wider mb-2 font-semibold">
            <User className="w-4 h-4" />
            <span>EXPERT SYNOPSIS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            About Rey Purgatorio
          </h2>
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded mx-auto mt-4" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column Left: Text & Career Mission */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h3 className="font-display font-semibold text-xl text-slate-800 dark:text-slate-100 flex items-center mb-4">
                <span className="inline-block w-2.5 h-6 bg-blue-600 rounded-sm mr-3"></span>
                My Technical Support Mission Statement
              </h3>
              <p className="font-sans text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {portfolioInfo.aboutText}
              </p>
            </div>

            {/* Career Objective Visual Card block */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/85 rounded-xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-600 text-white rounded-lg shadow shadow-blue-500/10">
                  <Target className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2">
                    Professional Career Objective
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {portfolioInfo.careerObjective}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column Right: High Performance Key Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((m, idx) => {
              const IconComponent = m.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0E1322] border border-slate-100 dark:border-slate-800/60 rounded-xl p-5 shadow-sm hover:shadow transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tracking-wider">
                      METRIC #0{idx + 1}
                    </span>
                    <div className={`p-2 rounded-lg border ${m.iconColor} transition-transform duration-300 group-hover:scale-105`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="block font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tighter mb-1 select-none">
                      {m.value}
                    </span>
                    <span className="block font-display font-semibold text-xs text-slate-900 dark:text-slate-200 mb-2">
                      {m.label}
                    </span>
                    <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      {m.description}
                    </p>
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
