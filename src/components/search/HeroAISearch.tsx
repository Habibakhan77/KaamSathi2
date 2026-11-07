"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  Mic,
  MicOff,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  X,
  Wind,
  Droplets,
  Hammer,
  Sun,
  TrendingUp,
  Languages,
  CornerDownLeft,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AIParseResponse } from "@/lib/ai/nlp-parser";
import { ProviderMatchResult } from "@/lib/ai/matcher";

/** Popular Swat problems. `query` is exactly what gets sent to the AI search. */
const POPULAR_SEARCHES: { query: string; label: string; area: string; icon: LucideIcon }[] = [
  {
    query: "Mera AC theek se cool nahi kar raha, Mingora mein",
    label: "Mera AC theek se cool nahi kar raha",
    area: "Mingora",
    icon: Wind,
  },
  { query: "Main breaker tripping, Saidu Sharif", label: "Main breaker tripping", area: "Saidu Sharif", icon: Zap },
  {
    query: "Concealed pipe leakage, Kanju Township",
    label: "Concealed pipe leakage",
    area: "Kanju Township",
    icon: Droplets,
  },
  { query: "Door lock jammed, Barikot", label: "Door lock jammed", area: "Barikot", icon: Hammer },
  { query: "Solar inverter calibration Swat", label: "Solar inverter calibration", area: "Swat", icon: Sun },
];

const SUPPORTED_LANGUAGES = ["English", "اردو", "پښتو", "Roman Urdu"];

