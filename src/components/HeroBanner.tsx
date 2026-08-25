'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Wrench, 
  Users, 
  Flame, 
  Gift, 
  Search 
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { 
    setSelectedPillar, 
    setPriceFilter, 
    setOnlyUrgent, 
    setSearchQuery, 
    setSelectedCategory,
    selectedCollege,
    searchQuery
  } = useApp();

  const handleQuickFilter = (type: string) => {
    if (type === 'free') {
      setPriceFilter(prev => ({ ...prev, freeOnly: true }));
      setSelectedPillar('resource');
    } else if (type === 'urgent') {
      setOnlyUrgent(true);
    } else if (type === 'tutoring') {
      setSelectedPillar('service');
      setSelectedCategory('tutoring');
    } else if (type === 'hackathon') {
      setSelectedPillar('opportunity');
      setSelectedCategory('hackathon');
    } else if (type === 'textbooks') {
      setSelectedPillar('resource');
      setSelectedCategory('textbooks');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl mb-8 p-6 sm:p-8 md:p-10 border border-slate-700/50">
      
      {/* Decorative background glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        
        {/* Verification & Campus Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Student Community &bull; {selectedCollege}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
          Share Resources, Swap Skills & Team Up on <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Campus.</span>
        </h1>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mb-6 leading-relaxed">
          The all-in-one student exchange platform. Trade textbooks and dorm essentials, hire peer tutors and photographers, or find teammates for study squads and hackathons.
        </p>

        {/* Mobile Search Bar */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, tutors, study squads..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Quick Filter Action Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Trending shortcuts:</span>
          
          <button
            onClick={() => handleQuickFilter('free')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 text-xs font-medium transition-all"
          >
            <Gift className="w-3.5 h-3.5 text-emerald-400" />
            <span>🎁 100% Free Items</span>
          </button>

          <button
            onClick={() => handleQuickFilter('urgent')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 text-xs font-medium transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>🔥 Urgent Needs</span>
          </button>

          <button
            onClick={() => handleQuickFilter('tutoring')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-blue-500/20 text-slate-200 hover:text-blue-300 border border-slate-700 hover:border-blue-500/40 text-xs font-medium transition-all"
          >
            <Wrench className="w-3.5 h-3.5 text-blue-400" />
            <span>🧠 Peer Tutoring</span>
          </button>

          <button
            onClick={() => handleQuickFilter('hackathon')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-purple-500/20 text-slate-200 hover:text-purple-300 border border-slate-700 hover:border-purple-500/40 text-xs font-medium transition-all"
          >
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>🚀 Hackathon Squads</span>
          </button>
        </div>

      </div>

    </div>
  );
};
