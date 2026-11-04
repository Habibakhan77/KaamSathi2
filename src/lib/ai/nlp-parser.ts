import { z } from "zod";
import { AIParsedIntent } from "../types";

export const aiParseInputSchema = z.object({
  query: z.string().min(2, "Search query is too short").max(1000, "Query is too long"),
  language: z.enum(["en", "ur", "ps", "roman_ur"]).optional().default("en"),
});

export const aiParseResponseSchema = z.object({
  category: z.string(),
  location: z.string(),
  urgency: z.enum(["low", "medium", "high", "emergency"]),
  detectedSymptoms: z.array(z.string()),
  recommendedQuestions: z.array(z.string()),
  missingDetails: z.array(z.string()),
  confidenceScore: z.number().min(0).max(1),
  rawText: z.string(),
  detectedLanguage: z.string(),
});

export type AIParseResponse = z.infer<typeof aiParseResponseSchema>;

// Keyword dictionaries for fallback rule engine
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "ac-technician": [
    "ac", "air conditioner", "inverter", "cooling", "thand", "gas", "chilling", "compressor", "leakage",
    "outdoor unit", "indoor", "trip", "r410", "r32",
    "اے سی", "ٹھنڈک", "کولنگ", "گیس", "کمپریسر", "انورٹر", "ټرپ",
    "د اے سي", "یخوالی", "ګیس"
  ],
  "electrician": [
    "electric", "bijli", "wiring", "short circuit", "breaker", "switch", "socket", "light", "fan", "pankha",
    "ups", "spark", "smell", "fuse", "3 phase", "voltage",
    "بجلی", "وائرنگ", "شارٹ سرکٹ", "بریکر", "سوئچ", "پنکھا", "تاریں", "جھٹکا",
    "برېښنا", "تارونه", "سویچ", "شارټ"
  ],
  "plumber": [
    "plumber", "pipe", "paani", "leak", "tap", "mixer", "tanki", "drain", "toilet", "washroom", "flush",
    "commode", "geyser", "water motor", "pump",
    "پلمبر", "پانی", "پائپ", "لیکج", "نل", "ٹوٹی", "گیزر", "ٹینک", "موٹر",
    "نل ساز", "اوبه", "لیکیدل", "ټانکي"
  ],
  "carpenter": [
    "carpenter", "wood", "lakri", "door", "darwaza", "lock", "taala", "kundi", "cupboard", "almari",
    "kitchen", "cabinet", "polish", "furniture", "sofa",
    "کارپینٹر", "بڑھئی", "لکڑی", "دروازہ", "تالا", "الماری", "فرنیچر", "پالش",
    "ترکاڼ", "لرګی", "دروازه", "قلف"
  ],
  "solar": [
    "solar", "plate", "panel", "hybrid inverter", "battery", "net metering", "solar angle", "watt",
    "سولر", "پلیٹ", "انورٹر", "بیٹری", "نیٹ میٹرنگ",
    "لمریز", "سولر پلیټ", "بیټرۍ"
  ],
  "painter": [
    "paint", "color", "rang", "seelan", "putty", "distemper", "weather sheet", "emulsion", "wall",
    "پینٹ", "رنگ", "سیلن", "پٹین", "دیواریں",
    "رنګمال", "رنګ", "دیوالونه"
  ],
  "cleaning": [
    "clean", "cleaning", "safai", "tank wash", "sofa wash", "carpet", "deep clean",
    "صفائی", "دھلائی", "ٹینکی کی صفائی", "قالین",
    "صفائي", "مینځل", "ټانکي صفائي"
  ],
  "appliance": [
    "fridge", "refrigerator", "washing machine", "microwave", "oven", "dispenser",
    "فریج", "واشنگ مشین", "مائیکرو ویو", "اوون", "ڈسپنسر",
    "یخچال", "د جامو مینځلو مشین"
  ],
};

const SWAT_LOCATIONS: Record<string, string[]> = {
  "Mingora": ["mingora", "mingawara", "shahdara", "nishat", "new road", "sohrab khan", "مینگورہ", "مینګوره"],
  "Saidu Sharif": ["saidu", "saidu sharif", "hospital road", "wadudia", "jahanzeb", "سیدو", "سیدو شریف"],
  "Kanju": ["kanju", "township", "airport", "kanju pull", "کانجو", "کانجو ټاون شپ"],
  "Barikot": ["barikot", "ghalegay", "bazira", "بریکوٹ", "بریکوټ"],
  "Madyan": ["madyan", "behrain", "madayan", "مدین"],
  "Fizagat": ["fizagat", "fiza gat", "bypass", "فیضاگٹ", "فضا ګټ"],
};

