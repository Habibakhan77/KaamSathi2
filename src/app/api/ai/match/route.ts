import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { rankProviders } from "@/lib/ai/matcher";

const matchInputSchema = z.object({
  category: z.string().min(1),
  location: z.string().default("Mingora"),
  urgency: z.enum(["low", "medium", "high", "emergency"]).default("medium"),
  keywords: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = matchInputSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid match parameters", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { category, location, urgency, keywords } = validation.data;

    // Get all providers
    const allProviders = await db.getProviderProfiles();

    // Rank matching providers
    const rankedMatches = rankProviders(allProviders, {
      category,
      location,
      urgency,
      keywords,
    });

    return NextResponse.json(
      {
        totalFound: rankedMatches.length,
        category,
        location,
        urgency,
        matches: rankedMatches,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("AI match error:", error);
    return NextResponse.json(
      { error: "Failed to rank providers" },
      { status: 500 }
    );
  }
}
