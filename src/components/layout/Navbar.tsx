"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  User,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SupportedLanguage } from "@/lib/i18n/translations";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t, isRTL, theme, toggleTheme } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: t.nav.findServices },
    { href: "/how-it-works", label: t.nav.howItWorks },
    {
      href: "/ai-assistant",
      label: t.nav.aiAssistant,
      highlight: true,
    },
    { href: "/become-provider", label: t.nav.becomeProvider },
    { href: "/docs", label: "Docs / Viva" },
  ];

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: "en", label: "English", native: "English" },
    { code: "ur", label: "Urdu", native: "اردو" },
    { code: "ps", label: "Pashto", native: "پښتو" },
    { code: "roman_ur", label: "Roman Urdu", native: "Roman Urdu" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
        isScrolled
          ? "border-[#D8E4DC] dark:border-[#24382E] bg-white/95 dark:bg-[#111F18]/95 shadow-sm backdrop-blur-md"
          : "border-[#D8E4DC]/80 dark:border-[#24382E]/80 bg-white dark:bg-[#111F18]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Logo size="md" showTagline={false} />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#0A5C2E] dark:text-[#1EB55E] bg-emerald-50 dark:bg-emerald-950/50 font-bold"
                      : "text-[#151515] dark:text-[#F2F7F4] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {link.highlight && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Controls: Language Switch, Theme, Login, Post a Job CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] text-xs font-semibold text-[#151515] dark:text-[#F2F7F4] hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#0A5C2E] dark:text-[#1EB55E]" />
              <span>
                {languages.find((l) => l.code === language)?.native || "English"}
              </span>
              <ChevronDown className="w-3 h-3 text-[#3E4F47] dark:text-[#B8C9C0]" />
            </button>

            {isLangDropdownOpen && (
              <div
                className={`absolute top-full mt-2 w-44 rounded-2xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-elevated py-1.5 z-50 ${
                  isRTL ? "left-0" : "right-0"
                }`}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center justify-between transition-colors ${
                      language === l.code
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-[#0A5C2E] dark:text-[#1EB55E] font-bold"
                        : "text-[#151515] dark:text-[#F2F7F4] hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
                      {l.native}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] text-[#151515] dark:text-[#F2F7F4] hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label="Toggle Light and Dark Mode"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#3E4F47]" />
            )}
          </button>

          {/* Demo Login Shortcut */}
          <Link
            href="/login"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#151515] dark:text-[#F2F7F4] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] border border-transparent hover:border-[#D8E4DC] dark:hover:border-[#24382E] flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.nav.login}</span>
          </Link>

          {/* Post a Job CTA */}
          <Link
            href="/customer/request"
            className="px-4 py-2.5 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.nav.bookService}</span>
          </Link>
        </div>

        {/* Mobile Hamburger & Theme Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[#151515] dark:text-[#F2F7F4]"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-[#151515] dark:text-[#F2F7F4] border border-[#D8E4DC] dark:border-[#24382E]"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[#151515] dark:text-[#F2F7F4] hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"
              >
                {link.highlight && <Sparkles className="w-4 h-4 text-amber-500" />}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#D8E4DC] dark:border-[#24382E] space-y-2">
            <div className="text-xs font-semibold text-[#3E4F47] dark:text-[#B8C9C0]">
              Select Language:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl text-xs font-semibold border ${
                    language === l.code
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E]"
                      : "border-[#D8E4DC] dark:border-[#24382E] text-[#151515] dark:text-[#F2F7F4]"
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl border border-[#D8E4DC] dark:border-[#24382E] text-sm font-bold text-[#151515] dark:text-[#F2F7F4]"
            >
              {t.nav.login} (Customer / Provider / Admin)
            </Link>
            <Link
              href="/customer/request"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl bg-[#0A5C2E] text-white text-sm font-bold shadow-md"
            >
              {t.nav.bookService}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
