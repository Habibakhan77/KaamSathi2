"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export interface LogoProps {
  variant?: "full" | "icon-only" | "light" | "dark";
  /** `navSm` / `nav` are the main-navbar sizes (phone / tablet+desktop). */
  size?: "sm" | "navSm" | "md" | "nav" | "lg" | "xl";
  className?: string;
  href?: string;
  showTagline?: boolean;
}

export function Logo({
  variant = "full",
  size = "md",
  className = "",
  href = "/",
  showTagline = false,
}: LogoProps) {
  const { theme, t } = useLanguage();

  // Resolve active variant considering light/dark mode if not explicitly overridden
  const isDark = variant === "dark" || (variant === "full" && theme === "dark");

  // Dimensional sizes
  const sizes = {
    sm: {
      icon: 28,
      height: 28,
      fontSize: "text-lg",
      taglineSize: "text-[10px]",
    },
    navSm: {
      icon: 34,
      height: 34,
      fontSize: "text-[1.3rem]",
      taglineSize: "text-[11px]",
    },
    nav: {
      icon: 46,
      height: 46,
      fontSize: "text-[1.8rem]",
      taglineSize: "text-xs",
    },
    md: {
      icon: 38,
      height: 38,
      fontSize: "text-2xl",
      taglineSize: "text-xs",
    },
    lg: {
      icon: 48,
      height: 48,
      fontSize: "text-3xl",
      taglineSize: "text-sm",
    },
    xl: {
      icon: 64,
      height: 64,
      fontSize: "text-4xl",
      taglineSize: "text-base",
    },
  };

  const currentSize = sizes[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Authentic Rounded Square Icon */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform hover:scale-105"
        aria-label="KaamSaathi Brand Mark"
      >
        <defs>
          <linearGradient id={`ksIconGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E6B37" />
            <stop offset="50%" stopColor="#0A5C2E" />
            <stop offset="100%" stopColor="#053C1D" />
          </linearGradient>
        </defs>

        {/* Rounded square container */}
        <rect width="160" height="160" rx="36" fill={`url(#ksIconGrad-${size})`} />

        {/* House Roof & Eaves */}
        <path
          d="M 32 76 L 80 38 L 128 76"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* House Side Walls */}
        <path d="M 40 76 L 40 106" stroke="#FFFFFF" strokeWidth="10.5" strokeLinecap="round" />
        <path d="M 120 76 L 120 106" stroke="#FFFFFF" strokeWidth="10.5" strokeLinecap="round" />

        {/* 4-Pane Window (2x2 Grid) */}
        <rect x="59" y="78" width="16" height="16" rx="3" fill="#FFFFFF" />
        <rect x="85" y="78" width="16" height="16" rx="3" fill="#FFFFFF" />
        <rect x="59" y="102" width="16" height="16" rx="3" fill="#FFFFFF" />
        <rect x="85" y="102" width="16" height="16" rx="3" fill="#FFFFFF" />

        {/* Dynamic Flowing Path */}
        <path
          d="M 16 122 C 50 108, 76 116, 106 112 C 124 109, 138 97, 146 84"
          stroke="#FFFFFF"
          strokeWidth="10.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark (if not icon-only) */}
      {variant !== "icon-only" && (
        <div className="flex flex-col">
          <div
            className={`font-heading font-extrabold tracking-tight leading-none ${currentSize.fontSize}`}
          >
            <span className={isDark ? "text-[#F2F7F4]" : "text-[#151515]"}>
              Kaam
            </span>
            <span className={isDark ? "text-[#1EB55E]" : "text-[#0A5C2E]"}>
              Saathi
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-medium tracking-normal mt-0.5 ${currentSize.taglineSize} ${
                isDark ? "text-[#B8C9C0]" : "text-[#3E4F47]"
              }`}
            >
              {t.brand.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
export default Logo;
