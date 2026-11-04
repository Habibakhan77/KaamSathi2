import {
  UserProfile,
  ProviderProfile,
  Category,
  VerificationRequest,
  ServiceRequest,
  Quotation,
  Booking,
  Review,
  Complaint,
  FraudFlag,
  SubscriptionPlan,
  BookingStatus,
} from "../types";

export interface IRepository {
  // Profiles
  getProfiles(): Promise<UserProfile[]>;
  getProfileById(id: string): Promise<UserProfile | null>;
  getProfileByEmail(email: string): Promise<UserProfile | null>;
  createProfile(profile: Omit<UserProfile, "id" | "createdAt">): Promise<UserProfile>;
  updateProfile(id: string, updates: Partial<UserProfile>): Promise<UserProfile>;

  // Providers
  getProviderProfiles(): Promise<ProviderProfile[]>;
  getProviderById(id: string): Promise<ProviderProfile | null>;
  getProviderByUserId(userId: string): Promise<ProviderProfile | null>;
  createProviderProfile(provider: Omit<ProviderProfile, "id">): Promise<ProviderProfile>;
  updateProviderProfile(id: string, updates: Partial<ProviderProfile>): Promise<ProviderProfile>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;

  // Verification Requests
  getVerificationRequests(): Promise<VerificationRequest[]>;
  createVerificationRequest(req: Omit<VerificationRequest, "id" | "submittedAt" | "status" | "reviewedAt" | "reviewedBy" | "adminNotes">): Promise<VerificationRequest>;
  updateVerificationStatus(id: string, status: "approved" | "rejected", adminNotes?: string): Promise<VerificationRequest>;

  // Service Requests
  getServiceRequests(): Promise<ServiceRequest[]>;
  getServiceRequestsByCustomer(customerId: string): Promise<ServiceRequest[]>;
  createServiceRequest(req: Omit<ServiceRequest, "id" | "createdAt" | "status">): Promise<ServiceRequest>;
  updateServiceRequestStatus(id: string, status: BookingStatus): Promise<ServiceRequest>;

  // Quotations
  getQuotations(requestId?: string): Promise<Quotation[]>;
  createQuotation(quote: Omit<Quotation, "id" | "createdAt" | "status">): Promise<Quotation>;
  acceptQuotation(quotationId: string, bookingData?: Partial<Booking>): Promise<Booking>;

  // Bookings
  getBookings(userId?: string, role?: string): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | null>;
  createBooking(booking: Omit<Booking, "id" | "createdAt">): Promise<Booking>;
  updateBookingStatus(bookingId: string, status: BookingStatus, note?: string): Promise<Booking>;

  // Reviews
  getReviews(providerId?: string): Promise<Review[]>;
  createReview(review: Omit<Review, "id" | "createdAt">): Promise<Review>;

  // Complaints
  getComplaints(userId?: string): Promise<Complaint[]>;
  createComplaint(complaint: Omit<Complaint, "id" | "createdAt" | "status">): Promise<Complaint>;
  resolveComplaint(complaintId: string, adminNotes: string): Promise<Complaint>;

  // Fraud Flags
  getFraudFlags(): Promise<FraudFlag[]>;
  createFraudFlag(flag: Omit<FraudFlag, "id" | "flaggedAt">): Promise<FraudFlag>;
  updateFraudFlagStatus(id: string, status: "investigating" | "reviewed" | "blocked"): Promise<FraudFlag>;

  // Subscriptions
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  updateProviderSubscription(providerProfileId: string, tier: "basic" | "pro" | "elite"): Promise<ProviderProfile>;
}
