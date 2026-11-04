"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  X,
  Send,
  Mic,
  Bot,
  User,
  CheckCircle2,
  AlertCircle,
  Maximize2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  category?: string;
  location?: string;
  urgency?: string;
  suggestions?: string[];
}

export function FloatingAIAssistant() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text:
        language === "ur"
          ? "السلام علیکم! میں کام ساتھی کا اے آئی اسسٹنٹ ہوں۔ آپ کو سوات میں کس قسم کے کاریگر یا کام کی ضرورت ہے؟"
          : language === "ps"
          ? "سلامونه! زه د کام ساتھی AI مرستیال یم. تاسو په سوات کې کوم قسم کار یا کاریګر ته اړتیا لرئ؟"
          : "Salam! I am your KaamSaathi AI assistant for Swat. Tell me what needs fixing (in English, Urdu, or Pashto), and I will diagnose it and find verified Ustads.",
      suggestions: [
        "AC cool nahi kar raha (Mingora)",
        "Bijli breaker bar bar trip ho raha hai",
        "Bathroom concealed pipe leakage (Kanju)",
      ],
    },
  ]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSend, language }),
      });
      const data = await res.json();

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `I have diagnosed your request as ${data.category.toUpperCase()} service in ${
          data.location
        } (Urgency: ${data.urgency.toUpperCase()}). ${
          data.recommendedQuestions[0] || "We have verified professionals ready in your area."
        }`,
        category: data.category,
        location: data.location,
        urgency: data.urgency,
        suggestions: [
          `Find ${data.category} in ${data.location}`,
          `Broadcast request for multiple quotes`,
        ],
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "I couldn't process that right now. Please try describing the problem with your location.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0A5C2E] hover:bg-[#064A25] text-white shadow-elevated transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </div>
          <span className="font-heading font-bold text-sm tracking-wide">
            AI Assistant
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-800 text-[10px] font-bold text-emerald-200">
            Swat NLP
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-elevated flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#0A5C2E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-800/80 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm leading-tight">
                  KaamSaathi AI Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Swat Local NLP Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                href="/ai-assistant"
                title="Open Fullscreen Assistant"
                className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white"
              >
                <Maximize2 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${
                  m.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-white ${
                    m.sender === "user" ? "bg-[#151515]" : "bg-[#0A5C2E]"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[78%] p-3 rounded-2xl space-y-2 ${
                    m.sender === "user"
                      ? "bg-[#0A5C2E] text-white rounded-tr-none"
                      : "bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-[#151515] dark:text-[#F2F7F4] rounded-tl-none"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                  {/* AI Metadata pill */}
                  {m.category && (
                    <div className="pt-1 flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] font-bold text-[10px]">
                        {m.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#F0F5F2] dark:bg-[#182C22] text-[#3E4F47] dark:text-[#B8C9C0] font-bold text-[10px]">
                        {m.location}
                      </span>
                    </div>
                  )}

                  {/* Suggestions */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="pt-1.5 space-y-1">
                      <div className="text-[10px] font-bold text-[#3E4F47] dark:text-[#B8C9C0]">
                        Quick Action:
                      </div>
                      <div className="flex flex-col gap-1">
                        {m.suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (s.startsWith("Find ")) {
                                window.location.href = `/services?cat=${m.category}`;
                              } else if (s.startsWith("Broadcast ")) {
                                window.location.href = `/customer/request?category=${m.category}&location=${m.location}`;
                              } else {
                                handleSend(s);
                              }
                            }}
                            className="text-left px-2.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-[#111F18] text-[#0A5C2E] dark:text-[#1EB55E] hover:bg-emerald-50 dark:hover:bg-emerald-950 text-[11px] font-semibold transition-colors flex items-center justify-between"
                          >
                            <span>{s}</span>
                            <span>&rarr;</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
                <Bot className="w-4 h-4 text-[#0A5C2E]" />
                <span className="italic animate-pulse">Diagnosing and matching in Swat...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Describe problem (e.g. leaking tap)..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white disabled:opacity-40 transition-colors"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
