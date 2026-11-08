"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { SOCIAL_LINKS, contactConfig, getWhatsAppUrl } from "@/config/contact";
import { SocialGlyph } from "@/components/brand/SocialIcons";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const waUrl = getWhatsAppUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      alert("Thank you! Your inquiry has been delivered to the University of Swat project coordination office.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setIsSent(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
          {contactConfig.pilotNotice}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          Contact KaamSaathi
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Inquiries for pilot support, provider registration assistance, or academic viva queries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-6 text-xs">
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
              University of Swat Coordination Office
            </h3>
            <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
              BS Software Engineering Final Year Project Hub
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-[#151515] dark:text-[#F2F7F4]">Physical Location</strong>
                <p className="text-[#3E4F47] dark:text-[#B8C9C0]">
                  Department of Computer Science &amp; Software Engineering, University of Swat, Main Campus, Charbagh / Saidu Sharif, KP, Pakistan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-[#151515] dark:text-[#F2F7F4]">Email Helpdesk</strong>
                <p>
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="text-[#0A5C2E] dark:text-[#1EB55E] font-medium hover:underline"
                  >
                    {contactConfig.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-[#151515] dark:text-[#F2F7F4]">Helpline &amp; WhatsApp</strong>
                <p className="text-[#3E4F47] dark:text-[#B8C9C0] font-mono">
                  {contactConfig.phoneDisplay} (Mon – Sat: 9:00 AM – 6:00 PM)
                </p>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-2 border-t border-[#D8E4DC] dark:border-[#24382E] flex flex-wrap items-center gap-3">
            <span className="font-bold text-[#151515] dark:text-[#F2F7F4]">Profiles:</span>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.ariaLabel}
                className="px-3 py-1.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] text-xs font-semibold flex items-center gap-1.5 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
              >
                <SocialGlyph platform={s.id} className="w-3.5 h-3.5" />
                <span>{s.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Chat on Official WhatsApp ({contactConfig.phoneDisplay})</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-4 text-xs">
          <h3 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4]">
            Send an Inquiry Message
          </h3>

          <div>
            <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ahmad Khan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0345-XXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
              Your Message *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your questions regarding KaamSaathi pilot services or feedback..."
              className="w-full p-3.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSent}
            className="w-full py-3.5 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSent ? "Sending..." : "Submit Inquiry"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
