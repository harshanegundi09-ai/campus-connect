'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { 
  Filter, 
  RotateCcw, 
  DollarSign, 
  Tag, 
  Sparkles, 
  GraduationCap, 
  Check,
  Palette,
  Video,
  Camera,
  Languages,
  Mic
} from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const {
    selectedPillar,
    selectedCategory,
    setSelectedCategory,
    priceFilter,
    setPriceFilter,
    onlyUrgent,
    setOnlyUrgent,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const resourceCategories = [
    { id: 'all', label: 'All Resources' },
    { id: 'study_notes', label: '📑 Study Notes & PDF Guides' },
    { id: 'textbooks', label: '📚 Textbooks' },
    { id: 'electronics', label: '💻 Electronics & Tech' },
    { id: 'dorm', label: '🛋️ Dorm & Living' },
    { id: 'lab_gear', label: '🔬 Lab Coats & Kits' },
  ];

  const serviceCategories = [
    { id: 'all', label: 'All Student Services' },
    { id: 'graphic_design', label: '🎨 Graphic Design & UI/UX' },
    { id: 'video_editing', label: '🎬 Video & Reels Editing' },
    { id: 'photography', label: '📸 Graduation & Headshots' },
    { id: 'resume_review', label: '💼 Resume & Mock Interviews' },
    { id: 'tutoring', label: '🧠 Course Tutoring' },
    { id: 'language_exchange', label: '🗣️ Language Exchange' },
    { id: 'event_assistance', label: '🎤 Event & Audio Support' },
    { id: 'moving', label: '📦 Dorm Move & Van Help' },
  ];

  const opportunityCategories = [
    { id: 'all', label: 'All Projects & Opportunities' },
    { id: 'project_collab', label: '🚀 Student Startups & Collabs' },
    { id: 'hackathon', label: '💻 Hackathon Teammates' },
    { id: 'research', label: '🔬 Lab & Research Assistant' },
    { id: 'study_group', label: '👥 Exam Study Squads' },
  ];

  const categories = 
    selectedPillar === 'resource' ? resourceCategories :
    selectedPillar === 'service' ? serviceCategories :
    selectedPillar === 'opportunity' ? opportunityCategories :
    [
      { id: 'all', label: 'All Categories' },
      { id: 'study_notes', label: '📑 Study Notes & PDFs' },
      { id: 'graphic_design', label: '🎨 Graphic Design' },
      { id: 'video_editing', label: '🎬 Video Editing' },
      { id: 'textbooks', label: '📚 Textbooks' },
      { id: 'tutoring', label: '🧠 Peer Tutoring' },
      { id: 'photography', label: '📸 Photography' },
      { id: 'project_collab', label: '🚀 Project Collabs' },
      { id: 'language_exchange', label: '🗣️ Language Practice' },
      { id: 'event_assistance', label: '🎤 Event Help' },
      { id: 'hackathon', label: '💻 Hackathons' },
    ];

  const handleReset = () => {
    setSelectedCategory('all');
    setPriceFilter({ min: 0, max: 150, freeOnly: false });
    setOnlyUrgent(false);
    setSearchQuery('');
  };

  const isFiltered = 
    selectedCategory !== 'all' || 
    priceFilter.freeOnly || 
    priceFilter.max < 150 || 
    onlyUrgent || 
    searchQuery !== '';

  return (
    <aside className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-6">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <h2 className="font-bold text-sm text-slate-800">Filter &amp; Refine</h2>
        </div>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Free Items Only Toggle */}
      <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <span>🎁 Free Items &amp; $0 Notes</span>
            </span>
            <p className="text-[11px] text-emerald-800">Show $0 items and donations</p>
          </div>
          <input
            type="checkbox"
            checked={priceFilter.freeOnly}
            onChange={(e) => setPriceFilter(prev => ({ ...prev, freeOnly: e.target.checked }))}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300 cursor-pointer"
          />
        </label>
      </div>

      {/* Urgent Only Toggle */}
      <div>
        <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>🔥 Urgent Exchanges</span>
            </span>
            <p className="text-[11px] text-slate-500">Needed / offered within 48h</p>
          </div>
          <input
            type="checkbox"
            checked={onlyUrgent}
            onChange={(e) => setOnlyUrgent(e.target.checked)}
            className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 border-slate-300 cursor-pointer"
          />
        </label>
      </div>

      {/* Max Price Range Slider */}
      {!priceFilter.freeOnly && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Max Budget</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {priceFilter.max >= 150 ? 'Any Price' : `$${priceFilter.max}`}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="150"
            step="5"
            value={priceFilter.max}
            onChange={(e) => setPriceFilter(prev => ({ ...prev, max: Number(e.target.value) }))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>$5</span>
            <span>$75</span>
            <span>$150+</span>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};
