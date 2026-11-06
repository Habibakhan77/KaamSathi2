"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export interface HeroSlide {
  id: string;
  categoryTag: string;
  headline: string;
  supportingLine: string;
  categorySlug: string;
  ctaText: string;
  imageDesktop: string;
  altText: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-ac",
    categoryTag: "AC & REFRIGERATION",
    headline: "Cooling problem? Get a verified AC technician in Swat.",
    supportingLine:
      "Inverter fault diagnosis, R410/R32 gas refills, leakage welding, and deep chemical wash by VTI-certified ustads in Mingora, Saidu Sharif, and Kanju.",
    categorySlug: "ac-technician",
    ctaText: "Book AC Technician",
    imageDesktop: "/hero/hero-ac-repair.webp",
    altText: "Skilled Pakistani AC technician servicing modern split air conditioner indoors",
  },
  {
    id: "slide-electrician",
    categoryTag: "ELECTRICIAN & SOLAR",
    headline: "Wiring, short circuits & solar, checked by verified professionals.",
    supportingLine:
      "Main breaker tripping, 3-phase domestic wiring, UPS inverter configurations, and solar net-metering safety audits across Swat Valley.",
    categorySlug: "electrician",
    ctaText: "Book Electrician",
    imageDesktop: "/hero/hero-electrician-solar.webp",
    altText: "Pakistani electrician inspecting domestic circuit breaker and hybrid solar inverter",
  },
  {
    id: "slide-plumber",
    categoryTag: "PLUMBING & SANITARY",
    headline: "Leaks, geysers & bathroom fittings fixed properly.",
    supportingLine:
      "Concealed wall leak detection, PPRC hot/cold piping, Turkish cistern repair, and gas/electric geyser descaling with upfront itemized pricing.",
    categorySlug: "plumber",
    ctaText: "Book Master Plumber",
    imageDesktop: "/hero/hero-plumber-sanitary.webp",
    altText: "Pakistani master plumber fixing under-sink pipe fittings and mixer tap with tools",
  },
  {
    id: "slide-carpenter",
    categoryTag: "CARPENTER & FINISHER",
    headline: "Furniture, doors, polish & wall painting done right.",
    supportingLine:
      "Custom kitchen cabinets, door jam lock replacements, deodar wood lacquer finish, wall putty, and moisture seelan treatment for local homes.",
    categorySlug: "carpenter",
    ctaText: "Book Wood & Paint",
    imageDesktop: "/hero/hero-carpenter-painter.webp",
    altText: "Pakistani carpenter planing solid wooden door panel with painter finishing wall in background",
  },
  {
    id: "slide-cleaning",
    categoryTag: "DEEP CLEANING & APPLIANCE",
    headline: "Sofa, carpet, home deep cleaning & appliance repair.",
    supportingLine:
      "Water tank sanitation, sofa foam extraction, and diagnosis for automatic washing machines, microwave ovens, and refrigerator compressors.",
    categorySlug: "cleaning",
    ctaText: "Book Cleaning & Repair",
    imageDesktop: "/hero/hero-cleaner-appliance.webp",
    altText: "Pakistani cleaning technician deep cleaning sofa with professional extraction vacuum machine",
  },
  {
    id: "slide-ai",
    categoryTag: "AI SMART MATCHING",
    headline: "Describe your problem in Urdu, Roman Urdu or English and get matched.",
    supportingLine:
      "Our bilingual Swat NLP engine understands voice or text, detects fault severity, recommends pre-arrival precautions, and dispatches vetted local ustads.",
    categorySlug: "ai-assistant",
    ctaText: "Consult AI Assistant",
    imageDesktop: "/hero/hero-customer-ai.webp",
    altText: "Pakistani homeowner using smartphone with friendly glowing AI service assistant",
  },
];

export function HeroCarousel() {
  const { isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsPlaying(false);
      }
      const listener = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
        if (e.matches) setIsPlaying(false);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Auto-advance every 5 seconds (paused if hovered, touched, or reduced-motion)
  useEffect(() => {
    if (!isPlaying || isHovered || isReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isReducedMotion, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      isRTL ? nextSlide() : prevSlide();
    } else if (e.key === "ArrowRight") {
      isRTL ? prevSlide() : nextSlide();
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isSwipe = Math.abs(distance) > 40;

    if (isSwipe) {
      if (distance > 0) {
        // Swiped Left
        isRTL ? prevSlide() : nextSlide();
      } else {
        // Swiped Right
        isRTL ? nextSlide() : prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      aria-label="KaamSaathi Service Carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden bg-[#0A3D1E] text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 select-none"
    >
      {/* Visual Slider Track */}
      <div className="relative w-full h-[500px] sm:h-[560px] md:h-[620px] lg:h-[660px]">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${idx + 1} of ${totalSlides}: ${slide.headline}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              {/* Background Image using next/image with responsive sizes */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.imageDesktop}
                  alt={slide.altText}
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover object-center transform scale-105 transition-transform duration-10000 ease-linear"
                />
              </div>

              {/* WCAG AA Deep-Green Left Scrim (solid on left 45%, feathering smoothly toward center-right) */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 ${
                  isRTL
                    ? "bg-gradient-to-l from-[#072F18]/95 via-[#072F18]/85 to-transparent md:w-[68%]"
                    : "bg-gradient-to-r from-[#072F18]/95 via-[#072F18]/85 to-transparent md:w-[68%]"
                }`}
              />

              {/* Bottom Scrim for Floating Search Card contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1410] via-[#0B1410]/70 to-transparent"
              />

              {/* Slide Content Box */}
              <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                <div className="max-w-xl md:max-w-2xl space-y-4 sm:space-y-5 pt-4 pb-20 md:pb-28">
                  {/* Category Pill */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5C2E] border border-emerald-400/40 text-emerald-100 text-xs font-extrabold tracking-wider uppercase shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#F5A524] animate-pulse" />
                    <span>{slide.categoryTag}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-[1.18] drop-shadow-sm">
                    {slide.headline}
                  </h1>

                  {/* Supporting Copy */}
                  <p className="text-xs sm:text-base text-emerald-50 leading-relaxed max-w-lg font-medium drop-shadow-sm">
                    {slide.supportingLine}
                  </p>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Primary Button */}
                    <Link
                      href={
                        slide.categorySlug === "ai-assistant"
                          ? "/ai-assistant"
                          : `/services?cat=${slide.categorySlug}`
                      }
                      className="px-6 py-3.5 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs sm:text-sm shadow-elevated border border-emerald-400/40 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* Secondary AI Button */}
                    <Link
                      href="/ai-assistant"
                      className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#F5A524] fill-[#F5A524]" />
                      <span>Ask AI Assistant</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite">
        Slide {currentIndex + 1} of {totalSlides}: {currentSlide.headline}
      </div>

      {/* Slider Controls: Arrows (Desktop/Tablet) */}
      <button
        onClick={isRTL ? nextSlide : prevSlide}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md items-center justify-center transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={isRTL ? prevSlide : nextSlide}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md items-center justify-center transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Bar: Dots Indicators & Play/Pause Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
        {/* Play/Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause auto-advancing carousel" : "Play auto-advancing carousel"}
          className="p-1 text-emerald-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <span className="w-px h-3 bg-white/20" />

        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide Selector">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}: ${slide.categoryTag}`}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A524] ${
                  isActive
                    ? "w-7 h-2.5 bg-[#F5A524] shadow-sm"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default HeroCarousel;
