"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  Zap,
} from "lucide-react";

export default function ProviderSubscriptionPage() {
  const [currentTier, setCurrentTier] = useState<"basic" | "pro" | "elite">("pro");

  const plans = [
    {
      id: "basic",
      name: "Hunar Basic",
      price: "0",
      cycle: "Free Forever",
      badge: "Pilot Free",
      features: [
        "Verified badge after CNIC & skill audit",
        "Up to 15 quote submissions per month",
        "Standard search placement in Swat directory",
        "Direct customer calling & location map",
        "10% standard platform maintenance fee",
      ],
      isPopular: false,
    },
    {
      id: "pro",
      name: "Ustad Pro Partner",
      price: "1,499",
      cycle: "per month",
      badge: "Most Recommended",
      features: [
        "Priority ranking in Mingora, Saidu Sharif & Kanju",
        "Unlimited quotation submissions on all leads",
        "Featured 'PRO' badge on profile and search cards",
        "Reduced 5% platform fee on completed jobs",
        "AI instant diagnostic quote recommendations",
        "Weekly SMS alerts for high-value commercial jobs",
      ],
      isPopular: true,
    },
    {
      id: "elite",
      name: "Swat Guild Elite",
      price: "3,499",
      cycle: "per month",
      badge: "Master Workshops",
      features: [
        "Top 'Promoted' spotlight on Homepage & AI search",
        "Zero percent commission on first 20 jobs each month",
        "Dedicated corporate commercial hotel/hospital contracts",
        "University of Swat verified guild master certificate",
        "Dedicated phone account supervisor",
      ],
      isPopular: false,
    },
  ];

  const handleSelectPlan = (tierId: "basic" | "pro" | "elite") => {
    setCurrentTier(tierId);
    alert(`Switched subscription plan to ${tierId.toUpperCase()}! Your profile ranking is updated.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2 border-b border-[#D8E4DC] dark:border-[#24382E] pb-6">
        <Link
          href="/provider/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E4F47] hover:text-[#0A5C2E]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          Technician Subscription Plans &amp; Commercialization
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Commercialization model from our approved University of Swat capstone proposal:
          tiered provider memberships and priority marketplace visibility.
        </p>
      </div>

      {/* Online Payments Truthful Pilot Banner */}
      <div className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong>Digital Online Payments: Coming Soon</strong>
          <p className="text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed">
            In accordance with project scope, online digital escrow gateway integrations
            (JazzCash, Easypaisa, 1Link Raast) are designated as future production milestones.
            During this pilot phase, plan upgrades are simulated and all job payments are settled
            as direct Cash on Completion.
          </p>
        </div>
      </div>

      {/* Plans Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentTier === plan.id;
          return (
            <div
              key={plan.id}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-6 ${
                plan.isPopular
                  ? "border-[#0A5C2E] dark:border-[#1EB55E] bg-white dark:bg-[#111F18] shadow-cardHover relative"
                  : "border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-sm"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] text-xs font-black uppercase tracking-wider">
                    {plan.badge}
                  </span>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-[#0A5C2E] text-white text-[10px] font-bold">
                      Active Tier
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
                    {plan.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#0A5C2E] dark:text-[#1EB55E]">
                      PKR {plan.price}
                    </span>
                    <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
                      /{plan.cycle}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D8E4DC] dark:border-[#24382E] space-y-2.5 text-xs">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#3E4F47] dark:text-[#B8C9C0]">
                      <CheckCircle2 className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id as any)}
                className={`w-full py-3 rounded-2xl text-xs font-extrabold shadow-sm transition-all ${
                  isCurrent
                    ? "bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-[#F2F7F4] cursor-default"
                    : "bg-[#0A5C2E] hover:bg-[#064A25] text-white"
                }`}
              >
                {isCurrent ? "Current Plan Active" : `Upgrade to ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
