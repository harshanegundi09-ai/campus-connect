'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { COLLEGES } from '@/lib/seedData';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  MessageSquare, 
  MapPin, 
  Sparkles, 
  CheckCircle2,
  ChevronDown,
  Compass,
  QrCode,
  Wallet,
  ClipboardList
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    selectedCollege, 
    setSelectedCollege, 
    searchQuery, 
    setSearchQuery, 
    setIsCreateModalOpen,
    setIsMessagingOpen,
    setIsDashboardOpen,
    setIsMapModalOpen,
    setIsReportLostModalOpen,
    setSelectedPillar,
    requests,
    user
  } = useApp();

  const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);
  const pendingRequestsCount = requests.filter(r => r.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          
          {/* Logo & Campus Selector */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
              setSelectedPillar('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg text-slate-900 tracking-tight">Campus<span className="text-emerald-600">Nexus</span></span>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">Edu</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-none">Student Services &amp; Exchange</p>
              </div>
            </div>

            {/* University Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCollegeDropdownOpen(!isCollegeDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-200 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="max-w-[120px] md:max-w-[180px] truncate">{selectedCollege}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isCollegeDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Select Your Campus
                  </div>
                  {COLLEGES.map((college) => (
                    <button
                      key={college}
                      onClick={() => {
                        setSelectedCollege(college);
                        setIsCollegeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCollege === college
                          ? 'bg-emerald-50 text-emerald-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{college}</span>
                      {selectedCollege === college && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, design, tutors, hackathons, lost items..."
                className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs md:text-sm text-slate-900 placeholder-slate-400 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Safe Map Button */}
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors"
              title="Interactive Safe Meeting Zones"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Safe Map</span>
            </button>

            {/* Post Listing CTA */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full shadow-sm hover:shadow-md shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Post Listing</span>
              <span className="sm:hidden">Post</span>
            </button>

            {/* Messaging / Requests Toggle */}
            <button
              onClick={() => setIsMessagingOpen(true)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              title="Campus Chats & Deals"
            >
              <MessageSquare className="w-5 h-5" />
              {pendingRequestsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {pendingRequestsCount}
                </span>
              )}
            </button>

            {/* Student Dashboard & Campus Cash */}
            <button
              onClick={() => setIsDashboardOpen(true)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-full hover:bg-slate-100 border border-slate-200/80 transition-colors"
              title="Student Dashboard & Balance"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <div className="hidden xl:block text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-slate-800 leading-none">{user.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">${user.campusCashBalance.toFixed(2)} Cash</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
