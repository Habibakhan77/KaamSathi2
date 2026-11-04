import { IRepository } from "./repository";
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
import initialData from "../../../data/mock-db.json";

// In-memory working copy
let dbState = {
  profiles: [...initialData.profiles] as UserProfile[],
  providerProfiles: [...initialData.providerProfiles] as ProviderProfile[],
  categories: [...initialData.categories] as Category[],
  verificationRequests: [...initialData.verificationRequests] as VerificationRequest[],
  serviceRequests: [...initialData.serviceRequests] as ServiceRequest[],
  quotations: [...initialData.quotations] as Quotation[],
  bookings: [...initialData.bookings] as Booking[],
  reviews: [...initialData.reviews] as Review[],
  complaints: [...initialData.complaints] as Complaint[],
  fraudFlags: [...initialData.fraudFlags] as FraudFlag[],
  subscriptionPlans: [...initialData.subscriptionPlans] as SubscriptionPlan[],
};

export class MockAdapter implements IRepository {
  // Profiles
  async getProfiles(): Promise<UserProfile[]> {
    return [...dbState.profiles];
  }

  async getProfileById(id: string): Promise<UserProfile | null> {
    return dbState.profiles.find((p) => p.id === id) || null;
  }

  async getProfileByEmail(email: string): Promise<UserProfile | null> {
    return (
      dbState.profiles.find(
        (p) => p.email.toLowerCase() === email.toLowerCase()
      ) || null
    );
  }

  async createProfile(
    profileData: Omit<UserProfile, "id" | "createdAt">
  ): Promise<UserProfile> {
    const newProfile: UserProfile = {
      ...profileData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    dbState.profiles.push(newProfile);
    return newProfile;
  }

  async updateProfile(
    id: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfile> {
    const idx = dbState.profiles.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Profile not found: ${id}`);
    dbState.profiles[idx] = { ...dbState.profiles[idx], ...updates };
    return dbState.profiles[idx];
  }

  // Providers
  async getProviderProfiles(): Promise<ProviderProfile[]> {
    return [...dbState.providerProfiles];
  }

  async getProviderById(id: string): Promise<ProviderProfile | null> {
    return dbState.providerProfiles.find((p) => p.id === id) || null;
  }

  async getProviderByUserId(userId: string): Promise<ProviderProfile | null> {
    return (
      dbState.providerProfiles.find((p) => p.userId === userId) || null
    );
  }

  async createProviderProfile(
    provider: Omit<ProviderProfile, "id">
  ): Promise<ProviderProfile> {
    const newProvider: ProviderProfile = {
      ...provider,
      id: `prov-prof-${Date.now()}`,
    };
    dbState.providerProfiles.push(newProvider);
    return newProvider;
  }

  async updateProviderProfile(
    id: string,
    updates: Partial<ProviderProfile>
  ): Promise<ProviderProfile> {
    const idx = dbState.providerProfiles.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Provider profile not found: ${id}`);
    dbState.providerProfiles[idx] = { ...dbState.providerProfiles[idx], ...updates };
    return dbState.providerProfiles[idx];
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return [...dbState.categories];
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return dbState.categories.find((c) => c.id === id) || null;
  }

  // Verification Requests
  async getVerificationRequests(): Promise<VerificationRequest[]> {
    return [...dbState.verificationRequests];
  }

  async createVerificationRequest(
    req: Omit<VerificationRequest, "id" | "submittedAt" | "status" | "reviewedAt" | "reviewedBy" | "adminNotes">
  ): Promise<VerificationRequest> {
    const newReq: VerificationRequest = {
      ...req,
      id: `verif-req-${Date.now()}`,
      status: "pending",
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      adminNotes: null,
    };
    dbState.verificationRequests.push(newReq);
    return newReq;
  }

  async updateVerificationStatus(
    id: string,
    status: "approved" | "rejected",
    adminNotes?: string
  ): Promise<VerificationRequest> {
    const idx = dbState.verificationRequests.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Verification request not found: ${id}`);
    
    dbState.verificationRequests[idx] = {
      ...dbState.verificationRequests[idx],
      status,
      adminNotes: adminNotes || null,
      reviewedAt: new Date().toISOString(),
      reviewedBy: "admin@kaamsaathi.pk",
    };

    // If approved, update providerProfile status
    const req = dbState.verificationRequests[idx];
    const provIdx = dbState.providerProfiles.findIndex(
      (p) => p.id === req.providerProfileId
    );
    if (provIdx !== -1) {
      dbState.providerProfiles[provIdx].verificationStatus = status;
      if (status === "approved") {
        dbState.providerProfiles[provIdx].verifiedAt = new Date().toISOString();
      }
    }

    return dbState.verificationRequests[idx];
  }

  // Service Requests
  async getServiceRequests(): Promise<ServiceRequest[]> {
    return [...dbState.serviceRequests];
  }

  async getServiceRequestsByCustomer(customerId: string): Promise<ServiceRequest[]> {
    return dbState.serviceRequests.filter((r) => r.customerId === customerId);
  }

  async createServiceRequest(
    req: Omit<ServiceRequest, "id" | "createdAt" | "status">
  ): Promise<ServiceRequest> {
    const newReq: ServiceRequest = {
      ...req,
      id: `req-${Date.now()}`,
      status: "requested",
      createdAt: new Date().toISOString(),
    };
    dbState.serviceRequests.unshift(newReq);
    return newReq;
  }

  async updateServiceRequestStatus(
    id: string,
    status: BookingStatus
  ): Promise<ServiceRequest> {
    const idx = dbState.serviceRequests.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Request not found: ${id}`);
    dbState.serviceRequests[idx].status = status;
    return dbState.serviceRequests[idx];
  }

