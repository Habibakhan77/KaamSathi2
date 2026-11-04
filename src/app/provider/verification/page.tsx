"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  BadgeCheck,
  Clock,
} from "lucide-react";

export default function ProviderVerificationPage() {
  const [cnicNumber, setCnicNumber] = useState("15602-1234567-1");
  const [cnicFrontName, setCnicFrontName] = useState("cnic-front-rashid.jpg");
  const [cnicBackName, setCnicBackName] = useState("cnic-back-rashid.jpg");
  const [skillProofName, setSkillProofName] = useState("vti-swat-electrician-diploma.pdf");
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("approved");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("pending");
      alert("Verification documents submitted to University of Swat administration audit queue.");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2 border-b border-[#D8E4DC] dark:border-[#24382E] pb-6">
        <Link
          href="/provider/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E4F47] hover:text-[#0A5C2E]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          Identity &amp; Skill Verification Portal
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Every technician on KaamSaathi must pass government CNIC and vocational skill verification
          before appearing in Swat customer search results.
        </p>
      </div>

      {/* Current Status Banner */}
      <div
        className={`p-6 rounded-3xl border ${
          status === "approved"
            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800"
            : status === "pending"
            ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800"
            : "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800"
        } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
              status === "approved"
                ? "bg-emerald-600 text-white"
                : status === "pending"
                ? "bg-amber-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status === "approved" ? (
              <BadgeCheck className="w-7 h-7" />
            ) : (
              <Clock className="w-7 h-7" />
            )}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">
              Verification Status
            </div>
            <h3 className="font-heading font-black text-lg text-[#151515] dark:text-[#F2F7F4] capitalize">
              {status === "approved"
                ? "Officially Verified & Approved"
                : status === "pending"
                ? "Under Administrative Audit"
                : "Application Rejected"}
            </h3>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] mt-0.5">
              {status === "approved"
                ? "Your profile displays the official green verification badge. Customers in Swat can find and book your trade directly."
                : "Our verification team at University of Swat will review your CNIC and certificates within 24 hours."}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
            status === "approved"
              ? "bg-[#0A5C2E] text-white"
              : "bg-[#F5A524] text-[#151515]"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-6 text-xs">
        <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
          Document Submissions
        </h3>

        <div>
          <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
            NADRA CNIC Number *
          </label>
          <input
            type="text"
            required
            value={cnicNumber}
            onChange={(e) => setCnicNumber(e.target.value)}
            placeholder="15602-XXXXXXX-X"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border-2 border-dashed border-[#D8E4DC] dark:border-[#24382E] text-center space-y-2">
            <Upload className="w-6 h-6 mx-auto text-[#0A5C2E] dark:text-[#1EB55E]" />
            <div className="font-bold text-[#151515] dark:text-[#F2F7F4]">
              CNIC Front Photo
            </div>
            <p className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
              Current file: {cnicFrontName}
            </p>
            <button
              type="button"
              onClick={() => alert("Mock File Selected: cnic-front-new.jpg")}
              className="px-3 py-1 rounded-lg border border-[#D8E4DC] dark:border-[#24382E] font-bold text-[11px]"
            >
              Choose New Photo
            </button>
          </div>

          <div className="p-4 rounded-2xl border-2 border-dashed border-[#D8E4DC] dark:border-[#24382E] text-center space-y-2">
            <Upload className="w-6 h-6 mx-auto text-[#0A5C2E] dark:text-[#1EB55E]" />
            <div className="font-bold text-[#151515] dark:text-[#F2F7F4]">
              CNIC Back Photo
            </div>
            <p className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
              Current file: {cnicBackName}
            </p>
            <button
              type="button"
              onClick={() => alert("Mock File Selected: cnic-back-new.jpg")}
              className="px-3 py-1 rounded-lg border border-[#D8E4DC] dark:border-[#24382E] font-bold text-[11px]"
            >
              Choose New Photo
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-dashed border-[#D8E4DC] dark:border-[#24382E] text-center space-y-2">
          <FileText className="w-6 h-6 mx-auto text-[#0A5C2E] dark:text-[#1EB55E]" />
          <div className="font-bold text-[#151515] dark:text-[#F2F7F4]">
            Trade Proof / Vocational Diploma (VTI Swat / NAVTTC)
          </div>
          <p className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
            Current file: {skillProofName}
          </p>
          <button
            type="button"
            onClick={() => alert("Mock File Selected: certificate-new.pdf")}
            className="px-3 py-1 rounded-lg border border-[#D8E4DC] dark:border-[#24382E] font-bold text-[11px]"
          >
            Upload Trade Certificate
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Uploading Documents..." : "Re-Submit for Audit"}
        </button>
      </form>
    </div>
  );
}
