'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { 
  X, 
  MapPin, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Tag, 
  Heart, 
  Send, 
  Clock, 
  Share2, 
  BookOpen, 
  Wrench, 
  Rocket,
  FileText,
  QrCode,
  Award,
  Compass
} from 'lucide-react';

export const ListingDetailModal: React.FC = () => {
  const { 
    activeListingDetail, 
    closeListingDetail, 
    openRequestModal, 
    openDocumentView,
    openPaymentQR,
    openReviewModalForUser,
    setIsMapModalOpen,
    toggleLikeListing, 
    showToast 
  } = useApp();

  if (!activeListingDetail) return null;
  const listing = activeListingDetail;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('🔗 Link copied to clipboard!');
    } else {
      showToast('Listing ready to share!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Campus {listing.pillar}
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-medium text-slate-600 truncate max-w-[200px] sm:max-w-xs">{listing.college}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-full transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleLikeListing(listing.id)}
              className={`p-2 rounded-full transition-colors ${
                listing.isLiked 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-slate-500 hover:text-rose-500 hover:bg-slate-200/60'
              }`}
              title="Save item"
            >
              <Heart className={`w-4 h-4 ${listing.isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={closeListingDetail}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.urgency === 'urgent' && (
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                🔥 Urgent Exchange
              </div>
            )}
          </div>

          {/* Title & Price Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {listing.courseCode && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white">
                    {listing.courseCode}
                  </span>
                )}
                {listing.condition && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 capitalize">
                    Condition: {listing.condition.replace('_', ' ')}
                  </span>
                )}
                {listing.timeCommitment && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                    Commitment: {listing.timeCommitment}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {listing.title}
              </h2>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                {listing.price === 0 || listing.pricingType === 'free' ? 'FREE' : `$${listing.price}`}
                {listing.pricingType === 'hourly' && (
                  <span className="text-xs font-medium text-slate-500"> / hour</span>
                )}
              </div>
              <span className="text-xs text-slate-400 font-medium capitalize">
                {listing.pricingType} Exchange
              </span>
            </div>
          </div>

          {/* Document Reader Box (if PDF Notes) */}
          {listing.documentInfo && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-950 truncate">
                    {listing.documentInfo.title}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {listing.documentInfo.pages} Pages &bull; {listing.documentInfo.fileSize}
                  </p>
                </div>
              </div>

              <button
                onClick={() => openDocumentView(listing.documentInfo!)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all shrink-0"
              >
                Open Reader &rarr;
              </button>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Description &amp; Details
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {listing.description}
            </p>
          </div>

          {/* Service Skills or Collaboration Roles */}
          {listing.serviceSkills && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Services &amp; Technical Capabilities
              </h4>
              <div className="flex flex-wrap gap-2">
                {listing.serviceSkills.map((skill, i) => (
                  <span key={i} className="text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-xl">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {listing.collaborationRoles && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Open Project Team Positions
              </h4>
              <div className="flex flex-wrap gap-2">
                {listing.collaborationRoles.map((role, i) => (
                  <span key={i} className="text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-xl">
                    🚀 {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Location & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Campus Pickup / Meeting Spot</span>
                </div>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5"
                >
                  <Compass className="w-3 h-3" />
                  <span>View Map</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 pl-5.5 font-medium">{listing.location}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {listing.tags.map((tag) => (
                  <span key={tag} className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Student Author Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={listing.author.avatar}
                  alt={listing.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-400/60"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-white">{listing.author.name}</h3>
                    {listing.author.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Verified Student
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">
                    {listing.author.major} &bull; {listing.author.year}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{listing.author.rating}</span>
                </div>
                <p className="text-[11px] text-slate-400">{listing.author.reviewCount} peer reviews</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
              {listing.author.badge ? (
                <div className="inline-block px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-300">
                  🏅 {listing.author.badge}
                </div>
              ) : <div />}

              <button
                onClick={() => openReviewModalForUser(listing.author.name, listing.author.avatar, listing.title)}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Rate / Review Peer</span>
              </button>
            </div>
          </div>

          {/* Campus Safety Notice Tip */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-950">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Safe Campus Exchange Tip:</strong> Always arrange exchanges in public university spaces such as the Campus Library, Student Union, or dining hall lobbies during daytime hours.
            </p>
          </div>

        </div>

        {/* Modal Sticky Footer Action */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex items-center justify-between gap-3">
          {listing.price > 0 && (
            <button
              onClick={() => openPaymentQR(listing)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200"
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>Pay via QR</span>
            </button>
          )}

          <button
            onClick={() => openRequestModal(listing)}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>
              {listing.pillar === 'opportunity' ? 'Apply to Join' : listing.pillar === 'service' ? 'Book Service' : 'Request Exchange'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
