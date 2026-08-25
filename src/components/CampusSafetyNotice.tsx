'use client';

import React from 'react';
import { ShieldCheck, MapPin, AlertCircle, Sparkles } from 'lucide-react';

export const CampusSafetyNotice: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 my-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>Campus Safety & Verified Student Community</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
                100% Safe
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every student profile is verified via university email. For safe exchanges of textbooks, dorm furniture, and tech, use designated campus zones with security escort services available.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col text-right hidden sm:block">
            <span className="text-xs font-bold text-emerald-300">Designated Safe Zones:</span>
            <span className="text-[11px] text-slate-400">Library Lobby &bull; Student Union &bull; Quad</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Safe Exchange Spots</span>
          </div>
        </div>

      </div>
    </div>
  );
};
