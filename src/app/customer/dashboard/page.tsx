"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Star,
  FileText,
  DollarSign,
} from "lucide-react";
import { JobTracker } from "@/components/booking/JobTracker";
import { Booking, Quotation, ServiceRequest } from "@/lib/types";

export default function CustomerDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingQuoteId, setAcceptingQuoteId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomerData() {
      try {
        const bkRes = await fetch("/api/bookings?userId=usr-cust-01&role=customer");
        const bkData = await bkRes.json();
        setBookings(Array.isArray(bkData) ? bkData : []);

        // Load quotes on active requests
        setQuotations([
          {
            id: "quot-01",
            requestId: "req-01",
            providerId: "usr-prov-02",
            providerName: "Gulzar Ahmed (Swat Chill AC)",
            providerRating: 4.8,
            providerExperience: "7 years",
            estimatedCost: 2200,
            duration: "1.5 hours",
            breakdown: [
              { item: "Inspection & Gauge Diagnostics", cost: 600 },
              { item: "Coil Wash & Terminal Tightening", cost: 800 },
              { item: "R410 Refrigerant Top-up (up to 30 PSI)", cost: 800 },
            ],
            note: "Can visit today between 3 PM to 5 PM. 15-day service guarantee included.",
            status: "pending",
            createdAt: new Date().toISOString(),
          },
          {
            id: "quot-03",
            requestId: "req-01",
            providerId: "usr-prov-01",
            providerName: "Rashid Khan (Rashid Electric & AC)",
            providerRating: 4.9,
            providerExperience: "9 years",
            estimatedCost: 1900,
            duration: "1 hour",
            breakdown: [
              { item: "Compressor Capacitor Test", cost: 500 },
              { item: "Pressure Leak Check", cost: 600 },
              { item: "Gas Adjustment Labor", cost: 800 },
            ],
            note: "Available within 45 mins. Genuine parts brought directly from Nishat Chowk.",
            status: "pending",
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCustomerData();
  }, []);

  const handleAcceptQuotation = async (quoteId: string) => {
    setAcceptingQuoteId(quoteId);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "accept_quote",
          quotationId: quoteId,
        }),
      });

      if (res.ok) {
        const newBooking = await res.json();
        setBookings((prev) => [newBooking, ...prev]);
        setQuotations((prev) => prev.filter((q) => q.id !== quoteId));
        alert("Quotation accepted! The technician has been notified to proceed.");
      }
    } catch {
      alert("Failed to accept quotation.");
    } finally {
      setAcceptingQuoteId(null);
    }
  };

  const activeBooking = bookings.find(
    (b) => b.currentStatus !== "completed" && b.currentStatus !== "cancelled"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#0A5C2E] text-white flex items-center justify-center font-heading font-black text-xl shadow-sm">
            AJ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
                Ahmad Jan
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold">
                Customer Demo Account
              </span>
            </div>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Mohallah Shahdara, Mingora, Swat • 0345-9123456
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link
            href="/customer/request"
            className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Service Job</span>
          </Link>
          <Link
            href="/customer/bookings"
            className="px-4 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] text-xs font-bold text-[#151515] dark:text-[#F2F7F4] hover:bg-black/5 dark:hover:bg-white/5"
          >
            All Bookings ({bookings.length})
          </Link>
        </div>
      </div>

      {/* Active Job Visual Tracker Highlight */}
      {activeBooking && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-lg text-[#151515] dark:text-[#F2F7F4] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              Active Ongoing Job Tracking
            </h2>
            <span className="text-xs font-mono font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
              Booking ID: #{activeBooking.id}
            </span>
          </div>

          <JobTracker
            currentStatus={activeBooking.currentStatus}
            timeline={activeBooking.timeline}
            totalAmount={activeBooking.totalAmount}
            paymentMethod={activeBooking.paymentMethod}
            providerName={activeBooking.providerName}
            category={activeBooking.category}
          />
        </div>
      )}

      {/* Side-by-Side Quotation Comparison Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-lg text-[#151515] dark:text-[#F2F7F4]">
              Quotations Awaiting Your Decision ({quotations.length})
            </h2>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Compare technician pricing, itemized breakdowns, and reviews side-by-side.
            </p>
          </div>
          <span className="text-xs text-amber-700 dark:text-amber-400 font-bold">
            Job Request: Inverter AC Cooling Issue (Mingora)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotations.map((quote) => (
            <div
              key={quote.id}
              className="p-6 rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-600/40 bg-white dark:bg-[#111F18] shadow-card hover:shadow-cardHover transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
                      {quote.providerName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#3E4F47] dark:text-[#B8C9C0] mt-0.5">
                      <span className="flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {quote.providerRating}
                      </span>
                      <span>•</span>
                      <span>{quote.providerExperience}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">Total Bid</span>
                    <div className="text-xl font-black text-[#0A5C2E] dark:text-[#1EB55E]">
                      PKR {quote.estimatedCost}
                    </div>
                  </div>
                </div>

                {/* Itemized Cost Breakdown Table */}
                <div className="space-y-2 p-3.5 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-xs">
                  <div className="font-bold text-[#151515] dark:text-[#F2F7F4] border-b border-[#D8E4DC] dark:border-[#24382E] pb-1.5 flex items-center justify-between">
                    <span>Transparent Cost Breakdown:</span>
                    <span>Est. Time: {quote.duration}</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    {quote.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[#3E4F47] dark:text-[#B8C9C0]"
                      >
                        <span>{item.item}</span>
                        <strong className="text-[#151515] dark:text-[#F2F7F4]">
                          PKR {item.cost}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technician's Note */}
                <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] italic bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900">
                  &ldquo;{quote.note}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#D8E4DC] dark:border-[#24382E] flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
                  Payment: Cash on Completion
                </span>
                <button
                  onClick={() => handleAcceptQuotation(quote.id)}
                  disabled={acceptingQuoteId === quote.id}
                  className="px-5 py-2.5 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {acceptingQuoteId === quote.id ? "Confirming..." : "Accept Quotation"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
