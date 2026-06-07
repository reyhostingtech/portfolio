import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Contact from './Contact';
import { ExternalLink, Palette, Code, CheckCircle, Smartphone } from 'lucide-react';

const templates = [
  {
    title: 'Resort & Hospitality',
    url: 'https://resortwebsitesample.vercel.app/',
    description: 'Perfect for resorts, hotels, and vacation rentals. Features a stunning hero section, booking integrations, and amenities showcase.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Hospitality', 'Booking', 'Photography'],
  },
  {
    title: 'Corporate & Agency',
    url: 'https://samplewebsitedesign1.netlify.app/',
    description: 'A clean, professional design ideal for agencies, consultants, and B2B businesses. Emphasizes modern layouts and clear calls-to-action.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Corporate', 'Business', 'Services'],
  },
  {
    title: 'Modern E-Commerce',
    url: 'https://guitar-samplesite.vercel.app/',
    description: 'Designed for retail and product showcases. Highly visual layout built to highlight products and streamline the customer journey.',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['E-Commerce', 'Retail', 'Dynamic'],
  }
];

export default function TemplatesView() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  useEffect(() => {
    // Check local storage or default to dark
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const toggleDarkMode = () => {
    const updatedTheme = !isDarkMode;
    setIsDarkMode(updatedTheme);
    if (updatedTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans antialiased">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-wider mb-3 font-semibold">
            <Palette className="w-4 h-4" />
            <span>Ready-made Solutions</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-6">
            Website Templates
          </h1>
          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Looking to create a landing page for your business without the technical hassle? 
            These pre-built websites are fully customizable and ready to be tailored to your specific preferences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800/50 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <Code className="w-4 h-4 text-emerald-500" />
              <span>Full the customization</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800/50 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Hosting & Deployment included</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800/50 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span>Mobile responsive design</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, idx) => (
            <a 
              key={idx}
              href={template.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-white font-bold tracking-wide flex items-center space-x-2">
                    <span>Live Preview</span>
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
                <img 
                  src={template.image} 
                  alt={`${template.title} preview`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  {template.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-mono uppercase tracking-wider rounded-md font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {template.title}
                </h3>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {template.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Integrate the existing Contact form at the bottom */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19]">
        <div className="max-w-3xl mx-auto pt-16 px-4 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Ready to get your website online?
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            Contact me below to discuss which template fits your business, and I'll handle the customization and setup from start to finish.
          </p>
        </div>
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
