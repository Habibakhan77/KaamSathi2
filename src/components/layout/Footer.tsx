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
  Linkedin,
  Facebook,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { contactConfig, getWhatsAppUrl } from "@/config/contact";

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

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

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={contactConfig.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Habiba Khan LinkedIn"
                className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center hover:bg-[#0A5C2E] hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={contactConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Habibytes Facebook"
                className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center hover:bg-[#0A5C2E] hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              {Boolean(contactConfig.tiktokUrl && contactConfig.tiktokUrl.trim()) && (
                <a
                  href={contactConfig.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center hover:bg-[#0A5C2E] hover:text-white transition-colors"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}
            </div>
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
