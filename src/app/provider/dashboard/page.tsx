"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Star,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Plus,
  Send,
} from "lucide-react";
import { Booking, BookingStatus } from "@/lib/types";

export default function ProviderDashboardPage() {
  const [activeJobs, setActiveJobs] = useState<Booking[]>([]);
  const [availableLeads, setAvailableLeads] = useState<any[]>([]);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      // Mock provider active jobs
      setActiveJobs([
        {
          id: "bk-01",
          requestId: "req-02",
          quotationId: "quot-02",
          customerId: "usr-cust-01",
          customerName: "Ahmad Jan",
          customerPhone: "0345-9123456",
          customerAddress: "Mohallah Shahdara, Mingora, Swat",
          providerId: "usr-prov-01",
          providerName: "Rashid Khan",
          providerPhone: "0346-8234567",
          category: "electrician",
          totalAmount: 1500,
          paymentMethod: "Cash on Completion",
          timeline: [
            {
              status: "requested",
              timestamp: "2024-11-04T02:00:00Z",
              note: "Customer posted urgent electrical request",
            },
            {
              status: "accepted",
              timestamp: "2024-11-04T03:00:00Z",
              note: "Quote accepted",
            },
            {
              status: "in_progress",
              timestamp: "2024-11-04T03:40:00Z",
              note: "Inspecting main distribution board",
            },
          ],
          currentStatus: "in_progress",
          scheduledDate: "2024-11-04",
          createdAt: "2024-11-04T03:00:00Z",
        },
      ]);

      // Leads in Swat
      setAvailableLeads([
        {
          id: "req-swat-10",
          customer: "Sardar Ali",
          area: "Barikot, Swat",
          category: "electrician",
          title: "UPS inverter battery not charging after power restoration",
          urgency: "high",
          time: "15 mins ago",
        },
        {
          id: "req-swat-11",
          customer: "Dr. Karim",
          area: "Saidu Sharif",
          category: "electrician",
          title: "Clinic LED panel ceiling wiring check",
          urgency: "medium",
          time: "1 hour ago",
        },
      ]);
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (bookingId: string, nextStatus: BookingStatus) => {
    setIsUpdatingStatus(bookingId);
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          status: nextStatus,
          note: `Technician updated status to ${nextStatus.replace("_", " ")}`,
        }),
      });

      if (res.ok) {
        setActiveJobs((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, currentStatus: nextStatus } : b))
        );
        alert(`Job status updated to ${nextStatus.toUpperCase()}! Customer notified.`);
      }
    } catch {
      alert("Failed to update status.");
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Provider Header Banner */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#0A5C2E] text-white flex items-center justify-center font-heading font-black text-xl shadow-sm">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
                Rashid Khan
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CNIC Verified Ustad</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#F5A524] text-[#151515] text-[10px] font-black uppercase">
                PRO Partner
              </span>
            </div>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Rashid Electric &amp; Smart Inverters • Saidu Sharif &amp; Mingora • 0346-8234567
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link
            href="/provider/verification"
            className="px-4 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] text-xs font-bold text-[#151515] dark:text-[#F2F7F4] hover:bg-black/5 dark:hover:bg-white/5"
          >
            Verification Status
          </Link>
          <Link
            href="/provider/subscription"
            className="px-4 py-2.5 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all"
          >
            Subscription Plans
          </Link>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-1">
          <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Completed Jobs</span>
          <div className="text-2xl font-black text-[#151515] dark:text-[#F2F7F4]">
            68 Jobs
          </div>
          <span className="text-[11px] text-[#0A5C2E] dark:text-[#1EB55E] font-bold">
            100% in Swat Valley
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-1">
          <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Customer Rating</span>
          <div className="text-2xl font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0</span>
          </div>
          <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
            From 42 verified reviews
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-1">
          <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Simulated Monthly Revenue</span>
          <div className="text-2xl font-black text-[#0A5C2E] dark:text-[#1EB55E]">
            PKR 48,500
          </div>
          <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
            Cash on completion (Pilot preview)
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-1">
          <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Response Time</span>
          <div className="text-2xl font-black text-[#151515] dark:text-[#F2F7F4]">
            18 mins
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            Fastest in Saidu Sharif
          </span>
        </div>
      </div>

      {/* Active Jobs & Live Workflow Management */}
      <div className="space-y-4">
        <h2 className="font-heading font-extrabold text-lg text-[#151515] dark:text-[#F2F7F4]">
          Assigned Active Jobs ({activeJobs.length})
        </h2>

        {activeJobs.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-5"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#D8E4DC] dark:border-[#24382E] pb-4">
              <div>
                <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
                  Active On-Site Job
                </span>
                <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
                  {job.customerName} — {job.customerAddress}
                </h3>
                <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
                  Phone: {job.customerPhone} • Agred Quote: PKR {job.totalAmount}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#0A5C2E] dark:bg-emerald-950 dark:text-[#1EB55E]">
                  Status: {job.currentStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Status Update Quick Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#151515] dark:text-[#F2F7F4]">
                Update Job Status for Customer:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus(job.id, "on_the_way")}
                  disabled={job.currentStatus === "on_the_way"}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border border-[#D8E4DC] dark:border-[#24382E] hover:bg-emerald-50 dark:hover:bg-emerald-950 disabled:opacity-40"
                >
                  🚀 I Am On The Way
                </button>
                <button
                  onClick={() => handleUpdateStatus(job.id, "in_progress")}
                  disabled={job.currentStatus === "in_progress"}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border border-[#D8E4DC] dark:border-[#24382E] hover:bg-emerald-50 dark:hover:bg-emerald-950 disabled:opacity-40"
                >
                  🔧 Started Work
                </button>
                <button
                  onClick={() => handleUpdateStatus(job.id, "completed")}
                  disabled={job.currentStatus === "completed"}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#0A5C2E] text-white hover:bg-[#064A25] shadow-sm disabled:opacity-40"
                >
                  ✅ Mark Work Completed &amp; Collect Cash
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Available Job Leads in Swat */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-lg text-[#151515] dark:text-[#F2F7F4]">
              New Job Leads in Swat ({availableLeads.length})
            </h2>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Incoming service requests broadcasted by customers in your trade area.
            </p>
          </div>
          <span className="text-xs text-[#0A5C2E] dark:text-[#1EB55E] font-bold">
            Live Feed (Auto-Updating)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-5 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E]">
                    {lead.area}
                  </span>
                  <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
                    {lead.time}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
                  {lead.title}
                </h4>
                <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
                  Customer: <strong>{lead.customer}</strong> • Trade: {lead.category}
                </p>
              </div>

              <div className="pt-2 border-t border-[#D8E4DC] dark:border-[#24382E] flex justify-end">
                <Link
                  href={`/provider/quotes?requestId=${lead.id}&title=${encodeURIComponent(
                    lead.title
                  )}`}
                  className="px-4 py-2 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Itemized Quote</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
