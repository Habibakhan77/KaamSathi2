import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, role, fullName, phone, city } = body;

    if (action === "login") {
      const profile = await db.getProfileByEmail(email);
      if (!profile) {
        return NextResponse.json(
          { error: "User not found with this email" },
          { status: 404 }
        );
      }

      let providerProfile = null;
      if (profile.role === "provider") {
        providerProfile = await db.getProviderByUserId(profile.id);
      }

      return NextResponse.json({
        success: true,
        user: profile,
        providerProfile,
      });
    }

    if (action === "register") {
      const existing = await db.getProfileByEmail(email);
      if (existing) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      const newProfile = await db.createProfile({
        email,
        role: role || "customer",
        fullName: fullName || "New Member",
        phone: phone || "0300-0000000",
        city: city || "Mingora",
        district: "Swat",
        isActive: true,
      });

      let newProviderProfile = null;
      if (role === "provider") {
        newProviderProfile = await db.createProviderProfile({
          userId: newProfile.id,
          businessName: `${fullName}'s Services`,
          cnic: "15602-0000000-0",
          category: "electrician",
          skills: ["General Technical Service"],
          experienceYears: 1,
          hourlyRate: 500,
          serviceAreas: [city || "Mingora"],
          verificationStatus: "pending",
          verifiedAt: null,
          rating: 5.0,
          reviewCount: 0,
          completedJobs: 0,
          isAvailable: true,
          isPromoted: false,
          subscriptionTier: "basic",
          bio: "New technician on KaamSaathi.",
        });
      }

      return NextResponse.json({
        success: true,
        user: newProfile,
        providerProfile: newProviderProfile,
      });
    }

    return NextResponse.json({ error: "Invalid auth action" }, { status: 400 });
  } catch (error: any) {
    console.error("Auth route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
