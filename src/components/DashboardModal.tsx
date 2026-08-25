'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  X, 
  User, 
  CheckCircle2, 
  Star, 
  Award, 
  BookOpen, 
  Send, 
  Heart, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Trash2
} from 'lucide-react';

export const DashboardModal: React.FC = () => {
  const { 
    isDashboardOpen, 
    setIsDashboardOpen, 
    user, 
    listings, 
    requests, 
    openListingDetail,
    openChatForRequest,
    toggleLikeListing 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'requests' | 'saved'>('listings');

  if (!isDashboardOpen) return null;

  const myListings = listings.filter(l => l.author.id === user.id);
  const mySavedListings = listings.filter(l => user.savedListingIds.includes(l.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Student Profile Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white relative">
          <button
            onClick={() => setIsDashboardOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-emerald-500/40 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                {user.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Verified Student
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {user.major} &bull; {user.year}
              </p>
              <p className="text-xs text-emerald-300 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user.college}</span>
              </p>
            </div>

            {/* Reputation Stats Box */}
            <div className="sm:ml-auto flex items-center gap-4 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="flex items-center justify-center gap-0.5 text-amber-400 font-bold text-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{user.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Reputation</span>
              </div>
              <div className="h-6 w-px bg-slate-700" />
              <div className="text-center">
                <span className="font-bold text-sm text-emerald-400">{user.completedExchanges}</span>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Deals Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'listings'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>My Active Listings ({myListings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>My Exchange Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Watchlist ({mySavedListings.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: My Listings */}
          {activeTab === 'listings' && (
            <div className="space-y-3">
              {myListings.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-sm font-semibold">You haven&apos;t posted any campus listings yet.</p>
                  <p className="text-xs">Click &ldquo;Post to Campus&rdquo; on the top bar to share items or offer tutoring!</p>
                </div>
              ) : (
                myListings.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {item.pillar}
                          </span>
                          <span className="text-xs font-extrabold text-slate-900">
                            {item.price === 0 ? 'FREE' : `$${item.price}`}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
                        <span className="text-[11px] text-slate-400">{item.createdAt}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openListingDetail(item)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold shrink-0"
                    >
                      View
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: My Requests */}
          {activeTab === 'requests' && (
            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 hover:border-emerald-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        req.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                        req.status === 'declined' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        Status: {req.status}
                      </span>
                      <span className="text-[11px] text-slate-400">&bull; {req.createdAt}</span>
                    </div>

                    <button
                      onClick={() => {
                        setIsDashboardOpen(false);
                        openChatForRequest(req);
                      }}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <span>Open Chat</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{req.listingTitle}</h4>
                  <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-100">
                    &ldquo;{req.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Saved Items */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              {mySavedListings.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-sm font-semibold">No saved listings yet.</p>
                  <p className="text-xs">Click the heart icon on any listing card to bookmark it here!</p>
                </div>
              ) : (
                mySavedListings.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-extrabold text-slate-900">
                          {item.price === 0 ? 'FREE' : `$${item.price}`}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
                        <span className="text-[11px] text-slate-400">{item.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openListingDetail(item)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                      >
                        View
                      </button>
                      <button
                        onClick={() => toggleLikeListing(item.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
