'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  ListingItem, 
  ExchangeRequest, 
  ChatMessage, 
  UserProfile, 
  PillarType, 
  NoticeItem, 
  CarpoolItem, 
  SafeZone,
  DocumentInfo
} from './types';
import { 
  INITIAL_LISTINGS, 
  INITIAL_REQUESTS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTICES,
  INITIAL_CARPOOLS,
  SAFE_ZONES,
  CURRENT_USER 
} from './seedData';

interface AppContextType {
  listings: ListingItem[];
  requests: ExchangeRequest[];
  messages: ChatMessage[];
  notices: NoticeItem[];
  carpools: CarpoolItem[];
  safeZones: SafeZone[];
  user: UserProfile;
  selectedCollege: string;
  selectedPillar: PillarType;
  searchQuery: string;
  selectedCategory: string;
  priceFilter: { min: number; max: number; freeOnly: boolean };
  onlyUrgent: boolean;
  
  // Modals & Panels
  activeListingDetail: ListingItem | null;
  activeDocumentView: DocumentInfo | null;
  isCreateModalOpen: boolean;
  isMessagingOpen: boolean;
  isDashboardOpen: boolean;
  isRequestModalOpen: boolean;
  isMapModalOpen: boolean;
  isPaymentQRModalOpen: boolean;
  isReviewModalOpen: boolean;
  isReportLostModalOpen: boolean;
  selectedRequestForChat: ExchangeRequest | null;
  targetListingForRequest: ListingItem | null;
  targetListingForPayment: ListingItem | null;
  targetAuthorForReview: { name: string; avatar: string; listingTitle: string } | null;
  toastMessage: string | null;

  // Actions
  setSelectedCollege: (college: string) => void;
  setSelectedPillar: (pillar: PillarType) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setPriceFilter: React.Dispatch<React.SetStateAction<{ min: number; max: number; freeOnly: boolean }>>;
  setOnlyUrgent: (urgent: boolean) => void;
  openListingDetail: (listing: ListingItem) => void;
  closeListingDetail: () => void;
  openDocumentView: (doc: DocumentInfo) => void;
  closeDocumentView: () => void;
  setIsCreateModalOpen: (open: boolean) => void;
  setIsMessagingOpen: (open: boolean) => void;
  setIsDashboardOpen: (open: boolean) => void;
  setIsMapModalOpen: (open: boolean) => void;
  setIsPaymentQRModalOpen: (open: boolean) => void;
  setIsReviewModalOpen: (open: boolean) => void;
  setIsReportLostModalOpen: (open: boolean) => void;
  openPaymentQR: (listing: ListingItem) => void;
  openReviewModalForUser: (name: string, avatar: string, listingTitle: string) => void;
  openRequestModal: (listing: ListingItem) => void;
  closeRequestModal: () => void;
  openChatForRequest: (request: ExchangeRequest) => void;
  toggleLikeListing: (listingId: string) => void;
  createListing: (listing: Omit<ListingItem, 'id' | 'createdAt' | 'author' | 'likesCount' | 'status'>) => void;
  submitExchangeRequest: (listingId: string, message: string, date?: string, location?: string) => void;
  sendChatMessage: (requestId: string, text: string) => void;
  updateRequestStatus: (requestId: string, status: 'accepted' | 'declined' | 'completed') => void;
  claimNoticeItem: (noticeId: string) => void;
  createNoticeItem: (notice: Omit<NoticeItem, 'id' | 'dateReported' | 'isClaimed'>) => void;
  bookCarpoolSeat: (carpoolId: string) => void;
  processQRPayment: (amount: number, recipientName: string) => boolean;
  submitUserReview: (rating: number, reviewText: string, badges: string[]) => void;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<ListingItem[]>(INITIAL_LISTINGS);
  const [requests, setRequests] = useState<ExchangeRequest[]>(INITIAL_REQUESTS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [carpools, setCarpools] = useState<CarpoolItem[]>(INITIAL_CARPOOLS);
  const [safeZones] = useState<SafeZone[]>(SAFE_ZONES);
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);

