'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { X, Star, Sparkles, CheckCircle2, Award } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { 
    isReviewModalOpen, 
    setIsReviewModalOpen, 
    targetAuthorForReview, 
    submitUserReview 
  } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedBadges, setSelectedBadges] = useState<string[]>(['Super Helpful']);

  if (!isReviewModalOpen || !targetAuthorForReview) return null;

  const availableBadges = [
    '⭐ Super Helpful',
    '🚀 Fast Responder',
    '🤝 Generous Lender',
    '🎨 Creative Pro',
    '💯 Highly Recommended',
    '🛡️ Safe Trader'
  ];

  const toggleBadge = (b: string) => {
    setSelectedBadges(prev => 
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitUserReview(rating, reviewText, selectedBadges);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                Community Reputation
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Rate Campus Exchange
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target peer card */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <img
            src={targetAuthorForReview.avatar}
            alt={targetAuthorForReview.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/30"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900">{targetAuthorForReview.name}</h4>
            <p className="text-[11px] text-slate-500 truncate">For: {targetAuthorForReview.listingTitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Star Selector */}
          <div className="text-center space-y-1 py-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Overall Experience
            </label>
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-600">
              {rating === 5 ? 'Exceptional Peer (5/5)' :
               rating === 4 ? 'Great Exchange (4/5)' :
               rating === 3 ? 'Good (3/5)' : 'Needs Improvement'}
            </span>
          </div>

          {/* Badges Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Award Peer Badges</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableBadges.map((b) => {
                const isSelected = selectedBadges.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBadge(b)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Written Feedback */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Review Note (Optional)
            </label>
            <textarea
              rows={2}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="e.g. Super friendly, arrived at the library on time with textbook in great condition!"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98"
          >
            Submit Review &amp; Award Badges
          </button>
        </form>

      </div>
    </div>
  );
};
