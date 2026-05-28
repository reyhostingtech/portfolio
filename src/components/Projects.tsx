import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit, 
  Terminal, 
  Play, 
  Globe, 
  ExternalLink, 
  Github, 
  Search, 
  RefreshCw, 
  Network, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Check, 
  ShieldAlert,
  ServerCrash
} from 'lucide-react';
import { projects, Project } from '../portfolioConfig';

interface DNSRecordSim {
  type: string;
  name: string;
  ttl: number;
  value: string;
  status: 'propagated' | 'warning' | 'error';
  explanation: string;
  fixGuide: string;
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'case-studies' | 'dns-tool'>('case-studies');
  const [dnsDomain, setDnsDomain] = useState('portfolio-diagnostics.com');
  const [recordType, setRecordType] = useState<'A' | 'MX' | 'TXT' | 'CNAME' | 'NS'>('MX');
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryProgress, setQueryProgress] = useState(0);
  const [queryStep, setQueryStep] = useState('');
  const [dnsResult, setDnsResult] = useState<DNSRecordSim | null>(null);

  // Run simulated DNS query trace
  const handleDnsResolve = () => {
    setIsQuerying(true);
    setQueryProgress(10);
    setQueryStep('Establishing socket request on resolver... Port 53');
    setDnsResult(null);

    // Timeline steps simulation
    const steps = [
      { p: 30, text: 'Querying global root DNS authority servers...' },
      { p: 55, text: 'Locating authoritative TLD Nameservers for zone files...' },
      { p: 80, text: 'Fetching TXT/MX records via Cebu DNS caching hub...' },
      { p: 100, text: 'Propagation packet fully decoded successfully.' }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setQueryProgress(steps[stepIdx].p);
        setQueryStep(steps[stepIdx].text);
        stepIdx++;
      } else {
        clearInterval(interval);
        generateDnsResult();
        setIsQuerying(false);
      }
    }, 600);
  };

  const generateDnsResult = () => {
    let domainVal = dnsDomain.trim().toLowerCase();
    if (!domainVal) domainVal = 'portfolio-diagnostics.com';

    let sim: DNSRecordSim;

    if (recordType === 'MX') {
      if (domainVal.includes('google') || domainVal.includes('gmail')) {
        sim = {
          type: 'MX',
          name: domainVal,
          ttl: 300,
          value: '1 aspmx.l.google.com.\n5 alt1.aspmx.l.google.com.',
          status: 'propagated',
          explanation: 'DNS checks reveal correct routing to Google Workspace authoritative MX clusters. Mails routing is functioning and secure.',
          fixGuide: 'DNS configuration verified. No remediation required. Recommended to couple this with standard SPF includes syntax.'
        };
      } else if (domainVal.includes('microsoft') || domainVal.includes('office') || domainVal.includes('outlook')) {
        sim = {
          type: 'MX',
          name: domainVal,
          ttl: 3600,
          value: `10 ${domainVal.replace(/\./g, '-')}.mail.protection.outlook.com.`,
          status: 'propagated',
          explanation: 'Identified authentic Microsoft 365 Exchange routing targets representing a correct tenant domain mapping.',
          fixGuide: 'M365 cloud link verified. Verify that active Outlook desktop profiles are running IMAP/Exchange endpoints.'
        };
      } else if (domainVal.includes('broken') || domainVal.includes('error') || domainVal.includes('spam')) {
        sim = {
          type: 'MX',
          name: domainVal,
          ttl: 14400,
          value: '0 localhost.\n10 mail.fallback-spamserver.org.',
          status: 'error',
          explanation: 'Loopback and corrupted records detected! The primary record targets localhost. Unresolvable MX paths will result in instant delivery failures.',
          fixGuide: 'Rey’s Diagnostics: Delete the duplicate loopback entries in cPanel Zone Editor. Re-declare valid servers targeting webmail or Microsoft endpoints and lower nameserver TTL to hasten propagation.'
        };
      } else {
        // Default standard cPanel Mail server setup
        sim = {
          type: 'MX',
          name: domainVal,
          ttl: 14400,
          value: `0 mail.${domainVal}.`,
          status: 'propagated',
          explanation: 'Standard local cPanel hosting mail routing records propagating correctly. Local exim mail transfer agent is in service.',
          fixGuide: 'Normal server response. If clients report outgoing mail failures, review web server blacklisting lists or SPF structure.'
        };
      }
    } else if (recordType === 'A') {
      if (domainVal.includes('cloudflare') || domainVal.includes('cdn')) {
        sim = {
          type: 'A',
          name: domainVal,
          ttl: 300,
          value: '104.21.78.114\n172.67.135.20',
          status: 'propagated',
          explanation: 'Double IP addresses detected. Hosting is proxied successfully behind Cloudflare CDN caching and DDoS filter shields.',
          fixGuide: 'Secure Cloudflare tunnel active. Make sure SSL configuration under Cloudflare is set to "Full" or "Strict" to avoid infinite redirection loops in cPanel.'
        };
      } else if (domainVal.includes('broken') || domainVal.includes('error')) {
        sim = {
          type: 'A',
          name: domainVal,
          ttl: 86400,
          value: '0.0.0.0',
          status: 'error',
          explanation: 'Default or null IP A-record returned. Domain points to invalid routing blocks or lacks an active server container.',
          fixGuide: 'Rey’s Diagnostics: Update your root A-record (@) inside DNS Zone editor to point to your premium cPanel shared housing IP. Ensure WHOIS nameserver matches authoritative files.'
        };
      } else {
        sim = {
          type: 'A',
          name: domainVal,
          ttl: 14400,
          value: '192.168.100.41', // Simulated hosting IP
          status: 'propagated',
          explanation: 'Successfully resolved IP pointing to a custom WHM/cPanel hosting server account partition (Shared Web Hosting environment).',
          fixGuide: 'Correct mapping. Ensure appropriate AAAA registers are updated or removed if IPv6 support is not actively deployed.'
        };
      }
    } else if (recordType === 'TXT') {
      // SPF, DKIM checker
      if (domainVal.includes('google') || domainVal.includes('outlook') || domainVal.includes('valid')) {
        sim = {
          type: 'TXT',
          name: domainVal,
          ttl: 3600,
          value: '"v=spf1 include:_spf.google.com include:_spf.salesforce.com ~all"',
          status: 'propagated',
          explanation: 'Legitimate SPF record found. Mails outgoing servers are declared, minimizing bulk junk triggers.',
          fixGuide: 'Correctly configured. Recommend verifying DKIM _domainkey matching TXT registers to reinforce mail validation.'
        };
      } else if (domainVal.includes('spam') || domainVal.includes('error') || domainVal.includes('broken') || !domainVal.includes('.')) {
        sim = {
          type: 'TXT',
          name: domainVal,
          ttl: 14400,
          value: '"v=spf1 ip4:192.168.1.1 ip4:10.0.0.1 ~all" - [DUPLICATE REGISTER FOUND: "v=spf1 include:anotherhost.net -all"]',
          status: 'warning',
          explanation: 'Critical SPF Warning: Multiple disjointed SPF records detected! Web standards prohibit declaring multiple SPF TXT records. Mail clients (Outlook, Gmail) will discard validation checks, triggering spam folder box placement.',
          fixGuide: 'Rey’s Diagnostics: Multiple SPF headers are invalid. Consolidate them into a unified line. Example: "v=spf1 ip4:192.168.1.1 include:anotherhost.net ~all". Clear old duplicated TXT entries from cPanel.'
        };
      } else {
        sim = {
          type: 'TXT',
          name: domainVal,
          ttl: 14400,
          value: '"v=spf1 +ip4:192.168.100.41 +a +mx ~all"',
          status: 'propagated',
          explanation: 'Standard direct SPF validation record protecting local cPanel outgoing emails routing.',
          fixGuide: 'Record verified. Ensure to replace "~all" with "-all" in highly secure servers once outgoing mail flow is thoroughly tested.'
        };
      }
    } else if (recordType === 'CNAME') {
      if (domainVal.includes('broken') || domainVal.includes('error')) {
        sim = {
          type: 'CNAME',
          name: `www.${domainVal}`,
          ttl: 14400,
          value: `mismatched-hosting-target.com`,
          status: 'error',
          explanation: 'CNAME chain lookup points to a missing or non-matching domain namespace register, resulting in invalid SSL certificates warnings!',
          fixGuide: 'Rey’s Diagnostics: Align the CNAME aliases target with the true hosting domain. CNAME must point directly to "domain.com", not external servers.'
        };
      } else {
        sim = {
          type: 'CNAME',
          name: `www.${domainVal}`,
          ttl: 14400,
          value: `${domainVal}`,
          status: 'propagated',
          explanation: 'Standard www redirect CNAME routing back to root primary zone correctly.',
          fixGuide: 'Correct. Check if .htaccess rules seamlessly canonicalize www requests to HTTPS root directories.'
        };
      }
    } else {
      // NS
      if (domainVal.includes('broken') || domainVal.includes('error') || domainVal.includes('spam')) {
        sim = {
          type: 'NS',
          name: domainVal,
          ttl: 86450,
          value: 'ns1.cloudflare.com.\nns2.cpanel-hostingprovider.net.',
          status: 'warning',
          explanation: 'Conflicting authoritative nameservers! Zone files show Cloudflare and local cPanel registers mixed. This yields highly unpredictable server loading, and emails will intermittently bounce.',
          fixGuide: 'Rey’s Diagnostics: Standard domains must point exclusively to ONE DNS authority. If utilizing Cloudflare: change your domain registrar tags to match Cloudflare only, and manage zone edit records in their portal.'
        };
      } else {
        sim = {
          type: 'NS',
          name: domainVal,
          ttl: 86400,
          value: `ns1.premium-nameservers.com.\nns2.premium-nameservers.com.`,
          status: 'propagated',
          explanation: 'Consistent nameserver delegation detected. Zone authoritative resolution is stable and unified.',
          fixGuide: 'Authoritative links active. Pointing to dedicated shared hosting servers.'
        };
      }
    }

    setDnsResult(sim);
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-wider mb-2 font-semibold">
            <FolderGit className="w-4 h-4" />
            <span>OPERATION MANUALS & TESTING</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Case Studies & Diagnostics
          </h2>
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded mx-auto mt-4" />
          <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
            Read through my documented case studies on migrations and email delivery, or run a live test query in my DNS Simulator playground.
          </p>
        </div>

        {/* Navigation Tabs - Switch between Projects list and DNS Checker Toy */}
        <div className="flex items-center justify-center space-x-3 mb-12" id="portfolio-tabs">
          <button
            onClick={() => setActiveTab('case-studies')}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === 'case-studies'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>📄 Hosting Case Studies</span>
          </button>
          
          <button
            onClick={() => setActiveTab('dns-tool')}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center space-x-2 border ${
              activeTab === 'dns-tool'
                ? 'bg-slate-900 border-slate-900 text-white shadow-md dark:bg-blue-900/30 dark:border-blue-700'
                : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Terminal className="w-4 h-4 text-blue-500 animate-pulse" />
            <span>⚡ Global DNS Diagnostics Simulator</span>
          </button>
        </div>

        {/* View 1: Dynamic Case Studies List */}
        {activeTab === 'case-studies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto" id="projects-grid">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-[#0E1322] border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-500/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                id={`project-card-${idx}`}
              >
                {/* Visual Thumbnail Gradient card */}
                <div className={`p-6 bg-gradient-to-tr ${proj.thumbnail} text-white relative h-36 flex flex-col justify-between overflow-hidden`}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-xl" />
                  <span className="font-mono text-[9px] font-bold tracking-widest bg-black/20 backdrop-blur-md px-2.5 py-1 rounded w-fit uppercase">
                    {proj.category}
                  </span>
                  <div className="flex items-center space-x-2 font-mono text-[10px] text-blue-200">
                    <Terminal className="w-4 h-4" />
                    <span>Rey's System Playbook #0{idx + 1}</span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-snug mb-3">
                      {proj.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal mb-6">
                      {proj.description}
                    </p>
                  </div>

                  {/* Skills badges */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.skillsUsed.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-[9px] sm:text-[10px] font-semibold bg-white dark:bg-[#0B0F19] text-blue-600 dark:text-blue-400 border border-slate-200/50 dark:border-slate-800 px-2 py-0.5 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Footer buttons link */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-800/80">
                      <a
                        href={proj.demoLink}
                        className="font-sans font-bold text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                      >
                        <Play className="w-3.5 h-3.5 shrink-0" />
                        <span>Read Case Documentation</span>
                      </a>
                      
                      <a
                        href={proj.githubLink}
                        className="p-2 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#0B0F19] rounded-lg transition-all"
                        title="View diagnostic codebase"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* View 2: Global DNS Diagnostics Simulator */}
        {activeTab === 'dns-tool' && (
          <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 dark:border-blue-900/30 shadow-2xl max-w-4xl mx-auto" id="dns-playground">
            
            {/* Tool Heading */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <Network className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-white">Global DNS propagation check</h3>
                  <p className="font-mono text-[10px] text-slate-400 tracking-tight">Active API endpoint: local-dns-resolver-v1</p>
                </div>
              </div>
              
              <span className="flex items-center space-x-1 text-emerald-400 font-mono text-[11px] font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 rounded">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-1" />
                CACHE REFRESH ONLINE
              </span>
            </div>

            {/* Recruiter instructions block */}
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-800/80 mb-6">
              <p className="font-sans text-xs text-slate-300 leading-relaxed font-normal">
                💡 <strong className="text-white">Recruiter Guide:</strong> Try entering some custom domains to see different output states. For instance: type <strong className="text-blue-400 font-mono text-[11px]">broken-dns.com</strong> to simulate loopbacks Nameserver conflicts, or type <strong className="text-blue-400 font-mono text-[11px]">spam-errors.org</strong> to check SPF mismatch warnings. Any other standard domain will return cached resolved registers pointing to a cPanel shared tier.
              </p>
            </div>

            {/* Input Controls row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
              
              {/* Domain Input */}
              <div className="md:col-span-6">
                <label className="block font-mono text-[11px] font-semibold uppercase text-slate-400 mb-2">Target Hostname Directory</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 leading-none pl-3 flex items-center text-slate-500 font-mono text-sm">https://</span>
                  <input
                    type="text"
                    value={dnsDomain}
                    onChange={(e) => setDnsDomain(e.target.value)}
                    placeholder="e.g. yourcompany.com"
                    disabled={isQuerying}
                    className="w-full pl-18 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-100 placeholder-slate-650 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Record Type select */}
              <div className="md:col-span-3">
                <label className="block font-mono text-[11px] font-semibold uppercase text-slate-400 mb-2">Record Protocol Type</label>
                <select
                  value={recordType}
                  onChange={(e) => setRecordType(e.target.value as any)}
                  disabled={isQuerying}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-100 focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-50"
                >
                  <option value="MX">MX (Mail routing)</option>
                  <option value="A">A (IPv4 Address)</option>
                  <option value="TXT">TXT (SPF Deliverability)</option>
                  <option value="CNAME">CNAME (Alias redir)</option>
                  <option value="NS">NS (Authoritative Nameservers)</option>
                </select>
              </div>

              {/* Trigger Button */}
              <div className="md:col-span-3 flex items-end">
                <button
                  onClick={handleDnsResolve}
                  disabled={isQuerying}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-sans font-semibold text-xs sm:text-sm shadow shadow-blue-500/10 cursor-pointer transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${isQuerying ? 'animate-spin' : ''}`} />
                  <span>{isQuerying ? 'Querying...' : 'Lookup DNS'}</span>
                </button>
              </div>

            </div>

            {/* Resolver Trace Loading Screen */}
            {isQuerying && (
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center py-12">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                  <Network className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h4 className="font-display font-medium text-white mb-2">Executing globally coordinated lookup...</h4>
                <p className="font-mono text-[10px] text-blue-400 animate-pulse">{queryStep}</p>
                <div className="w-48 bg-slate-800 h-1 rounded-full overflow-hidden mt-4">
                  <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${queryProgress}%` }} />
                </div>
              </div>
            )}

            {/* Simulated Query Results Output panel */}
            <AnimatePresence>
              {!isQuerying && dnsResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-950 rounded-2xl p-5 border border-slate-850">
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-900 pb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-sans text-xs text-slate-400 font-bold">Query Host:</span>
                        <span className="font-mono text-xs text-blue-400 select-all font-bold">{dnsResult.name}</span>
                      </div>
                      
                      {dnsResult.status === 'propagated' ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 font-mono text-[10px] font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>PROPAGATED SECURELY</span>
                        </span>
                      ) : dnsResult.status === 'warning' ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-amber-500/5 text-amber-400 border border-amber-500/10 font-mono text-[10px] font-bold animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>ZONE CONFIGURATION WARNING</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-red-500/5 text-red-400 border border-red-500/10 font-mono text-[10px] font-bold">
                          <ServerCrash className="w-3.5 h-3.5" />
                          <span>RESOLVER ERROR BLOCK</span>
                        </span>
                      )}
                    </div>

                    {/* Table View */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs">
                        <thead>
                          <tr className="border-b border-slate-900 text-slate-500">
                            <th className="pb-2">TYPE</th>
                            <th className="pb-2">TARGET HOST</th>
                            <th className="pb-2">TTL</th>
                            <th className="pb-2">RESOLVED VALUES MAP</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-slate-350">
                            <td className="py-3 text-blue-400 font-semibold">{dnsResult.type}</td>
                            <td className="py-3 font-semibold">{dnsResult.name}</td>
                            <td className="py-3">{dnsResult.ttl}s</td>
                            <td className="py-3 text-white font-bold select-all whitespace-pre-line">{dnsResult.value}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Explanatory description of DNS query */}
                    <div className="mt-4 pt-4 border-t border-slate-900">
                      <h4 className="font-mono text-[11px] font-bold uppercase text-slate-400 mb-1">Packet Analyzer Logs</h4>
                      <p className="font-sans text-xs text-slate-305 leading-relaxed font-normal">{dnsResult.explanation}</p>
                    </div>

                  </div>

                  {/* Rey's Custom Technical Support Diagnostics Guide */}
                  <div className="bg-slate-950 border border-blue-500/10 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl transform translate-x-4 -translate-y-4" />
                    <div className="flex items-start space-x-4">
                      
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0" />
                      </div>

                      <div>
                        <h4 className="font-display font-black text-xs sm:text-sm text-white mb-2 flex items-center tracking-wide">
                          <span className="inline-block w-1.5 h-3.5 bg-blue-500 rounded-sm mr-2" />
                          REY'S TECHNICAL DIAGNOSTIC REPORT
                        </h4>
                        
                        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-3 whitespace-pre-line italic">
                          "{dnsResult.fixGuide}"
                        </p>
                        
                        {dnsResult.status !== 'propagated' && (
                          <div className="font-mono text-[10px] font-bold text-red-400 flex items-center">
                            <X className="w-3.5 h-3.5 mr-1 shrinking-0" />
                            <span>Actionable support ticket queued (Flagged for Diagnostic Review)</span>
                          </div>
                        )}
                        {dnsResult.status === 'propagated' && (
                          <div className="font-mono text-[10px] font-bold text-emerald-400 flex items-center">
                            <Check className="w-3.5 h-3.5 mr-1 shrinking-0" />
                            <span>Mail security SPF audit fully resolved and authenticated</span>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* Zero state check */}
            {!isQuerying && !dnsResult && (
              <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-900" id="playground-blank-slate">
                <Terminal className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <h4 className="font-display font-medium text-slate-400">DNS Zone Analyzer Offline</h4>
                <p className="font-sans text-xs text-slate-600">Enter a server zone above and tap 'Lookup DNS' to verify propagation parameters.</p>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
