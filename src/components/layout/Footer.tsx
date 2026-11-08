"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialGlyph } from "@/components/brand/SocialIcons";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SOCIAL_LINKS, contactConfig, getWhatsAppUrl } from "@/config/contact";

export function Footer() {
  const { t } = useLanguage();
  const waUrl = getWhatsAppUrl();

  return (
    <footer className="border-t border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#0E1A14] text-[#151515] dark:text-[#F2F7F4] transition-colors mt-20">
      {/* Pilot Assurance Banner */}
      <div className="bg-emerald-50/80 dark:bg-[#13281E] border-b border-[#D8E4DC] dark:border-[#24382E] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0A5C2E] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
                University of Swat — BS Software Engineering Project
              </h4>
              <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
                Researchers: Habiba Khan &amp; Laiba Khaist | Supervised by Muhammad Hamza
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] text-xs font-semibold text-[#0A5C2E] dark:text-[#1EB55E]">
            <ShieldCheck className="w-4 h-4" />
            <span>Pilot Stage in Swat • Truthful Academic Implementation</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showTagline={true} />
            <p className="text-sm text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed max-w-sm">
              KaamSaathi is Pakistan&apos;s AI-assisted verified local services
              platform, architected to empower verified blue-collar professionals and
              provide households in Swat with transparent, reliable service booking.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
              <Sparkles className="w-4 h-4" />
              <span>Har kaam ke liye, aik bharosemand saathi.</span>
            </div>

            {/* Social Links (icon + label form one link) */}
            <ul className="flex flex-wrap items-center gap-2 pt-2" aria-label="KaamSaathi social media">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.ariaLabel}
                    className="h-8 px-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] inline-flex items-center gap-1.5 text-xs font-semibold hover:bg-[#0A5C2E] hover:text-white dark:hover:bg-[#1EB55E] dark:hover:text-[#0E1A14] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5C2E]"
                  >
                    <SocialGlyph platform={s.id} className="w-4 h-4" />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
              {t.footer.quickLinks}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/services"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
                >
                  All Swat Services
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
                >
                  How The AI Works
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-assistant"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
                >
                  AI Voice &amp; Chat Assistant
                </Link>
              </li>
              <li>
                <Link
                  href="/become-provider"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
                >
                  Join as Verified Ustad
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-[#0A5C2E] dark:text-[#1EB55E] font-bold hover:underline"
                >
                  Viva Documentation &amp; Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
              {t.footer.services}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/services?cat=electrician"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                >
                  Electrician &amp; Wiring
                </Link>
              </li>
              <li>
                <Link
                  href="/services?cat=ac-technician"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                >
                  Inverter AC Service &amp; Gas
                </Link>
              </li>
              <li>
                <Link
                  href="/services?cat=plumber"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                >
                  Plumbing &amp; Sanitary
                </Link>
              </li>
              <li>
                <Link
                  href="/services?cat=carpenter"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                >
                  Woodcraft &amp; Furniture
                </Link>
              </li>
              <li>
                <Link
                  href="/services?cat=solar"
                  className="text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                >
                  Solar &amp; Net Metering
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details from Config */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
              {t.footer.contact}
            </h5>
            <div className="space-y-2.5 text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0 mt-0.5" />
                <span>Dept of CS &amp; SE, University of Swat, KP, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0" />
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="hover:underline hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                >
                  {contactConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0" />
                <span className="font-mono">{contactConfig.phoneDisplay}</span>
              </div>
              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Helpline</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* AI Disclaimer & Bottom Notice */}
        <div className="border-t border-[#D8E4DC] dark:border-[#24382E] mt-12 pt-6 space-y-2 text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} KaamSaathi. {t.footer.rights}
            </p>
            <p className="text-[11px] font-medium text-[#0A5C2E] dark:text-[#1EB55E]">
              University of Swat BS Software Engineering Project by Habiba Khan &amp; Laiba Khaist
            </p>
          </div>
          <p className="text-[11px] text-center sm:text-left text-[#4D6257] dark:text-[#93A89D] italic">
            Notice: Hero images are AI-generated illustrations and do not show real KaamSaathi providers. Demo data preview for academic evaluation.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
