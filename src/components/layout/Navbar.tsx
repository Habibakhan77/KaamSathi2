"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  MapPin,
  Menu,
  X,
  Zap,
  Droplets,
  Wind,
  Hammer,
  Sun,
  Moon,
  Paintbrush,
  Sparkles,
  Wrench,
  Globe,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SupportedLanguage } from "@/lib/i18n/translations";

// ─── Static data ────────────────────────────────────────────────────────────

const SERVICE_CATEGORIES = [
  { label: "Electrician", href: "/services?cat=electrician", icon: Zap },
  { label: "Plumbing & Sanitary", href: "/services?cat=plumber", icon: Droplets },
  { label: "AC & Refrigeration", href: "/services?cat=ac-technician", icon: Wind },
  { label: "Carpenter & Wood", href: "/services?cat=carpenter", icon: Hammer },
  { label: "Solar & Inverter", href: "/services?cat=solar", icon: Sun },
  { label: "Painter & Finisher", href: "/services?cat=painter", icon: Paintbrush },
  { label: "Deep Cleaning", href: "/services?cat=cleaning", icon: Sparkles },
  { label: "Appliance Repair", href: "/services?cat=appliance", icon: Wrench },
];

const LOCATIONS = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Peshawar",
  "Swat",
  "Mingora",
  "Saidu Sharif",
  "Kanju",
  "Barikot",
  "Madyan",
  "Fizagat",
];

const LANGUAGES: { code: SupportedLanguage; native: string }[] = [
  { code: "en", native: "English" },
  { code: "ur", native: "اردو" },
  { code: "ps", native: "پښتو" },
  { code: "roman_ur", native: "Roman Urdu" },
];

// ─── Hook: close on outside click ───────────────────────────────────────────

