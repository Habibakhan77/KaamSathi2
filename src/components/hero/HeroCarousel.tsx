"use client";

/**
 * HeroCarousel: reusable, content-agnostic homepage banner.
 *
 * All slide content comes in through props (see src/config/heroSlides.ts).
 * Features: cross-fade + subtle Ken Burns zoom, autoplay with a synced progress
 * indicator, pause on hover / keyboard focus / hidden tab / reduced motion,
 * explicit pause button, prev/next arrows, dot navigation, keyboard arrows,
 * touch swipe, and RTL (Urdu / Pashto) support.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { HERO_CAROUSEL_SETTINGS, type HeroSlide } from "@/config/heroSlides";

export interface HeroCarouselProps {
  slides: HeroSlide[];
  /** Reassurance points shown under the buttons (tablet and up). */
  trustPoints?: string[];
  autoplayInterval?: number;
  transitionDuration?: number;
  swipeThreshold?: number;
  ariaLabel?: string;
  /**
   * Reserve space at the bottom (tablet and up) so an element that overlaps
   * the banner, such as the homepage search card, never covers the controls.
   */
  overlapBottom?: boolean;
  className?: string;
}

const DEFAULT_IMAGE_POSITION = "75% center";

/** Renders the heading with an optional amber "marker" highlight. */
function renderHeading(heading: string, highlight?: string) {
  if (!highlight) return heading;
  const start = heading.indexOf(highlight);
  if (start === -1) return heading;
  return (
    <>
      {heading.slice(0, start)}
      <span className="rounded-sm text-[#0F5C4D] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] bg-[linear-gradient(transparent_62%,rgba(245,165,36,0.42)_62%)] dark:text-[#5FD9A3] dark:bg-[linear-gradient(transparent_66%,rgba(245,165,36,0.32)_66%)]">
        {highlight}
      </span>
      {heading.slice(start + highlight.length)}
    </>
  );
}

