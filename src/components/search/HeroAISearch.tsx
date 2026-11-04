"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AIParseResponse } from "@/lib/ai/nlp-parser";
import { ProviderMatchResult } from "@/lib/ai/matcher";

export function HeroAISearch() {
  const { t, language, isRTL } = useLanguage();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parseResult, setParseResult] = useState<AIParseResponse | null>(null);
  const [matchedProviders, setMatchedProviders] = useState<ProviderMatchResult[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
    }
  }, []);

  const handleVoiceInput = () => {
    if (!speechSupported) {
      alert("Voice input is not supported in this browser. Please type your request.");
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Search Input Box */}
      <div className="relative group rounded-3xl p-1.5 bg-gradient-to-r from-[#0A5C2E] via-[#0E7A3E] to-[#F5A524] shadow-elevated transition-all">
        <div className="bg-white dark:bg-[#111F18] rounded-[22px] flex flex-col sm:flex-row items-center p-2 gap-2">
          <div className="flex items-center flex-1 w-full px-3 gap-2.5">
            <Sparkles className="w-5 h-5 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0 animate-pulse" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && executeSearch()}
              placeholder={t.hero.searchPlaceholder}
              className="w-full bg-transparent border-none text-[#151515] dark:text-[#F2F7F4] placeholder-[#3E4F47]/70 dark:placeholder-[#B8C9C0]/70 text-sm md:text-base font-medium focus:outline-none py-2"
              aria-label="Describe your problem or service requirement"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setParseResult(null);
                }}
                className="text-xs font-bold text-[#3E4F47] hover:text-[#151515] dark:text-[#B8C9C0] dark:hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end px-2 sm:px-0">
            {/* Voice Input Button */}
            <button
              onClick={handleVoiceInput}
              title={speechSupported ? "Speak your problem" : "Speech not supported in browser"}
              className={`p-3 rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                isListening
                  ? "bg-red-500 text-white animate-bounce border-red-600"
                  : "bg-emerald-50 dark:bg-emerald-950/50 border-[#D8E4DC] dark:border-[#24382E] text-[#0A5C2E] dark:text-[#1EB55E] hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
              }`}
              aria-label="Speak your problem"
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Listening...</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E]" />
                  <span className="hidden md:inline">Voice</span>
                </>
              )}
            </button>

            {/* AI Search CTA Button */}
            <button
              onClick={() => executeSearch()}
              disabled={isLoading}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>{t.hero.searchBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Swat Problem Prompts */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="font-bold text-[#151515] dark:text-[#F2F7F4] flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-[#F5A524]" />
          {t.hero.trending}
        </span>
        {[
          "Mera AC theek se cool nahi kar raha, Mingora mein",
          "Main breaker tripping, Saidu Sharif",
          "Concealed pipe leakage, Kanju Township",
          "Door lock jammed, Barikot",
          "Solar inverter calibration Swat",
        ].map((item) => (
          <button
            key={item}
            onClick={() => handlePresetClick(item)}
            className="px-3 py-1 rounded-full border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#0A5C2E] dark:hover:text-[#1EB55E] hover:border-emerald-500 text-[11px] font-medium transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Dynamic AI Diagnosis & Matched Providers Result Card */}
      {parseResult && (
        <div className="mt-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card p-6 space-y-6 animate-fadeIn">
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
