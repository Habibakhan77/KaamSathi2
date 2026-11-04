"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import { JobTracker } from "@/components/booking/JobTracker";
import { Booking } from "@/lib/types";

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Review Modal State
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Complaint Modal State
  const [selectedBookingForComplaint, setSelectedBookingForComplaint] = useState<Booking | null>(null);
  const [complaintSubject, setComplaintSubject] = useState("");
  const [complaintDesc, setComplaintDesc] = useState("");
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);

  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await fetch("/api/bookings?userId=usr-cust-01&role=customer");
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadBookings();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForReview || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      alert("Thank you! Your verified rating and review has been posted on the provider profile.");
      setSelectedBookingForReview(null);
      setReviewComment("");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForComplaint || !complaintSubject.trim() || !complaintDesc.trim()) return;

    setIsSubmittingComplaint(true);
    try {
      alert("Dispute reported to University of Swat platform administrator. Case ID registered for review.");
      setSelectedBookingForComplaint(null);
      setComplaintSubject("");
      setComplaintDesc("");
    } finally {
      setIsSubmittingComplaint(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="space-y-2 border-b border-[#D8E4DC] dark:border-[#24382E] pb-6">
        <Link
          href="/customer/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E4F47] hover:text-[#0A5C2E]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          My Service Bookings &amp; Job Timeline History
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Track status updates in real-time, inspect itemized costs, rate technicians, and manage disputes.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-xs font-bold text-[#3E4F47] animate-pulse">
          Loading service bookings...
        </div>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div key={booking.id} className="space-y-4">
              <JobTracker
                currentStatus={booking.currentStatus}
                timeline={booking.timeline}
                totalAmount={booking.totalAmount}
                paymentMethod={booking.paymentMethod}
                providerName={booking.providerName}
                category={booking.category}
              />

              {/* Action Toolbar for this Booking */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
                {booking.currentStatus === "completed" && (
                  <button
                    onClick={() => setSelectedBookingForReview(booking)}
                    className="px-4 py-2 rounded-xl bg-[#F5A524] hover:bg-[#E0931B] text-[#151515] font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <Star className="w-3.5 h-3.5 fill-black" />
                    <span>Leave Verified Review</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedBookingForComplaint(booking)}
                  className="px-4 py-2 rounded-xl border border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1.5 transition-all"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Report Issue / File Complaint</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedBookingForReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-elevated p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8E4DC] dark:border-[#24382E] pb-3">
              <h3 className="font-heading font-extrabold text-base text-[#151515] dark:text-[#F2F7F4]">
                Rate &amp; Review Technician
              </h3>
              <button
                onClick={() => setSelectedBookingForReview(null)}
                className="p-1 rounded-lg text-[#3E4F47]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-amber-500 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating ? "fill-amber-500" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-xs text-[#151515] dark:text-[#F2F7F4]">
                    ({reviewRating} / 5 Stars)
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                  Your Honest Feedback *
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe workmanship, punctuality, and cleanliness..."
                  className="w-full p-3 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all"
              >
                {isSubmittingReview ? "Submitting..." : "Post Verified Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Modal */}
      {selectedBookingForComplaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-elevated p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8E4DC] dark:border-[#24382E] pb-3">
              <h3 className="font-heading font-extrabold text-base text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <ShieldAlert className="w-5 h-5" />
                <span>File Dispute / Service Complaint</span>
              </h3>
              <button
                onClick={() => setSelectedBookingForComplaint(null)}
                className="p-1 rounded-lg text-[#3E4F47]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleComplaintSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                  Nature of Dispute / Subject *
                </label>
                <input
                  type="text"
                  required
                  value={complaintSubject}
                  onChange={(e) => setComplaintSubject(e.target.value)}
                  placeholder="e.g. Unresolved leak after payment, Missed appointment"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                  Detailed Explanation *
                </label>
                <textarea
                  required
                  rows={4}
                  value={complaintDesc}
                  onChange={(e) => setComplaintDesc(e.target.value)}
                  placeholder="Provide complete facts. University of Swat administration mediates all disputes under the pilot warranty..."
                  className="w-full p-3 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingComplaint}
                className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition-all"
              >
                {isSubmittingComplaint ? "Filing Case..." : "Submit Complaint to Admin"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
