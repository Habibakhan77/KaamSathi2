import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BookingStatus } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;
    const role = searchParams.get("role") || undefined;
    const bookingId = searchParams.get("id");

    if (bookingId) {
      const single = await db.getBookingById(bookingId);
      if (!single) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }
      return NextResponse.json(single);
    }

    const bookings = await db.getBookings(userId, role);
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, quotationId, bookingData } = body;

    if (action === "accept_quote") {
      if (!quotationId) {
        return NextResponse.json({ error: "Missing quotationId" }, { status: 400 });
      }
      const newBooking = await db.acceptQuotation(quotationId, bookingData);
      return NextResponse.json(newBooking, { status: 201 });
    }

    if (action === "create_request") {
      const newReq = await db.createServiceRequest(body.request);
      return NextResponse.json(newReq, { status: 201 });
    }

    if (action === "submit_quote") {
      const newQuote = await db.createQuotation(body.quotation);
      return NextResponse.json(newQuote, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, status, note } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "bookingId and status are required" },
        { status: 400 }
      );
    }

    const updated = await db.updateBookingStatus(
      bookingId,
      status as BookingStatus,
      note
    );
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