export function HeroCarousel({
  slides,
  trustPoints = [],
  autoplayInterval = HERO_CAROUSEL_SETTINGS.autoplayInterval,
  transitionDuration = HERO_CAROUSEL_SETTINGS.transitionDuration,
  swipeThreshold = HERO_CAROUSEL_SETTINGS.swipeThreshold,
  ariaLabel = HERO_CAROUSEL_SETTINGS.ariaLabel,
  overlapBottom = false,
  className = "",
}: HeroCarouselProps) {
  const { isRTL } = useLanguage();
  const total = slides.length;

  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPageHidden, setIsPageHidden] = useState(false);
  // Deterministic on server & first client render (no hydration mismatch).
  const [hasMounted, setHasMounted] = useState(false);
  const [preloadAll, setPreloadAll] = useState(false);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const remainingRef = useRef(autoplayInterval);
  const lastIndexRef = useRef(index);

  const isAutoplaying =
    total > 1 &&
    !userPaused &&
    !isHovered &&
    !hasKeyboardFocus &&
    !prefersReducedMotion &&
    !isPageHidden;

  /* ── Navigation ─────────────────────────────────────────────── */
  const goTo = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  /* ── Environment listeners (client only) ───────────────────── */
  useEffect(() => {
    setHasMounted(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onMotion);

    const onVisibility = () => setIsPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    // Load remaining slide images shortly after first paint, so the LCP image
    // gets full bandwidth but later slides are ready before they appear.
    const preloadTimer = window.setTimeout(() => setPreloadAll(true), 1500);

    return () => {
      mq.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(preloadTimer);
    };
  }, []);

  /* ── Autoplay: pausable timer that resumes where it left off ── */
  useEffect(() => {
    if (lastIndexRef.current !== index) {
      lastIndexRef.current = index;
      remainingRef.current = autoplayInterval;
    }
    if (!isAutoplaying) return;

    const startedAt = performance.now();
    const timer = window.setTimeout(next, remainingRef.current);
    return () => {
      window.clearTimeout(timer);
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (performance.now() - startedAt)
      );
    };
  }, [index, isAutoplaying, autoplayInterval, next]);

  /* ── Keyboard ──────────────────────────────────────────────── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("input, textarea, select, [contenteditable='true']")) return;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        isRTL ? next() : prev();
        break;
      case "ArrowRight":
        e.preventDefault();
        isRTL ? prev() : next();
        break;
      case "Home":
        e.preventDefault();
        goTo(0);
        break;
      case "End":
        e.preventDefault();
        goTo(total - 1);
        break;
    }
  };

  /* ── Touch swipe (vertical scrolling stays native) ─────────── */
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < swipeThreshold || Math.abs(dx) < Math.abs(dy)) return;
    const swipedLeft = dx < 0;
    // In LTR, swiping left reveals the next slide; mirrored for RTL.
    if (swipedLeft !== isRTL) next();
    else prev();
  };

  /* ── Pause on keyboard focus (not on mouse clicks) ─────────── */
  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    try {
      if ((e.target as HTMLElement).matches(":focus-visible")) setHasKeyboardFocus(true);
    } catch {
      setHasKeyboardFocus(true);
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHasKeyboardFocus(false);
  };

  if (total === 0) return null;

  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;
  const current = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setIsHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`relative isolate w-full overflow-hidden bg-[#F4F8F7] dark:bg-[#0B1A16] touch-pan-y ${className}`}
    >
      {/* Fixed-height track: prevents layout shift between slides */}
      <div className="relative h-[640px] md:h-[560px] lg:h-[620px] xl:h-[660px]">
        {slides.map((slide, i) => {
          const active = i === index;
          const shouldRenderImage =
            preloadAll || active || i === 0 || i === nextIndex || i === prevIndex;
          const Icon = slide.icon;
          const enter = (delayMs: number): React.CSSProperties => ({
            transitionDelay: active ? `${delayMs}ms` : "0ms",
          });
          const enterClass = `transition-[opacity,transform] duration-700 ease-out ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`;

          return (
            <div
              key={slide.id}
              id={`hero-slide-${slide.id}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${slide.category}`}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity ease-in-out ${
                active ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"
              }`}
              style={{ transitionDuration: `${transitionDuration}ms` }}
            >
              {/* ── Background image (top band on mobile, full-bleed md+) ── */}
              <div className="absolute inset-x-0 top-0 h-[44%] overflow-hidden md:inset-0 md:h-full">
                <div
                  className={`absolute inset-0 transition-transform ease-out will-change-transform ${
                    active && hasMounted ? "scale-100" : "scale-[1.08]"
                  }`}
                  style={{
                    transitionDuration: active
                      ? `${autoplayInterval + transitionDuration + 1500}ms`
                      : "0ms",
                    transitionDelay: active ? "0ms" : `${transitionDuration}ms`,
                  }}
                >
                  {shouldRenderImage && (
                    <Image
                      src={slide.image.src}
                      alt={slide.image.alt}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      quality={80}
                      className="object-cover rtl:-scale-x-100"
                      style={{ objectPosition: slide.image.position ?? DEFAULT_IMAGE_POSITION }}
                    />
                  )}
                </div>

                {/* Mobile: fade image into the content panel */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#F4F8F7] to-transparent dark:from-[#0B1A16] md:hidden"
                />
                {/* Tablet+: soft brand wash behind the text column */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 hidden md:block ${
                    isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r"
                  } from-[#F4F8F7] from-0% via-[#F4F8F7]/85 via-40% to-transparent to-[72%] dark:from-[#0B1A16] dark:via-[#0B1A16]/90 dark:to-[#0B1A16]/25`}
                />
                {/* Subtle top & bottom vignettes for depth */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-[#0F5C4D]/10 to-transparent md:block"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-[#06302A]/25 to-transparent md:block"
                />
              </div>

              {/* ── Text overlay ── */}
              <div
                className={`relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 font-sans sm:px-6 md:justify-center lg:px-8 ${
                  overlapBottom ? "md:pb-32 md:pt-6" : "md:pb-16"
                }`}
              >
                <div className="max-w-[560px] md:max-w-[460px] lg:max-w-[560px] xl:max-w-[600px]">
                  {/* Category + badge */}
                  <div
                    className={`mb-3 flex flex-wrap items-center gap-2 md:mb-5 ${enterClass}`}
                    style={enter(150)}
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0F5C4D]/15 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0F5C4D] shadow-sm backdrop-blur-sm sm:text-xs dark:border-[#1FA971]/30 dark:bg-[#1FA971]/15 dark:text-[#7FE3B5]">
                      {Icon && <Icon className="h-3.5 w-3.5 text-[#1FA971]" aria-hidden="true" />}
                      {slide.category}
                    </span>
                    {slide.badge && (
                      <span className="inline-flex items-center rounded-full bg-[#F5A524] px-2.5 py-1 text-[11px] font-bold text-[#3A2600] shadow-sm sm:text-xs">
                        {slide.badge}
                      </span>
                    )}
                  </div>

                  {/* Heading */}
                  <h2
                    dir="auto"
                    className={`font-heading text-[26px] font-extrabold !leading-[1.15] tracking-tight text-[#0B2E27] sm:text-4xl md:text-[40px] lg:text-5xl xl:text-[56px] xl:!leading-[1.08] dark:text-white ${enterClass}`}
                    style={enter(250)}
                  >
                    {renderHeading(slide.heading, slide.headingHighlight)}
                  </h2>

                  {/* Description */}
                  <p
                    dir="auto"
                    className={`mt-3 line-clamp-3 max-w-[46ch] text-sm leading-relaxed text-[#3A524C] sm:text-base md:mt-5 md:line-clamp-none md:text-lg dark:text-[#C3D6CF] ${enterClass}`}
                    style={enter(350)}
                  >
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div
                    className={`mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3 md:mt-8 ${enterClass}`}
                    style={enter(450)}
                  >
                    <Link
                      href={slide.primaryCta.href}
                      tabIndex={active ? 0 : -1}
                      className="group inline-flex grow items-center justify-center gap-2 rounded-xl bg-[#0F5C4D] sm:grow-0 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(15,92,77,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#0B4A3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A524] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F8F7] active:translate-y-0 sm:px-6 sm:py-3.5 sm:text-[15px] dark:bg-[#1FA971] dark:text-[#04241D] dark:hover:bg-[#28C083] dark:focus-visible:ring-offset-[#0B1A16]"
                    >
                      {slide.primaryCta.label}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                    {slide.secondaryCta && (
                      <Link
                        href={slide.secondaryCta.href}
                        tabIndex={active ? 0 : -1}
                        className="inline-flex grow items-center justify-center rounded-xl border border-[#0F5C4D]/20 sm:grow-0 bg-white/85 px-5 py-3 text-sm font-bold text-[#0F5C4D] shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#0F5C4D]/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA971] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F8F7] sm:px-6 sm:py-3.5 sm:text-[15px] dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:focus-visible:ring-offset-[#0B1A16]"
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    )}
                  </div>

                  {/* Trust points */}
                  {trustPoints.length > 0 && (
                    <ul
                      className={`mt-8 hidden flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[#33504A] lg:flex dark:text-[#B5CBC3] ${enterClass}`}
                      style={enter(550)}
                    >
                      {trustPoints.map((point) => (
                        <li key={point} className="inline-flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-[#1FA971]" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Controls ── */}
      {total > 1 && (
        <div
          className={`absolute inset-x-0 z-20 bottom-4 ${overlapBottom ? "md:bottom-[5.5rem]" : "md:bottom-8"}`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Dots with autoplay progress */}
            <div className="flex items-center" role="group" aria-label="Choose a slide">
              {slides.map((slide, i) => {
                const active = i === index;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}: ${slide.category}`}
                    aria-current={active ? "true" : undefined}
                    aria-controls={`hero-slide-${slide.id}`}
                    className="group flex h-8 items-center px-1 focus-visible:outline-none"
                  >
                    <span
                      className={`relative block h-2 overflow-hidden rounded-full transition-all duration-500 group-focus-visible:ring-2 group-focus-visible:ring-[#F5A524] group-focus-visible:ring-offset-2 ${
                        active
                          ? "w-10 bg-[#0F5C4D]/20 dark:bg-white/25"
                          : "w-2 bg-[#0F5C4D]/30 group-hover:bg-[#0F5C4D]/60 dark:bg-white/35 dark:group-hover:bg-white/70"
                      }`}
                    >
                      {active && (
                        <span
                          key={`progress-${index}`}
                          className="absolute inset-0 origin-left rounded-full bg-[#F5A524] rtl:origin-right"
                          style={
                            prefersReducedMotion || total < 2
                              ? undefined
                              : {
                                  animation: `ks-hero-progress ${autoplayInterval}ms linear forwards`,
                                  animationPlayState: isAutoplaying ? "running" : "paused",
                                }
                          }
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Counter, pause & arrows */}
            <div className="flex items-center gap-1 rounded-full border border-[#0F5C4D]/10 bg-white/90 p-1 shadow-[0_10px_30px_-12px_rgba(6,48,42,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#0F2420]/90">
              <span className="hidden px-2.5 text-xs font-bold tabular-nums text-[#0F5C4D] sm:inline dark:text-[#7FE3B5]">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1 text-[#0F5C4D]/40 dark:text-white/40">/</span>
                {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? "Resume automatic slide rotation" : "Pause automatic slide rotation"}
                aria-pressed={userPaused}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#0F5C4D] transition-colors hover:bg-[#0F5C4D]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A524] dark:text-white dark:hover:bg-white/10"
              >
                {userPaused ? (
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F5C4D]/5 text-[#0F5C4D] transition-all hover:bg-[#0F5C4D] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A524] dark:bg-white/5 dark:text-white dark:hover:bg-[#1FA971] dark:hover:text-[#04241D]"
              >
                <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F5C4D] text-white transition-all hover:bg-[#0B4A3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A524] dark:bg-[#1FA971] dark:text-[#04241D] dark:hover:bg-[#28C083]"
              >
                <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen-reader status (announced only when not auto-rotating) */}
      <p className="sr-only" aria-live={isAutoplaying ? "off" : "polite"} aria-atomic="true">
        Slide {index + 1} of {total}: {current.heading}
      </p>
    </section>
  );
}

export default HeroCarousel;
