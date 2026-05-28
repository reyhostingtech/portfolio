import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { skills, Skill } from '../portfolioConfig';

type SkillCategory = 'All' | 'Hosting & Infrastructure' | 'Productivity & Security' | 'Methodologies';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTipSkill, setActiveTipSkill] = useState<string | null>(null);

  // Group selector categories representation
  const categories: { label: string; value: SkillCategory }[] = [
    { label: 'All Domains', value: 'All' },
    { label: 'Hosting & Infrastructure', value: 'Hosting & Infrastructure' },
    { label: 'Productivity & Email Protocols', value: 'Productivity & Security' },
    { label: 'Support Methodologies', value: 'Methodologies' }
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Safe fallback resolver for dynamic string to lucide icons
  const renderSkillIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
    return <Icons.Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
  };

  // Custom premium troubleshooting tips written specifically to impress recruiter audiences
  const getTroubleshootingTipForSkill = (skillName: string): string => {
    switch (skillName) {
      case "DNS Management":
        return "Expert Tip: When correcting client DNS propagation lags, decrease the TTL value (e.g. down to 300s) at least 24 hours prior to standard record modifications to ensure prompt lookup refresh and zero global disruption.";
      case "Web Hosting":
        return "Diagnostic Tip: A 500 Internal Server Error is frequently triggered by a corrupted .htaccess file, incorrect directory permission levels (dirs should be 755, files 644), or memory capacity bottlenecks in your php.ini parameters.";
      case "Email Troubleshooting":
        return "Deliverability Tip: Always certify that client SPF records contain the exact sending server IP blocks, DKIM is properly matched with DNS key variables, and DMARC is set up with valid reporting channels to avoid bulk junk placement.";
      case "cPanel & WHM":
        return "Control Panel Pro-Tip: Inode exhaustion yields MySQL write failures even when account memory has 50% storage quota left. Clear backup caches or delete core files from error logs.";
      case "Microsoft 365 Administration":
        return "Cloud Admin Tip: Verify custom domain linkings by configuring standard SRV parameters (_sip._tls) to align teams and resolve MS Teams synchronization issues.";
      case "Outlook Configuration":
        return "Configuration Tip: Standard synchronization locks are easily resolved by rebuilding damaged .ost caches or toggling off Cached Exchange Mode settings on slow internet lines.";
      case "SSL Installation & HTTPS":
        return "Security Tip: Mixed content warnings happen when direct absolute resource anchors (HTTP) are embedded in a secure page. Replace them with relative structures or force rules in .htaccess.";
      case "Domain Transfers & Renewals":
        return "Registrar Tip: Domain transfers often stall when WHOIS Privacy is fully locked. Remind clients to disable privacy protection and request registrar unlock codes (EPP codes) concurrently.";
      case "Website Troubleshooting":
        return "Debugging Tip: A database link error on WordPress usually boils down to a literal password issue in wp-config.php or is solved by whitelisting server hosting IPs for external database calls.";
      case "Nameservers & Propagation":
        return "Networking Tip: Do not mix unrelated nameservers in matching zones. Having some nameservers pointing to Cloudflare and others to cPanel creates highly unpredictable DNS routing.";
      case "Customer Technical Support":
        return "Customer Care Tip: Acknowledge client stress first! Express clear accountability immediately with simple words, then walk them through visual proof after fixing their issue.";
      default:
        return "Technical Insight: Understanding configuration dependencies, system parameters, and keeping clean logs ensures faster incident recoveries during critical outages.";
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-[#0E1322] border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-wider mb-2 font-semibold">
            <Icons.Cpu className="w-4 h-4" />
            <span>EXPERT CAPABILITIES</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Technical Skills & Diagnostics
          </h2>
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded mx-auto mt-4" />
          <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
            A granular overview of my hosting proficiency, email protocols, and support metrics. Click on any capability badge to see active support tips.
          </p>
        </div>

        {/* Search & Selection Controls Suite */}
        <div className="bg-white dark:bg-[#0B0F19] rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm max-w-5xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icons.Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search specific support skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-55 dark:bg-slate-900/50 font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                id="skill-search"
              />
            </div>

            {/* Category Filter Selectors */}
            <div className="flex flex-wrap items-center justify-center gap-1.5" id="skill-filters">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setSelectedCategory(c.value);
                    setActiveTipSkill(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg font-sans text-xs font-semibold cursor-pointer transition-all duration-150 ${
                    selectedCategory === c.value
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-250 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" id="skills-grid">
          {filteredSkills.map((skill, index) => {
            const isTipOpen = activeTipSkill === skill.name;
            return (
              <motion.div
                layout
                key={skill.name}
                className={`bg-white dark:bg-[#0B0F19] border rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 select-none ${
                  isTipOpen
                    ? 'border-blue-500 dark:border-blue-500/70 ring-1 ring-blue-500/20 shadow-blue-500/5'
                    : 'border-slate-200/65 dark:border-slate-800/70 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
                onClick={() => setActiveTipSkill(isTipOpen ? null : skill.name)}
                id={`skill-card-${index}`}
              >
                {/* Card Header (Icon & Mastery Title) */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100/50 dark:border-blue-900/30">
                      {renderSkillIcon(skill.iconName)}
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-white">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Subtitle brief */}
                <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px] mb-4 font-normal">
                  {skill.description}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                  />
                </div>

                {/* Info Tip Indicator handle */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                  <span className="font-mono uppercase tracking-wide text-[9px] bg-slate-150 dark:bg-slate-800/60 px-2 py-0.5 rounded-md">
                    {skill.category.split(' ')[0]}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 font-sans">
                    <span>{isTipOpen ? 'Hide Tip' : 'Show Diagnostic Tip'}</span>
                    <Icons.ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTipOpen ? 'rotate-180' : ''}`} />
                  </span>
                </div>

                {/* Collapsible diagnostic support tip */}
                <AnimatePresence>
                  {isTipOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80"
                    >
                      <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-xl p-3.5 border border-blue-200/20 dark:border-blue-900/10">
                        <div className="flex items-start space-x-2">
                          <Icons.ShieldAlert className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <p className="font-sans text-xs italic text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
                            {getTroubleshootingTipForSkill(skill.name)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

        {/* Empty status check */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-10" id="skills-empty-state">
            <Icons.Cpu className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h4 className="font-display font-semibold text-slate-800 dark:text-slate-200">No matching support skill found</h4>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400">Try modifying your query or select custom domains above.</p>
          </div>
        )}

      </div>
    </section>
  );
}
