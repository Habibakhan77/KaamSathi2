/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  KaamSaathi Homepage Hero — SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every piece of hero carousel content lives in this file.
 *
 *  • Add a slide      → append a new object to HERO_SLIDES
 *  • Remove a slide   → delete its object
 *  • Reorder slides   → change the array order
 *  • Edit copy/links  → change the fields below
 *
 *  The <HeroCarousel /> component (src/components/hero/HeroCarousel.tsx)
 *  contains NO slide content; it only renders whatever is defined here.
 *
 *  Images should live in /public/hero/. They are composed with the worker on
 *  the right and open space on the left, which is where the text overlay sits.
 *  Use `image.position` to fine-tune the crop on narrow screens.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { LucideIcon } from "lucide-react";
import { Wind, Zap, Droplets, Hammer, Sparkles } from "lucide-react";

export interface HeroSlideCta {
  /** Button label */
  label: string;
  /** Internal route (e.g. "/services?cat=plumber") or absolute URL */
  href: string;
}

export interface HeroSlide {
  /** Unique, stable identifier (used as React key and for analytics) */
  id: string;
  /** Background image */
  image: {
    /** Path inside /public, e.g. "/hero/hero-ac-repair.webp" */
    src: string;
    /** Descriptive alt text for screen readers and SEO */
    alt: string;
    /**
     * CSS object-position used when the image is cropped (mobile/tablet).
     * Defaults to "75% center" so the worker on the right stays in frame.
     */
    position?: string;
  };
  /** Service category label shown in the pill above the heading */
  category: string;
  /** Optional icon shown inside the category pill */
  icon?: LucideIcon;
  /** Main heading */
  heading: string;
  /**
   * Optional substring of `heading` to emphasise with the amber marker.
   * Must match text inside `heading` exactly (case-sensitive).
   */
  headingHighlight?: string;
  /** Short supporting description */
  description: string;
  /** Primary call-to-action */
  primaryCta: HeroSlideCta;
  /** Optional secondary call-to-action */
  secondaryCta?: HeroSlideCta;
  /** Optional amber badge / highlight text */
  badge?: string;
}

/* ───────────────────────────── Slides ───────────────────────────── */

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "ac-repair",
    image: {
      src: "/hero/hero-ac-repair.webp",
      alt: "Verified KaamSaathi AC technician servicing a split air conditioner in a Swat home",
      position: "78% center",
    },
    category: "AC Repair & Servicing",
    icon: Wind,
    heading: "Expert AC Repair Services at Your Doorstep",
    headingHighlight: "at Your Doorstep",
    description:
      "Find trusted and verified AC technicians across Swat for servicing, gas refills, and inverter repairs.",
    primaryCta: { label: "Find AC Technicians", href: "/services?cat=ac-technician" },
    secondaryCta: { label: "Ask AI Assistant", href: "/ai-assistant" },
    badge: "Summer Essential",
  },
  {
    id: "electrician",
    image: {
      src: "/hero/hero-electrician-solar.webp",
      alt: "Verified electrician testing a domestic distribution board next to a solar inverter",
      position: "72% center",
    },
    category: "Electrician & Solar",
    icon: Zap,
    heading: "Reliable Electrical Services, Just One Click Away",
    headingHighlight: "Just One Click Away",
    description:
      "Connect with verified electricians for safe and professional wiring, breaker, UPS, and solar work.",
    primaryCta: { label: "Find Electricians", href: "/services?cat=electrician" },
    secondaryCta: { label: "How It Works", href: "/how-it-works" },
    badge: "Safety First",
  },
  {
    id: "plumbing",
    image: {
      src: "/hero/hero-plumber-sanitary.webp",
      alt: "Experienced plumber fixing under-sink pipe fittings in a modern kitchen",
      position: "70% center",
    },
    category: "Plumbing & Sanitary",
    icon: Droplets,
    heading: "Professional Plumbing Solutions for Every Home",
    headingHighlight: "for Every Home",
    description:
      "Book experienced plumbers with transparent quotations for leaks, geysers, and bathroom fittings.",
    primaryCta: { label: "Find Plumbers", href: "/services?cat=plumber" },
    secondaryCta: { label: "Ask AI Assistant", href: "/ai-assistant" },
    badge: "Upfront Quotes",
  },
  {
    id: "carpentry",
    image: {
      src: "/hero/hero-carpenter-painter.webp",
      alt: "Skilled carpenter planing a wooden door while a painter finishes a wall behind him",
      position: "72% center",
    },
    category: "Carpentry & Painting",
    icon: Hammer,
    heading: "Skilled Carpenters and Home Improvement Experts",
    headingHighlight: "Home Improvement Experts",
    description:
      "Find reliable professionals for furniture, doors, polish, and painting projects around your home.",
    primaryCta: { label: "Find Carpenters", href: "/services?cat=carpenter" },
    secondaryCta: { label: "Browse All Services", href: "/services" },
    badge: "Wood · Polish · Paint",
  },
  {
    id: "cleaning",
    image: {
      src: "/hero/hero-cleaner-appliance.webp",
      alt: "Professional cleaner deep-cleaning a sofa with an extraction machine",
      position: "72% center",
    },
    category: "Cleaning & Appliances",
    icon: Sparkles,
    heading: "A Cleaner Home Starts with Trusted Professionals",
    headingHighlight: "Trusted Professionals",
    description:
      "Book dependable deep-cleaning, water tank, and home appliance repair services in Swat.",
    primaryCta: { label: "Find Cleaning Services", href: "/services?cat=cleaning" },
    secondaryCta: { label: "Appliance Repair", href: "/services?cat=appliance" },
    badge: "Home & Appliance",
  },
];

/* ─────────────────────── Shared trust points ─────────────────────── */
/** Short reassurance points shown under the buttons on every slide (tablet+). */
export const HERO_TRUST_POINTS: string[] = [
  "CNIC-verified professionals",
  "Transparent quotations",
  "Serving all of Swat",
];

/* ─────────────────────────── Behaviour ─────────────────────────── */

export const HERO_CAROUSEL_SETTINGS = {
  /** Time each slide stays visible before auto-advancing (ms). */
  autoplayInterval: 5500,
  /** Cross-fade duration between slides (ms). */
  transitionDuration: 900,
  /** Minimum horizontal swipe distance on touch devices (px). */
  swipeThreshold: 50,
  /** Accessible name for the carousel region. */
  ariaLabel: "Featured KaamSaathi services",
} as const;
