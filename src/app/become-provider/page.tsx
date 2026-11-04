"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function BecomeProviderPage() {
  const [selectedTrade, setSelectedTrade] = useState("electrician");
  const [jobsPerMonth, setJobsPerMonth] = useState(25);

  const earningsPerJob: Record<string, number> = {
    electrician: 1200,
    plumber: 1100,
    "ac-technician": 2200,
    carpenter: 1500,
    solar: 2800,
    painter: 3500,
  };

  const estimatedEarnings = jobsPerMonth * (earningsPerJob[selectedTrade] || 1200);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
          Join Swat&apos;s Verified Artisan Guild
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          Grow Your Trade Business in Swat
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Connect directly with verified households in Mingora, Saidu Sharif, and Kanju. Keep 100% of your
          agreed quotation on standard jobs with zero middleman exploitation.
        </p>
      </div>

      {/* Interactive Monthly Earnings Calculator */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 sm:p-10 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D8E4DC] dark:border-[#24382E] pb-4">
          <div>
            <h3 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
              Swat Technician Monthly Earnings Estimator
            </h3>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Based on median Swat Valley labor quotes and average customer dispatch volume.
            </p>
          </div>
          <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
            Direct Cash Settlement
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-xs">
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-2">
                Select Your Primary Trade:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "electrician", name: "Electrician" },
                  { id: "ac-technician", name: "AC Technician" },
                  { id: "plumber", name: "Plumber" },
                  { id: "carpenter", name: "Carpenter" },
                  { id: "solar", name: "Solar & Inverter" },
                  { id: "painter", name: "Painter" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrade(t.id)}
                    className={`p-3 rounded-xl border text-left font-bold transition-all ${
                      selectedTrade === t.id
                        ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E]"
                        : "border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-[#151515] dark:text-[#F2F7F4]">
                  Estimated Jobs Completed per Month:
                </label>
                <strong className="text-base font-extrabold text-[#0A5C2E] dark:text-[#1EB55E]">
                  {jobsPerMonth} Jobs
                </strong>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={jobsPerMonth}
                onChange={(e) => setJobsPerMonth(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#3E4F47] dark:text-[#B8C9C0]">
                <span>5 (Part-Time)</span>
                <span>30 (Full-Time)</span>
                <span>60 (Master Workshop)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-center space-y-3">
            <span className="text-xs font-bold text-[#3E4F47] dark:text-[#B8C9C0] uppercase tracking-wider">
              Potential Monthly Take-Home
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#0A5C2E] dark:text-[#1EB55E]">
              PKR {estimatedEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Customers settle direct cash on job completion. Zero deduction on your first 15 jobs.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-block px-8 py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all"
              >
                Start Registering as a Provider &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Requirements */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-heading font-extrabold text-lg text-[#151515] dark:text-[#F2F7F4] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#0A5C2E] dark:text-[#1EB55E]" />
          <span>Mandatory Verification Requirements for Swat Ustads</span>
        </h3>
        <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
          To maintain the University of Swat trust standard, every applicant must provide:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-1">
            <strong>1. Valid NADRA CNIC</strong>
            <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
              High-resolution photo of front and back showing permanent or temporary address in Swat/Malakand.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-1">
            <strong>2. Vocational Diploma / Trade Proof</strong>
            <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
              Certificate from Vocational Training Institute (VTI Swat), NAVTTC, or signed reference letter from local hardware merchant.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-1">
            <strong>3. Active Pakistani Mobile Phone</strong>
            <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
              Direct SIM phone number for instantaneous customer dispatch coordination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
