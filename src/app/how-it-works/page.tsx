"use client";

import React from "react";
import Link from "next/link";
import {
  Mic,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bike,
  Wrench,
  ThumbsUp,
  FileCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HowItWorksPage() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: Mic,
      title: "Natural Language Problem Inquiry",
      desc: "Type or use the microphone to describe your home or office maintenance issue in Urdu, Pashto, Roman Urdu, or English. Mention your neighborhood in Swat (e.g. 'Kanju Township mein water pump motor nahi chal raha').",
      highlight: "Voice & Regional Dialect Recognition",
    },
    {
      num: "02",
      icon: Sparkles,
      title: "AI Fault Diagnosis & Urgency Tagging",
      desc: "Our Swat NLP engine extracts the exact service category, identifies key symptoms, detects hazard severity (e.g. electrical burning or water flood), and suggests pre-arrival precautionary steps.",
      highlight: "Deterministic Rule Fallback + OpenAI",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Verified Ustads Submit Itemized Bids",
      desc: "Nearby technicians who hold an approved NADRA CNIC and vocational certificate review the request and submit itemized quotes with estimated labor, parts, and arrival time.",
      highlight: "Zero Middleman Price Inflation",
    },
    {
      num: "04",
      icon: FileCheck,
      title: "Side-by-Side Comparison & Acceptance",
      desc: "Customers review quotes side-by-side: technician trade experience, verified customer ratings, and transparent breakdown before accepting the most competitive offer.",
      highlight: "Informed Customer Choice",
    },
    {
      num: "05",
      icon: Bike,
      title: "Real-Time Tracking & Cash on Completion",
      desc: "Monitor your assigned technician from dispatch to work in progress. Inspect the completed repair and settle payment via direct Cash on Completion with complete peace of mind.",
      highlight: "7-Day Service Warranty Mediation",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
          Transparent Marketplace Workflow
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          How KaamSaathi Works
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Bridging the trust deficit in Pakistan&apos;s home services through artificial intelligence,
          strict identity verification, and transparent bidding.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center font-heading font-black text-xl flex-shrink-0">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#0A5C2E] dark:text-[#1EB55E] font-mono">
                      STEP {s.num}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]">
                      {s.highlight}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-[#151515] dark:text-[#F2F7F4]">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed max-w-2xl">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-[#0A5C2E] text-white text-center space-y-4">
        <h2 className="font-heading font-extrabold text-2xl">
          Ready to experience hassle-free repairs in Swat?
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
          Describe your problem right now to get connected with verified electricians, plumbers, and technicians.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/customer/request"
            className="px-6 py-3 rounded-2xl bg-[#F5A524] text-[#151515] font-extrabold text-xs shadow-md"
          >
            Post a Service Request
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 rounded-2xl border border-white/30 text-white font-bold text-xs hover:bg-white/10"
          >
            Browse Verified Ustads
          </Link>
        </div>
      </div>
    </div>
  );
}
