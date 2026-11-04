"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SupportedLanguage, translations, TranslationDictionary } from "./translations";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  isRTL: boolean;
  dir: "rtl" | "ltr";
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check local storage for language preference
    const savedLang = localStorage.getItem("kaamsaathi_lang") as SupportedLanguage;
    if (savedLang && ["en", "ur", "ps", "roman_ur"].includes(savedLang)) {
      setLanguageState(savedLang);
    }

    // Check system or saved theme preference
    const savedTheme = localStorage.getItem("kaamsaathi_theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem("kaamsaathi_lang", lang);
    const isRtlLang = lang === "ur" || lang === "ps";
    document.documentElement.dir = isRtlLang ? "rtl" : "ltr";
    document.documentElement.lang = lang === "roman_ur" ? "ur-Latn" : lang;
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("kaamsaathi_theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  const isRTL = language === "ur" || language === "ps";
  const dir = isRTL ? "rtl" : "ltr";
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRTL,
        dir,
        theme,
        toggleTheme,
      }}
    >
      <div dir={dir} className={`min-h-screen ${isRTL ? "font-urdu" : "font-sans"}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
