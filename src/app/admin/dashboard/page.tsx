"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { VerificationRequest, FraudFlag, Complaint } from "@/lib/types";

export default function AdminDashboardPage() {
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [fraudFlags, setFraudFlags] = useState<FraudFlag[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [activeTab, setActiveTab] = useState<"verifications" | "fraud" | "complaints">("verifications");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      // Mock admin data
      setVerifications([
        {
          id: "verif-req-02",
          providerProfileId: "prov-prof-05",
          providerName: "Tariq Mehmood",
          cnicFrontUrl: "/mock-docs/cnic-front-5.jpg",
          cnicBackUrl: "/mock-docs/cnic-back-5.jpg",
          cnicNumber: "15602-4455667-9",
          skillProofUrl: "/mock-docs/solar-cert-tariq.pdf",
          status: "pending",
          submittedAt: "2024-10-28T16:20:00Z",
          reviewedAt: null,
          reviewedBy: null,
          adminNotes: null,
        },
        {
          id: "verif-req-01",
          providerProfileId: "prov-prof-01",
          providerName: "Rashid Khan",
          cnicFrontUrl: "/mock-docs/cnic-front-1.jpg",
          cnicBackUrl: "/mock-docs/cnic-back-1.jpg",
          cnicNumber: "15602-1234567-1",
          skillProofUrl: "/mock-docs/vti-certificate-rashid.pdf",
          status: "approved",
          submittedAt: "2024-09-03T10:00:00Z",
          reviewedAt: "2024-09-04T12:00:00Z",
          reviewedBy: "admin@kaamsaathi.pk",
          adminNotes: "VTI Swat electrician diploma verified. CNIC photo matched with NADRA format standards.",
        },
      ]);

      setFraudFlags([
        {
          id: "frd-01",
          providerId: "usr-prov-99",
          severity: "high",
          flagType: "duplicate_cnic",
          description: "Duplicate CNIC 15602-1234567-1 detected during application. Matches existing verified provider Rashid Khan.",
          status: "blocked",
          flaggedAt: "2024-10-25T11:02:00Z",
        },
        {
          id: "frd-02",
          providerId: "usr-prov-02",
          severity: "low",
          flagType: "abnormal_pricing_deviation",
          description: "Quotation of PKR 8,500 submitted for routine AC washing is 340% higher than Swat area benchmark (PKR 1,200).",
          status: "reviewed",
          flaggedAt: "2024-10-20T14:10:00Z",
        },
      ]);

      setComplaints([
        {
          id: "cmp-01",
          bookingId: "bk-past-01",
          customerId: "usr-cust-01",
          providerId: "usr-prov-03",
          subject: "Minor water drop around teflon tape joint",
          description: "Customer reported slight moisture leak on kitchen tap joint. Requesting technician re-tightening under warranty.",
          status: "resolved",
          adminNotes: "Technician revisited and applied fresh teflon tape at zero extra cost. Customer confirmed satisfied.",
          createdAt: "2024-10-17T08:00:00Z",
          resolvedAt: "2024-10-18T11:00:00Z",
        },
      ]);

      setIsLoading(false);
    }
    loadAdminData();
  }, []);

  const handleApproveVerification = (id: string) => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "approved" } : v))
    );
    alert("Provider verified! The verified green badge has been assigned.");
  };

  const handleRejectVerification = (id: string) => {
    const reason = prompt("Enter rejection reason for the technician:", "CNIC image blurry or invalid skill document.");
    if (reason) {
      setVerifications((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "rejected", adminNotes: reason } : v))
      );
      alert("Application marked rejected with audit explanation.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#0A5C2E] text-white flex items-center justify-center font-heading font-black text-xl shadow-sm">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
                University of Swat — Capstone Administration
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-bold">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Supervised by Muhammad Hamza | Habiba Khan &amp; Laiba Khaist • Department of CS &amp; SE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/docs"
            className="px-4 py-2.5 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white text-xs font-bold shadow-sm"
          >
            Viva Documentation &amp; SRS
          </Link>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-1">
          <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Registered Users</span>
          <div className="text-2xl font-black text-[#151515] dark:text-[#F2F7F4]">
            48 Users
          </div>
          <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
            Demo Pilot Data (Customers &amp; Ustads)
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-1">
          <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Verified Ustads</span>
          <div className="text-2xl font-black text-[#0A5C2E] dark:text-[#1EB55E]">
            32 Verified
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            CNIC + VTI Audited
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-1">
          <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Pending Audits</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {verifications.filter((v) => v.status === "pending").length} Pending
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-300 font-bold">
            Action required
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-1">
          <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">AI Fraud Alerts</span>
          <div className="text-2xl font-black text-red-600 dark:text-red-400">
            {fraudFlags.length} Flagged
          </div>
          <span className="text-[11px] text-red-600 dark:text-red-400 font-bold">
            Duplicate CNIC &amp; Price Anomaly
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#D8E4DC] dark:border-[#24382E] gap-2">
        <button
          onClick={() => setActiveTab("verifications")}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "verifications"
              ? "border-[#0A5C2E] text-[#0A5C2E] dark:text-[#1EB55E]"
              : "border-transparent text-[#3E4F47] dark:text-[#B8C9C0]"
          }`}
        >
          Provider Verification Queue ({verifications.length})
        </button>
        <button
          onClick={() => setActiveTab("fraud")}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "fraud"
              ? "border-red-600 text-red-600"
              : "border-transparent text-[#3E4F47] dark:text-[#B8C9C0]"
          }`}
        >
          AI-Assisted Fraud Alerts ({fraudFlags.length})
        </button>
        <button
          onClick={() => setActiveTab("complaints")}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "complaints"
              ? "border-[#0A5C2E] text-[#0A5C2E] dark:text-[#1EB55E]"
              : "border-transparent text-[#3E4F47] dark:text-[#B8C9C0]"
          }`}
        >
          Dispute Resolution ({complaints.length})
        </button>
      </div>

      {/* Tab 1: Verification Queue */}
      {activeTab === "verifications" && (
        <div className="space-y-4">
          <h3 className="font-heading font-extrabold text-base text-[#151515] dark:text-[#F2F7F4]">
            Technician Verification Audit Queue
          </h3>
          <div className="space-y-3">
            {verifications.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-[#151515] dark:text-[#F2F7F4]">
                      {req.providerName}
                    </strong>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        req.status === "approved"
                          ? "bg-emerald-100 text-[#0A5C2E] dark:bg-emerald-950 dark:text-[#1EB55E]"
                          : req.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <div className="text-[#3E4F47] dark:text-[#B8C9C0]">
                    CNIC: <span className="font-mono font-bold">{req.cnicNumber}</span> • Submitted:{" "}
                    {new Date(req.submittedAt).toLocaleDateString()}
                  </div>
                  {req.adminNotes && (
                    <p className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0] italic">
                      Audit Notes: &ldquo;{req.adminNotes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApproveVerification(req.id)}
                        className="px-4 py-2 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-sm flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Badge</span>
                      </button>
                      <button
                        onClick={() => handleRejectVerification(req.id)}
                        className="px-4 py-2 rounded-xl border border-red-300 text-red-600 font-bold text-xs hover:bg-red-50 flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Fraud Flags */}
      {activeTab === "fraud" && (
        <div className="space-y-4">
          <h3 className="font-heading font-extrabold text-base text-red-600 dark:text-red-400 flex items-center gap-1.5">
            <AlertTriangle className="w-5 h-5" />
            <span>AI-Assisted Fraud &amp; Price Anomaly Engine Alerts</span>
          </h3>

          <div className="space-y-3">
            {fraudFlags.map((flag) => (
              <div
                key={flag.id}
                className="p-5 rounded-3xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 shadow-sm space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase">
                      Severity: {flag.severity}
                    </span>
                    <strong className="text-red-900 dark:text-red-200 uppercase font-mono">
                      {flag.flagType.replace(/_/g, " ")}
                    </strong>
                  </div>
                  <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
                    Flagged: {new Date(flag.flaggedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-red-800 dark:text-red-300 leading-relaxed font-medium">
                  {flag.description}
                </p>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => alert(`Fraud flag ${flag.id} dismissed by administrator.`)}
                    className="px-3 py-1.5 rounded-xl border border-red-300 text-red-700 font-bold text-[11px]"
                  >
                    Dismiss Flag
                  </button>
                  <button
                    onClick={() => alert(`Provider associated with flag ${flag.id} suspended.`)}
                    className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-extrabold text-[11px]"
                  >
                    Confirm Suspension
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Complaints */}
      {activeTab === "complaints" && (
        <div className="space-y-4">
          <h3 className="font-heading font-extrabold text-base text-[#151515] dark:text-[#F2F7F4]">
            Dispute &amp; Complaint Management
          </h3>

          <div className="space-y-3">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-sm space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-[#151515] dark:text-[#F2F7F4]">
                    {c.subject}
                  </strong>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0A5C2E] font-bold capitalize">
                    {c.status}
                  </span>
                </div>
                <p className="text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed">
                  {c.description}
                </p>
                {c.adminNotes && (
                  <div className="p-3 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E]">
                    <span className="font-bold text-[#151515] dark:text-[#F2F7F4]">
                      Mediation Resolution:
                    </span>{" "}
                    <span className="text-[#3E4F47] dark:text-[#B8C9C0]">{c.adminNotes}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
