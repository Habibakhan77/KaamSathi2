"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, useId } from "react";
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
  Check,
  User,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SupportedLanguage } from "@/lib/i18n/translations";
import { useLocation } from "@/lib/location/LocationContext";
import { DEFAULT_REGION, SWAT_AREAS, SelectedLocation } from "@/lib/location/swat-areas";

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

const LANGUAGES: { code: SupportedLanguage; native: string }[] = [
  { code: "en", native: "English" },
  { code: "ur", native: "اردو" },
  { code: "ps", native: "پښتو" },
  { code: "roman_ur", native: "Roman Urdu" },
];

/** "Swat" (default, whole district) first, then the 12 local areas. */
const LOCATION_OPTIONS: SelectedLocation[] = [DEFAULT_REGION, ...SWAT_AREAS];

// Header palette (kept local so the reference look is easy to tweak)
const NAV_TEXT = "text-[#0F3D24] dark:text-gray-100";
const NAV_HOVER = "hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]";

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useOutsideClick(refs: React.RefObject<HTMLElement>[], handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (refs.every((r) => r.current && !r.current.contains(e.target as Node))) {
        handler();
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener, { passive: true });
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
}

function useEscape(active: boolean, handler: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handler();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, handler]);
}

// ─── Swat location selector (uses the shared LocationContext) ───────────────

