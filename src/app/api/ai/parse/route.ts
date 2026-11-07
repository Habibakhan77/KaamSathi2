import { NextRequest, NextResponse } from "next/server";
import { aiParseInputSchema, parseServiceIntent } from "@/lib/ai/nlp-parser";

// Simple in-memory rate limiter per IP (max 30 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (entry.count >= 30) {
    return false;
  }
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local-client";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down and try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = aiParseInputSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid search query", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { query, language, fallbackLocation } = validation.data;
    // Sanitize string (strip script tags, excessive punctuation)
    const sanitizedQuery = query
      .replace(/<[^>]*>?/gm, "")
      .replace(/[$`\\]/g, "")
      .trim();

    const parsedResult = await parseServiceIntent(sanitizedQuery, language, fallbackLocation);

    return NextResponse.json(parsedResult, { status: 200 });
  } catch (error: any) {
    console.error("AI parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse natural language inquiry" },
      { status: 500 }
    );
  }
}
