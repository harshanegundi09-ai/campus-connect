'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  Eye, 
  Camera, 
  Navigation,
  Compass
} from 'lucide-react';
import { SafeZone } from '@/lib/types';

export const CampusMapModal: React.FC = () => {
  const { isMapModalOpen, setIsMapModalOpen, safeZones, selectedCollege } = useApp();
  const [activeZone, setActiveZone] = useState<SafeZone>(safeZones[0]);

  if (!isMapModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Authorized Campus Zones &bull; {selectedCollege}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Interactive Safe Exchange &amp; Meeting Map
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsMapModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Left Column: Visual Campus Map */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>Campus Safe Zone Pins (Click to Inspect)</span>
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                4 Monitored Zones
              </span>
            </div>

            {/* Graphical Blueprint Visualizer */}
            <div className="relative aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700 overflow-hidden shadow-inner p-4 flex flex-col justify-between">
              
              {/* Map grid lines overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

              {/* Campus Roads & Quadrants simulated lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700/60 border-t border-b border-emerald-500/20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-700/60 border-l border-r border-emerald-500/20 pointer-events-none" />
              
              {/* Campus Labels */}
              <span className="absolute top-3 left-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
                North Quad / Academic Wing
              </span>
              <span className="absolute bottom-3 right-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
                South Student Commons
              </span>

              {/* Interactive Safe Zone Pins */}
              {safeZones.map((zone) => {
                const isSelected = activeZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZone(zone)}
                    style={{ top: `${zone.latRatio}%`, left: `${zone.lngRatio}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl transition-all group z-20 flex flex-col items-center ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 scale-110 shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-400/30'
                        : 'bg-slate-800/90 text-emerald-400 border border-emerald-500/40 hover:scale-105 hover:bg-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[9px] font-extrabold uppercase mt-0.5 tracking-tight px-1 rounded bg-black/40 text-white whitespace-nowrap">
                      {zone.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}

              <div className="relative z-10 text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded-xl border border-slate-800 backdrop-blur-sm self-start">
                🛡️ All zones have direct security call boxes & CCTV monitoring
              </div>
            </div>

            {/* Quick Emergency Assistance */}
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs text-rose-900">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Need a Campus Security Escrow / Escort?</span>
              </div>
              <span className="font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                Ext. 4357 (HELP)
              </span>
            </div>
          </div>

          {/* Right Column: Selected Zone Details */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Selected Safe Spot
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">{activeZone.name}</h3>
                <p className="text-xs text-slate-600 mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{activeZone.location}</span>
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold mt-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeZone.hours}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Security &amp; Verification Features
                </h4>
                <div className="space-y-1.5">
                  {activeZone.securityFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {activeZone.description}
              </p>
            </div>

            <button
              onClick={() => setIsMapModalOpen(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              Close Safe Map
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
