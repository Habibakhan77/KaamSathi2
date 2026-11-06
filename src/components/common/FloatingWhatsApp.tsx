"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { contactConfig, getWhatsAppUrl } from "@/config/contact";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function FloatingWhatsApp() {
  const { isRTL } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const waUrl = getWhatsAppUrl(
    contactConfig.phoneRaw,
    "Salam KaamSaathi! I need a verified service provider in Swat."
  );

  return (
    // Fixed on bottom-left so it NEVER collides with FloatingAIAssistant (which is on bottom-right)
    <div
      className={`fixed bottom-6 ${
        isRTL ? "right-6 sm:right-auto sm:left-6" : "left-6"
      } z-40 flex items-center gap-2`}
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
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-elevated transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Pulse beacon */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#25D366]" />

        <Phone className="w-5 h-5 text-white fill-white transition-transform group-hover:rotate-12" />
      </a>
    </div>
  );
}
export default FloatingWhatsApp;
