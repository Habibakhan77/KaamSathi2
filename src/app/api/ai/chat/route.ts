import { NextRequest, NextResponse } from "next/server";
import { generateSupportReply, supportChatInputSchema } from "@/lib/ai/support-chat";

// Simple in-memory rate limiter per IP (max 30 messages per minute), same policy as /api/ai/parse
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (entry.count >= 30) return false;
  entry.count++;
  return true;
}

const sanitize = (s: string) => s.replace(/<[^>]*>?/gm, "").replace(/[$`\\]/g, "").trim();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local-client";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "You're sending messages too quickly. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const validation = supportChatInputSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid chat message." }, { status: 400 });
    }

    const input = validation.data;
    const messages = input.messages
      .map((m) => ({ ...m, content: sanitize(m.content) }))
      .filter((m) => m.content.length > 0);
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return NextResponse.json({ error: "Please type a message." }, { status: 400 });
    }

    const result = await generateSupportReply({ ...input, messages });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Support chat error:", error);
    return NextResponse.json(
      { error: "The assistant couldn't respond right now. Please try again." },
      { status: 500 }
    );
  }
}
