'use client';

import React from 'react';
import { ListingItem } from '@/lib/types';
import { useApp } from '@/lib/store';
import { 
  MapPin, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Clock, 
  ArrowRight,
  BookOpen,
  Wrench,
  Rocket,
  FileText,
  Palette,
  QrCode
} from 'lucide-react';

interface ListingCardProps {
  listing: ListingItem;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { 
    openListingDetail, 
    openRequestModal, 
    openDocumentView, 
    openPaymentQR, 
    toggleLikeListing 
  } = useApp();

  const getPillarBadge = () => {
    switch (listing.pillar) {
      case 'resource':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <BookOpen className="w-3 h-3" />
            Resource
          </span>
        );
      case 'service':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Wrench className="w-3 h-3" />
            Service
          </span>
        );
      case 'opportunity':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <Rocket className="w-3 h-3" />
            Collab
          </span>
        );
    }
  };

  const getPriceDisplay = () => {
    if (listing.pricingType === 'free' || listing.price === 0) {
      return (
        <span className="text-emerald-600 font-extrabold text-sm sm:text-base tracking-tight bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
          100% FREE
        </span>
      );
    }
    if (listing.pricingType === 'hourly') {
      return (
        <span className="text-slate-900 font-extrabold text-sm sm:text-base tracking-tight">
          ${listing.price} <span className="text-xs font-normal text-slate-500">/hr</span>
        </span>
      );
    }
    if (listing.pricingType === 'borrow') {
      return (
        <span className="text-blue-700 font-extrabold text-sm sm:text-base tracking-tight bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
          Borrow: ${listing.price}
        </span>
      );
    }
    return (
      <span className="text-slate-900 font-extrabold text-base tracking-tight">
        ${listing.price}
      </span>
    );
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200/90 bg-white group hover:border-emerald-300">
      
      {/* Top Image & Floating Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openListingDetail(listing)}>
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Pillar Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          {getPillarBadge()}
        </div>

        {/* Like / Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleLikeListing(listing.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
            listing.isLiked
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500'
          }`}
          title="Save to My Hub"
        >
          <Heart className={`w-4 h-4 ${listing.isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Document PDF Badge */}
        {listing.documentInfo && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>PDF Notes</span>
            </span>
          </div>
        )}

        {/* Urgent Tag */}
        {listing.urgency === 'urgent' && !listing.documentInfo && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
              🔥 Urgent
            </span>
          </div>
        )}

        {/* Course Code Chip */}
        {listing.courseCode && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-sm">
              {listing.courseCode}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Price & Category */}
          <div className="flex items-center justify-between mb-2">
            {getPriceDisplay()}
            {listing.condition && (
              <span className="text-[11px] font-medium text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-full">
                {listing.condition.replace('_', ' ')}
              </span>
            )}
            {listing.timeCommitment && (
              <span className="text-[11px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                {listing.timeCommitment}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => openListingDetail(listing)}
            className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer mb-2 leading-snug"
          >
            {listing.title}
          </h3>

          {/* Description Excerpt */}
          <p className="text-slate-500 text-xs line-clamp-2 mb-3 leading-relaxed">
            {listing.description}
          </p>

          {/* Service Skills / Roles chips */}
          {listing.serviceSkills && (
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.serviceSkills.slice(0, 2).map((skill, i) => (
                <span key={i} className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {listing.collaborationRoles && (
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.collaborationRoles.slice(0, 2).map((role, i) => (
                <span key={i} className="text-[10px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md border border-purple-100">
                  {role}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area: Location, Author, Actions */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          
          {/* Location */}
          <div className="flex items-center text-slate-500 text-xs">
            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>

          {/* Author info & Quick buttons */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={listing.author.avatar}
                alt={listing.author.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-slate-800 truncate">{listing.author.name}</span>
                  {listing.author.isVerified && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span>{listing.author.rating} ({listing.author.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-1.5 shrink-0">
              {listing.documentInfo ? (
                <button
                  type="button"
                  onClick={() => openDocumentView(listing.documentInfo!)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                >
                  <FileText className="w-3 h-3" />
                  <span>Read</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openRequestModal(listing)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>{listing.pillar === 'opportunity' ? 'Join' : listing.pillar === 'service' ? 'Book' : 'Get'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