  const [selectedCollege, setSelectedCollege] = useState<string>('All Campuses');
  const [selectedPillar, setSelectedPillar] = useState<PillarType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 150, freeOnly: false });
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  // Modals & Panels
  const [activeListingDetail, setActiveListingDetail] = useState<ListingItem | null>(null);
  const [activeDocumentView, setActiveDocumentView] = useState<DocumentInfo | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isPaymentQRModalOpen, setIsPaymentQRModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReportLostModalOpen, setIsReportLostModalOpen] = useState(false);

  const [targetListingForRequest, setTargetListingForRequest] = useState<ListingItem | null>(null);
  const [targetListingForPayment, setTargetListingForPayment] = useState<ListingItem | null>(null);
  const [targetAuthorForReview, setTargetAuthorForReview] = useState<{ name: string; avatar: string; listingTitle: string } | null>(null);
  const [selectedRequestForChat, setSelectedRequestForChat] = useState<ExchangeRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const openListingDetail = (listing: ListingItem) => {
    setActiveListingDetail(listing);
  };

  const closeListingDetail = () => {
    setActiveListingDetail(null);
  };

  const openDocumentView = (doc: DocumentInfo) => {
    setActiveDocumentView(doc);
  };

  const closeDocumentView = () => {
    setActiveDocumentView(null);
  };

  const openPaymentQR = (listing: ListingItem) => {
    setTargetListingForPayment(listing);
    setIsPaymentQRModalOpen(true);
  };

  const openReviewModalForUser = (name: string, avatar: string, listingTitle: string) => {
    setTargetAuthorForReview({ name, avatar, listingTitle });
    setIsReviewModalOpen(true);
  };

  const openRequestModal = (listing: ListingItem) => {
    setTargetListingForRequest(listing);
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setTargetListingForRequest(null);
  };

  const openChatForRequest = (req: ExchangeRequest) => {
    setSelectedRequestForChat(req);
    setIsMessagingOpen(true);
  };

  const toggleLikeListing = (listingId: string) => {
    setListings(prev =>
      prev.map(item => {
        if (item.id === listingId) {
          const isLiked = !item.isLiked;
          return {
            ...item,
            isLiked,
            likesCount: isLiked ? item.likesCount + 1 : item.likesCount - 1,
          };
        }
        return item;
      })
    );

    setUser(prev => {
      const isSaved = prev.savedListingIds.includes(listingId);
      const updatedSaved = isSaved
        ? prev.savedListingIds.filter(id => id !== listingId)
        : [...prev.savedListingIds, listingId];
      return { ...prev, savedListingIds: updatedSaved };
    });
  };

  const createListing = (newListingData: Omit<ListingItem, 'id' | 'createdAt' | 'author' | 'likesCount' | 'status'>) => {
    const newListing: ListingItem = {
      ...newListingData,
      id: `custom_${Date.now()}`,
      createdAt: 'Just now',
      status: 'active',
      likesCount: 0,
      isLiked: false,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        major: user.major,
        year: user.year,
        college: newListingData.college || user.college,
        rating: user.rating,
        reviewCount: user.completedExchanges,
        isVerified: user.isVerified,
        badge: 'Campus Member',
      },
    };

    setListings(prev => [newListing, ...prev]);
    showToast(`🎉 Your ${newListing.pillar} "${newListing.title}" is now live!`);
    setIsCreateModalOpen(false);
  };

  const submitExchangeRequest = (
    listingId: string, 
    message: string, 
    proposedDate?: string, 
    proposedLocation?: string
  ) => {
    const target = listings.find(l => l.id === listingId);
    if (!target) return;

    const newReqId = `req_${Date.now()}`;
    const newRequest: ExchangeRequest = {
      id: newReqId,
      listingId: target.id,
      listingTitle: target.title,
      listingPillar: target.pillar,
      listingImage: target.images[0],
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      senderCollege: user.college,
      receiverId: target.author.id,
      status: 'pending',
      message,
      proposedDate,
      proposedLocation,
      createdAt: 'Just now',
    };

    const initialMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      requestId: newReqId,
      senderId: user.id,
      senderName: user.name,
      text: message,
      timestamp: 'Just now',
    };

    setRequests(prev => [newRequest, ...prev]);
    setMessages(prev => [...prev, initialMsg]);
    showToast(`Request sent to ${target.author.name}!`);
    closeRequestModal();
    if (activeListingDetail?.id === listingId) {
      closeListingDetail();
    }

    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg_reply_${Date.now()}`,
        requestId: newReqId,
        senderId: target.author.id,
        senderName: target.author.name,
        text: `Hey Alex! Thanks for reaching out about "${target.title}". That time and spot (${proposedLocation || 'campus'}) works well for me!`,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 2800);
  };

  const sendChatMessage = (requestId: string, text: string) => {
    if (!text.trim()) return;
    const req = requests.find(r => r.id === requestId);
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      requestId,
      senderId: user.id,
      senderName: user.name,
      text,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, newMsg]);

    if (req && req.receiverId !== user.id) {
      setTimeout(() => {
        const autoReply: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          requestId,
          senderId: req.receiverId,
          senderName: listings.find(l => l.id === req.listingId)?.author.name || 'Campus Student',
          text: 'Got it! Looking forward to meeting up on campus.',
          timestamp: 'Just now',
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const updateRequestStatus = (requestId: string, status: 'accepted' | 'declined' | 'completed') => {
    setRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status } : r))
    );
    showToast(`Exchange status updated to: ${status.toUpperCase()}`);
    
    if (status === 'completed') {
      const req = requests.find(r => r.id === requestId);
      if (req) {
        setTimeout(() => {
          openReviewModalForUser(req.senderName, req.senderAvatar, req.listingTitle);
        }, 1000);
      }
    }
  };

  const claimNoticeItem = (noticeId: string) => {
    setNotices(prev =>
      prev.map(n => {
        if (n.id === noticeId) {
          return {
            ...n,
            isClaimed: true,
            claimedBy: user.name,
          };
        }
        return n;
      })
    );
    showToast(`🎉 Item claimed successfully! Verification notice sent to the poster.`);
  };

  const createNoticeItem = (noticeData: Omit<NoticeItem, 'id' | 'dateReported' | 'isClaimed'>) => {
    const newNotice: NoticeItem = {
      ...noticeData,
      id: `not_${Date.now()}`,
      dateReported: 'Just now',
      isClaimed: false,
    };
    setNotices(prev => [newNotice, ...prev]);
    showToast(`📋 Notice posted on the Campus Lost & Found Board!`);
    setIsReportLostModalOpen(false);
  };

  const bookCarpoolSeat = (carpoolId: string) => {
    setCarpools(prev =>
      prev.map(c => {
        if (c.id === carpoolId && c.seatsAvailable > 0) {
          return { ...c, seatsAvailable: c.seatsAvailable - 1 };
        }
        return c;
      })
    );
    showToast(`🚗 Seat reserved! Driver contact info sent.`);
  };

  const processQRPayment = (amount: number, recipientName: string) => {
    if (user.campusCashBalance < amount) {
      showToast(`❌ Insufficient Campus Cash balance ($${user.campusCashBalance.toFixed(2)} available).`);
      return false;
    }

    setUser(prev => ({
      ...prev,
      campusCashBalance: prev.campusCashBalance - amount,
      completedExchanges: prev.completedExchanges + 1,
    }));

    showToast(`💳 Payment of $${amount.toFixed(2)} sent securely to ${recipientName}!`);
    setIsPaymentQRModalOpen(false);
    return true;
  };

  const submitUserReview = (rating: number, reviewText: string, badges: string[]) => {
    showToast(`⭐ Review with ${rating} stars and badges submitted! Thank you.`);
    setIsReviewModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        listings,
        requests,
        messages,
        notices,
        carpools,
        safeZones,
        user,
        selectedCollege,
        selectedPillar,
        searchQuery,
        selectedCategory,
        priceFilter,
        onlyUrgent,
        
        activeListingDetail,
        activeDocumentView,
        isCreateModalOpen,
        isMessagingOpen,
        isDashboardOpen,
        isRequestModalOpen,
        isMapModalOpen,
        isPaymentQRModalOpen,
        isReviewModalOpen,
        isReportLostModalOpen,
        selectedRequestForChat,
        targetListingForRequest,
        targetListingForPayment,
        targetAuthorForReview,
        toastMessage,

        setSelectedCollege,
        setSelectedPillar,
        setSearchQuery,
        setSelectedCategory,
        setPriceFilter,
        setOnlyUrgent,
        openListingDetail,
        closeListingDetail,
        openDocumentView,
        closeDocumentView,
        setIsCreateModalOpen,
        setIsMessagingOpen,
        setIsDashboardOpen,
        setIsMapModalOpen,
        setIsPaymentQRModalOpen,
        setIsReviewModalOpen,
        setIsReportLostModalOpen,
        openPaymentQR,
        openReviewModalForUser,
        openRequestModal,
        closeRequestModal,
        openChatForRequest,
        toggleLikeListing,
        createListing,
        submitExchangeRequest,
        sendChatMessage,
        updateRequestStatus,
        claimNoticeItem,
        createNoticeItem,
        bookCarpoolSeat,
        processQRPayment,
        submitUserReview,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