  // Quotations
  async getQuotations(requestId?: string): Promise<Quotation[]> {
    if (requestId) {
      return dbState.quotations.filter((q) => q.requestId === requestId);
    }
    return [...dbState.quotations];
  }

  async createQuotation(
    quote: Omit<Quotation, "id" | "createdAt" | "status">
  ): Promise<Quotation> {
    const newQuote: Quotation = {
      ...quote,
      id: `quot-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    dbState.quotations.push(newQuote);

    // Update service request status to 'quoted'
    const req = dbState.serviceRequests.find((r) => r.id === quote.requestId);
    if (req && req.status === "requested") {
      req.status = "quoted";
    }

    return newQuote;
  }

  async acceptQuotation(
    quotationId: string,
    bookingData?: Partial<Booking>
  ): Promise<Booking> {
    const quote = dbState.quotations.find((q) => q.id === quotationId);
    if (!quote) throw new Error(`Quotation not found: ${quotationId}`);

    quote.status = "accepted";

    // Mark other quotes on same request as rejected
    dbState.quotations.forEach((q) => {
      if (q.requestId === quote.requestId && q.id !== quotationId) {
        q.status = "rejected";
      }
    });

    const request = dbState.serviceRequests.find((r) => r.id === quote.requestId);
    if (request) {
      request.status = "accepted";
    }

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      requestId: quote.requestId,
      quotationId: quote.id,
      customerId: request?.customerId || "usr-cust-01",
      customerName: request?.customerName || "Ahmad Jan",
      customerPhone: request?.customerPhone || "0345-9123456",
      customerAddress: request?.location || "Mingora, Swat",
      providerId: quote.providerId,
      providerName: quote.providerName,
      providerPhone: "0346-8234567",
      category: request?.category || "general",
      totalAmount: quote.estimatedCost,
      paymentMethod: "Cash on Completion",
      timeline: [
        {
          status: "requested",
          timestamp: request?.createdAt || new Date().toISOString(),
          note: "Service request submitted",
        },
        {
          status: "quoted",
          timestamp: quote.createdAt,
          note: `Quotation of PKR ${quote.estimatedCost} submitted by ${quote.providerName}`,
        },
        {
          status: "accepted",
          timestamp: new Date().toISOString(),
          note: "Customer accepted quotation and confirmed booking",
        },
      ],
      currentStatus: "accepted",
      scheduledDate: request?.preferredDate || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      ...bookingData,
    };

    dbState.bookings.unshift(newBooking);
    return newBooking;
  }

  // Bookings
  async getBookings(userId?: string, role?: string): Promise<Booking[]> {
    if (!userId) return [...dbState.bookings];
    if (role === "provider") {
      return dbState.bookings.filter((b) => b.providerId === userId);
    }
    return dbState.bookings.filter((b) => b.customerId === userId);
  }

  async getBookingById(id: string): Promise<Booking | null> {
    return dbState.bookings.find((b) => b.id === id) || null;
  }

  async createBooking(booking: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    dbState.bookings.unshift(newBooking);
    return newBooking;
  }

  async updateBookingStatus(
    bookingId: string,
    status: BookingStatus,
    note?: string
  ): Promise<Booking> {
    const idx = dbState.bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) throw new Error(`Booking not found: ${bookingId}`);

    const booking = dbState.bookings[idx];
    booking.currentStatus = status;
    booking.timeline.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status updated to ${status}`,
    });

