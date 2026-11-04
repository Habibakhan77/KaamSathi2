"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Send, ShieldCheck, DollarSign } from "lucide-react";
import { QuoteBreakdownItem } from "@/lib/types";

export default function SubmitQuotePage() {
  const router = useRouter();
  const [requestTitle, setRequestTitle] = useState("Customer Service Request");
  const [requestId, setRequestId] = useState("req-swat-10");

  const [duration, setDuration] = useState("1.5 hours");
  const [items, setItems] = useState<QuoteBreakdownItem[]>([
    { item: "Inspection & Initial Diagnostic Testing", cost: 500 },
    { item: "Repair / Labor Work", cost: 800 },
  ]);
  const [note, setNote] = useState("Will arrive on time with genuine tools. 15-day service guarantee included.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const title = sp.get("title");
      const id = sp.get("requestId");
      if (title) setRequestTitle(decodeURIComponent(title));
      if (id) setRequestId(id);
    }
  }, []);

  const totalCost = items.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);

  const handleAddItem = () => {
    setItems((prev) => [...prev, { item: "", cost: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, field: "item" | "cost", val: any) => {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, [field]: val } : it))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_quote",
          quotation: {
            requestId,
            providerId: "usr-prov-01",
            providerName: "Rashid Khan (Rashid Electric)",
            providerRating: 4.9,
            providerExperience: "9 years",
            estimatedCost: totalCost,
            duration,
            breakdown: items,
            note,
          },
        }),
      });

      if (res.ok) {
        alert("Your quotation has been sent to the customer! You will be notified if they accept.");
        router.push("/provider/dashboard");
      }
    } catch {
      alert("Failed to submit quotation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2 border-b border-[#D8E4DC] dark:border-[#24382E] pb-6">
        <Link
          href="/provider/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E4F47] hover:text-[#0A5C2E]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Provider Dashboard</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          Submit Itemized Quotation
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Job Target: <strong className="text-[#151515] dark:text-[#F2F7F4]">{requestTitle}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-6 text-xs">
        <div>
          <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
            Estimated Work Duration *
          </label>
          <input
            type="text"
            required
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 1 hour, 2-3 hours, 1 day"
            className="w-full px-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Itemized Breakdown Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block font-bold text-[#151515] dark:text-[#F2F7F4]">
              Transparent Itemized Cost Lines *
            </label>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1 rounded-lg border border-emerald-500 text-[#0A5C2E] dark:text-[#1EB55E] font-bold text-[11px] flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Add Line</span>
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={item.item}
                  onChange={(e) => handleUpdateItem(idx, "item", e.target.value)}
                  placeholder="Line description (e.g. Capacitor replacement labor)"
                  className="flex-1 px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4]"
                />
                <div className="w-32 flex items-center gap-1">
                  <span className="text-[#3E4F47] dark:text-[#B8C9C0] text-[11px]">PKR</span>
                  <input
                    type="number"
                    required
                    value={item.cost}
                    onChange={(e) =>
                      handleUpdateItem(idx, "cost", Number(e.target.value))
                    }
                    className="w-full px-2 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4]"
                  />
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
            <span className="font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
              Total Calculated Bid Amount:
            </span>
            <strong className="text-lg font-black text-[#0A5C2E] dark:text-[#1EB55E]">
              PKR {totalCost}
            </strong>
          </div>
        </div>

        <div>
          <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
            Notes &amp; Guarantee for the Customer *
          </label>
          <textarea
            required
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || totalCost <= 0}
          className="w-full py-3.5 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? "Submitting..." : `Submit Quotation (PKR ${totalCost})`}</span>
        </button>
      </form>
    </div>
  );
}
