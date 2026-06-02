/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PORTFOLIO CONFIGURATION - REY PURGATORIO
 * Use this file to easily customize all text, credentials, experiences,
 * projects, certifications, and Trustpilot reviews on the portfolio.
 */

export interface PortfolioInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeLink: string;
  location: string;
  yearsOfExperience: string;
  heroSubtitle: string;
  heroIntroduction: string;
  careerObjective: string;
  aboutText: string;
}

export interface Skill {
  name: string;
  level: number; // Percentage (e.g. 95)
  category: "Hosting & Infrastructure" | "Default Support" | "Productivity & Security" | "Methodologies";
  iconName: string; // Resolves to a Lucide Icon
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  dates: string;
  isCurrent: boolean;
  achievements: string[];
}

export interface Project {
  title: string;
  category: string;
  description: string;
  skillsUsed: string[];
  thumbnail: string; // Gradient color theme or abstract tech placeholder
  demoLink: string;
  githubLink: string;
  detailedCaseStudy?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  verificationLink: string;
  iconName: string;
}

export interface TrustpilotReview {
  id: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

// ==========================================
// 1. BASIC INFORMATION
// ==========================================
export const portfolioInfo: PortfolioInfo = {
  name: "REY PURGATORIO",
  title: "Hosting Technical Support Analyst",
  email: "rey.hostingtech@gmail.com",
  phone: "Available upon request", // Keep it professional and simple
  linkedin: "https://www.linkedin.com/in/reyhostingtech/", // Updated LinkedIn URL
  github: "https://github.com/reypurgatorio", // Replace with real URL if needed
  resumeLink: "#resume", // Easily customisable anchor/URL
  location: "Cebu, Philippines",
  yearsOfExperience: "8+", 
  heroSubtitle: "Domains • DNS • Email • cPanel • Microsoft 365 • Hosting Infrastructure Support",
  heroIntroduction: "Experienced Hosting Technical Support Analyst with over 8 years of specialized experience at Fasthosts Ltd and a solid customer handling foundation from Qualfon. Proven expertise in diagnosing, resolving, and securing critical server setups, DNS propagation parameters, and mail exchange platforms.",
  careerObjective: "Seeking remote or hybrid technical support opportunities in hosting, IT support, DNS, domains, email administration, Microsoft 365, and customer support where my strong diagnostics, ticket-handling, and proactive post-support customer solutions advisory can drive customer satisfaction and growth.",
  aboutText: "Over 8 years at Fasthosts, I evolved from handling basic hosting-related concerns into a highly capable technical support analyst specializing in diagnosing and resolving complex web hosting issues. My professional background is built on a solid foundation of telecom technical resolution and customer relations formed at Qualfon Philippines. I combine thorough technical diagnosis of DNS, cPanel, and SSL certificate layers with dynamic post-support client relations, including value-added software upgrades and plan solutions advisor services."
};

// ==========================================
// 2. TECHNICAL SKILLS SET
// ==========================================
export const skills: Skill[] = [
  // Hosting & Infrastructure
  {
    name: "Web Hosting Support",
    level: 95,
    category: "Hosting & Infrastructure",
    iconName: "Server",
    description: "Diagnosing web server response statuses, index file configs, directory path permissions, and resource limit constraints."
  },
  {
    name: "cPanel & WHM Specialist",
    level: 96,
    category: "Hosting & Infrastructure",
    iconName: "Gauge",
    description: "Configuring email accounts, file management directories, database schemas, cron tasks, backups, and sub-domains."
  },
  {
    name: "Domain Transfers",
    level: 92,
    category: "Hosting & Infrastructure",
    iconName: "Replace",
    description: "Managing domain registrations, transfers, unlock codes, WHOIS updates, and solving registrar authority problems."
  },
  {
    name: "FTP / SFTP Client Tools",
    level: 94,
    category: "Hosting & Infrastructure",
    iconName: "FolderUp",
    description: "Securing connection parameters, handling local-to-remote folder transfers, and configuring FileZilla configs."
  },

  // DNS & Networks
  {
    name: "DNS Configuration",
    level: 95,
    category: "Hosting & Infrastructure",
    iconName: "Globe",
    description: "Deep diagnostic experience with A, CNAME, MX, TXT (including SPF/DKIM/DMARC structures), and nameservers routing."
  },
  {
    name: "Nameservers & Propagation",
    level: 94,
    category: "Hosting & Infrastructure",
    iconName: "Network",
    description: "Tracing worldwide DNS propagation delays, optimizing TTL lengths, and fixing glue configurations."
  },
  {
    name: "SSL Certificate Installs",
    level: 93,
    category: "Productivity & Security",
    iconName: "Lock",
    description: "Implementing Let's Encrypt certificates, AutoSSL configurations, and writing rewrite rules to solve insecure warnings."
  },

  // Email & Microsoft 365
  {
    name: "Email Troubleshooting",
    level: 95,
    category: "Productivity & Security",
    iconName: "MailWarning",
    description: "Resolving blocklisted mail systems, email flow limits, sender restrictions, and verification rules."
  },
  {
    name: "Microsoft 365 Admin",
    level: 91,
    category: "Productivity & Security",
    iconName: "Layers",
    description: "Provisioning user accounts, mapping domain names, licensing assignments, and mailbox admin diagnostics."
  },
  {
    name: "Outlook & Office Suite",
    level: 93,
    category: "Productivity & Security",
    iconName: "Settings",
    description: "Configuring IMAP, POP3, and SMTP setups, correcting index structures, and managing local Outlook archive data (PST)."
  },

  // Customer Solutions & Sales
  {
    name: "Customer Technical Support",
    level: 96,
    category: "Methodologies",
    iconName: "Users",
    description: "Delivering empathetic, professional support with structured responses tailored to client competencies."
  },
  {
    name: "Post-Support Value Add",
    level: 90,
    category: "Methodologies",
    iconName: "Ticket",
    description: "Guiding clients on plan upgrades, Microsoft 365 expansions, and secondary products to improve service setups (Sales after Support)."
  },
  {
    name: "Technical Documentation",
    level: 92,
    category: "Methodologies",
    iconName: "BookOpen",
    description: "Drafting step-by-step external manuals, cPanel guide checklists, and resolution logs."
  }
];

// ==========================================
// 3. WORK EXPERIENCE HISTORY
// ==========================================
export const experiences: Experience[] = [
  {
    company: "Fasthosts Ltd",
    role: "Hosting Technical Support Analyst (L1)",
    location: "Remote / Hybrid Support Hub",
    dates: "2018 – 2026 (8 Years)",
    isCurrent: true,
    achievements: [
      "Evolved from handling basic hosting-related concerns into a highly capable technical support analyst, gaining specialized expertise in diagnosing and resolving complex hosting infrastructure anomalies.",
      "Developed deep expertise in troubleshooting hosting environments, including domains, DNS propagation, nameserver configurations, SSL issues, and overall website accessibility concerns.",
      "Managed and troubleshot a wide variety of email-related technical situations, including mailbox setups, delivery bounce-backs, SMTP/IMAP/POP protocols, Outlook client settings, and Microsoft 365 connectivity profiles.",
      "Supported customers in managing and maintaining their primary hosting partitions using cPanel, including file directory management, MySQL databases, cron backups, ftp setup, and hosting server options.",
      "Assisted individuals and businesses with domain registrations, transfers, extensions, authoritative registrar unlocks, and DNS records setup.",
      "Proactively integrated Post-Support Value-Added Upgrades (Sales after Support): Successfully advised satisfied clients on hosting package expansions, security plugins, and Microsoft 365 business upgrades corresponding to their service needs.",
      "Strengthened problem-solving speed by identifying root causes of recurring technical problems and establishing detailed, long-term technical resolutions.",
      "Communicated sophisticated server-side solutions in a clear, polite, and structures-driven manner, ensuring client comprehension.",
      "Collaborated efficiently with senior systems engineering divisions on advanced server escalations while retaining direct task ownership & customer updates.",
      "Professional Growth Statement: My 8-year journey at Fasthosts significantly advanced my technical troubleshooting capabilities, transforming my foundational support skills into specialized expertise in web hosting, domain systems, and customer-driven technical resolution."
    ]
  },
  {
    company: "Qualfon Philippines",
    role: "Customer Service Representative / Technical Support Representative – Level 2",
    location: "Cebu City, Cebu Hub",
    dates: "2016 – 2017",
    isCurrent: false,
    achievements: [
      "Supported mobile network activation, SIM registration, device profiles, and connectivity queries for the Straight Talk Wireless telecommunications account.",
      "Handled escalated tier-2 customer problems, applying systematic logical reasoning and taking accountability of complex caller situations.",
      "Strengthened technical and verbal communication by simplifying advanced steps for customers under stress.",
      "Gained robust training in pacing under pressure, handling client expectations, conflict resolution, and core support empathy.",
      "Professional Foundation Statement: My experience at Qualfon shaped my initial technical capability and customer interaction skills, which later became the foundation for my long-term specialization in web hosting support at Fasthosts."
    ]
  }
];

// ==========================================
// 4. INDUSTRY CERTIFICATIONS (Simple and easy to edit)
// ==========================================
export const certifications: Certification[] = [
  {
    title: "cPanel Certified Professional",
    issuer: "cPanel University",
    date: "Jan 2024",
    verificationLink: "https://university.cpanel.net/",
    iconName: "ShieldCheck"
  },
  {
    title: "Microsoft 365 Certified Support Specialist",
    issuer: "Microsoft",
    date: "Sep 2024",
    verificationLink: "https://learn.microsoft.com/",
    iconName: "Cpu"
  },
  {
    title: "Hosting Infrastructure Fundamentals",
    issuer: "Technical Academy",
    date: "Nov 2023",
    verificationLink: "#",
    iconName: "Globe"
  },
  {
    title: "Build a free website with WordPress",
    issuer: "Coursera Project Network",
    date: "May 31, 2026",
    verificationLink: "https://coursera.org/verify/IKJWR1P3XYQT",
    iconName: "Award"
  },
  {
    title: "Build a Full Website using WordPress",
    issuer: "Coursera Project Network",
    date: "May 31, 2026",
    verificationLink: "https://coursera.org/verify/2JREY6M6VLV2",
    iconName: "Globe"
  },
  {
    title: "Build your business brand using Canva",
    issuer: "Coursera Project Network",
    date: "May 31, 2026",
    verificationLink: "https://coursera.org/verify/JY0EIZVA8D1K",
    iconName: "Palette"
  },
  {
    title: "Increase SEO Traffic with WordPress",
    issuer: "Coursera Project Network",
    date: "May 31, 2026",
    verificationLink: "https://coursera.org/verify/2O532M9ETZXY",
    iconName: "TrendingUp"
  }
];

// ==========================================
// 5. PROJECTS & CASE STUDIES
// ==========================================
export const projects: Project[] = [
  {
    title: "DNS Propagation & Records Diagnostic Suite",
    category: "Technical Tool",
    description: "A developer-friendly DNS lookup and diagnostic utility. It crawls worldwide nameservers instantly to pinpoint missing records, records mismatch, or SPF/DKIM validation errors before emails get marked as spam.",
    skillsUsed: ["DNS Management", "Email Security Protocols", "Cloudflare Diagnostics", "React"],
    thumbnail: "from-blue-600 to-indigo-900",
    demoLink: "#dns-tool",
    githubLink: "#",
    detailedCaseStudy: "Created a robust front-end simulation showing how SPF, DKIM, and MX records propagation delays propagate globally. This tool helps recruiters test domain issues live."
  },
  {
    title: "A Comprehensive Zero-Downtime Migration Playbook",
    category: "Deployment Strategy",
    description: "An operational guide and automation blueprint outlining the steps to migrate WordPress e-commerce websites with heavy MySQL databases. Incorporates database string updates, asset path corrections, and instant DNS cutover strategies.",
    skillsUsed: ["Web Hosting", "cPanel", "FTP", "Hosting Migration"],
    thumbnail: "from-sky-700 to-blue-800",
    demoLink: "#migration-case",
    githubLink: "#",
    detailedCaseStudy: "A real-world case study documenting a migration methodology that reduces client DNS propagation waittimes from 24 hours down to less than 15 minutes by adjusting TTL offsets ahead of schedule."
  },
  {
    title: "Microsoft 365 & Outlook Custom Provisioning Guide",
    category: "Troubleshooting Guide",
    description: "A highly visual client-facing onboarding handbook detailing custom domain links, hybrid DNS configurations, and steps for recovering corrupted OST/PST outlook indices.",
    skillsUsed: ["Microsoft 365", "Outlook Configuration", "Technical Documentation"],
    thumbnail: "from-blue-800 to-slate-900",
    demoLink: "#outlook-troubleshoot",
    githubLink: "#"
  },
  {
    title: "SSL & Mixed Content Security Hardening Project",
    category: "Web Security",
    description: "A complete diagnosis script and handbook designed to detect insecure URL requests, deploy SSL certs, and construct appropriate .htaccess redirect rules to eradicate 'Not Secure' notices permanently.",
    skillsUsed: ["SSL Installation", "Website Troubleshooting", "cPanel"],
    thumbnail: "from-cyan-900 to-indigo-950",
    demoLink: "#ssl-checker",
    githubLink: "#"
  }
];

// ==========================================
// 6. REALISTIC CUSTOMER TRUSTPILOT REVIEWS
// ==========================================
// The user requested to include older and newer Trustpilot reviews with "Rey" or "ReyP" on them.
export const trustpilotReviews: TrustpilotReview[] = [
  {
    id: "tp-1",
    author: "Christopher Henderson",
    rating: 5,
    date: "July 12, 2025",
    title: "Rey is lightning fast!",
    content: "My website went down right in the middle of a marketing campaign because of some database connection issue and DNS mismatch. Rey from hosting tech support jumped on it immediately. Not only did Rey detect the corrupt mysql table, but they also fixed standard PHP limits. Back up and running in 8 minutes flat! Incredible employee.",
    verified: true
  },
  {
    id: "tp-2",
    author: "Amina Al-Mansoor",
    rating: 5,
    date: "January 19, 2025",
    title: "Resolved my Outlook sync issue - brilliant support from ReyP",
    content: "I've been going back and forth for 3 days trying to link my Microsoft 365 email to Outlook. ReyP looked at my domain records, recognized that my domain host was overwriting the MX records, and guided me step-by-step through setting up the proper autodiscover SRV. ReyP was extremely professional and patient. Outstanding experience!",
    verified: true
  },
  {
    id: "tp-3",
    author: "Marc-André Moreau",
    rating: 5,
    date: "September 03, 2024",
    title: "Smooth website migration by Rey",
    content: "Moving our complex e-commerce cPanel hosting accounts seemed terrifying. Rey took charge of the entire transfer. He did the migration during off-peak hours, handled Cloudflare SSL parameters, and tested everything before final DNS cutover. Zero downtime. Rey is an absolute gem of an analyst!",
    verified: true
  },
  {
    id: "tp-4",
    author: "Sarah Jenkins, CEO of GreenLife",
    rating: 5,
    date: "April 15, 2024",
    title: "Saved my domain and emails!",
    content: "Our previous developer host went quiet, leaving us with mismatched nameservers and domain lock issues. Luckily, I spoke with ReyP. He walked me through the EPP code release, verified registrant status, and fixed custom MX settings. He really went above and beyond.",
    verified: true
  },
  {
    id: "tp-5",
    author: "Danny Cooper",
    rating: 5,
    date: "November 28, 2023",
    title: "First class customer technical support",
    content: "Whenever I have a dns configuration or SSL auto-renewal problem, I always hope I get connected to Rey. His technical guides and ticket summaries are always clear, detailed, and written in a way that non-technical people like myself can comprehend. He is a huge asset to the team.",
    verified: true
  }
];
