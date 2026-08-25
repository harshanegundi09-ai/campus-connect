export type PillarType = 
  | 'all' 
  | 'resource' 
  | 'service' 
  | 'opportunity' 
  | 'notice_board' 
  | 'carpool';

export type ResourceCategory = 
  | 'textbooks' 
  | 'study_notes'
  | 'electronics' 
  | 'dorm' 
  | 'lab_gear' 
  | 'notes' 
  | 'clothing' 
  | 'sports' 
  | 'other';

export type ServiceCategory = 
  | 'graphic_design'
  | 'video_editing'
  | 'photography'
  | 'resume_review'
  | 'tutoring' 
  | 'language_exchange'
  | 'event_assistance'
  | 'tech_support' 
  | 'moving' 
  | 'rideshare' 
  | 'other';

export type OpportunityCategory = 
  | 'project_collab'
  | 'hackathon' 
  | 'research' 
  | 'study_group' 
  | 'campus_job' 
  | 'club_role' 
  | 'other';

export type PricingType = 'free' | 'fixed' | 'hourly' | 'borrow' | 'negotiable';

export type ConditionType = 'brand_new' | 'like_new' | 'good' | 'fair';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  email: string;
  major: string;
  year: string;
  college: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  badge?: string;
}

export interface DocumentInfo {
  title: string;
  pages: number;
  fileSize: string;
  previewUrl: string;
  previewSnippets: string[];
}

export interface ListingItem {
  id: string;
  pillar: 'resource' | 'service' | 'opportunity';
  title: string;
  description: string;
  category: string;
  pricingType: PricingType;
  price: number;
  condition?: ConditionType;
  courseCode?: string;
  location: string;
  college: string;
  images: string[];
  tags: string[];
  author: Author;
  createdAt: string;
  status: 'active' | 'reserved' | 'completed';
  timeCommitment?: string;
  deadline?: string;
  urgency?: 'urgent' | 'regular';
  likesCount: number;
  isLiked?: boolean;
  documentInfo?: DocumentInfo;
  serviceSkills?: string[];
  collaborationRoles?: string[];
}

export interface NoticeItem {
  id: string;
  type: 'lost' | 'found';
  itemCategory: 'id_card' | 'notebook' | 'tech' | 'keys' | 'clothing' | 'other';
  title: string;
  description: string;
  locationFoundOrLost: string;
  college: string;
  dateReported: string;
  image?: string;
  contactName: string;
  contactEmail: string;
  isClaimed: boolean;
  claimedBy?: string;
  reward?: string;
}

export interface CarpoolItem {
  id: string;
  driverName: string;
  driverAvatar: string;
  college: string;
  origin: string;
  destination: string;
  departureTime: string;
  seatsTotal: number;
  seatsAvailable: number;
  pricePerSeat: number; // 0 for free/gas split
  carModel: string;
  notes: string;
}

export interface SafeZone {
  id: string;
  name: string;
  location: string;
  hours: string;
  securityFeatures: string[];
  description: string;
  latRatio: number; // 0 to 100 for map placement
  lngRatio: number; // 0 to 100 for map placement
}

export interface ExchangeRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPillar: 'resource' | 'service' | 'opportunity';
  listingImage?: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderCollege: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  message: string;
  proposedDate?: string;
  proposedLocation?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  requestId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  major: string;
  year: string;
  bio: string;
  isVerified: boolean;
  rating: number;
  savedListingIds: string[];
  completedExchanges: number;
  campusCashBalance: number;
}
