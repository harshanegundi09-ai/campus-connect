'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { X, Send, MapPin, Calendar, Sparkles, MessageSquare } from 'lucide-react';

export const RequestModal: React.FC = () => {
  const { targetListingForRequest, closeRequestModal, submitExchangeRequest } = useApp();

  const [message, setMessage] = useState('');
  const [proposedLocation, setProposedLocation] = useState('Campus Library Lobby');
  const [proposedDate, setProposedDate] = useState('Tomorrow at 3:00 PM');

  if (!targetListingForRequest) return null;
  const listing = targetListingForRequest;

  const quickTemplates = [
    `Hi ${listing.author.name}, I'm interested in this! Are you free to meet tomorrow?`,
    `Hey! I'm taking this course and would love to exchange this.`,
    `Hi! Can we meet at the Student Union to check this out?`,
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    submitExchangeRequest(
      listing.id,
      message,
      proposedDate,
      proposedLocation
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Campus Connect Request
            </span>
            <h3 className="text-base font-bold text-slate-900 truncate max-w-xs">
              {listing.pillar === 'opportunity' ? 'Join Opportunity' : listing.pillar === 'service' ? 'Book Service' : 'Request Exchange'}
            </h3>
          </div>
          <button
            onClick={closeRequestModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listing preview pill */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{listing.title}</h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Listed by {listing.author.name} &bull; {listing.price === 0 ? 'FREE' : `$${listing.price}`}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Quick template suggestions */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>Quick Message Starter</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickTemplates.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(t)}
                  className="text-left text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 transition-colors"
                >
                  &ldquo;{t.slice(0, 38)}...&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Message textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Message / Intro
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              placeholder={`Hi ${listing.author.name}, I would love to connect about this...`}
              className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Proposed Meetup Location & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Meeting Spot</span>
              </label>
              <input
                type="text"
                value={proposedLocation}
                onChange={(e) => setProposedLocation(e.target.value)}
                placeholder="e.g. Science Library, Quad"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Proposed Time</span>
              </label>
              <input
                type="text"
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                placeholder="e.g. Tomorrow at 3 PM"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Send Request & Open Chat</span>
          </button>
        </form>

      </div>
    </div>
  );
};
