'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { HeroBanner } from '@/components/HeroBanner';
import { PillarTabs } from '@/components/PillarTabs';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ListingCard } from '@/components/ListingCard';
import { NoticeBoard } from '@/components/NoticeBoard';
import { CarpoolBoard } from '@/components/CarpoolBoard';
import { CampusSafetyNotice } from '@/components/CampusSafetyNotice';
import { 
  Sparkles, 
  Search, 
  ArrowUpDown, 
  Plus, 
  BookOpen, 
  Wrench, 
  Rocket, 
  Frown 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const {
    listings,
    selectedCollege,
    selectedPillar,
    searchQuery,
    selectedCategory,
    priceFilter,
    onlyUrgent,
    setIsCreateModalOpen,
  } = useApp();

  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'rating'>('newest');

  // Filter listings
  const filteredListings = listings.filter((item) => {
    // 1. College filter
    if (selectedCollege !== 'All Campuses' && item.college !== selectedCollege) {
      return false;
    }

    // 2. Pillar filter
    if (selectedPillar !== 'all' && selectedPillar !== 'notice_board' && selectedPillar !== 'carpool') {
      if (item.pillar !== selectedPillar) return false;
    }

    // 3. Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // 4. Free only
    if (priceFilter.freeOnly && item.price !== 0 && item.pricingType !== 'free') {
      return false;
    }

    // 5. Max price
    if (!priceFilter.freeOnly && priceFilter.max < 150 && item.price > priceFilter.max) {
      return false;
    }

    // 6. Urgent only
    if (onlyUrgent && item.urgency !== 'urgent') {
      return false;
    }

    // 7. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      const matchCourse = item.courseCode?.toLowerCase().includes(q);
      const matchAuthor = item.author.name.toLowerCase().includes(q);
      const matchSkills = item.serviceSkills?.some(s => s.toLowerCase().includes(q));
      const matchRoles = item.collaborationRoles?.some(r => r.toLowerCase().includes(q));

      if (!matchTitle && !matchDesc && !matchTags && !matchCourse && !matchAuthor && !matchSkills && !matchRoles) {
        return false;
      }
    }

    return true;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.author.rating - a.author.rating;
    return 0;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner */}
      <HeroBanner />

      {/* Primary Category / Pillar Tabs */}
      <PillarTabs />

      {/* Conditional View Rendering */}
      {selectedPillar === 'notice_board' ? (
        <NoticeBoard />
      ) : selectedPillar === 'carpool' ? (
        <CarpoolBoard />
      ) : (
        /* Main Content Grid */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 sticky top-20">
            <FilterSidebar />
          </div>

          {/* Listings Feed Column */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Feed Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">
                  {selectedPillar === 'all' ? 'All Campus Exchanges' :
                   selectedPillar === 'resource' ? 'Resources & Study Notes' :
                   selectedPillar === 'service' ? 'Student Services Marketplace' : 'Project Collabs & Teams'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  {sortedListings.length} results
                </span>
              </div>

              {/* Sort options */}
              <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-slate-400 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer text-xs"
                >
                  <option value="newest">✨ Newest First</option>
                  <option value="price_low">💵 Price: Low to High</option>
                  <option value="price_high">💰 Price: High to Low</option>
                  <option value="rating">⭐ Highest Student Rating</option>
                </select>
              </div>
            </div>

            {/* Listings Grid or Empty State */}
            {sortedListings.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-slate-800">No matching campus listings found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your search terms, removing filters, or be the first to post this item or service to your campus!
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post It to Campus</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {sortedListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Safety Notice Banner */}
      <CampusSafetyNotice />

    </div>
  );
}
