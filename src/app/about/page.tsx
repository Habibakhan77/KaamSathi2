"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
          Academic Capstone Project • University of Swat
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          About KaamSaathi
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          &ldquo;Har kaam ke liye, aik bharosemand saathi.&rdquo;
        </p>
      </div>

      {/* Main Capstone Overview Card */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 sm:p-10 shadow-card space-y-6">
        <div className="flex items-center gap-4 border-b border-[#D8E4DC] dark:border-[#24382E] pb-6">
          <div className="w-16 h-16 rounded-3xl bg-[#0A5C2E] text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
            <GraduationCap className="w-9 h-9" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
              BS Software Engineering Capstone Project
            </h2>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] mt-0.5">
              Department of Computer Science &amp; Software Engineering, University of Swat
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm leading-relaxed text-[#3E4F47] dark:text-[#B8C9C0]">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
              The Problem in Swat Valley
            </h3>
            <p>
              In regions like Swat (Mingora, Saidu Sharif, Kanju, Barikot, and Madyan), finding
              dependable, skilled blue-collar professionals has historically relied upon fragile
              word-of-mouth or roadside contractor monopolization.
            </p>
            <p>
              Households frequently suffer from lack of transparent pricing, unvetted technicians entering
              homes without verified CNIC records, and zero post-service recourse when repairs fail.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
              Our Engineering Solution
            </h3>
            <p>
              KaamSaathi was engineered by <strong>Habiba Khan &amp; Laiba Khaist</strong> under the faculty
              supervision of <strong>Muhammad Hamza</strong> as an AI-powered, verified local services marketplace.
            </p>
            <p>
              It integrates regional natural language understanding (supporting Urdu, Pashto, Roman Urdu, and
              English voice inputs), algorithmic provider ranking based on proximity and trade certification,
              and strict fraud prevention against duplicate CNIC impersonations.
            </p>
          </div>
        </div>

        {/* Supervision & Authors Box */}
        <div className="p-6 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold text-[#151515] dark:text-[#F2F7F4]">Project Researchers:</span>
            <div className="text-[#0A5C2E] dark:text-[#1EB55E] font-extrabold text-sm mt-0.5">
              Habiba Khan &amp; Laiba Khaist
            </div>
            <span className="text-[#3E4F47] dark:text-[#B8C9C0]">BS Software Engineering Candidates</span>
          </div>

          <div>
            <span className="font-bold text-[#151515] dark:text-[#F2F7F4]">Project Supervisor:</span>
            <div className="text-[#0A5C2E] dark:text-[#1EB55E] font-extrabold text-sm mt-0.5">
              Muhammad Hamza
            </div>
            <span className="text-[#3E4F47] dark:text-[#B8C9C0]">Faculty of Computer Science &amp; SE, University of Swat</span>
          </div>
        </div>
      </div>

      {/* Honest Pilot Commitment */}
      <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-[#3E4F47] dark:text-[#B8C9C0] space-y-2">
        <h4 className="font-heading font-bold text-sm text-[#0A5C2E] dark:text-[#1EB55E] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <span>Honesty Rule &amp; Pilot Disclosure</span>
        </h4>
        <p className="leading-relaxed">
          KaamSaathi is an academic capstone pilot deployment launching in Swat Valley with simulated
          demonstration data for faculty viva assessment. We do not display fabricated claims such as
          &quot;2,800+ families served&quot; or &quot;100% police clearance&quot;. All numbers on this portal are truthfully
          labeled as pilot preview data.
        </p>
      </div>
    </div>
  );
}
