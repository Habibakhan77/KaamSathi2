"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  GraduationCap,
  Layers,
  Database,
  CheckCircle2,
  ShieldCheck,
  Code,
  ArrowLeft,
} from "lucide-react";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<"srs" | "architecture" | "er" | "tests" | "viva">("srs");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-[#D8E4DC] dark:border-[#24382E] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
          <GraduationCap className="w-4 h-4" />
          <span>BS Software Engineering Capstone Viva Deliverables</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          Engineering Specifications &amp; Defense Documentation
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          University of Swat • Researchers: Habiba Khan &amp; Laiba Khaist • Supervised by Muhammad Hamza
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-[#D8E4DC] dark:border-[#24382E] gap-2">
        {[
          { id: "srs", label: "1. SRS Summary & Use Cases", icon: FileText },
          { id: "architecture", label: "2. System Architecture", icon: Layers },
          { id: "er", label: "3. ER Schema & RLS", icon: Database },
          { id: "tests", label: "4. Test Cases & Verification", icon: CheckCircle2 },
          { id: "viva", label: "5. Feature-to-Page Viva Map", icon: Code },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "border-[#0A5C2E] text-[#0A5C2E] dark:text-[#1EB55E]"
                  : "border-transparent text-[#3E4F47] dark:text-[#B8C9C0]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: SRS Summary */}
      {activeTab === "srs" && (
        <div className="space-y-6 text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed">
          <div className="p-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-4">
            <h2 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
              Software Requirements Specification (SRS) Summary
            </h2>
            <p>
              <strong>Purpose:</strong> KaamSaathi provides a trustworthy digital bridge between households and verified
              blue-collar artisans (Ustads) across Swat Valley (Mingora, Saidu Sharif, Kanju, Barikot, Madyan, Fizagat).
            </p>
            <p>
              <strong>Scope:</strong> Multi-lingual natural language inquiry (English, Urdu, Pashto, Roman Urdu),
              algorithmic provider ranking, mandatory NADRA CNIC + trade proof audit, itemized quotation bidding,
              live 7-stage visual booking tracking, customer review escrow, and dispute mediation.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-4">
            <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
              Primary Actors &amp; Use Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2">
                <strong className="text-[#0A5C2E] dark:text-[#1EB55E] block text-sm">
                  Customer (Household)
                </strong>
                <ul className="list-disc list-inside space-y-1">
                  <li>UC-01: Voice/Text Problem Inquiry</li>
                  <li>UC-02: View AI Diagnostic Report</li>
                  <li>UC-03: Broadcast Service Request</li>
                  <li>UC-04: Compare Quotations Side-by-Side</li>
                  <li>UC-05: Monitor Live Job Progress</li>
                  <li>UC-06: Post Verified Rating / Review</li>
                  <li>UC-07: File Service Complaint / Dispute</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2">
                <strong className="text-[#0A5C2E] dark:text-[#1EB55E] block text-sm">
                  Service Provider (Ustad)
                </strong>
                <ul className="list-disc list-inside space-y-1">
                  <li>UC-08: Provider Registration &amp; Trade Profile</li>
                  <li>UC-09: Upload NADRA CNIC &amp; VTI Proof</li>
                  <li>UC-10: View Local Leads in Swat</li>
                  <li>UC-11: Submit Itemized Quotations</li>
                  <li>UC-12: Update Real-Time Job Statuses</li>
                  <li>UC-13: Manage Subscription Tier &amp; Visibility</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2">
                <strong className="text-[#0A5C2E] dark:text-[#1EB55E] block text-sm">
                  Platform Admin (University Team)
                </strong>
                <ul className="list-disc list-inside space-y-1">
                  <li>UC-14: Audit Verification Requests (Approve/Reject)</li>
                  <li>UC-15: Monitor AI Fraud &amp; Price Anomaly Flags</li>
                  <li>UC-16: Mediate Customer Disputes</li>
                  <li>UC-17: Maintain Trade Category Registry</li>
                  <li>UC-18: Inspect Platform Analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Architecture */}
      {activeTab === "architecture" && (
        <div className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-6 text-xs sm:text-sm">
          <h2 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
            Multi-Tier System Architecture
          </h2>
          <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
            The system employs a Next.js 14 App Router full-stack architecture with strict separation of concerns,
            a dual repository pattern (Mock JSON + PostgreSQL Supabase), and bilingual NLP parsing with zero-key fallback.
          </p>

          <div className="p-5 rounded-2xl bg-[#0B1410] text-emerald-400 font-mono text-xs overflow-x-auto space-y-2">
            <div>[CLIENT LAYER: Next.js App Router, React 18, Tailwind CSS, Framer Motion]</div>
            <div>   │</div>
            <div>   ├── LanguageProvider (EN, UR RTL, PS RTL, Roman Urdu)</div>
            <div>   ├── WCAG AA Theme Tokens (Light #F7FAF8, Dark #0B1410)</div>
            <div>   └── HeroAISearch &amp; Web Speech API Integration</div>
            <div>   │</div>
            <div>[SERVER API LAYER: Next.js Route Handlers]</div>
            <div>   │</div>
            <div>   ├── POST /api/ai/parse  &rarr;  (OpenAI GPT-4o-mini / Local NLP Fallback Engine)</div>
            <div>   ├── POST /api/ai/match  &rarr;  (Multi-Criteria Algorithmic Ranking)</div>
            <div>   ├── POST /api/auth      &rarr;  (Role Session &amp; Demo Account Manager)</div>
            <div>   └── CRUD /api/bookings  &rarr;  (Job Tracker &amp; Quote Acceptance State Engine)</div>
            <div>   │</div>
            <div>[UNIFIED REPOSITORY ADAPTER]</div>
            <div>   │</div>
            <div>   ├── MockAdapter (data/mock-db.json in-memory with file persistence)</div>
            <div>   └── SupabaseAdapter (PostgreSQL + RLS Policies + Storage Buckets)</div>
          </div>
        </div>
      )}

      {/* Tab 3: ER Schema */}
      {activeTab === "er" && (
        <div className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-6 text-xs sm:text-sm">
          <h2 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
            Database Entity Relationship Schema &amp; RLS
          </h2>
          <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
            All relational entities defined in <code>supabase/migrations/01_initial_schema.sql</code> with
            strict Row Level Security policies guaranteeing tenant privacy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2">
              <strong className="text-[#0A5C2E] dark:text-[#1EB55E]">Primary Entities</strong>
              <ul className="space-y-1 font-mono text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
                <li>• profiles (id, email, role, phone, city)</li>
                <li>• provider_profiles (id, user_id, cnic, skills, tier)</li>
                <li>• categories (id, name, name_urdu, slug, price)</li>
                <li>• verification_requests (id, cnic_urls, status)</li>
                <li>• service_requests (id, customer_id, urgency, ai_parsed)</li>
                <li>• quotations (id, request_id, estimated_cost, breakdown)</li>
                <li>• bookings (id, quotation_id, timeline, current_status)</li>
                <li>• reviews (id, booking_id, rating, comment)</li>
                <li>• complaints (id, booking_id, status, admin_notes)</li>
                <li>• fraud_flags (id, severity, flag_type, status)</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2">
              <strong className="text-[#0A5C2E] dark:text-[#1EB55E]">Row Level Security (RLS)</strong>
              <p className="text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed">
                - Public users can read active categories and approved provider profiles.<br />
                - Customers can only view and mutate their own service requests.<br />
                - Quotations visible only to quoting provider and requesting customer.<br />
                - Reviews insertable only once per completed booking.<br />
                - Verification and fraud queues restricted to Admin role.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Test Cases */}
      {activeTab === "tests" && (
        <div className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-6 text-xs">
          <h2 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
            Verification &amp; Test Suite Execution
          </h2>
          <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
            System test matrix executed during capstone validation:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D8E4DC] dark:border-[#24382E] text-[#151515] dark:text-[#F2F7F4]">
                  <th className="py-2 pr-4 font-bold">Test ID</th>
                  <th className="py-2 pr-4 font-bold">Module</th>
                  <th className="py-2 pr-4 font-bold">Description</th>
                  <th className="py-2 pr-4 font-bold">Expected Outcome</th>
                  <th className="py-2 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8E4DC]/60 dark:divide-[#24382E]/60 text-[#3E4F47] dark:text-[#B8C9C0]">
                <tr>
                  <td className="py-2 font-mono">TC-01</td>
                  <td>NLP Engine</td>
                  <td>Query in Roman Urdu &quot;Mera AC cool nahi kar raha Mingora&quot;</td>
                  <td>Category=ac-technician, Location=Mingora</td>
                  <td className="text-emerald-600 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">TC-02</td>
                  <td>Booking Flow</td>
                  <td>Accept quotation #quot-02 on urgent breaker repair</td>
                  <td>Booking created, status set to accepted, quote accepted</td>
                  <td className="text-emerald-600 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">TC-03</td>
                  <td>Job Tracker</td>
                  <td>Provider transitions job from accepted &rarr; on_the_way &rarr; in_progress</td>
                  <td>Timeline updated with timestamps and active step advances</td>
                  <td className="text-emerald-600 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">TC-04</td>
                  <td>Review Policy</td>
                  <td>Attempt review on in_progress booking</td>
                  <td>Blocked; only permitted on completed jobs</td>
                  <td className="text-emerald-600 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">TC-05</td>
                  <td>Fraud Engine</td>
                  <td>Submit provider registration with duplicate CNIC 15602-1234567-1</td>
                  <td>High-severity fraud flag created, admin alerted</td>
                  <td className="text-emerald-600 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">TC-06</td>
                  <td>Contrast Audit</td>
                  <td>Lighthouse / WCAG AA audit on light (#F7FAF8) and dark (#0B1410)</td>
                  <td>All text &gt;= 4.5:1 body, &gt;= 3:1 headings. Zero failures.</td>
                  <td className="text-emerald-600 font-bold">PASSED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Viva Map */}
      {activeTab === "viva" && (
        <div className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-6 text-xs sm:text-sm">
          <h2 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
            Feature-to-Page Mapping for Capstone Viva Defense
          </h2>
          <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
            Quick reference guide for faculty evaluators to test each project requirement end-to-end:
          </p>

          <div className="space-y-3">
            {[
              {
                feature: "1. Brand Identity & Logo Integrity",
                page: "All Pages (Header, Footer, Auth)",
                path: "/",
                note: "Original deep green (#0A5C2E) logo, dark-mode variant, favicon, and <Logo /> component.",
              },
              {
                feature: "2. WCAG AA Text Contrast",
                page: "Whole Site (Theme Toggle)",
                path: "/",
                note: "Strict semantic CSS variables (--bg-main: #F7FAF8, --text-primary: #151515). Zero grey-on-grey.",
              },
              {
                feature: "3. Multi-Lingual & RTL Support",
                page: "Language Switcher (Header)",
                path: "/",
                note: "Full translation dictionary in English, Urdu (RTL), Pashto (RTL), and Roman Urdu.",
              },
              {
                feature: "4. AI Natural Language & Voice Search",
                page: "Landing Page & Dedicated AI Page",
                path: "/ai-assistant",
                note: "Bilingual NLP diagnostic engine with Web Speech API voice button and rule-based fallback.",
              },
              {
                feature: "5. Search & Filters with Swat Areas",
                page: "Services Marketplace",
                path: "/services",
                note: "Filter by category, Swat area (Mingora, Saidu, Kanju, Barikot, etc.), rating, and verified badge.",
              },
              {
                feature: "6. Provider Profile & CNIC Verification",
                page: "Provider Details",
                path: "/providers/prov-prof-01",
                note: "Verified Ustad badge, experience, trade skills, and direct booking modal.",
              },
              {
                feature: "7. Quotation Bidding & Acceptance",
                page: "Customer Dashboard",
                path: "/customer/dashboard",
                note: "Side-by-side cost breakdown comparison and 1-click quote acceptance.",
              },
              {
                feature: "8. Live 7-Step Job Tracker",
                page: "Customer Bookings & Provider Dashboard",
                path: "/customer/bookings",
                note: "Requested -> Quoted -> Accepted -> On the way -> In progress -> Completed -> Cancelled.",
              },
              {
                feature: "9. Verified Reviews & Disputes",
                page: "Customer Bookings",
                path: "/customer/bookings",
                note: "Post-job rating modal and dispute submission to University of Swat mediation.",
              },
              {
                feature: "10. Admin Console & AI Fraud Flags",
                page: "Admin Dashboard",
                path: "/admin/dashboard",
                note: "Provider verification audit queue, duplicate CNIC alerts, price anomaly detection.",
              },
              {
                feature: "11. Provider Plans & Commercialization",
                page: "Provider Subscriptions",
                path: "/provider/subscription",
                note: "Tiered plans (Basic, Pro, Elite) and truthful 'Online Payments Coming Soon' disclosure.",
              },
            ].map((f, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <strong className="text-sm text-[#151515] dark:text-[#F2F7F4]">
                    {f.feature}
                  </strong>
                  <p className="text-[#3E4F47] dark:text-[#B8C9C0]">{f.note}</p>
                </div>
                <Link
                  href={f.path}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0A5C2E] text-white font-bold text-xs flex-shrink-0 self-start sm:self-center"
                >
                  Test on {f.page} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
