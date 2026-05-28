# 💻 Rey Purgatorio — Specialist Hosting Support Portfolio

A modern, highly polished, recruiter-optimized portfolio website for **REY PURGATORIO**, Hosting Technical Support Analyst. 

Designed with professional Slate-Dark and Navy-Light modes, interactive custom ticket incident simulators, and a live worldwide DNS Diagnostics & Email deliverability sandbox.

---

## 🚀 Key Architectural highlights
This portfolio has been coded with **React, Vite, and Tailwind CSS v4**. It is fully static, secure, and ready to be hosted entirely on **GitHub Pages, shared hosting (cPanel), or Cloudflare Pages**.

- **`/src/portfolioConfig.ts`**: The single source of credentials. No need to touch component structures! Rey or recruiters can edit experience bullets, certification verification links, contact phone headers, or add more Trustpilot endorsements directly.
- **⚡ DNS propagation Simulator**: An interactive DNS diagnostic console embedded inside the Projects panel. Recruiters can test domain names under A, MX, TXT, CNAME, or NS delegation records and witness live packet tracing visual steps accompanied by Custom Diagnostics tips.
- **🎫 Support Tickets Intake**: The contact panel operates on an intelligent helpdesk simulation. Submitting standard outreach requests dynamically issues custom Severity Ticket IDs.
- **📱 Fluid responsiveness**: Engineered mobile-first, ensuring smooth rendering across iPhones, Android tablets, ultra-wide desktop monitors, and high-DPI screens.
- **📄 Active CV printer**: A printable, highly optimized HTML resume segment allowing recruiters to direct-save or download standard ATS-compatible PDF summaries.
- **⭐ Verified Trustpilot endorsements**: Pre-populated reviews from customers naming "Rey"/"ReyP" resolving critical cPanel databases and email setups.

---

## 🛠️ Step-by-Step GitHub Pages Deployment Guide

### Option A: Direct deployment via GitHub Actions (Recommended)
1. **Push your repository** to your personal GitHub account.
2. In your browser, open your repo and go to **Settings** > **Pages**.
3. Under *Build and deployment*, change **Source** to **GitHub Actions**.
4. GitHub will automatically recognize your Node layout and compile/deploy using standard workflow scripts.

---

### Option B: Manual compilation & deployment (`gh-pages` branch)
If you prefer a manual CLI workflow, execute these sequence steps:

1. **Configure your base path** (If you are deploying to a user site `username.github.io` skip this step. If deploying to a project site `username.github.io/repository` edit your `vite.config.ts` as shown below):
   ```typescript
   export default defineConfig({
     base: '/REPOSITORY_NAME/', // Set your GitHub project name
     // other setups...
   });
   ```

2. **Generate the static distributable** using NPM:
   ```bash
   npm run build
   ```
   *This outputs your optimized production-ready HTML, static JS code, and stylesheets cleanly into a `/dist` container directory.*

3. **Initialize git inside your production directory** and force push to the tracking branch:
   ```bash
   cd dist
   git init
   git checkout -b gh-pages
   git add .
   git commit -m "Deploy Portfolio dist bundle"
   git remote add origin https://github.com/reypurgatorio/portfolio-repository.git
   git push -u origin gh-pages --force
   ```

4. Go into your repo settings and set the branch to build from `gh-pages` folders root. Your site will be online in less than 2 minutes!

---

## 📂 Directories & Editable Slots blueprint
```text
/
├── index.html                 # Main static template & SEO metadata headers
├── metadata.json              # Applet descriptors (Rey Purgatorio Portfolio)
├── package.json               # Modular build scripts & preinstalled packages
├── src/
│   ├── main.tsx               # Primary react mount anchor
│   ├── App.tsx                # Layout parent, loading server pre-loader & theme toggles
│   ├── index.css              # Custom scrollbars, animations, and Tailwind imports
│   ├── portfolioConfig.ts     # 👈 EDIT TODAY! Center of details (Email, links, skills)
│   └── components/            # Modular UI slots
│       ├── Header.tsx         # Sticky nav & mobile burger drawers
│       ├── Hero.tsx           # Auto-typing expertise indicators & action triggers
│       ├── About.tsx          # Career Objective, metrics counters (CSAT, resolve speeds)
│       ├── Skills.tsx         # Searchable skills categorized with tip triggers
│       ├── Experience.tsx     # Timelines with active live-role pulses
│       ├── Certifications.tsx # cPanel university status checks
│       ├── Projects.tsx       # Live DNS Diagnostics & emails sandboxes
│       ├── Resume.tsx         # Web ATS-Resume preview panels & print formats
│       └── Contact.tsx        # Helpdesk ticket intake simulator
```

---

## 🤝 Support & Customization
To customize indicators, simply adjust text variables inside `src/portfolioConfig.ts`. If you run into nameservers propagation disputes or web-hosting issues, open a ticket through the portfolio intake!
