"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  AlertTriangle,
  Zap,
} from "lucide-react";

export default function NewRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [category, setCategory] = useState("electrician");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high" | "emergency">("medium");
  const [location, setLocation] = useState("Mingora");
  const [address, setAddress] = useState("Mohallah Shahdara, Mingora");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Afternoon (2 PM - 5 PM)");
  const [phone, setPhone] = useState("0345-9123456");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiAutofilled, setIsAiAutofilled] = useState(false);

  useEffect(() => {
    // Check URL query parameters (e.g. from Hero AI search)
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const cat = sp.get("category");
      const loc = sp.get("location");
      const desc = sp.get("desc");

      if (cat) setCategory(cat);
      if (loc) setLocation(loc);
      if (desc) {
        const decoded = decodeURIComponent(desc);
        setDescription(decoded);
        setTitle(decoded.slice(0, 60));
        setIsAiAutofilled(true);
      }
    }
  }, []);

  const categories = [
    { id: "electrician", name: "Electrician" },
    { id: "plumber", name: "Plumber & Sanitary" },
    { id: "ac-technician", name: "AC Technician" },
    { id: "carpenter", name: "Carpenter & Woodcraft" },
    { id: "solar", name: "Solar & Inverter" },
    { id: "painter", name: "Painter & Finisher" },
    { id: "cleaning", name: "Deep Cleaning" },
    { id: "appliance", name: "Appliance Repair" },
  ];

  const swatAreas = ["Mingora", "Saidu Sharif", "Kanju", "Barikot", "Madyan", "Fizagat"];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_request",
          request: {
            customerId: "usr-cust-01",
            customerName: "Ahmad Jan",
            customerPhone: phone,
            category,
            title: title || `${category} Service Request`,
            description,
            location: `${address}, ${location}`,
            area: location,
            urgency,
            preferredDate: preferredDate || new Date().toISOString().split("T")[0],
            preferredTimeSlot: timeSlot,
          },
        }),
      });

      if (res.ok) {
        alert("Service request successfully posted! Verified providers in Swat will quote shortly.");
        router.push("/customer/dashboard");
      }
    } catch {
      alert("Error submitting request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-[#D8E4DC] dark:border-[#24382E] pb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/customer/dashboard"
            className="text-xs font-bold text-[#3E4F47] hover:text-[#0A5C2E] flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span className="text-xs text-[#3E4F47]">•</span>
          <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
            Post New Request
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          Broadcast a Service Request in Swat
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Describe your problem to receive competitive, itemized quotations from verified local ustads.
        </p>
      </div>

      {/* AI Pre-fill Alert if arrived from Hero AI Search */}
      {isAiAutofilled && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex items-center gap-2 text-[#0A5C2E] dark:text-[#1EB55E]">
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>AI Auto-Fill:</strong> Category, location, and issue description pre-filled from your search.
          </span>
        </div>
      )}

      {/* Stepper Header */}
      <div className="flex items-center justify-between text-xs font-bold border-b border-[#D8E4DC] dark:border-[#24382E] pb-3">
        <span className={step >= 1 ? "text-[#0A5C2E] dark:text-[#1EB55E]" : "text-[#3E4F47]"}>
          1. Trade &amp; Title
        </span>
        <span className="text-[#3E4F47]">&rarr;</span>
        <span className={step >= 2 ? "text-[#0A5C2E] dark:text-[#1EB55E]" : "text-[#3E4F47]"}>
          2. Details &amp; Urgency
        </span>
        <span className="text-[#3E4F47]">&rarr;</span>
        <span className={step >= 3 ? "text-[#0A5C2E] dark:text-[#1EB55E]" : "text-[#3E4F47]"}>
          3. Swat Location &amp; Schedule
        </span>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-6">
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-2">
                Select Service Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`p-3 rounded-2xl border text-left font-bold transition-all ${
                      category === c.id
                        ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] shadow-sm"
                        : "border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Short Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Inverter AC blowing warm air, 32A breaker tripping"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Next: Describe Problem</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Detailed Problem Description *
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe exact signs, error codes, noise, floor level, and appliance brand..."
                className="w-full p-3.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Urgency Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "low", label: "Low / Flexible" },
                  { id: "medium", label: "Medium (1-2 days)" },
                  { id: "high", label: "High (Today)" },
                  { id: "emergency", label: "Emergency (Immediate)" },
                ].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUrgency(u.id as any)}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs ${
                      urgency === u.id
                        ? "border-[#F5A524] bg-amber-50 dark:bg-amber-950/40 text-[#151515] dark:text-[#F2F7F4]"
                        : "border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]"
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] font-bold text-xs"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Next: Location &amp; Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                  Area in Swat *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] text-[#151515] dark:text-[#F2F7F4] font-semibold"
                >
                  {swatAreas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Detailed Street Address &amp; Landmark *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House #, Street name, Nearby Landmark"
                className="w-full px-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Contact Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4]"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] font-bold text-xs"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Broadcasting..." : "Broadcast Service Request"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
