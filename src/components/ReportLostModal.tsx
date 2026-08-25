'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { X, Plus, ClipboardList, MapPin, Sparkles, Image as ImageIcon } from 'lucide-react';
import { COLLEGES } from '@/lib/seedData';

export const ReportLostModal: React.FC = () => {
  const { isReportLostModalOpen, setIsReportLostModalOpen, createNoticeItem, user, selectedCollege } = useApp();

  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [itemCategory, setItemCategory] = useState<'id_card' | 'notebook' | 'tech' | 'keys' | 'clothing' | 'other'>('id_card');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationFoundOrLost, setLocationFoundOrLost] = useState('');
  const [reward, setReward] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [college, setCollege] = useState(selectedCollege !== 'All Campuses' ? selectedCollege : 'Metropolitan Tech University');

  if (!isReportLostModalOpen) return null;

  const presetImages: { [key: string]: string } = {
    id_card: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    notebook: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    tech: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    keys: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80',
    clothing: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80',
    other: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !locationFoundOrLost.trim()) return;

    createNoticeItem({
      type,
      itemCategory,
      title,
      description,
      locationFoundOrLost,
      college,
      contactName: user.name,
      contactEmail: user.email,
      reward: reward.trim() ? reward : undefined,
      image: imageUrl || presetImages[itemCategory],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 space-y-5 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Campus Notice Bulletin
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Post Lost or Found Item
            </h3>
          </div>
          <button
            onClick={() => setIsReportLostModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Lost or Found Switch */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Notice Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                  type === 'lost'
                    ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🔴 I Lost an Item
              </button>
              <button
                type="button"
                onClick={() => setType('found')}
                className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                  type === 'found'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🟢 I Found an Item
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Item Category
            </label>
            <select
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value as any)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="id_card">🪪 Student ID Card / Badge</option>
              <option value="notebook">📒 Course Notebook / Lab Binder</option>
              <option value="tech">🎧 Tech / AirPods / Chargers</option>
              <option value="keys">🔑 Dorm Keys / Keychain</option>
              <option value="clothing">🧥 Jacket / Formal Wear / Backpack</option>
              <option value="other">📦 Other Campus Item</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Notice Headline *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === 'lost' ? 'e.g. Lost Student ID Card: John Doe' : 'e.g. Found Blue HydroFlask Bottle'}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Location & College */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {type === 'lost' ? 'Last Seen Spot' : 'Found Location'} *
              </label>
              <input
                type="text"
                required
                value={locationFoundOrLost}
                onChange={(e) => setLocationFoundOrLost(e.target.value)}
                placeholder="e.g. Science Library 2nd Fl"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Campus
              </label>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              >
                {COLLEGES.filter(c => c !== 'All Campuses').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Detailed Description & Distinguishing Marks *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe color, stickers, name tags, or where handed in..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Reward (Optional) */}
          {type === 'lost' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Finder Reward (Optional)
              </label>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="e.g. $15 Campus Cash or Free Coffee"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all active:scale-98"
          >
            Publish Bulletin to Campus
          </button>
        </form>

      </div>
    </div>
  );
};