    if (status === "completed") {
      // Increment completed jobs count for provider
      const prov = dbState.providerProfiles.find(
        (p) => p.userId === booking.providerId
      );
      if (prov) {
        prov.completedJobs += 1;
      }
    }

    return booking;
  }

  // Reviews
  async getReviews(providerId?: string): Promise<Review[]> {
    if (providerId) {
      return dbState.reviews.filter((r) => r.providerId === providerId);
    }
    return [...dbState.reviews];
  }

  async createReview(review: Omit<Review, "id" | "createdAt">): Promise<Review> {
    // Check one review per booking
    const existing = dbState.reviews.find((r) => r.bookingId === review.bookingId);
    if (existing) {
      throw new Error("A review has already been submitted for this completed job.");
    }

    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    dbState.reviews.unshift(newRev);

    // Recalculate provider average rating
    const prov = dbState.providerProfiles.find(
      (p) => p.userId === review.providerId
    );
    if (prov) {
      const provReviews = dbState.reviews.filter(
        (r) => r.providerId === review.providerId
      );
      const totalStars = provReviews.reduce((sum, r) => sum + r.rating, 0);
      prov.reviewCount = provReviews.length;
      prov.rating = Number((totalStars / provReviews.length).toFixed(1));
    }

    return newRev;
  }

  // Complaints
  async getComplaints(userId?: string): Promise<Complaint[]> {
    if (userId) {
      return dbState.complaints.filter(
        (c) => c.customerId === userId || c.providerId === userId
      );
    }
    return [...dbState.complaints];
  }

  async createComplaint(
    complaint: Omit<Complaint, "id" | "createdAt" | "status">
  ): Promise<Complaint> {
    const newComp: Complaint = {
      ...complaint,
      id: `cmp-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    dbState.complaints.unshift(newComp);
    return newComp;
  }

  async resolveComplaint(
    complaintId: string,
    adminNotes: string
  ): Promise<Complaint> {
    const comp = dbState.complaints.find((c) => c.id === complaintId);
    if (!comp) throw new Error(`Complaint not found: ${complaintId}`);
    comp.status = "resolved";
    comp.adminNotes = adminNotes;
    comp.resolvedAt = new Date().toISOString();
    return comp;
  }

  // Fraud Flags
  async getFraudFlags(): Promise<FraudFlag[]> {
    return [...dbState.fraudFlags];
  }

  async createFraudFlag(
    flag: Omit<FraudFlag, "id" | "flaggedAt">
  ): Promise<FraudFlag> {
    const newFlag: FraudFlag = {
      ...flag,
      id: `frd-${Date.now()}`,
      flaggedAt: new Date().toISOString(),
    };
    dbState.fraudFlags.unshift(newFlag);
    return newFlag;
  }

  async updateFraudFlagStatus(
    id: string,
    status: "investigating" | "reviewed" | "blocked"
  ): Promise<FraudFlag> {
    const flag = dbState.fraudFlags.find((f) => f.id === id);
    if (!flag) throw new Error(`Fraud flag not found: ${id}`);
    flag.status = status;
    return flag;
  }

  // Subscriptions
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return [...dbState.subscriptionPlans];
  }

  async updateProviderSubscription(
    providerProfileId: string,
    tier: "basic" | "pro" | "elite"
  ): Promise<ProviderProfile> {
    const prov = dbState.providerProfiles.find(
      (p) => p.id === providerProfileId
    );
    if (!prov) throw new Error("Provider not found");
    prov.subscriptionTier = tier;
    if (tier === "elite" || tier === "pro") {
      prov.isPromoted = true;
    }
    return prov;
  }
}

export const mockRepository = new MockAdapter();