export function HeroAISearch() {
  const { t, language, isRTL } = useLanguage();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parseResult, setParseResult] = useState<AIParseResponse | null>(null);
  const [matchedProviders, setMatchedProviders] = useState<ProviderMatchResult[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
    }
  }, []);

  // Auto-dismiss the inline voice notice
  useEffect(() => {
    if (!voiceNotice) return;
    const timer = window.setTimeout(() => setVoiceNotice(null), 5000);
    return () => window.clearTimeout(timer);
  }, [voiceNotice]);

  const handleVoiceInput = () => {
    if (!speechSupported) {
      setVoiceNotice("Voice input is not supported in this browser. Please type your request.");
      inputRef.current?.focus();
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang =
      language === "ur"
        ? "ur-PK"
        : language === "ps"
        ? "ps-AF"
        : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      executeSearch(transcript);
    };

    recognition.start();
  };

  const executeSearch = async (textToSearch?: string) => {
    const q = textToSearch || query;
    if (!q.trim()) return;

    setIsLoading(true);
    try {
      // 1. NLP Parse
      const parseRes = await fetch("/api/ai/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, language }),
      });
      const parsedData: AIParseResponse = await parseRes.json();
      setParseResult(parsedData);

      // 2. Provider Match
      const matchRes = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: parsedData.category,
          location: parsedData.location,
          urgency: parsedData.urgency,
          keywords: parsedData.detectedSymptoms,
        }),
      });
      const matchData = await matchRes.json();
      setMatchedProviders(matchData.matches || []);
    } catch (err) {
      console.error("Search execution failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (presetText: string) => {
    setQuery(presetText);
    executeSearch(presetText);
  };

  const isActive = isListening || isLoading;
  const trendingLabel = t.hero.trending.replace(/[:：]\s*$/, "");

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* ── AI Search Bar ── */}
      <div className="group relative">
        {/* Brand glow ring (focus / listening / searching) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-[3px] rounded-[27px] bg-gradient-to-r from-[#0F5C4D] via-[#1FA971] to-[#F5A524] transition-opacity duration-300 group-focus-within:opacity-100 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-3 rounded-[32px] bg-gradient-to-r from-[#1FA971]/25 via-[#1FA971]/10 to-[#F5A524]/25 blur-xl transition-opacity duration-300 group-focus-within:opacity-100 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative flex flex-col gap-2 rounded-3xl border border-[#D5E3DD] bg-white p-2 shadow-[0_20px_45px_-24px_rgba(15,92,77,0.45)] transition-colors group-focus-within:border-transparent sm:flex-row sm:items-center dark:border-[#26413A] dark:bg-[#0F1F1A]">
          {/* Input area */}
          <div className="flex min-w-0 flex-1 items-center gap-3 px-1.5 sm:px-2">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F5C4D] to-[#1FA971] text-white shadow-[0_8px_18px_-8px_rgba(15,92,77,0.8)]">
              <Sparkles className={`h-5 w-5 ${isActive ? "animate-pulse" : ""}`} aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col py-1">
              <label
                htmlFor="hero-ai-search-input"
                className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0F5C4D] dark:text-[#5FD9A3]"
              >
                {isListening ? t.hero.listening : "Ask KaamSaathi AI"}
              </label>
              <input
                ref={inputRef}
                id="hero-ai-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && executeSearch()}
                placeholder={t.hero.searchPlaceholder}
                className="w-full truncate border-none bg-transparent py-0.5 text-[15px] font-medium text-[#0B2E27] placeholder:text-[#7B918A] focus:outline-none focus-visible:outline-none sm:text-base dark:text-[#F2F7F4] dark:placeholder:text-[#7F978F]"
                aria-label="Describe your problem or service requirement"
                autoComplete="off"
              />
            </div>
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setParseResult(null);
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                title="Clear"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#5B736C] transition-colors hover:bg-[#0F5C4D]/10 hover:text-[#0B2E27] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA971] dark:text-[#9DB3AB] dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 border-t border-[#E6EEEA] pt-2 sm:border-t-0 sm:pt-0 dark:border-[#26413A]">
            <span aria-hidden="true" className="hidden h-8 w-px bg-[#E1EBE6] sm:block dark:bg-[#26413A]" />

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              title={speechSupported ? "Speak your problem" : "Speech not supported in browser"}
              aria-label="Speak your problem"
              aria-pressed={isListening}
              className={`relative flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A524] ${
                isListening
                  ? "bg-red-500 text-white shadow-[0_8px_20px_-8px_rgba(239,68,68,0.8)]"
                  : "bg-[#EEF7F3] text-[#0F5C4D] hover:bg-[#E0F1E9] dark:bg-[#1FA971]/10 dark:text-[#5FD9A3] dark:hover:bg-[#1FA971]/20"
              }`}
            >
              {isListening && (
                <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-2xl bg-red-400/50" />
              )}
              {isListening ? (
                <MicOff className="relative h-4 w-4" aria-hidden="true" />
              ) : (
                <Mic className="relative h-4 w-4" aria-hidden="true" />
              )}
              <span className="relative hidden md:inline">{isListening ? "Listening…" : "Voice"}</span>
            </button>

            {/* AI Search CTA Button */}
            <button
              type="button"
              onClick={() => executeSearch()}
              disabled={isLoading}
              aria-busy={isLoading}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0F5C4D] to-[#13785F] px-6 text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(15,92,77,0.85)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-10px_rgba(15,92,77,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A524] focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-wait disabled:opacity-80 sm:flex-initial sm:px-7 sm:text-[15px] dark:from-[#1FA971] dark:to-[#28C083] dark:text-[#04241D]"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              ) : (
                <Search className="h-4 w-4" aria-hidden="true" />
              )}
              <span>{t.hero.searchBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Helper row: languages / status / keyboard hint ── */}
      <div className="mt-3 flex min-h-[28px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1 text-xs" aria-live="polite">
        {voiceNotice ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            {voiceNotice}
          </span>
        ) : isLoading ? (
          <span className="inline-flex items-center gap-2 font-semibold text-[#0F5C4D] dark:text-[#5FD9A3]">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1FA971] [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1FA971] [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F5A524]" />
            </span>
            Analysing your problem and matching verified ustads…
          </span>
        ) : (
          <span className="inline-flex flex-wrap items-center gap-1.5 text-[#5B736C] dark:text-[#9DB3AB]">
            <Languages className="h-3.5 w-3.5 text-[#1FA971]" aria-hidden="true" />
            <span className="font-medium">Understands</span>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <span
                key={lang}
                className="rounded-md bg-[#0F5C4D]/[0.06] px-1.5 py-0.5 font-semibold text-[#0F5C4D] dark:bg-white/5 dark:text-[#B5CBC3]"
              >
                {lang}
              </span>
            ))}
          </span>
        )}
        <span className="hidden items-center gap-1.5 text-[#7B918A] sm:inline-flex dark:text-[#7F978F]">
          Press
          <kbd className="inline-flex items-center gap-1 rounded-md border border-[#D5E3DD] bg-white px-1.5 py-0.5 font-sans text-[11px] font-semibold text-[#3A524C] shadow-[0_1px_0_#D5E3DD] dark:border-[#26413A] dark:bg-[#0F1F1A] dark:text-[#B5CBC3] dark:shadow-none">
            Enter
            <CornerDownLeft className={`h-3 w-3 ${isRTL ? "-scale-x-100" : ""}`} aria-hidden="true" />
          </kbd>
          to search
        </span>
      </div>

      {/* ── Popular searches ── */}
      <div className="mt-6 border-t border-dashed border-[#DCE7E2] pt-5 dark:border-[#26413A]">
        <div className="mb-3 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#3A524C] dark:text-[#B5CBC3]">
          <TrendingUp className="h-3.5 w-3.5 text-[#F5A524]" aria-hidden="true" />
          {trendingLabel}
        </div>
        <ul className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 pt-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] sm:[mask-image:none]">
          {POPULAR_SEARCHES.map(({ query: preset, label, area, icon: Icon }) => (
            <li key={preset} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => handlePresetClick(preset)}
                disabled={isLoading}
                title={preset}
                className="group/chip inline-flex items-center gap-2 rounded-full border border-[#DCE7E2] bg-white py-1.5 pe-3.5 ps-1.5 text-[13px] font-medium text-[#2F4A44] shadow-[0_1px_2px_rgba(15,92,77,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#1FA971]/60 hover:shadow-[0_8px_18px_-10px_rgba(15,92,77,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA971] disabled:pointer-events-none disabled:opacity-60 dark:border-[#26413A] dark:bg-[#0F1F1A] dark:text-[#D3E2DC]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF6F0] text-[#0F5C4D] transition-colors group-hover/chip:bg-[#0F5C4D] group-hover/chip:text-white dark:bg-[#1FA971]/15 dark:text-[#5FD9A3]">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="whitespace-nowrap">{label}</span>
                <span className="inline-flex items-center gap-0.5 whitespace-nowrap text-[12px] text-[#7B918A] dark:text-[#7F978F]">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {area}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Dynamic AI Diagnosis & Matched Providers Result Card */}
      {parseResult && (
        <div className="mt-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card p-6 space-y-6 animate-[ks-fade-up_0.45s_ease-out]">
          {/* Header with confidence & diagnosis badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#D8E4DC] dark:border-[#24382E] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
                  AI Intelligent Assessment
                </div>
                <h3 className="font-heading font-extrabold text-lg text-[#151515] dark:text-[#F2F7F4]">
                  Diagnosed Service:{" "}
                  <span className="capitalize">{parseResult.category.replace("-", " ")}</span>
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-[#0A5C2E] dark:text-[#1EB55E] border border-emerald-200 dark:border-emerald-800">
                <MapPin className="w-3.5 h-3.5" />
                {parseResult.location}
              </span>

              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold ${
                  parseResult.urgency === "emergency" || parseResult.urgency === "high"
                    ? "bg-[#F5A524] text-[#151515]"
                    : "bg-emerald-100 dark:bg-emerald-900/60 text-[#0A5C2E] dark:text-[#1EB55E]"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Urgency: {parseResult.urgency.toUpperCase()}
              </span>
            </div>
          </div>

          {/* AI Analysis Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-1.5">
              <div className="font-bold text-[#151515] dark:text-[#F2F7F4] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E]" />
                Detected Symptoms &amp; Faults:
              </div>
              <ul className="list-disc list-inside space-y-1 text-[#3E4F47] dark:text-[#B8C9C0] pl-1">
                {parseResult.detectedSymptoms.length > 0 ? (
                  parseResult.detectedSymptoms.map((s, idx) => <li key={idx}>{s}</li>)
                ) : (
                  <li>Inspection of technical malfunction requested</li>
                )}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-1.5">
              <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Technician Pre-Arrival Question:
              </div>
              <p className="text-[#151515] dark:text-[#F2F7F4] font-medium italic">
                &ldquo;{parseResult.recommendedQuestions[0] || "Please confirm exact floor and house landmark."}&rdquo;
              </p>
            </div>
          </div>

          {/* Matched Verified Providers in Swat */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
                Top Verified Providers Matched for this Job ({matchedProviders.length})
              </h4>
              <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0] font-medium">
                Ranked by verification, rating, and {parseResult.location} proximity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedProviders.slice(0, 4).map(({ provider, matchScore, matchReasons }) => (
                <div
                  key={provider.id}
                  className="p-4 rounded-2xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] hover:border-emerald-500 transition-all shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
                            {provider.businessName}
                          </h5>
                          {provider.verificationStatus === "approved" && (
                            <span
                              title="CNIC & Skill Verified"
                              className="text-emerald-600 dark:text-emerald-400"
                            >
                              <ShieldCheck className="w-4 h-4 inline" />
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {provider.rating} ({provider.reviewCount} reviews)
                          </span>
                          <span>•</span>
                          <span>{provider.experienceYears} yrs exp</span>
                        </div>
                      </div>

                      <div className="px-2 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] font-black text-xs">
                        {matchScore}% Match
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {matchReasons.slice(0, 2).map((r, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#D8E4DC] dark:border-[#24382E] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#3E4F47] dark:text-[#B8C9C0]">Rates: </span>
                      <strong className="text-[#151515] dark:text-[#F2F7F4]">
                        PKR {provider.hourlyRate}/hr
                      </strong>
                    </div>

                    <Link
                      href={`/providers/${provider.id}?problem=${encodeURIComponent(query)}`}
                      className="px-3 py-1.5 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <span>Book Direct</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Want multiple competitive quotations before deciding?
            </span>
            <Link
              href={`/customer/request?category=${parseResult.category}&location=${parseResult.location}&desc=${encodeURIComponent(
                query
              )}`}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F5A524] hover:bg-[#E0931B] text-[#151515] font-extrabold text-xs shadow-md transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Broadcast Request for Multiple Quotes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
