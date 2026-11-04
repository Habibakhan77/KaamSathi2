"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  Star,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AIParseResponse } from "@/lib/ai/nlp-parser";
import { ProviderMatchResult } from "@/lib/ai/matcher";

export default function AIAssistantPage() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<AIParseResponse | null>(null);
  const [matches, setMatches] = useState<ProviderMatchResult[]>([]);

  const handleVoice = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Web Speech API not supported in this browser. Please type your query.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang =
      language === "ur" ? "ur-PK" : language === "ps" ? "ps-AF" : "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setQuery(text);
      runDiagnosis(text);
    };

    recognition.start();
  };

  const runDiagnosis = async (inputText?: string) => {
    const q = inputText || query;
    if (!q.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, language }),
      });
      const data: AIParseResponse = await res.json();
      setDiagnosis(data);

      // Match providers
      const matchRes = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: data.category,
          location: data.location,
          urgency: data.urgency,
          keywords: data.detectedSymptoms,
        }),
      });
      const matchData = await matchRes.json();
      setMatches(matchData.matches || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>Local Swat Natural Language Diagnostic Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          AI Service Recommendation &amp; Fault Diagnosis
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Speak or type in English, Urdu, Pashto, or Roman Urdu. Our Swat NLP model identifies
          fault severity, recommends pre-arrival precautions, and matches vetted Ustads.
        </p>
      </div>

      {/* Input Consultation Box */}
      <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 shadow-card space-y-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#151515] dark:text-[#F2F7F4]">
            Describe the problem at your residence or commercial space:
          </label>
          <div className="relative">
            <textarea
              rows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'Hamare ghar ka main 32A breaker trip ho raha hai jab geyser on karte hain, Mohallah Shahdara Mingora'..."
              className="w-full p-4 rounded-2xl border border-[#D8E4DC] dark:border-[#24382E] bg-[#F7FAF8] dark:bg-[#0B1410] text-[#151515] dark:text-[#F2F7F4] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-1.5 text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
            <span className="font-bold text-[#151515] dark:text-[#F2F7F4]">Try sample:</span>
            {[
              "AC cooling nahi kar raha (Mingora)",
              "Bathroom concealed wall leak (Kanju)",
              "Solar inverter battery backup low",
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(p);
                  runDiagnosis(p);
                }}
                className="px-2 py-0.5 rounded-md border border-[#D8E4DC] dark:border-[#24382E] hover:border-emerald-500 font-medium"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleVoice}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "border-[#D8E4DC] dark:border-[#24382E] text-[#0A5C2E] dark:text-[#1EB55E]"
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? "Listening..." : "Speak"}</span>
            </button>

            <button
              onClick={() => runDiagnosis()}
              disabled={isLoading || !query.trim()}
              className="px-6 py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-40"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>Run AI Diagnosis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Diagnosis Report & Matched Providers */}
      {diagnosis && (
        <div className="rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] p-6 sm:p-8 shadow-card space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#D8E4DC] dark:border-[#24382E] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
                  Swat NLP Diagnostic Output
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#151515] dark:text-[#F2F7F4] capitalize">
                  {diagnosis.category.replace("-", " ")} Assessment
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <MapPin className="w-3.5 h-3.5 inline mr-1" />
                {diagnosis.location}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black ${
                  diagnosis.urgency === "emergency" || diagnosis.urgency === "high"
                    ? "bg-[#F5A524] text-[#151515]"
                    : "bg-emerald-100 text-[#0A5C2E]"
                }`}
              >
                Urgency: {diagnosis.urgency.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] space-y-2">
              <h4 className="font-heading font-bold text-[#151515] dark:text-[#F2F7F4] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E]" />
                Detected Fault Signatures:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-[#3E4F47] dark:text-[#B8C9C0]">
                {diagnosis.detectedSymptoms.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
              <h4 className="font-heading font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Pre-Arrival Precautionary Advisory:
              </h4>
              <p className="text-[#151515] dark:text-[#F2F7F4] font-medium leading-relaxed italic">
                &ldquo;{diagnosis.recommendedQuestions[0] || "Confirm safety switch state before touching appliance."}&rdquo;
              </p>
            </div>
          </div>

          {/* Matched Local Ustads */}
          <div className="space-y-4 pt-2">
            <h4 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
              Top Ranked Professionals Matched for this Fault ({matches.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matches.slice(0, 4).map(({ provider, matchScore, matchReasons }) => (
                <div
                  key={provider.id}
                  className="p-5 rounded-2xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-heading font-bold text-sm text-[#151515] dark:text-[#F2F7F4]">
                          {provider.businessName}
                        </h5>
                        <div className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] flex items-center gap-1 mt-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <strong className="text-amber-700 dark:text-amber-400">
                            {provider.rating}
                          </strong>
                          <span>({provider.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] font-black text-xs">
                        {matchScore}% Match
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {matchReasons.map((r, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#D8E4DC] dark:border-[#24382E] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#3E4F47] dark:text-[#B8C9C0]">Rate: </span>
                      <strong className="text-[#151515] dark:text-[#F2F7F4]">
                        PKR {provider.hourlyRate}/hr
                      </strong>
                    </div>

                    <Link
                      href={`/providers/${provider.id}?problem=${encodeURIComponent(query)}`}
                      className="px-3 py-1.5 rounded-xl bg-[#0A5C2E] text-white font-bold text-xs"
                    >
                      Book Now &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