const URGENCY_TRIGGERS = {
  emergency: [
    "emergency", "aag", "smoke", "shola", "burning", "jaldi", "fauran", "abhee", "danger", "khatra", "blast",
    "فوری", "ہنگامی", "آگ", "دھواں", "خطرہ", "بېړنی", "اور", "خطره"
  ],
  high: [
    "urgent", "today", "aaj", "asap", "no water", "no power", "current", "trip", "heavy leak",
    "آج ہی", "جلدی", "پانی بند", "بجلی بند", "نن", "زر"
  ],
  low: [
    "weekend", "next week", "routine", "inquiry", "estimate", "soch raha", "check karna",
    "اندازہ", "اگلے ہفتے", "تپوس"
  ],
};

export async function parseServiceIntent(
  rawInput: string,
  preferredLanguage: string = "en"
): Promise<AIParseResponse> {
  const clean = rawInput.trim();
  const lower = clean.toLowerCase();

  // 1. If OpenAI API key is present in environment, invoke it with strict schema
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are KaamSaathi NLP parser for home services in Swat, Pakistan.
Parse user problem queries (written in English, Urdu, Pashto, or Roman Urdu) into JSON matching this exact structure:
{
  "category": "electrician"|"plumber"|"ac-technician"|"carpenter"|"solar"|"painter"|"cleaning"|"appliance",
  "location": "Mingora"|"Saidu Sharif"|"Kanju"|"Barikot"|"Madyan"|"Fizagat"|"Swat General",
  "urgency": "low"|"medium"|"high"|"emergency",
  "detectedSymptoms": ["short description of issues"],
  "recommendedQuestions": ["clarification question in user's language"],
  "missingDetails": ["e.g. model, floor, exact area"],
  "confidenceScore": 0.95
}`
            },
            { role: "user", content: clean }
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return {
          ...parsed,
          rawText: clean,
          detectedLanguage: preferredLanguage,
        };
      }
    } catch {
      // Fallback silently to our high-precision deterministic rule engine
    }
  }

  // 2. High-precision Deterministic Rule-Based Fallback Engine
  let matchedCategory = "electrician";
  let maxCatScore = 0;

  for (const [cat, words] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const w of words) {
      if (lower.includes(w.toLowerCase())) {
        score += w.length > 3 ? 2 : 1;
      }
    }
    if (score > maxCatScore) {
      maxCatScore = score;
      matchedCategory = cat;
    }
  }

  let matchedLocation = "Mingora"; // Default central hub of Swat
  for (const [loc, words] of Object.entries(SWAT_LOCATIONS)) {
    for (const w of words) {
      if (lower.includes(w.toLowerCase())) {
        matchedLocation = loc;
        break;
      }
    }
  }

  let urgency: "low" | "medium" | "high" | "emergency" = "medium";
  for (const w of URGENCY_TRIGGERS.emergency) {
    if (lower.includes(w.toLowerCase())) {
      urgency = "emergency";
      break;
    }
  }
  if (urgency === "medium") {
    for (const w of URGENCY_TRIGGERS.high) {
      if (lower.includes(w.toLowerCase())) {
        urgency = "high";
        break;
      }
    }
  }

  // Extract symptoms and missing details
  const symptoms: string[] = [];
  const missing: string[] = [];
  const questions: string[] = [];

  if (matchedCategory === "ac-technician") {
    if (lower.includes("cool") || lower.includes("thand") || lower.includes("ٹھنڈ")) {
      symptoms.push("Insufficient cooling / compressor performance issue");
    }
    if (lower.includes("gas") || lower.includes("leak") || lower.includes("ګیس")) {
      symptoms.push("Refrigerant gas pressure suspected low or leaking");
    }
    missing.push("AC Brand & Tonnage (e.g., Haier / Dawlance 1.5 Ton)");
    questions.push("Kya indoor unit display par koi error code (jaise E7, F3) show ho raha hai?");
  } else if (matchedCategory === "electrician") {
    if (lower.includes("trip") || lower.includes("breaker") || lower.includes("شارٹ")) {
      symptoms.push("Circuit breaker tripping under domestic load");
    }
    if (lower.includes("smell") || lower.includes("spark") || lower.includes("دھواں")) {
      symptoms.push("Electrical burning odor or dangerous spark reported");
    }
    missing.push("Single phase or 3-phase domestic connection");
    questions.push("Kya main switch ya geyser breaker ko foran band kar diya gaya hai?");
  } else if (matchedCategory === "plumber") {
    symptoms.push("Sanitary / water pipe plumbing inspection needed");
    missing.push("Concealed wall leak or external tap/fitting issue");
    questions.push("Kya motor/tanki ka main water supply valve band hai?");
  } else {
    symptoms.push("General maintenance inspection required");
    missing.push("Exact household address or landmark");
    questions.push("Kaam kis waqt karwana munasib rahega?");
  }

  const confidence = maxCatScore > 0 ? 0.92 : 0.70;

  return {
    category: matchedCategory,
    location: matchedLocation,
    urgency,
    detectedSymptoms: symptoms,
    recommendedQuestions: questions,
    missingDetails: missing,
    confidenceScore: confidence,
    rawText: clean,
    detectedLanguage: preferredLanguage,
  };
}
