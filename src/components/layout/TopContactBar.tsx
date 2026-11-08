"use client";

import React from "react";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/config/contact";
import { SocialIcon } from "@/components/brand/SocialIcons";

/** Thin vertical divider used between top-bar items. */
function Divider({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`w-px h-4 bg-white/35 flex-shrink-0 ${className}`} />;
}

export function TopContactBar() {
  return (
    <div className="w-full bg-[#0B4A28] text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 sm:h-11 flex items-center justify-between gap-3 min-w-0">
        {/* ── LEFT: Announcements ───────────────────────────────────────── */}
        <div className="flex items-center gap-3 lg:gap-5 min-w-0 text-[12px] sm:text-[13px] lg:text-sm font-semibold tracking-wide">
          <span className="truncate">Pilot Launching in Swat</span>

          <Divider className="hidden md:block" />
          <Link
            href="/services"
            className="hidden md:inline whitespace-nowrap hover:text-amber-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            Book Local Services
          </Link>

          <Divider className="hidden lg:block" />
          <Link
            href="/become-provider"
            className="hidden lg:inline whitespace-nowrap hover:text-amber-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            Be a Verified Provider
          </Link>
        </div>

        {/* ── RIGHT: Social links (icon + label are one link) ───────────── */}
        <nav aria-label="KaamSaathi social media" className="flex-shrink-0">
          <ul className="flex items-center gap-1.5 sm:gap-2 xl:gap-3">
            {SOCIAL_LINKS.map((s, i) => (
              <li key={s.id} className="flex items-center gap-1.5 sm:gap-2 xl:gap-3">
                {i > 0 && <Divider className="hidden xl:block" />}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  title={s.label}
                  className="group inline-flex items-center gap-2 rounded-full p-0.5 xl:pr-2 text-[13px] font-semibold text-white/95 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <SocialIcon
                    platform={s.id}
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="hidden xl:inline">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default TopContactBar;
