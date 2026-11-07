"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  Zap,
  Wrench,
  Wind,
  Hammer,
  Sun,
  Paintbrush,
  Tv,
  BadgeCheck,
  ChevronDown,
  Building,
  GraduationCap,
  Users,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { HeroAISearch } from "@/components/search/HeroAISearch";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { HERO_SLIDES, HERO_TRUST_POINTS } from "@/config/heroSlides";

export default function HomePage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    {
      id: "electrician",
      name: "Electrician",
      nameUrdu: "الیکٹریشن",
      icon: Zap,
      price: "600",
      tasks: ["Breaker Tripping", "Wiring & Sockets", "UPS & Solar Fix"],
      ustads: 12,
    },
    {
      id: "plumber",
      name: "Plumbing & Sanitary",
      nameUrdu: "پلمبر",
      icon: Wrench,
      price: "500",
      tasks: ["Concealed Leakage", "Geyser Setup", "Water Motor"],
      ustads: 9,
    },
    {
      id: "ac-technician",
      name: "AC & Refrigeration",
      nameUrdu: "اے سی ٹیکنیشن",
      icon: Wind,
      price: "1,000",
      tasks: ["Inverter Gas Refill", "Deep Chemical Wash", "Compressor Check"],
      ustads: 8,
    },
    {
      id: "carpenter",
      name: "Carpenter & Wood",
      nameUrdu: "بڑھئی / کارپینٹر",
      icon: Hammer,
      price: "800",
      tasks: ["Door Locks", "Kitchen Cabinets", "Wood Lacquer"],
      ustads: 6,
    },
    {
      id: "solar",
      name: "Solar & Inverter",
      nameUrdu: "سولر اور انورٹر",
      icon: Sun,
      price: "1,200",
      tasks: ["Net Metering", "Hybrid Setup", "Battery Diagnostics"],
      ustads: 5,
    },
    {
      id: "painter",
      name: "Painter & Finisher",
      nameUrdu: "پینٹر",
      icon: Paintbrush,
      price: "1,500",
      tasks: ["Wall Putty", "Moisture / Seelan", "Room Paint"],
      ustads: 7,
    },
    {
      id: "cleaning",
      name: "Deep Cleaning",
      nameUrdu: "صفائی کی خدمات",
      icon: Sparkles,
      price: "1,200",
      tasks: ["Water Tank Wash", "Sofa Extraction", "Post Paint Scrub"],
      ustads: 4,
    },
    {
      id: "appliance",
      name: "Appliance Repair",
      nameUrdu: "گھریلو سامان کی مرمت",
      icon: Tv,
      price: "700",
      tasks: ["Washing Machine", "Microwave Oven", "Refrigerator"],
      ustads: 6,
    },
  ];

  const featuredProviders = [
    {
      id: "prov-prof-01",
      name: "Rashid Khan",
      business: "Rashid Electric & Smart Inverter Services",
      category: "Electrician",
      area: "Saidu Sharif & Mingora",
      rating: 4.9,
      reviews: 42,
      exp: "9 years",
      hourly: 800,
      skills: ["House Wiring", "UPS Installation", "Circuit Breakers"],
      promoted: true,
      verified: true,
    },
    {
      id: "prov-prof-02",
      name: "Gulzar Ahmed",
      business: "Swat Chill AC & Heating Solutions",
      category: "AC Technician",
      area: "Mingora & Fizagat",
      rating: 4.8,
      reviews: 35,
      exp: "7 years",
      hourly: 1200,
      skills: ["Inverter Gas Refill", "Leakage Welding", "PCB Board Diagnostics"],
      promoted: true,
      verified: true,
    },
    {
      id: "prov-prof-03",
      name: "Shah Faisal",
      business: "Faisal Sanitary & Master Plumbing",
      category: "Plumber",
      area: "Kanju & Barikot",
      rating: 4.7,
      reviews: 29,
      exp: "12 years",
      hourly: 700,
      skills: ["PPRC Piping", "Water Tank Automation", "Geyser Descaling"],
      promoted: false,
      verified: true,
    },
  ];

  const faqs = [
    {
      q: "How does KaamSaathi verify local service providers in Swat?",
      a: "Every technician on KaamSaathi must submit their NADRA CNIC along with trade evidence (such as a vocational training diploma from VTI Swat or verifiable references from recognized hardware stores in Mingora). Our administrative team manually audits and verifies these documents before conferring the verified green badge.",
    },
    {
      q: "Can I describe my problem in Urdu or Pashto?",
      a: "Yes! KaamSaathi features a bilingual natural language parser specifically trained to recognize regional phrasing in English, Urdu, Pashto, and Roman Urdu (e.g. 'Mera AC theek se cool nahi kar raha' or 'Zma da kor bijli breaker trip kigi'). You can even use the microphone button to speak your problem.",
    },
    {
      q: "When and how do I pay the technician?",
      a: "In our current pilot launch, all payments are settled directly between you and the verified provider as Cash on Completion after you have inspected and confirmed satisfaction with the work. Online digital escrow payments via JazzCash, Easypaisa, and Raast are under active development as future enhancements.",
    },
    {
      q: "What if I have an emergency breakdown (e.g. burning odor or water pipe burst)?",
      a: "When our AI detects emergency indicators (such as 'smoke', 'aag', 'spark', or 'flooding'), it marks your request as high urgency, alerts all nearby on-duty verified providers in Mingora/Saidu Sharif, and provides pre-arrival safety advisories (such as isolating your main breaker).",
    },
    {
      q: "Is KaamSaathi a real company or an academic capstone project?",
      a: "KaamSaathi is a Final Year BS Software Engineering Capstone Project at the University of Swat, designed and authored by Habiba Khan and Laiba Khaist under the supervision of Muhammad Hamza. It is deployed as a real functional pilot for the Swat community.",
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section: banner carousel (content lives in src/config/heroSlides.ts) */}
      <section aria-labelledby="home-hero-title" className="relative">
        <HeroCarousel slides={HERO_SLIDES} trustPoints={HERO_TRUST_POINTS} overlapBottom />

        {/* AI search card overlapping the banner */}
        <div className="relative z-20 mx-auto mt-2 max-w-5xl px-4 sm:px-6 md:-mt-14 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-[#DCE7E2] bg-white px-5 pb-6 pt-9 shadow-[0_30px_70px_-30px_rgba(6,48,42,0.35)] sm:px-10 sm:pb-8 sm:pt-11 dark:border-[#24382E] dark:bg-[#111F18]">
            {/* Brand hairline + soft top glow */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0F5C4D] via-[#1FA971] to-[#F5A524]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-[#1FA971]/10 blur-3xl"
            />
            {/* Subtle Swat mountain outline */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.05] dark:opacity-[0.10]"
            >
              <svg
                viewBox="0 0 1440 320"
                className="h-auto w-full text-[#0F5C4D] dark:text-[#1EB55E]"
                fill="currentColor"
                preserveAspectRatio="none"
              >
                <path d="M0,192L60,176C120,160,240,128,360,144C480,160,600,224,720,218.7C840,213,960,139,1080,128C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
              </svg>
            </div>

            <div className="relative text-center">
              {/* Eyebrow */}
              <div className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-[#0F5C4D]/10 bg-[#F4F8F7] px-4 py-1.5 text-xs font-bold text-[#0F5C4D] shadow-[0_1px_2px_rgba(15,92,77,0.06)] dark:border-[#1FA971]/25 dark:bg-[#1FA971]/10 dark:text-[#7FE3B5]">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 fill-[#F5A524] text-[#F5A524]" />
                  AI-Assisted Verified Services
                </span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-[#0F5C4D]/20 sm:block dark:bg-white/20" />
                <span className="inline-flex items-center gap-1.5 text-[#3A524C] dark:text-[#B5CBC3]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1FA971] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1FA971]" />
                  </span>
                  Swat Valley Pilot
                </span>
              </div>

              {/* Headline */}
              <h1
                id="home-hero-title"
                className="mx-auto mt-5 max-w-3xl font-heading text-[28px] font-extrabold leading-[1.12] tracking-tight text-[#0B2E27] sm:text-4xl lg:text-[44px] dark:text-[#F2F7F4]"
              >
                {t.hero.title}{" "}
                <span className="bg-gradient-to-r from-[#0F5C4D] via-[#168A5F] to-[#0F5C4D] bg-clip-text pb-[0.12em] text-transparent [-webkit-box-decoration-break:clone] [box-decoration-break:clone] sm:block dark:from-[#5FD9A3] dark:via-[#9BEBC6] dark:to-[#5FD9A3]">
                  {t.hero.highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4A625C] sm:text-[17px] dark:text-[#B8C9C0]">
                {t.hero.subtitle}
              </p>

              {/* Tagline */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <span aria-hidden="true" className="hidden h-px w-14 bg-gradient-to-r from-transparent to-[#F5A524] sm:block" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0F5C4D] sm:text-xs sm:tracking-[0.18em] dark:text-[#7FE3B5]">
                  {t.brand.tagline}
                </span>
                <span aria-hidden="true" className="hidden h-px w-14 bg-gradient-to-l from-transparent to-[#F5A524] sm:block" />
              </div>
            </div>

            <div className="relative mt-8">
              <HeroAISearch />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section aria-label="Why choose KaamSaathi" className="mx-auto max-w-7xl px-4 !mt-12 sm:px-6 lg:px-8">
        <ul className="grid overflow-hidden rounded-[28px] border border-[#DCE7E2] bg-white shadow-[0_24px_60px_-34px_rgba(6,48,42,0.35)] sm:grid-cols-2 lg:grid-cols-4 dark:border-[#24382E] dark:bg-[#111F18]">
          {[
            {
              icon: ShieldCheck,
              title: t.trustBadges.verified,
              desc: t.trustBadges.verifiedDesc,
              tile: "bg-gradient-to-br from-[#0F5C4D] to-[#1A7F66] text-white shadow-[0_10px_22px_-10px_rgba(15,92,77,0.8)]",
              accent: "bg-[#0F5C4D] dark:bg-[#5FD9A3]",
              border: "",
            },
            {
              icon: Sparkles,
              title: t.trustBadges.aiMatch,
              desc: t.trustBadges.aiMatchDesc,
              tile: "bg-gradient-to-br from-[#1FA971] to-[#3CC48A] text-white shadow-[0_10px_22px_-10px_rgba(31,169,113,0.8)]",
              accent: "bg-[#1FA971]",
              border: "border-t sm:border-t-0 sm:border-s",
            },
            {
              icon: MapPin,
              title: t.trustBadges.local,
              desc: t.trustBadges.localDesc,
              tile: "bg-gradient-to-br from-[#F5A524] to-[#F7BC55] text-[#3A2600] shadow-[0_10px_22px_-10px_rgba(245,165,36,0.8)]",
              accent: "bg-[#F5A524]",
              border: "border-t lg:border-t-0 lg:border-s",
            },
            {
              icon: CheckCircle2,
              title: t.trustBadges.safe,
              desc: t.trustBadges.safeDesc,
              tile: "bg-gradient-to-br from-[#0B4A3E] to-[#1FA971] text-white shadow-[0_10px_22px_-10px_rgba(15,92,77,0.8)]",
              accent: "bg-gradient-to-r from-[#0F5C4D] to-[#1FA971]",
              border: "border-t sm:border-s lg:border-t-0",
            },
          ].map(({ icon: Icon, title, desc, tile, accent, border }) => (
            <li
              key={title}
              className={`relative border-[#E6EEEA] p-6 sm:p-7 dark:border-[#24382E] ${border}`}
            >
              <span aria-hidden="true" className={`absolute top-0 h-[3px] w-10 rounded-b-full start-6 sm:start-7 ${accent}`} />
              <div className="flex items-start gap-4 lg:flex-col lg:gap-0">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tile}`}>
                  <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                </span>
                <div className="lg:mt-5">
                  <h3 className="font-heading text-base font-bold text-[#0B2E27] dark:text-[#F2F7F4]">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4A625C] dark:text-[#B8C9C0]">{desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
              Local Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
              {t.categories.title}
            </h2>
            <p className="text-sm text-[#3E4F47] dark:text-[#B8C9C0] mt-1">
              {t.categories.subtitle}
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] hover:underline"
          >
            <span>{t.categories.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/services?cat=${cat.id}`}
                className="group p-5 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] hover:border-emerald-500 hover:shadow-cardHover transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] group-hover:bg-[#0A5C2E] group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]">
                      {cat.ustads} {t.categories.providersCount}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4] group-hover:text-[#0A5C2E] dark:group-hover:text-[#1EB55E] transition-colors">
                      {cat.name}
                    </h3>
                    <div className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] font-urdu">
                      {cat.nameUrdu}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {cat.tasks.map((task, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F0F5F2] dark:bg-[#182C22] text-[#3E4F47] dark:text-[#B8C9C0]"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D8E4DC] dark:border-[#24382E] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#3E4F47] dark:text-[#B8C9C0]">
                      {t.categories.startsFrom}{" "}
                    </span>
                    <strong className="text-[#151515] dark:text-[#F2F7F4]">
                      PKR {cat.price}
                    </strong>
                  </div>
                  <span className="font-bold text-[#0A5C2E] dark:text-[#1EB55E] group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5-Step How The AI Works Section */}
      <section className="bg-emerald-50/60 dark:bg-[#13281E]/60 py-16 border-y border-[#D8E4DC] dark:border-[#24382E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
              Transparency First
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
              {t.howItWorks.title}
            </h2>
            <p className="text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: "01",
                title: t.howItWorks.step1Title,
                desc: t.howItWorks.step1Desc,
              },
              {
                step: "02",
                title: t.howItWorks.step2Title,
                desc: t.howItWorks.step2Desc,
              },
              {
                step: "03",
                title: t.howItWorks.step3Title,
                desc: t.howItWorks.step3Desc,
              },
              {
                step: "04",
                title: t.howItWorks.step4Title,
                desc: t.howItWorks.step4Desc,
              },
              {
                step: "05",
                title: t.howItWorks.step5Title,
                desc: t.howItWorks.step5Desc,
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-3 relative flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-heading font-black text-2xl text-[#0A5C2E] dark:text-[#1EB55E]">
                    {s.step}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Verified Providers in Swat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
              CNIC &amp; VTI Verified
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
              Featured Local Professionals
            </h2>
            <p className="text-sm text-[#3E4F47] dark:text-[#B8C9C0] mt-1">
              Top rated artisans and technicians operating in Swat Valley (Demo Data Preview)
            </p>
          </div>

          <Link
            href="/services"
            className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] hover:underline"
          >
            View all 30+ verified ustads &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProviders.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card hover:shadow-cardHover transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
                        {p.name}
                      </h3>
                      {p.verified && (
                        <span title="NADRA CNIC & Trade Verified">
                          <BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#3E4F47] dark:text-[#B8C9C0] mt-0.5">
                      {p.business}
                    </p>
                  </div>

                  {p.promoted && (
                    <span className="px-2 py-0.5 rounded-full bg-[#F5A524] text-[#151515] text-[10px] font-black tracking-wider uppercase">
                      Promoted
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 font-extrabold text-amber-700 dark:text-amber-400">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {p.rating}
                  </span>
                  <span className="text-[#3E4F47] dark:text-[#B8C9C0]">
                    ({p.reviews} verified reviews)
                  </span>
                  <span>•</span>
                  <span className="text-[#3E4F47] dark:text-[#B8C9C0]">{p.exp}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
                  <MapPin className="w-3.5 h-3.5 text-[#0A5C2E] dark:text-[#1EB55E]" />
                  <span>Serving: {p.area}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {p.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#D8E4DC] dark:border-[#24382E] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">Rate: </span>
                  <strong className="text-sm font-extrabold text-[#151515] dark:text-[#F2F7F4]">
                    PKR {p.hourly}/hr
                  </strong>
                </div>

                <Link
                  href={`/providers/${p.id}`}
                  className="px-4 py-2 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Provider Recruitment CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0A5C2E] to-[#064A25] text-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold">
              Join the Swat Verified Guild
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl leading-snug">
              {t.cta.providerTitle}
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              {t.cta.providerSubtitle}
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{t.cta.guaranteeText}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/become-provider"
              className="px-6 py-3.5 rounded-2xl bg-[#F5A524] hover:bg-[#E0931B] text-[#151515] font-extrabold text-sm shadow-md transition-all text-center"
            >
              {t.cta.providerBtn}
            </Link>
            <Link
              href="/how-it-works"
              className="px-6 py-3.5 rounded-2xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition-all text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
            Everything you need to know about booking, AI diagnosis, and provider verification in Swat.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4] flex items-center justify-between gap-4 focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#3E4F47] dark:text-[#B8C9C0] transition-transform ${
                    openFaq === idx ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#3E4F47] dark:text-[#B8C9C0] leading-relaxed border-t border-[#D8E4DC]/60 dark:border-[#24382E]/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
