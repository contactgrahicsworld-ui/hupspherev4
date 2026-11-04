import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mock-db";
import { processSimCallEvent } from "@/lib/sim-telecalling";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id") || "tenant-ved-01";
  const calls = db.simCalls.filter(c => c.tenantId === tenantId);

  return NextResponse.json({
    success: true,
    tenantId,
    totalCalls: calls.length,
    calls,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tenantId = req.headers.get("x-tenant-id") || body.tenantId || "tenant-ved-01";

    if (!body.phoneNumber || !body.direction) {
      return NextResponse.json({ success: false, error: "Phone number and direction are required." }, { status: 400 });
    }

    const result = await processSimCallEvent({
      tenantId,
      deviceId: body.deviceId || "dev-android-telecom",
      phoneNumber: body.phoneNumber,
      direction: body.direction,
      simSlot: body.simSlot || 1,
      durationSeconds: Number(body.durationSeconds) || 0,
      disposition: body.disposition || "INTERESTED",
      notes: body.notes || "Captured via Android TelecomManager Companion App",
      callTimestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Physical SIM call logged and linked to CRM successfully.",
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
