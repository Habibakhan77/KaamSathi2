import { ProviderProfile } from "../types";

export interface ProviderMatchResult {
  provider: ProviderProfile;
  matchScore: number; // 0 to 100
  matchReasons: string[];
  distanceTier: "exact_area" | "neighboring_area" | "swat_wide";
  urgencyFit: boolean;
}

export interface MatchFilterParams {
  category: string;
  location: string;
  urgency?: "low" | "medium" | "high" | "emergency";
  keywords?: string[];
  maxHourlyRate?: number;
}

export function rankProviders(
  providers: ProviderProfile[],
  params: MatchFilterParams
): ProviderMatchResult[] {
  const { category, location, urgency = "medium", keywords = [] } = params;

  // Filter out completely incompatible categories first
  const candidates = providers.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  const scored: ProviderMatchResult[] = candidates.map((p) => {
    let score = 50; // base score
    const reasons: string[] = [];
    let distanceTier: "exact_area" | "neighboring_area" | "swat_wide" = "swat_wide";

    // 1. Verification status (Crucial trust requirement)
    if (p.verificationStatus === "approved") {
      score += 20;
      reasons.push("CNIC & VTI Verified Professional");
    } else {
      score -= 30; // Unverified providers penalized heavily
    }

    // 2. Area proximity
    const servesArea = p.serviceAreas.some(
      (a) => a.toLowerCase() === location.toLowerCase()
    );
    if (servesArea) {
      score += 15;
      distanceTier = "exact_area";
      reasons.push(`Direct coverage in ${location}`);
    } else {
      distanceTier = "neighboring_area";
      score += 5;
    }

    // 3. Rating & Completed Jobs
    if (p.rating >= 4.8) {
      score += 10;
      reasons.push(`Top-rated (${p.rating} ★ from ${p.reviewCount} jobs)`);
    } else if (p.rating >= 4.5) {
      score += 5;
      reasons.push(`Highly rated (${p.rating} ★)`);
    }

    // 4. Availability
    if (p.isAvailable) {
      score += 5;
      if (urgency === "emergency" || urgency === "high") {
        reasons.push("Available for immediate dispatch in Swat");
      }
    } else {
      score -= 20;
    }

    // 5. Subscription Tier / Promoted
    if (p.subscriptionTier === "elite") {
      score += 5;
      reasons.push("Swat Guild Elite Partner");
    } else if (p.subscriptionTier === "pro") {
      score += 3;
      reasons.push("Verified Pro Partner");
    }

    // 6. Skill overlap with user query keywords
    let skillMatches = 0;
    keywords.forEach((kw) => {
      const kwLower = kw.toLowerCase();
      if (p.skills.some((s) => s.toLowerCase().includes(kwLower))) {
        skillMatches++;
      }
    });
    if (skillMatches > 0) {
      score += Math.min(skillMatches * 4, 12);
      reasons.push(`Direct skill match for reported problem`);
    }

    // Clamp score between 0 and 99 (100 is reserved for flawless algorithmic certainty)
    const finalScore = Math.min(Math.max(score, 10), 98);

    return {
      provider: p,
      matchScore: finalScore,
      matchReasons: reasons,
      distanceTier,
      urgencyFit: p.isAvailable,
    };
  });

  // Sort descending by matchScore
  return scored.sort((a, b) => b.matchScore - a.matchScore);
}

// AI Fraud Detection Engine
export interface FraudCheckParams {
  cnic: string;
  proposedPrice?: number;
  categoryBenchmarkPrice?: number;
  existingCnics: string[];
  providerId: string;
}

export interface FraudCheckReport {
  isSuspicious: boolean;
  flags: {
    severity: "low" | "medium" | "high";
    flagType: string;
    description: string;
  }[];
}

export function detectFraudPatterns(params: FraudCheckParams): FraudCheckReport {
  const flags: FraudCheckReport["flags"] = [];

  // 1. Duplicate CNIC check
  const duplicate = params.existingCnics.filter(
    (c) => c.replace(/-/g, "") === params.cnic.replace(/-/g, "")
  );
  if (duplicate.length > 1) {
    flags.push({
      severity: "high",
      flagType: "duplicate_cnic",
      description: `Duplicate CNIC ${params.cnic} is already registered under another account.`,
    });
  }

  // 2. Price deviation anomaly
  if (
    params.proposedPrice &&
    params.categoryBenchmarkPrice &&
    params.proposedPrice > params.categoryBenchmarkPrice * 3
  ) {
    flags.push({
      severity: "low",
      flagType: "abnormal_pricing_deviation",
      description: `Proposed price PKR ${params.proposedPrice} deviates by >300% from Swat area median (PKR ${params.categoryBenchmarkPrice}).`,
    });
  }

  return {
    isSuspicious: flags.length > 0,
    flags,
  };
}
