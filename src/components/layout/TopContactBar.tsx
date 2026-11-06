"use client";

import React from "react";
import {
  Phone,
  Mail,
  Linkedin,
  Facebook,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { contactConfig, getWhatsAppUrl } from "@/config/contact";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Simple custom TikTok SVG icon since Lucide doesn't have TikTok
function TikTokIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function TopContactBar() {
  const { isRTL } = useLanguage();
  const waUrl = getWhatsAppUrl();

  return (
    <div className="w-full bg-[#0A5C2E] text-white text-xs border-b border-[#064A25] select-none z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-2 overflow-hidden">
        {/* Left Side: Contact Methods (WhatsApp & Email) */}
        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with KaamSaathi on WhatsApp: ${contactConfig.phoneDisplay}`}
            className="inline-flex items-center gap-1.5 hover:text-emerald-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
            <span className="hidden sm:inline font-mono font-medium text-[11px] tracking-wide">
              {contactConfig.phoneDisplay}
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${contactConfig.email}`}
            aria-label={`Send email to KaamSaathi: ${contactConfig.email}`}
            className="inline-flex items-center gap-1.5 hover:text-emerald-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
            <span className="hidden sm:inline font-medium text-[11px]">
              {contactConfig.email}
            </span>
          </a>
        </div>

        {/* Center / Note: "Pilot launching in Swat" (wide screens only) */}
        <div className="hidden lg:flex items-center gap-1.5 text-emerald-100 text-[11px] font-medium tracking-wide">
          <MapPin className="w-3 h-3 text-emerald-300 flex-shrink-0" />
          <span>{contactConfig.pilotNotice} • Swat Valley (Mingora, Saidu Sharif, Kanju)</span>
        </div>

        {/* Right Side: Social Media Links */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <span className="hidden md:inline text-[11px] text-emerald-200 font-medium">
            Connect:
          </span>

          {/* LinkedIn */}
          <a
            href={contactConfig.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Habiba Khan LinkedIn Profile"
            className="p-1 text-emerald-100 hover:text-white hover:bg-emerald-800/60 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>

          {/* Facebook */}
          <a
            href={contactConfig.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Habibytes Facebook Page (${contactConfig.facebookHandle})`}
            className="p-1 text-emerald-100 hover:text-white hover:bg-emerald-800/60 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Facebook className="w-3.5 h-3.5" />
          </a>

          {/* TikTok - Only rendered if a non-empty handle/url is provided */}
          {Boolean(contactConfig.tiktokUrl && contactConfig.tiktokUrl.trim()) && (
            <a
              href={contactConfig.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Habibytes TikTok Profile"
              className="p-1 text-emerald-100 hover:text-white hover:bg-emerald-800/60 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
export default TopContactBar;