function LocationSelector({ align = "left" }: { align?: "left" | "right" }) {
  const { location, setLocation } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);
  const refs = useMemo(() => [ref], []);
  const listId = useId();
  const close = useCallback(() => setOpen(false), []);

  useOutsideClick(refs, close);
  useEscape(open, close);

  const select = (loc: SelectedLocation) => {
    setLocation(loc);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={`Service location: ${location}. Change location`}
        className={`flex items-center gap-1.5 h-10 pl-3 pr-2.5 sm:pl-3.5 sm:pr-3 rounded-full border-[1.5px] border-[#0F3D24] dark:border-[#1EB55E] bg-white dark:bg-transparent text-[15px] font-bold ${NAV_TEXT} hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5C2E] focus-visible:ring-offset-2`}
      >
        <MapPin className="w-[18px] h-[18px] flex-shrink-0 text-[#0A5C2E] dark:text-[#1EB55E] fill-[#0A5C2E] dark:fill-[#1EB55E] [&_circle]:fill-white dark:[&_circle]:fill-[#111F18]" />
        <span className="max-w-[6.5rem] sm:max-w-[9rem] truncate">{location}</span>
        <ChevronDown
          strokeWidth={2.5}
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 z-[60] w-56 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#111F18] rounded-xl border border-gray-100 dark:border-[#24382E] shadow-[0_10px_30px_-8px_rgba(15,61,36,0.25)] overflow-hidden ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          <ul
            id={listId}
            role="listbox"
            aria-label="Select your area in Swat"
            className="p-1.5 max-h-[min(30rem,calc(100vh-9rem))] overflow-y-auto overscroll-contain"
          >
            {LOCATION_OPTIONS.map((loc) => {
              const selected = location === loc;
              return (
                <li key={loc} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => select(loc)}
                    className={`w-full flex items-center gap-3 px-3 py-[7px] rounded-lg text-[15px] text-left transition-colors ${
                      selected
                        ? "bg-green-50 dark:bg-green-950/50 text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                        : "text-gray-800 dark:text-gray-200 hover:bg-green-50/70 dark:hover:bg-green-950/30 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E]"
                    }`}
                  >
                    <MapPin
                      className={`w-4 h-4 flex-shrink-0 ${
                        selected ? "text-[#0A5C2E] dark:text-[#1EB55E]" : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                    <span className="flex-1 truncate">{loc}</span>
                    {selected && (
                      <Check strokeWidth={2.5} className="w-4 h-4 flex-shrink-0 text-[#0A5C2E] dark:text-[#1EB55E]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Desktop nav link styling ───────────────────────────────────────────────

/** Desktop nav link: dark-green text; amber underline marks the active page. */
const LINK_CLS = `group relative flex items-center gap-1 px-3 2xl:px-4 py-2 text-[15px] font-bold whitespace-nowrap transition-colors ${NAV_TEXT} ${NAV_HOVER} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5C2E] rounded-md`;

function Underline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute left-1 right-1 -bottom-[9px] h-[3px] rounded-full bg-[#F5A623] origin-center transition-transform duration-200 ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-75"
      }`}
    />
  );
}

// ─── Auth buttons ───────────────────────────────────────────────────────────

const LOGIN_CLS =
  "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full border-[1.5px] border-[#0F3D24] dark:border-[#1EB55E] text-[#0F3D24] dark:text-[#1EB55E] text-[15px] font-bold hover:bg-[#0F3D24] hover:text-white dark:hover:bg-[#1EB55E] dark:hover:text-[#111F18] transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5C2E] focus-visible:ring-offset-2";

const SIGNUP_CLS =
  "inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#F5A623] hover:bg-[#E8951A] text-[#1B2A1F] text-[15px] font-bold shadow-sm hover:shadow-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2";

// ─── Component ───────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, theme, toggleTheme } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null!);
  const langRef = useRef<HTMLDivElement>(null!);
  const servicesRefs = useMemo(() => [servicesRef], []);
  const langRefs = useMemo(() => [langRef], []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Outside-click handlers
  useOutsideClick(servicesRefs, useCallback(() => setServicesOpen(false), []));
  useOutsideClick(langRefs, useCallback(() => setLangOpen(false), []));

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  const mobileLinkCls = (href: string) =>
    `flex items-center px-3 py-2.5 rounded-lg text-[15px] font-semibold transition-colors ${
      isActive(href)
        ? "bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E] border-l-[3px] border-[#F5A623]"
        : "text-[#0F3D24] dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40"
    }`;

  const iconBtnCls =
    "p-2 rounded-full text-[#0F3D24] dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-950/40 hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5C2E]";

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white dark:bg-[#111F18] transition-shadow duration-200 border-b ${
        isScrolled
          ? "border-gray-200 dark:border-[#24382E] shadow-md"
          : "border-gray-100 dark:border-[#24382E]/60 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.06)]"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 xl:h-[76px] flex items-center gap-3 min-w-0"
      >
        {/* ── LEFT: Logo ─────────────────────────────────────────────────── */}
        <div className="flex-shrink-0">
          {/* Very narrow phones (<360px) keep the compact size so nothing overflows */}
          <span className="flex min-[360px]:hidden">
            <Logo size="sm" showTagline={false} />
          </span>
          <span className="hidden min-[360px]:flex sm:hidden">
            <Logo size="navSm" showTagline={false} />
          </span>
          <span className="hidden sm:flex">
            <Logo size="nav" showTagline={false} />
          </span>
        </div>

        {/* ── CENTER: Nav links (desktop) ─────────────────────────────────── */}
        <div className="hidden xl:flex items-center gap-1 2xl:gap-3 flex-1 justify-center">
          <Link href="/" className={LINK_CLS} aria-current={isActive("/") ? "page" : undefined}>
            Home
            <Underline active={isActive("/")} />
          </Link>

          <Link href="/about" className={LINK_CLS} aria-current={isActive("/about") ? "page" : undefined}>
            About Us
            <Underline active={isActive("/about")} />
          </Link>

          {/* Services dropdown */}
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className={LINK_CLS}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown
                strokeWidth={2.5}
                className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
              <Underline active={isActive("/services")} />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 bg-white dark:bg-[#111F18] rounded-xl border border-gray-100 dark:border-[#24382E] shadow-[0_10px_30px_-8px_rgba(15,61,36,0.25)] overflow-hidden z-[60]">
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

          <Link
            href="/become-provider"
            className={LINK_CLS}
            aria-current={isActive("/become-provider") ? "page" : undefined}
          >
            Become a Provider
            <Underline active={isActive("/become-provider")} />
          </Link>
        </div>

        {/* ── RIGHT (desktop): Location | Lang, Theme | Login, Sign Up ────── */}
        <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
          <LocationSelector align="left" />

          {/* Language picker (compact) */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className={iconBtnCls}
              aria-label="Change Language"
              aria-expanded={langOpen}
            >
              <Globe className="w-[18px] h-[18px]" />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2.5 w-40 bg-white dark:bg-[#111F18] rounded-xl border border-gray-100 dark:border-[#24382E] shadow-lg overflow-hidden z-[60]">
                <div className="py-1">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                        language === l.code
                          ? "bg-green-50 dark:bg-green-950/40 text-[#0A5C2E] dark:text-[#1EB55E] font-semibold"
                          : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40"
                      }`}
                    >
                      {l.native}
                      {language === l.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button type="button" onClick={toggleTheme} className={iconBtnCls} aria-label="Toggle Light/Dark Mode">
            {theme === "dark" ? <Sun className="w-[18px] h-[18px] text-amber-400" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          {/* Vertical separator */}
          <span aria-hidden="true" className="w-px h-7 bg-[#0F3D24]/40 dark:bg-[#345041] mx-2" />

          <Link href="/login" className={LOGIN_CLS}>
            <User className="w-[18px] h-[18px]" />
            Login
          </Link>
          <Link href="/register" className={SIGNUP_CLS}>
            Sign Up
          </Link>
        </div>

        {/* ── RIGHT (mobile/tablet): Location, auth (md+), theme, hamburger ── */}
        <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 ml-auto min-w-0">
          <LocationSelector align="right" />

          <Link href="/login" className={`hidden md:inline-flex ${LOGIN_CLS} !h-9 !px-4`}>
            <User className="w-4 h-4" />
            Login
          </Link>
          <Link href="/register" className={`hidden md:inline-flex ${SIGNUP_CLS} !h-9 !px-4`}>
            Sign Up
          </Link>

          <button type="button" onClick={toggleTheme} className={`hidden sm:inline-flex ${iconBtnCls}`} aria-label="Toggle Theme">
            {theme === "dark" ? <Sun className="w-[18px] h-[18px] text-amber-400" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-lg border border-gray-200 dark:border-[#345041] text-[#0F3D24] dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors flex-shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE / TABLET DRAWER ────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-gray-100 dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto overscroll-contain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className={mobileLinkCls("/")}>
              Home
            </Link>

            <Link href="/about" onClick={() => setMobileOpen(false)} className={mobileLinkCls("/about")}>
              About Us
            </Link>

            {/* Services accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileServicesOpen((v) => !v)}
                className={`w-full justify-between ${mobileLinkCls("/services")}`}
                aria-expanded={mobileServicesOpen}
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

            <Link
              href="/become-provider"
              onClick={() => setMobileOpen(false)}
              className={mobileLinkCls("/become-provider")}
            >
              Become a Provider
            </Link>

            {/* Theme (phones only — shown in the bar from sm up) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="sm:hidden w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-[15px] font-semibold text-[#0F3D24] dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>

            {/* Language picker */}
            <div className="pt-2">
              <p className="px-3 pt-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Language
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLanguage(l.code);
                      setMobileOpen(false);
                    }}
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

            {/* Auth buttons (phones — tablet shows them in the bar) */}
            <div className="md:hidden pt-3 mt-2 border-t border-gray-100 dark:border-[#24382E] grid grid-cols-2 gap-2.5">
              <Link href="/login" onClick={() => setMobileOpen(false)} className={`${LOGIN_CLS} w-full`}>
                <User className="w-4 h-4" />
                Login
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className={`${SIGNUP_CLS} w-full`}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
