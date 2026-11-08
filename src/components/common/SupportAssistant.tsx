"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Headset, Minus, RotateCcw, Send, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useLocation } from "@/lib/location/LocationContext";

/**
 * Floating KaamSaathi Support Assistant: a headset launcher (bottom-right) that opens a live chat.
 * Messages go to /api/ai/chat (support-chat engine: NLP parser + provider matcher over real data,
 * or the configured LLM). Sits in the opposite corner from FloatingWhatsApp.
 */

interface ChatAction {
  label: string;
  href: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
  error?: boolean;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hello! 👋 How can I help you today?",
};

const STARTER_SUGGESTIONS = [
  "Find a plumber in Mingora",
  "How do I book a service?",
  "How do prices and quotations work?",
  "How can I register as a provider?",
  "Which areas in Swat do you serve?",
];

let idCounter = 0;
const newId = () => `m${Date.now()}-${idCounter++}`;

export function SupportAssistant() {
  const { isRTL, language } = useLanguage();
  const { location } = useLocation();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [suggestions, setSuggestions] = useState<string[]>(STARTER_SUGGESTIONS);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const titleId = useId();

  // Minimize keeps the conversation; Close also clears it.
  const minimize = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  const closeAndReset = useCallback(() => {
    abortRef.current?.abort();
    setOpen(false);
    setLoading(false);
    setMessages([WELCOME]);
    setSuggestions(STARTER_SUGGESTIONS);
    setInput("");
    launcherRef.current?.focus();
  }, []);

  // Escape minimizes; focus the input when opened.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && minimize();
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, minimize]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  // Abort an in-flight request on unmount.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { id: newId(), role: "user", content };
    // History sent to the API: real turns only (no welcome or error bubbles).
    const history = [...messages, userMsg]
      .filter((m) => m.id !== WELCOME.id && !m.error)
      .slice(-20)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSuggestions([]);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, language, location }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.reply !== "string") {
        throw new Error(data?.error || "The assistant couldn't respond right now.");
      }
      setMessages((prev) => [
        ...prev,
        { id: newId(), role: "assistant", content: data.reply, actions: Array.isArray(data.actions) ? data.actions : [] },
      ]);
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions.slice(0, 3) : []);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "assistant",
          error: true,
          content: `${(err as Error).message || "Something went wrong."} Please check your connection and try again.`,
        },
      ]);
      // Offer a one-tap retry of the same message.
      setSuggestions([content]);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setLoading(false);
    }
  };

  // Opposite corner from the WhatsApp button.
  const side = isRTL ? "left-4 sm:left-auto sm:right-6" : "right-4 sm:right-6";
  const origin = isRTL ? "origin-bottom-left sm:origin-bottom-right" : "origin-bottom-right";
  const iconBtn =
    "p-1.5 rounded-full text-[#3E4F47] dark:text-[#B8C9C0] hover:bg-white/80 dark:hover:bg-white/10 hover:text-[#075B35] dark:hover:text-[#1EB55E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075B35]";

  return (
    <>
      {/* ── Chat window (kept mounted so it animates in/out and keeps the conversation) ── */}
      <div
        role="dialog"
        aria-labelledby={titleId}
        aria-hidden={!open}
        className={`fixed z-50 bottom-[5.25rem] ${side} ${origin} w-[calc(100vw-2rem)] max-w-[400px] h-[min(600px,calc(100vh-7rem))] flex flex-col rounded-3xl bg-white dark:bg-[#111F18] border border-[#DCE9E0] dark:border-[#24382E] shadow-elevated overflow-hidden transition-all duration-200 ease-out ${
          open ? "opacity-100 translate-y-0 scale-100 visible" : "opacity-0 translate-y-3 scale-95 invisible pointer-events-none"
        }`}
      >
        {/* Header (reference design) */}
        <div className="relative flex items-center gap-3 bg-[#EEF5F0] dark:bg-[#13281E] px-4 py-3.5 border-b border-[#DCE9E0] dark:border-[#24382E]">
          <div className="w-12 h-12 rounded-full bg-[#075B35] flex items-center justify-center flex-shrink-0">
            <Headset className="w-6 h-6 text-white" strokeWidth={2.25} aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="font-heading font-extrabold text-lg leading-tight text-[#0F2A1C] dark:text-[#F2F7F4]">
              Support Assistant
            </h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-medium text-[#1F8A50] dark:text-[#1EB55E]">
              <span className="w-2 h-2 rounded-full bg-[#1DB954] flex-shrink-0" aria-hidden="true" />
              <span>Online · Here to help</span>
            </p>
          </div>
          <div className="flex items-center gap-0.5 self-start">
            {messages.length > 1 && (
              <button type="button" onClick={() => { abortRef.current?.abort(); setLoading(false); setMessages([WELCOME]); setSuggestions(STARTER_SUGGESTIONS); }} className={iconBtn} aria-label="Start a new conversation" title="New conversation">
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button type="button" onClick={minimize} className={iconBtn} aria-label="Minimize Support Assistant" title="Minimize">
              <Minus className="w-4 h-4" />
            </button>
            <button type="button" onClick={closeAndReset} className={iconBtn} aria-label="Close Support Assistant" title="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-3.5 py-4 space-y-3 bg-[#F7FAF8] dark:bg-[#0B1410]"
          aria-live="polite"
          aria-busy={loading}
        >
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[82%] rounded-2xl rounded-br-md bg-[#075B35] text-white px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-[#075B35] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Headset className="w-3.5 h-3.5 text-white" />
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-[0_2px_8px_-2px_rgba(7,91,53,0.10)] border ${
                    m.error
                      ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-200"
                      : "bg-white dark:bg-[#111F18] border-[#E3ECE6] dark:border-[#24382E] text-[#151515] dark:text-[#F2F7F4]"
                  } ${m.id === WELCOME.id ? "text-base" : ""}`}
                >
                  {m.content}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.actions.map((a) => {
                        const external = /^https?:\/\//.test(a.href);
                        const cls =
                          "inline-flex items-center px-2.5 py-1 rounded-full bg-[#EEF5F0] dark:bg-[#13281E] text-[#075B35] dark:text-[#1EB55E] text-xs font-semibold border border-[#CFE3D6] dark:border-[#24382E] hover:bg-[#075B35] hover:text-white dark:hover:bg-[#1EB55E] dark:hover:text-[#111F18] transition-colors";
                        return external ? (
                          <a key={a.href + a.label} href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {a.label} ↗
                          </a>
                        ) : (
                          <Link key={a.href + a.label} href={a.href} onClick={minimize} className={cls}>
                            {a.label} →
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-end gap-2" role="status" aria-label="Support Assistant is typing">
              <div className="w-7 h-7 rounded-full bg-[#075B35] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Headset className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="rounded-2xl rounded-bl-md bg-white dark:bg-[#111F18] border border-[#E3ECE6] dark:border-[#24382E] px-4 py-3 flex items-center gap-1">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-2 h-2 rounded-full bg-[#075B35]/60 dark:bg-[#1EB55E]/70 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}

          {/* Suggested questions */}
          {!loading && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pl-9">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="px-3 py-1.5 rounded-full border border-[#CFE3D6] dark:border-[#24382E] bg-white dark:bg-[#111F18] text-xs font-medium text-[#075B35] dark:text-[#1EB55E] hover:bg-[#EEF5F0] dark:hover:bg-[#13281E] hover:border-[#075B35] transition-colors text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 p-3 border-t border-[#DCE9E0] dark:border-[#24382E] bg-white dark:bg-[#111F18]"
        >
          <label htmlFor={`${titleId}-input`} className="sr-only">
            Type your message
          </label>
          <input
            id={`${titleId}-input`}
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1000}
            autoComplete="off"
            placeholder="Type your message…"
            className="flex-1 min-w-0 h-11 px-4 rounded-full border border-[#DCE9E0] dark:border-[#24382E] bg-[#F7FAF8] dark:bg-[#0B1410] text-sm text-[#151515] dark:text-[#F2F7F4] placeholder:text-[#7A8C82] focus:outline-none focus:ring-2 focus:ring-[#075B35]/60 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="w-11 h-11 rounded-full bg-[#075B35] hover:bg-[#05482A] text-white flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075B35] focus-visible:ring-offset-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* ── Launcher ───────────────────────────────────────────────────── */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? minimize() : setOpen(true))}
        aria-label={open ? "Minimize Support Assistant" : "Open Support Assistant chat"}
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Support Assistant"
        className={`fixed z-50 bottom-6 ${side} w-12 h-12 rounded-full bg-[#075B35] hover:bg-[#05482A] text-white shadow-elevated flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300`}
      >
        {open ? <ChevronDown className="w-6 h-6" /> : <Headset className="w-6 h-6" strokeWidth={2.25} aria-hidden="true" />}
      </button>
    </>
  );
}

export default SupportAssistant;
