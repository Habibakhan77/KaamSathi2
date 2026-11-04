import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const area = searchParams.get("area");

    if (id) {
      const provider = await db.getProviderById(id);
      if (!provider) {
        return NextResponse.json({ error: "Provider not found" }, { status: 404 });
      }
      return NextResponse.json(provider);
    }

    let providers = await db.getProviderProfiles();

    if (category) {
      providers = providers.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (area) {
      providers = providers.filter((p) =>
        p.serviceAreas.some((a) => a.toLowerCase() === area.toLowerCase())
      );
    }

    return NextResponse.json(providers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "submit_verification") {
      const { providerProfileId, providerName, cnicNumber, cnicFrontUrl, cnicBackUrl, skillProofUrl } = body;
      const verifReq = await db.createVerificationRequest({
        providerProfileId,
        providerName,
        cnicNumber,
        cnicFrontUrl: cnicFrontUrl || "/mock-docs/cnic-front.jpg",
        cnicBackUrl: cnicBackUrl || "/mock-docs/cnic-back.jpg",
        skillProofUrl: skillProofUrl || "/mock-docs/certificate.pdf",
      });
      return NextResponse.json(verifReq, { status: 201 });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, requestId, status, adminNotes, providerProfileId, subscriptionTier } = body;

    if (action === "review_verification") {
      const updated = await db.updateVerificationStatus(requestId, status, adminNotes);
      return NextResponse.json(updated);
    }

    if (action === "update_subscription") {
      const updated = await db.updateProviderSubscription(providerProfileId, subscriptionTier);
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: "Invalid patch action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
