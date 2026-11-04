"use client";

import React from "react";
import {
  CheckCircle2,
  Clock,
  Bike,
  Wrench,
  CheckCheck,
  XCircle,
  FileText,
} from "lucide-react";
import { BookingStatus, TimelineEntry } from "@/lib/types";

interface JobTrackerProps {
  currentStatus: BookingStatus;
  timeline: TimelineEntry[];
  totalAmount?: number;
  paymentMethod?: string;
  providerName?: string;
  category?: string;
}

const ORDERED_STEPS: { status: BookingStatus; label: string; icon: any }[] = [
  { status: "requested", label: "Service Requested", icon: FileText },
  { status: "quoted", label: "Quotation Received", icon: Clock },
  { status: "accepted", label: "Booking Confirmed", icon: CheckCircle2 },
  { status: "on_the_way", label: "Technician Dispatched", icon: Bike },
  { status: "in_progress", label: "Work In Progress", icon: Wrench },
  { status: "completed", label: "Job Completed", icon: CheckCheck },
];

export function JobTracker({
  currentStatus,
  timeline,
  totalAmount,
  paymentMethod,
  providerName,
  category,
}: JobTrackerProps) {
  const isCancelled = currentStatus === "cancelled";
  const currentIndex = ORDERED_STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 shadow-card space-y-6">
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#D8E4DC] dark:border-[#24382E] pb-4">
        <div>
          <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
            Live Service Tracker
          </span>
          <h3 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
            {isCancelled ? "Booking Cancelled" : ORDERED_STEPS[currentIndex]?.label || "Active Booking"}
          </h3>
          {providerName && (
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] mt-0.5">
              Assigned Professional: <strong>{providerName}</strong> ({category})
            </p>
          )}
        </div>

        <div className="text-right">
          {totalAmount && (
            <div>
              <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">Agreed Quote: </span>
              <strong className="text-lg font-black text-[#0A5C2E] dark:text-[#1EB55E]">
                PKR {totalAmount}
              </strong>
            </div>
          )}
          {paymentMethod && (
            <span className="text-[11px] font-medium text-[#3E4F47] dark:text-[#B8C9C0]">
              {paymentMethod}
            </span>
          )}
        </div>
      </div>

      {/* Visual Stepper Bar */}
      {!isCancelled ? (
        <div className="relative">
          <div className="hidden md:flex items-center justify-between relative z-10">
            {ORDERED_STEPS.map((step, idx) => {
              const isPassed = idx <= currentIndex;
              const isCurrent = idx === currentIndex;
              const Icon = step.icon;

              return (
                <div key={step.status} className="flex flex-col items-center flex-1 text-center">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all shadow-sm ${
                      isCurrent
                        ? "bg-[#0A5C2E] text-white ring-4 ring-emerald-100 dark:ring-emerald-950 scale-110"
                        : isPassed
                        ? "bg-emerald-600 text-white"
                        : "bg-[#F0F5F2] dark:bg-[#182C22] text-[#4D6257] dark:text-[#93A89D]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`mt-2 text-xs font-bold leading-tight ${
                      isPassed
                        ? "text-[#151515] dark:text-[#F2F7F4]"
                        : "text-[#3E4F47]/60 dark:text-[#B8C9C0]/60"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stepper Progress Line */}
          <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-[#D8E4DC] dark:bg-[#24382E] -z-0">
            <div
              className="h-full bg-[#0A5C2E] transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (currentIndex / (ORDERED_STEPS.length - 1)) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 flex items-center gap-3 text-red-700 dark:text-red-300">
          <XCircle className="w-6 h-6 flex-shrink-0" />
          <div className="text-xs">
            <strong>This job was cancelled.</strong> If you need another technician in Swat, feel
            free to submit a fresh request.
          </div>
        </div>
      )}

      {/* Detailed Chronological History Logs */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-[#151515] dark:text-[#F2F7F4] uppercase tracking-wider">
          Timeline Activity Log
        </h4>
        <div className="space-y-2">
          {timeline.map((entry, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0A5C2E] dark:bg-[#1EB55E]" />
                <span className="font-bold text-[#151515] dark:text-[#F2F7F4] capitalize">
                  {entry.status.replace("_", " ")}:
                </span>
                <span className="text-[#3E4F47] dark:text-[#B8C9C0]">{entry.note}</span>
              </div>
              <span className="text-[11px] text-[#3E4F47]/80 dark:text-[#B8C9C0]/80 font-mono">
                {new Date(entry.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
