import React from 'react';
import { FileText, Download, Printer, ShieldCheck, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { portfolioInfo, experiences } from '../portfolioConfig';

export default function Resume() {
  const triggerPrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20 bg-slate-50 dark:bg-[#0E1322] border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-wider mb-2 font-semibold">
            <FileText className="w-4 h-4" />
            <span>CURRICULUM VITAE PREVIEW</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Professional Resume
          </h2>
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded mx-auto mt-4" />
          <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
            Instant HTML view optimized for modern recruiters and HR Applicant Tracking Systems (ATS).
          </p>
        </div>

        {/* Action triggers bars */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8" id="resume-controls">
          <button
            onClick={triggerPrint}
            className="px-5 py-2.5 rounded-lg font-sans font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 active:scale-98 shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save to PDF</span>
          </button>
          
          <a
            href={portfolioInfo.resumeLink}
            className="px-5 py-2.5 rounded-lg font-sans font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow shadow-blue-500/10 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Copy</span>
          </a>
        </div>

        {/* The CV Document Canvas Sheet representation */}
        <div className="bg-white dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 max-w-4xl mx-auto rounded-3xl p-6 sm:p-12 border border-slate-200/50 dark:border-slate-800 shadow-xl" id="resume-sheet">
          <div className="space-y-8" id="resume-document-workspace">
            
            {/* CV Header: Name & Contact Metadata */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
              <div>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight uppercase">
                  {portfolioInfo.name}
                </h1>
                
                <h2 className="font-display font-bold text-base sm:text-lg text-blue-600 dark:text-blue-400 mt-1">
                  {portfolioInfo.title}
                </h2>
                
                <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-450 shrink-0" />
                  <span>Cebu, Philippines</span>
                </p>
              </div>

              {/* Contact parameters lists */}
              <div className="space-y-2 font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-350 bg-slate-50 dark:bg-[#0E1322] border border-slate-100 dark:border-slate-800/80 p-4 rounded-xl shrink-0 w-full md:w-auto">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <a href={`mailto:${portfolioInfo.email}`} className="hover:underline select-all">{portfolioInfo.email}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="select-all">{portfolioInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <a href={portfolioInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn Profile</a>
                </div>
              </div>
            </div>

            {/* Profile Overview */}
            <div>
              <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                Executive Profile Summary
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {portfolioInfo.heroIntroduction}
              </p>
            </div>

            {/* Grid splits: Experience left, Education/Skills right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-150 dark:border-slate-800">
              
              {/* Left Column: Work History */}
              <div className="lg:col-span-8 space-y-6">
                <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wide">
                  Employment History
                </h3>

                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {exp.role}
                          </h4>
                          <div className="font-sans text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            {exp.company} ({exp.location})
                          </div>
                        </div>
                        <span className="font-mono text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                          {exp.dates}
                        </span>
                      </div>

                      <ul className="list-disc list-outside pl-4 space-y-1.5 font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

              </div>

              {/* Right Column: Technical Core and Education */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Core Expertise Bullet points */}
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wide">
                    Technology Stack
                  </h3>
                  
                  <div className="flex flex-wrap gap-2" id="cv-tech-pills">
                    {["cPanel/WHM", "Global DNS", "SMTP/IMAP", "Microsoft 355", "Outlook Sync", "SSL (HTTPS)", "Linux Servers", "FTP / Unix Permissions", "Cloudflare DNS", "Troubleshooting", "Domain Migration", "Value-Added Upsales"].map((pill, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education Section */}
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wide">
                    Education
                  </h3>

                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white leading-tight">
                      Bachelor of Science in Information Technology
                    </h4>
                    <p className="font-sans text-[11px] text-slate-550 dark:text-slate-400 mt-0.5">
                      Cebu Institute of Technology-University
                    </p>
                    <span className="font-mono text-[9px] text-slate-400 font-bold">Graduated 2020</span>
                  </div>
                </div>

                {/* Support Strengths */}
                <div className="space-y-2 bg-blue-50/30 dark:bg-blue-950/20 border border-blue-500/10 p-4 rounded-xl">
                  <h4 className="font-display font-bold text-xs text-blue-900 dark:text-blue-200 flex items-center uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-blue-500 mr-2" />
                    Specializations
                  </h4>
                  <ul className="space-y-1 text-[11px] font-sans text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                    <li>• cPanel & WHM Server Operations</li>
                    <li>• Microsoft 365 Domain Administration</li>
                    <li>• Post-Support Revenue Advisory</li>
                  </ul>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
