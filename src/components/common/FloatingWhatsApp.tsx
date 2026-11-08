"use client";

import React, { useState } from "react";
import { contactConfig, getWhatsAppUrl } from "@/config/contact";
import { SocialGlyph } from "@/components/brand/SocialIcons";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function FloatingWhatsApp() {
  const { isRTL } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const waUrl = getWhatsAppUrl(
    contactConfig.phoneRaw,
    "Salam KaamSaathi! I need a verified service provider in Swat."
  );

  return (
    // Bottom-right, stacked directly above the Support Assistant launcher (58px button + 14px gap).
    <div
      className={`fixed right-4 sm:right-6 bottom-[calc(88px+env(safe-area-inset-bottom))] sm:bottom-[calc(96px+env(safe-area-inset-bottom))] z-40 flex items-center gap-2 ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      {/* Tooltip on hover */}
      {showTooltip && (
        <div
          role="tooltip"
          className="hidden sm:block px-3 py-1.5 rounded-xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-lg text-xs font-bold text-[#151515] dark:text-[#F2F7F4] animate-fadeIn whitespace-nowrap"
        >
          <span>Chat on WhatsApp: {contactConfig.phoneDisplay}</span>
        </div>
      )}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={`Open WhatsApp chat with KaamSaathi helpline (${contactConfig.phoneDisplay})`}
        className="flex items-center justify-center w-[58px] h-[58px] rounded-full border-[3px] border-white bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
      >
        <SocialGlyph platform="whatsapp" className="w-7 h-7" />
      </a>
    </div>
  );
}
export default FloatingWhatsApp;
