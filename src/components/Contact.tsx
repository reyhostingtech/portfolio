import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle, TicketCheck, MessageSquarePlus, Terminal } from 'lucide-react';
import { portfolioInfo } from '../portfolioConfig';
import { initAuth, googleSignIn, getAccessToken } from '../lib/auth';
import type { User } from 'firebase/auth';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Recruiter / Employer',
    category: 'General Inquiry',
    message: '',
  });

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const categories = [
    { label: 'Recruitment / Job Offer', value: 'Recruitment' },
    { label: 'DNS / Domain Migration Consultation', value: 'Migration' },
    { label: 'Email Security (SPF/DMARC) Help', value: 'Email Setup' },
    { label: 'General / Support Consultation', value: 'General Inquiry' }
  ];

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, t) => {
        setUser(user);
        setToken(t);
        setNeedsAuth(false);
        // Pre-fill email from auth if not already set or if it's the default
        setFormData(prev => ({ ...prev, email: prev.email || user.email || '' }));
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        setFormData(prev => ({ ...prev, email: prev.email || result.user.email || '' }));
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Failed to sign in. Please allow popup and try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const encodeBase64Url = (str: string) => {
    // encode utf-8 string to base64url
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const constructEmailPayload = (to: string, subject: string, message: string) => {
    const encodedSubject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
    const emailLines = [
      `To: ${to}`,
      `Subject: ${encodedSubject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      '',
      message
    ];
    return encodeBase64Url(emailLines.join('\r\n'));
  };

  const handleInputUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const executeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (needsAuth || !token) {
      await handleLogin();
      return;
    }

    const confirmed = window.confirm(`Ready to send this email via your Gmail account (${user?.email}) to ${portfolioInfo.email}?`);
    if (!confirmed) return;

    setIsSubmitting(true);

    try {
      const seed = Math.floor(1000 + Math.random() * 9000);
      const generatedTicket = `INC-2026-REYP-${seed}`;
      
      const subject = `[${generatedTicket}] Support/Recruitment Inquiry - ${formData.name}`;
      const body = `Hi Rey,

I have submitted an inquiry from your technical support portfolio.

-- SENDER INFORMATION --
Name: ${formData.name}
Email: ${formData.email}
Classification: ${formData.category}

-- INQUIRY DETAILS --
${formData.message}

---
Generated Support Ticket ID: ${generatedTicket}`;

      const rawEmail = constructEmailPayload(portfolioInfo.email, subject, body);

      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw: rawEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setTicketId(generatedTicket);
      setIsSubmitSuccessful(true);
    } catch (err) {
      console.error(err);
      alert('Error sending email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetTicketingForm = () => {
    setFormData({
      name: '',
      email: user?.email || '',
      role: 'Recruiter / Employer',
      category: 'General Inquiry',
      message: '',
    });
    setIsSubmitSuccessful(false);
  };


  const triggerDirectMailto = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill your Name, Email, and Message detail before generating direct email.");
      return;
    }
    const seed = Math.floor(100 + Math.random() * 900);
    const mockTicket = `DIRECT-REYP-${seed}`;
    const subject = `[${mockTicket}] Direct Inquire from Portfolio - ${formData.name}`;
    const body = `Hi Rey,

Name: ${formData.name}
Email: ${formData.email}
Category: ${formData.category}

Message:
${formData.message}`;

    const mailtoUrl = `mailto:${portfolioInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-wider mb-2 font-semibold">
            <MessageSquarePlus className="w-4 h-4" />
            <span>DIRECT INGESTION WORKSPACE</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Contact Me / Dispatch System Mail
          </h2>
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded mx-auto mt-4" />
          <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
            Submit your information below to automatically format a prefilled email to rey.hostingtech@gmail.com.
          </p>
        </div>

        {/* Form Container Grid splitting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto" id="contact-wrapper-slots">
          
          {/* Column Left: Contact Info / Coordinates */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white flex items-center mb-4">
                <span className="inline-block w-2.5 h-6 bg-blue-600 rounded-sm mr-3" />
                Contact Details
              </h3>

              {/* Physical Coordinates Cards */}
              <div className="space-y-4">
                
                {/* Email Core channel */}
                <div className="bg-slate-50 dark:bg-[#0E1322] border border-slate-100 dark:border-slate-800/80 rounded-xl p-5 shadow-sm hover:border-blue-500/20 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30 rounded-xl shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</h4>
                      <a href={`mailto:${portfolioInfo.email}`} className="font-sans text-sm font-semibold text-slate-800 dark:text-slate-200 select-all hover:underline block break-all">
                        {portfolioInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Regional hub Location */}
                <div className="bg-slate-50 dark:bg-[#0E1322] border border-slate-100 dark:border-slate-800/80 rounded-xl p-5 shadow-sm hover:border-blue-500/20 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30 rounded-xl shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Location</h4>
                      <p className="font-sans text-sm font-semibold text-slate-800 dark:text-slate-200">{portfolioInfo.location}</p>
                      <p className="font-sans text-[11px] text-indigo-500 leading-none mt-1 font-medium">Ready for Remote/Hybrid roles</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Social channels bottom alignments */}
            <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/80">
              <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Professional Linkage</h4>
              <div className="flex items-center space-x-3">
                <a
                  href={portfolioInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#0077B5] hover:bg-[#0077B5]/90 text-white rounded-lg font-sans text-xs font-semibold shadow-sm shadow-[#0077B5]/10 cursor-pointer transition-all active:scale-98"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
                
                <a
                  href={portfolioInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-950 dark:hover:bg-slate-700 text-white rounded-lg font-sans text-xs font-semibold shadow-sm cursor-pointer transition-all active:scale-98"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

          </div>

          {/* Column Right: Interactive Incident Tickets Intake */}
          <div className="lg:col-span-8 bg-slate-50 dark:bg-[#0E1322] border border-slate-100 dark:border-slate-850 rounded-2xl p-6 sm:p-10 shadow-sm" id="ticketing-card">
            
            <AnimatePresence mode="wait">
              {!isSubmitSuccessful ? (
                // FORM VIEW
                <motion.form
                   key="ticket-form"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   onSubmit={executeSubmit}
                   className="space-y-6"
                >
                  {/* Alert system secure connection info */}
                  <div className="flex items-center space-x-2.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/10 p-3.5 rounded-xl">
                    <Terminal className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="font-mono text-[10px] text-blue-800 dark:text-blue-300 font-bold uppercase tracking-wider leading-none">
                      SECURE SMTP DISPATCH DIRECT TO: REY.HOSTINGTECH@GMAIL.COM
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Name Input */}
                    <div>
                      <label className="block font-mono text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-2">My Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputUpdate}
                        disabled={isSubmitting}
                        placeholder="e.g. elizabeth"
                        className="w-full px-4 py-2.5 bg-white dark:bg-[#0D1220] border border-slate-200 dark:border-slate-800 rounded-lg font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block font-mono text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-2">My Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputUpdate}
                        disabled={isSubmitting}
                        placeholder="e.g. sender@domain.com"
                        className="w-full px-4 py-2.5 bg-white dark:bg-[#0D1220] border border-slate-200 dark:border-slate-800 rounded-lg font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                      />
                    </div>

                  </div>

                  {/* Incident Category Dropdown */}
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-2">Category Selection</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputUpdate}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2.5 bg-white dark:bg-[#0D1220] border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer"
                    >
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message Detail */}
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-2">Message Query *</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputUpdate}
                      disabled={isSubmitting}
                      rows={5}
                      placeholder="Type your message of support or recruitment details here..."
                      className="w-full px-4 py-2.5 bg-white dark:bg-[#0D1220] border border-slate-200 dark:border-slate-800 rounded-lg font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-105 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 resize-none"
                    />
                  </div>

                  {/* Dual Trigger layouts */}
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={triggerDirectMailto}
                      className="w-full sm:w-auto px-5 py-3 rounded-lg border border-slate-250 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-250 font-sans font-semibold text-xs sm:text-sm cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Draft Direct Mail</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 active:scale-98 text-white font-sans font-semibold text-xs sm:text-sm shadow shadow-red-500/15 cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin shrink-0" />
                          <span>Sending via Gmail...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 shrink-0 bg-white rounded-sm p-0.5" viewBox="0 0 24 24"><path fill="#EA4335" d="M24 5.4v13.2c0 1.1-.9 2-2 2H20v-9.4L12 17l-8-5.8v9.4H2c-1.1 0-2-.9-2-2V5.4c0-1.4 1.6-2.2 2.8-1.5L12 10.6l9.2-6.7c1.2-.7 2.8.1 2.8 1.5z"></path></svg>
                          <span>Send via Gmail</span>
                        </>
                      )}
                    </button>
                  </div>

                </motion.form>
              ) : (
                // SUCCESS STATE: TICKET ISSUED SCREEN & EMAIL BACK FEEDBACK
                <motion.div
                  key="ticket-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 space-y-6 flex flex-col items-center justify-center h-full"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shadow-inner">
                    <CheckCircle className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                      Email Successfully Sent via Gmail!
                    </h3>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed font-normal">
                      Your query has been securely delivered directly from your Gmail account to Rey's inbox.
                    </p>
                  </div>

                  {/* Ticket Badge indicator block */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 w-full max-w-sm font-mono text-left space-y-3 relative overflow-hidden text-slate-350">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl transform translate-x-4 -translate-y-4 pointer-events-none" />
                    
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <div className="flex items-center text-blue-400 font-bold text-xs space-x-1.5 uppercase tracking-wide">
                        <TicketCheck className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>Support Ticket ID</span>
                      </div>
                      <span className="font-mono text-[9px] font-bold text-slate-500">SEVERITY: T1</span>
                    </div>

                    <div className="text-white select-all text-sm font-bold bg-slate-900 w-fit px-3 py-1.5 rounded border border-slate-800">
                      {ticketId}
                    </div>

                    <div className="text-[10px] space-y-1 text-slate-400 pt-2 font-normal border-t border-slate-900 leading-relaxed">
                      <div><strong className="text-slate-300">Target host:</strong> {portfolioInfo.email}</div>
                      <div><strong className="text-slate-300">Category:</strong> {formData.category}</div>
                      <div><strong className="text-slate-300">Estimated Response:</strong> Standard Business Review</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={resetTicketingForm}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-xs cursor-pointer transition-colors"
                    >
                      Send another message
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
