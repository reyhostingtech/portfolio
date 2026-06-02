import React from 'react';
import { Award, ShieldCheck, Cpu, Globe, ExternalLink, Palette, TrendingUp } from 'lucide-react';
import { certifications, Certification } from '../portfolioConfig';

export default function Certifications() {
  const iconMap: Record<string, any> = {
    ShieldCheck: ShieldCheck,
    Cpu: Cpu,
    Globe: Globe,
    Award: Award,
    Palette: Palette,
    TrendingUp: TrendingUp
  };

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-wider mb-2 font-semibold">
            <Award className="w-4 h-4" />
            <span>CREDENTIAL VERIFICATION</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Industry Certifications & Credentials
          </h2>
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded mx-auto mt-4" />
          <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
            Professional qualifications demonstrating certified knowledge of server hosting frameworks, DNS architecture, WordPress/CMS engineering, SEO, and brand asset management.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto" id="certifications-grid">
          {certifications.map((cert, idx) => {
            const IconComponent = iconMap[cert.iconName] || Award;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-[#0E1322] border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 dark:hover:border-blue-500/30 hover:shadow shadow-blue-500/5 transition-all duration-300 group"
                id={`cert-card-${idx}`}
              >
                <div>
                  {/* Badge Row icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[9px] font-bold text-slate-400 tracking-wider">
                      CREDENTIAL #{idx + 1}
                    </span>
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30 rounded-xl group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Certification Details */}
                  <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <div className="font-display font-semibold text-xs text-slate-700 dark:text-slate-350">
                    {cert.issuer}
                  </div>
                </div>

                {/* Footer validation link */}
                <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">
                    ISSUED {cert.date}
                  </span>
                  
                  <a
                    href={cert.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                    title="Open credential page"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
