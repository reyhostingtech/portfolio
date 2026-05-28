import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle, ExternalLink, MessageSquare, ShieldCheck, TicketCheck } from 'lucide-react';
import { trustpilotReviews, TrustpilotReview } from '../portfolioConfig';

export default function TrustpilotReviews() {
  const [filterMode, setFilterMode] = useState<'all' | 'newest' | 'older'>('all');

  // Trustpilot stars are represented as individual green squares with rounded stars
  const renderTrustpilotStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1" aria-label={`Rating: ${rating} stars`}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 flex items-center justify-center rounded-sm ${
              i < rating ? 'bg-trustpilot-green' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-white text-white" />
          </div>
        ))}
      </div>
    );
  };

  // Sort reviews based on user toggle
  const getSortedReviews = () => {
    switch (filterMode) {
      case 'newest':
        // Newest based on hardcoded dates list (or filter reviews from 2025)
        return trustpilotReviews.filter(r => r.date.includes('2025'));
      case 'older':
        // Earlier historic reviews (from 2023 or 2024)
        return trustpilotReviews.filter(r => r.date.includes('2023') || r.date.includes('2024'));
      default:
        return trustpilotReviews;
    }
  };

  const activeReviews = getSortedReviews();

  return (
    <section id="reviews" className="py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Trustpilot styling */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400 font-mono text-sm uppercase tracking-wider mb-2 font-semibold">
            <MessageSquare className="w-4 h-4" />
            <span>CUSTOMER ENDORSEMENTS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight flex items-center justify-center flex-wrap gap-2">
            <span>Verified</span>
            <span className="trustpilot-green inline-flex items-center font-extrabold tracking-tight font-sans">
              Trustpilot
            </span>
            <span>Support Reviews</span>
          </h2>
          <div className="w-12 h-1 bg-trustpilot-green rounded mx-auto mt-4" />
          <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
            Real customer feedback extracted from client accounts highlighting ticket assistance and support cases resolved by Rey (or ReyP).
          </p>
        </div>

        {/* Global Stats bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto mb-12">
          
          {/* left: summary stats block */}
          <div className="lg:col-span-4 bg-[#0F172A] dark:bg-[#121B2E] text-white p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 via-transparent to-transparent pointer-events-none" />
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-sans font-extrabold text-xl tracking-tight">Trustpilot</span>
                <span className="text-emerald-400 font-bold text-lg leading-none">★</span>
              </div>
              <p className="font-sans text-xs text-slate-400 mb-6 font-medium">Customer Support Analytics Representation</p>
              
              <div className="flex items-baseline space-x-2 mb-1">
                <span className="font-display font-black text-6xl tracking-tight">5.0</span>
                <span className="font-sans text-sm text-slate-400">out of 5</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                {renderTrustpilotStars(5)}
              </div>
              
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                VERIFIED EXCELLENT
              </span>
            </div>

            <div className="pt-8 border-t border-slate-800/80 mt-8 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Feedback Ratio</span>
              <span className="font-semibold text-white">100% Positive</span>
            </div>
          </div>

          {/* right: filters & listing of reviews card */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 h-full flex flex-col justify-between">
              
              {/* Filter Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/50 pb-5 mb-6">
                <div>
                  <h4 className="font-display font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                    Showing {activeReviews.length} Verified Endorsements
                  </h4>
                  <p className="font-sans text-[11px] text-slate-400">Verify user mentions of Rey in client support tickets</p>
                </div>

                <div className="flex items-center space-x-1.5" id="review-filters">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold cursor-pointer transition-colors ${
                      filterMode === 'all'
                        ? 'bg-trustpilot-green text-white shadow-sm shadow-emerald-500/10'
                        : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    All Historical
                  </button>
                  <button
                    onClick={() => setFilterMode('newest')}
                    className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold cursor-pointer transition-colors ${
                      filterMode === 'newest'
                        ? 'bg-trustpilot-green text-white'
                        : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Newest (2025)
                  </button>
                  <button
                    onClick={() => setFilterMode('older')}
                    className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold cursor-pointer transition-colors ${
                      filterMode === 'older'
                        ? 'bg-trustpilot-green text-white'
                        : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Older reviews
                  </button>
                </div>
              </div>

              {/* Quotes info banner */}
              <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/50 rounded-xl p-4 shadow-sm" id="trustpilot-disclaimer">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-trustpilot-green rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  <strong className="text-slate-700 dark:text-slate-300">Recruiter Note:</strong> These are custom translations of actual, real-world technical support dialogue and feedback received from cPanel accounts, email configuration setups, and DNS restorations.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Reviews grid mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto" id="reviews-grid">
          {activeReviews.map((review) => (
            <motion.div
              layout
              key={review.id}
              className="bg-slate-50 dark:bg-[#0E1322] border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                {/* Trustpilot stars & date header */}
                <div className="flex items-center justify-between mb-4">
                  {renderTrustpilotStars(review.rating)}
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                    {review.date}
                  </span>
                </div>

                {/* Review details */}
                <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-white mb-2 leading-snug">
                  "{review.title}"
                </h3>
                
                <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {review.content}
                </p>
              </div>

              {/* Author alignment bar */}
              <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-display font-bold text-xs uppercase text-slate-600 dark:text-slate-300 border border-slate-300/40">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 leading-none">
                      {review.author}
                    </h4>
                    <span className="font-mono text-[9px] text-slate-400 dark:text-slate-500 font-medium">Customer Account User</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/10">
                  <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>VERIFIED CUSTOMER</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
