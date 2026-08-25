'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  ClipboardList, 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Tag, 
  HelpCircle, 
  Sparkles,
  CreditCard,
  Book,
  Smartphone,
  Key
} from 'lucide-react';

export const NoticeBoard: React.FC = () => {
  const { notices, claimNoticeItem, setIsReportLostModalOpen, selectedCollege, user } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState('');

  const collegeNotices = notices.filter(n => 
    selectedCollege === 'All Campuses' || n.college === selectedCollege
  );

  const filteredNotices = collegeNotices.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (selectedCat !== 'all' && item.itemCategory !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.locationFoundOrLost.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'id_card':
        return <CreditCard className="w-3.5 h-3.5" />;
      case 'notebook':
        return <Book className="w-3.5 h-3.5" />;
      case 'tech':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'keys':
        return <Key className="w-3.5 h-3.5" />;
      default:
        return <Tag className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Notice Board Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-900 via-stone-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-amber-800/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <ClipboardList className="w-4 h-4" />
              <span>Official Campus Notice Board</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Campus Lost &amp; Found Central
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Misplaced your Student ID, class notebook, lab binder, or dorm keys? Check reported items or post a bulletin to recover lost campus belongings quickly.
            </p>
          </div>

          <button
            onClick={() => setIsReportLostModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Post Lost / Found Notice</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Type Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Notices ({collegeNotices.length})
          </button>
          <button
            onClick={() => setFilterType('lost')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'lost' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:text-rose-600'
            }`}
          >
            🔍 Lost Items
          </button>
          <button
            onClick={() => setFilterType('found')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'found' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            🎉 Found Items
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'id_card', label: '🪪 ID Cards' },
            { id: 'notebook', label: '📒 Notebooks' },
            { id: 'tech', label: '🎧 Tech' },
            { id: 'keys', label: '🔑 Keys' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notice board..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Corkboard Notice Grid */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <ClipboardList className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No notices in this category</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Everything seems to be accounted for! If you found or lost something on campus, post a quick bulletin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`rounded-3xl border p-5 flex flex-col justify-between transition-all bg-white shadow-sm hover:shadow-md relative overflow-hidden ${
                notice.isClaimed
                  ? 'border-slate-200 opacity-75'
                  : notice.type === 'lost'
                  ? 'border-rose-200 hover:border-rose-300'
                  : 'border-emerald-200 hover:border-emerald-300'
              }`}
            >
              
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        notice.type === 'lost'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {notice.type === 'lost' ? '🔴 Lost' : '🟢 Found'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {getCategoryIcon(notice.itemCategory)}
                      <span className="capitalize">{notice.itemCategory.replace('_', ' ')}</span>
                    </span>
                  </div>

                  {notice.isClaimed ? (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                      ✓ Claimed
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">{notice.dateReported}</span>
                  )}
                </div>

                {/* Optional Image */}
                {notice.image && (
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                    <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Title */}
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-1.5 leading-snug">
                  {notice.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {notice.description}
                </p>
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate font-medium">{notice.locationFoundOrLost}</span>
                  </div>
                  {notice.reward && (
                    <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Reward Offered: {notice.reward}</span>
                    </div>
                  )}
                </div>

                {/* Action button */}
                {!notice.isClaimed ? (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="text-[11px] text-slate-500">
                      Contact: <span className="font-semibold text-slate-800">{notice.contactName}</span>
                    </div>
                    <button
                      onClick={() => claimNoticeItem(notice.id)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm transition-all active:scale-95 ${
                        notice.type === 'found'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {notice.type === 'found' ? 'This is Mine (Claim)' : 'I Found This!'}
                    </button>
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-slate-100 text-center text-[11px] font-semibold text-slate-600">
                    Claimed by {notice.claimedBy || 'Verified Student'}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
