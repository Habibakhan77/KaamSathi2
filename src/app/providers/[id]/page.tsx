"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Calendar,
  Clock,
  Wrench,
  CheckCircle2,
  Phone,
  ArrowLeft,
  X,
  Send,
  AlertCircle,
} from "lucide-react";
import { ProviderProfile, Review } from "@/lib/types";

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.id as string;

  const [provider, setProvider] = useState<ProviderProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Booking Form State
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDesc, setProblemDesc] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (9 AM - 12 PM)");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("0345-9123456");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/providers?id=${providerId}`);
        if (res.ok) {
          const data = await res.json();
          setProvider(data);
        }

        // Load reviews
        const revRes = await fetch(`/api/bookings?role=provider`);
        // Mock reviews for provider
        setReviews([
          {
            id: "rev-01",
            bookingId: "bk-01",
            providerId: providerId,
            customerId: "usr-cust-01",
            customerName: "Ahmad Jan (Mohallah Shahdara, Mingora)",
            rating: 5,
            comment:
              "Very punctual and professional technician. Diagnosed the root issue with my inverter circuit breaker within 15 minutes. Highly recommended in Swat!",
            createdAt: "2024-10-18T14:00:00Z",
          },
          {
            id: "rev-02",
            bookingId: "bk-02",
            providerId: providerId,
            customerId: "usr-cust-02",
            customerName: "Dr. Farooq (Saidu Teaching Hospital)",
            rating: 5,
            comment:
              "Clean work, polite demeanor, and transparent hourly pricing. Did not try to overcharge or invent fake faults.",
            createdAt: "2024-10-12T11:00:00Z",
          },
        ]);
      } catch (err) {
        console.error("Failed to load provider profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    // Check if problem query param exists
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const prob = sp.get("problem");
      if (prob) {
        setProblemDesc(decodeURIComponent(prob));
        setProblemTitle("Assistance required for reported malfunction");
      }
    }
  }, [providerId]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemTitle || !problemDesc || !preferredDate || !address) {
      alert("Please fill in all booking details.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create request & direct booking
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_request",
          request: {
            customerId: "usr-cust-01",
            customerName: "Ahmad Jan",
            customerPhone: phone,
            category: provider?.category || "electrician",
            title: problemTitle,
            description: problemDesc,
            location: address,
            area: address.includes("Saidu") ? "Saidu Sharif" : "Mingora",
            urgency: "medium",
            preferredDate,
            preferredTimeSlot: timeSlot,
          },
        }),
      });

      if (res.ok) {
        setBookingSuccess("Your booking request has been dispatched to this provider!");
        setTimeout(() => {
          setIsBookingModalOpen(false);
          router.push("/customer/dashboard");
        }, 1500);
      }
    } catch (err) {
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm font-bold text-[#3E4F47] animate-pulse">
        Loading provider details...
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#151515] dark:text-[#F2F7F4]">
          Provider Not Found
        </h2>
        <Link href="/services" className="text-xs font-bold text-[#0A5C2E] underline">
          Back to all services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Directory</span>
      </Link>

      {/* Main Profile Header Card */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center font-heading font-black text-2xl flex-shrink-0 shadow-sm border border-emerald-300 dark:border-emerald-800">
              {provider.businessName.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-2xl text-[#151515] dark:text-[#F2F7F4]">
                  {provider.businessName}
                </h1>
                {provider.verificationStatus === "approved" && (
                  <span
                    title="NADRA CNIC & Trade Verified by Admin"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] text-xs font-bold"
                  >
                    <BadgeCheck className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold text-[#0A5C2E] dark:text-[#1EB55E] capitalize">
                Professional {provider.category.replace("-", " ")}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#3E4F47] dark:text-[#B8C9C0] pt-1">
                <span className="flex items-center gap-1 font-extrabold text-amber-700 dark:text-amber-400">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {provider.rating} ({provider.reviewCount} customer reviews)
                </span>
                <span>•</span>
                <span>{provider.experienceYears} Years Trade Experience</span>
                <span>•</span>
                <span>{provider.completedJobs} Completed Jobs in Swat</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between w-full md:w-auto gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-[#D8E4DC] dark:border-[#24382E]">
            <div>
              <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Standard Hourly Rate</span>
              <div className="text-2xl font-black text-[#0A5C2E] dark:text-[#1EB55E]">
                PKR {provider.hourlyRate}
                <span className="text-xs font-medium text-[#3E4F47] dark:text-[#B8C9C0]"> / hr</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              Direct Book / Request Visit
            </button>
          </div>
        </div>

        {/* Verification Credentials Pill */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0" />
            <div>
              <strong className="text-[#0A5C2E] dark:text-[#1EB55E]">
                Trust &amp; Security Vetting Status:
              </strong>{" "}
              <span className="text-[#3E4F47] dark:text-[#B8C9C0]">
                CNIC audited under Govt standards; trade diploma verified.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
            CNIC: {provider.cnic.slice(0, 5)}******{provider.cnic.slice(-2)}
          </span>
        </div>

        {/* Bio & Description */}
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
            About the Professional
          </h3>
          <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed">
            {provider.bio}
          </p>
        </div>

        {/* Skills & Coverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2">
            <h4 className="font-heading font-bold text-xs text-[#151515] dark:text-[#F2F7F4] flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#0A5C2E] dark:text-[#1EB55E]" />
              Verified Skills &amp; Specialties:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {provider.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] text-xs font-semibold text-[#151515] dark:text-[#F2F7F4]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2">
            <h4 className="font-heading font-bold text-xs text-[#151515] dark:text-[#F2F7F4] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0A5C2E] dark:text-[#1EB55E]" />
              Service Areas Covered in Swat:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {provider.serviceAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] text-xs font-semibold text-[#151515] dark:text-[#F2F7F4]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-[#D8E4DC] dark:border-[#24382E] pb-4">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-[#151515] dark:text-[#F2F7F4]">
              Customer Reviews ({reviews.length})
            </h3>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Reviews are only permitted from verified customers after a job is marked completed.
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm font-black text-amber-700 dark:text-amber-400">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            <span>{provider.rating} / 5.0</span>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#151515] dark:text-[#F2F7F4]">
                  {rev.customerName}
                </span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
              <p className="text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
              <div className="text-[10px] text-[#3E4F47]/70 dark:text-[#B8C9C0]/70">
                Verified Booking Completed • {new Date(rev.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-elevated p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#D8E4DC] dark:border-[#24382E] pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#151515] dark:text-[#F2F7F4]">
                  Book Appointment with {provider.businessName}
                </h3>
                <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
                  Standard Rate: PKR {provider.hourlyRate}/hr • Cash on Completion
                </p>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 rounded-lg text-[#3E4F47] hover:text-[#151515] dark:text-[#B8C9C0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold text-center">
                {bookingSuccess}
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                    Problem Summary *
                  </label>
                  <input
                    type="text"
                    required
                    value={problemTitle}
                    onChange={(e) => setProblemTitle(e.target.value)}
                    placeholder="e.g. AC gas leak inspection, Breaker tripping"
                    className="w-full px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#0B1410] text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                    Detailed Symptoms / Work Needed *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={problemDesc}
                    onChange={(e) => setProblemDesc(e.target.value)}
                    placeholder="Provide exact details so technician brings correct spare parts and tools..."
                    className="w-full px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#0B1410] text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#0B1410] text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#0B1410] text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option>Morning (9 AM - 12 PM)</option>
                      <option>Afternoon (12 PM - 4 PM)</option>
                      <option>Evening (4 PM - 7 PM)</option>
                      <option>Urgent / Immediate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                    Your Complete Address in Swat *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Mohallah Shahdara, Street 4, Near Girls College, Mingora"
                    className="w-full px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#0B1410] text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                    Contact Phone Number (For SMS / Call coordination) *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0345-XXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#0B1410] text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Confirming..." : "Submit Booking Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