function useOutsideClick(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (refs.every((r) => r.current && !r.current.contains(e.target as Node))) {
        handler();
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs, handler]);
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, theme, toggleTheme } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationOpen, setMobileLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Mingora");

  const servicesRef = useRef<HTMLDivElement>(null!);
  const locationRef = useRef<HTMLDivElement>(null!);
  const langRef = useRef<HTMLDivElement>(null!);

  // Restore saved location
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("kaamsaathi_location");
    if (saved) setSelectedLocation(saved);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Outside-click handlers
  useOutsideClick([servicesRef], useCallback(() => setServicesOpen(false), []));
  useOutsideClick([locationRef], useCallback(() => setLocationOpen(false), []));
  useOutsideClick([langRef], useCallback(() => setLangOpen(false), []));

  const handleLocationSelect = (loc: string) => {
    setSelectedLocation(loc);
    localStorage.setItem("kaamsaathi_location", loc);
    setLocationOpen(false);
    setMobileLocationOpen(false);
    setMobileOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  const linkCls = (href: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
      isActive(href)
        ? "text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
        : "text-gray-700 dark:text-gray-200 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] hover:bg-green-50 dark:hover:bg-green-950/40"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white dark:bg-[#111F18] transition-all duration-200 ${
        isScrolled
          ? "border-b border-gray-200 dark:border-[#24382E] shadow-sm"
          : "border-b border-gray-100 dark:border-[#24382E]/60"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center gap-4">

        {/* ── LEFT: Logo ─────────────────────────────────────────────────── */}
        <div className="flex-shrink-0">
          <Logo size="md" showTagline={false} />
        </div>

        {/* ── CENTER: Nav links (desktop) ─────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">

          {/* Home */}
          <Link href="/" className={linkCls("/")}>
            Home
          </Link>

          {/* About Us */}
          <Link href="/about" className={linkCls("/about")}>
            About Us
          </Link>

          {/* Services dropdown */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                isActive("/services")
                  ? "text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] hover:bg-green-50 dark:hover:bg-green-950/40"
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-60 bg-white dark:bg-[#111F18] rounded-xl border border-gray-100 dark:border-[#24382E] shadow-lg overflow-hidden z-50">
                <Link
                  href="/services"
                  onClick={() => setServicesOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-xs font-semibold text-[#0A5C2E] dark:text-[#1EB55E] bg-green-50 dark:bg-green-950/40 hover:bg-green-100 dark:hover:bg-green-950/60 transition-colors"
                >
                  View All Services
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                </Link>
                <div className="py-1">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
                      >
                        <Icon className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0" />
                        {cat.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Become a Provider */}
          <Link href="/become-provider" className={linkCls("/become-provider")}>
            Become a Provider
          </Link>
        </div>

        {/* ── RIGHT: Location, Lang, Theme, Sign Up, Login ────────────────── */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto">

          {/* Location dropdown */}
          <div className="relative" ref={locationRef}>
            <button
              onClick={() => setLocationOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-[#345041] text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-[#0A5C2E] dark:hover:border-[#1EB55E] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
              aria-expanded={locationOpen}
              aria-haspopup="listbox"
            >
              <MapPin className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0" />
              <span>{selectedLocation}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${locationOpen ? "rotate-180" : ""}`}
              />
            </button>

            {locationOpen && (
              <div
                className="absolute top-full right-0 mt-2.5 w-44 bg-white dark:bg-[#111F18] rounded-xl border border-gray-100 dark:border-[#24382E] shadow-lg overflow-hidden z-50"
                role="listbox"
              >
                <div className="px-3 py-2 border-b border-gray-100 dark:border-[#24382E]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Select City
                  </span>
                </div>
                <div className="py-1 max-h-56 overflow-y-auto">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocationSelect(loc)}
                      role="option"
                      aria-selected={selectedLocation === loc}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedLocation === loc
                          ? "bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                          : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language picker (compact) */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="p-2 rounded-lg border border-gray-200 dark:border-[#345041] text-gray-600 dark:text-gray-300 hover:border-[#0A5C2E] dark:hover:border-[#1EB55E] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
              aria-label="Change Language"
            >
              <Globe className="w-4 h-4" />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2.5 w-40 bg-white dark:bg-[#111F18] rounded-xl border border-gray-100 dark:border-[#24382E] shadow-lg overflow-hidden z-50">
                <div className="py-1">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                        language === l.code
                          ? "bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                          : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40"
                      }`}
                    >
                      {l.native}
                      {language === l.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0A5C2E] dark:bg-[#1EB55E]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-[#345041] text-gray-600 dark:text-gray-300 hover:border-[#0A5C2E] dark:hover:border-[#1EB55E] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
            aria-label="Toggle Light/Dark Mode"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 dark:bg-[#345041]" />

          {/* Sign Up */}
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-[#0A5C2E] hover:bg-[#064A25] text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Sign Up
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg border-2 border-[#0A5C2E] dark:border-[#1EB55E] text-[#0A5C2E] dark:text-[#1EB55E] hover:bg-[#0A5C2E] dark:hover:bg-[#1EB55E] hover:text-white dark:hover:text-[#111F18] text-sm font-semibold transition-all active:scale-95"
          >
            Login
          </Link>
        </div>

        {/* ── MOBILE: Hamburger ───────────────────────────────────────────── */}
        <div className="flex lg:hidden items-center gap-2 ml-auto">
          {/* Theme toggle on mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-lg border border-gray-200 dark:border-[#345041] text-gray-700 dark:text-gray-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-lg">
          <div className="px-4 py-4 space-y-1">

            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40"
              }`}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40"
              }`}
            >
              About Us
            </Link>

            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/services")
                    ? "bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40"
                }`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="mt-1 ml-4 pl-3 border-l-2 border-green-100 dark:border-green-900/60 space-y-0.5">
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-sm font-semibold text-[#0A5C2E] dark:text-[#1EB55E] hover:underline"
                  >
                    All Services →
                  </Link>
                  {SERVICE_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0" />
                        {cat.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Become a Provider */}
            <Link
              href="/become-provider"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/become-provider")
                  ? "bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40"
              }`}
            >
              Become a Provider
            </Link>

            {/* Location accordion */}
            <div>
              <button
                onClick={() => setMobileLocationOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E]" />
                  {selectedLocation}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileLocationOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileLocationOpen && (
                <div className="mt-1 ml-4 pl-3 border-l-2 border-green-100 dark:border-green-900/60">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-1">
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLocationSelect(loc)}
                        className={`text-left py-1.5 text-sm transition-colors ${
                          selectedLocation === loc
                            ? "text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                            : "text-gray-600 dark:text-gray-300 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language picker */}
            <div>
              <p className="px-3 pt-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Language
              </p>
              <div className="grid grid-cols-2 gap-2 px-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code); setMobileOpen(false); }}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                      language === l.code
                        ? "border-[#0A5C2E] dark:border-[#1EB55E] bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E]"
                        : "border-gray-200 dark:border-[#345041] text-gray-600 dark:text-gray-300 hover:border-[#0A5C2E] dark:hover:border-[#1EB55E]"
                    }`}
                  >
                    {l.native}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth buttons */}
            <div className="pt-3 border-t border-gray-100 dark:border-[#24382E] flex flex-col gap-2.5">
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 text-center rounded-lg bg-[#0A5C2E] hover:bg-[#064A25] text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 text-center rounded-lg border-2 border-[#0A5C2E] dark:border-[#1EB55E] text-[#0A5C2E] dark:text-[#1EB55E] text-sm font-semibold transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
