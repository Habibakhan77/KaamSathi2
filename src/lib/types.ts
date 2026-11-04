export type UserRole = "customer" | "provider" | "admin";

export type VerificationStatus = "pending" | "approved" | "rejected";

export type BookingStatus =
  | "requested"
  | "quoted"
  | "accepted"
  | "on_the_way"
  | "in_progress"
  | "completed"
  | "cancelled";

export type SubscriptionTier = "basic" | "pro" | "elite";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  address?: string;
  avatarUrl?: string;
  createdAt: string;
  isActive: boolean;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  businessName: string;
  cnic: string;
  category: string;
  skills: string[];
  experienceYears: number;
  hourlyRate: number;
  serviceAreas: string[];
  verificationStatus: VerificationStatus;
  verifiedAt: string | null;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  isAvailable: boolean;
  isPromoted: boolean;
  subscriptionTier: SubscriptionTier;
  bio: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  nameUrdu: string;
  namePashto: string;
  slug: string;
  icon: string;
  description: string;
  popularTasks: string[];
  basePricePkr: number;
  providerCount: number;
}

export interface VerificationRequest {
  id: string;
  providerProfileId: string;
  providerName: string;
  cnicFrontUrl: string;
  cnicBackUrl: string;
  cnicNumber: string;
  skillProofUrl?: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  adminNotes: string | null;
}

export interface AIParsedIntent {
  category: string;
  location: string;
  urgency: "low" | "medium" | "high" | "emergency";
  detectedSymptoms: string[];
  recommendedQuestions: string[];
  missingDetails?: string[];
  confidenceScore?: number;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  category: string;
  title: string;
  description: string;
  location: string;
  area: string;
  urgency: "low" | "medium" | "high" | "emergency";
  preferredDate: string;
  preferredTimeSlot: string;
  status: BookingStatus;
  aiParsed?: AIParsedIntent;
  createdAt: string;
}

export interface QuoteBreakdownItem {
  item: string;
  cost: number;
}

export interface Quotation {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  providerRating: number;
  providerExperience: string;
  estimatedCost: number;
  duration: string;
  breakdown: QuoteBreakdownItem[];
  note: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface TimelineEntry {
  status: BookingStatus;
  timestamp: string;
  note: string;
}

export interface Booking {
  id: string;
  requestId: string;
  quotationId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  category: string;
  totalAmount: number;
  paymentMethod: string;
  timeline: TimelineEntry[];
  currentStatus: BookingStatus;
  scheduledDate: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  providerId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  bookingId: string;
  customerId: string;
  providerId: string;
  subject: string;
  description: string;
  status: "pending" | "under_review" | "resolved";
  adminNotes?: string | null;
  createdAt: string;
  resolvedAt?: string | null;
}

export interface FraudFlag {
  id: string;
  providerId?: string;
  severity: "low" | "medium" | "high";
  flagType: string;
  description: string;
  status: "investigating" | "reviewed" | "blocked";
  flaggedAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  pricePkr: number;
  billingCycle: string;
  features: string[];
  isPopular: boolean;
  badge: string;
}
