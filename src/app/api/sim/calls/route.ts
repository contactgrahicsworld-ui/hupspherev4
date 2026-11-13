import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mock-db";
import { processSimCallEvent } from "@/lib/sim-telecalling";
import { executeSupabaseSQL } from "@/lib/supabase-client";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id") || req.nextUrl.searchParams.get("tenantId") || "tenant-primary";
  
  // 1. Fetch from local dynamic store
  const calls = db.simCalls.filter(c => c.tenantId === tenantId);

  // 2. Also try fetching from Supabase calls table if available
  try {
    const sql = `
      SELECT id, tenant_id, caller_number, recipient_number, direction, status, duration_seconds, notes, created_at 
      FROM public.calls 
      WHERE tenant_id = '${tenantId.replace(/'/g, "''")}' 
      ORDER BY created_at DESC LIMIT 50;
    `;
    const res = await executeSupabaseSQL(sql);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      const dbCalls = res.data.map((r: any) => ({
        id: r.id,
        tenantId: r.tenant_id,
        deviceId: "dev-cloud",
        phoneNumber: r.recipient_number || r.caller_number || "+91 98765 43210",
        customerName: r.notes ? r.notes.replace("Call with ", "") : "Client",
        direction: r.direction || "OUTBOUND",
        simSlot: 1,
        durationSeconds: r.duration_seconds || 45,
        disposition: r.status || "COMPLETED",
        syncedAt: r.created_at,
      }));
      return NextResponse.json({
        success: true,
        tenantId,
        source: "SUPABASE_POSTGRES",
        totalCalls: dbCalls.length,
        calls: dbCalls,
      });
    }
  } catch {
    // Graceful fallback to memory store
  }

  return NextResponse.json({
    success: true,
    tenantId,
    source: "DYNAMIC_STORE",
    totalCalls: calls.length,
    calls,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tenantId = req.headers.get("x-tenant-id") || body.tenantId || "tenant-primary";

    if (!body.phoneNumber || !body.direction) {
      return NextResponse.json({ success: false, error: "Phone number and direction are required." }, { status: 400 });
    }

    const result = await processSimCallEvent({
      tenantId,
      deviceId: body.deviceId || "dev-android-telecom",
      phoneNumber: body.phoneNumber,
      direction: body.direction,
      simSlot: (Number(body.simSlot) === 2 ? 2 : 1) as 1 | 2,
      durationSeconds: Number(body.durationSeconds) || 0,
      disposition: body.disposition || "INTERESTED",
      notes: body.notes || "Captured via Physical SIM Calling Engine",
      callTimestamp: new Date().toISOString(),
    });

    // Asynchronously persist to Supabase calls table
    try {
      const callSql = `
        INSERT INTO public.calls (
          id, tenant_id, caller_number, recipient_number, direction, status, duration_seconds, notes, created_at, updated_at
        ) VALUES (
          '${result.callId}',
          '${tenantId.replace(/'/g, "''")}',
          '${body.simSlot === 2 ? "+91-SIM2" : "+91-SIM1"}',
          '${body.phoneNumber.replace(/'/g, "''")}',
          '${body.direction}',
          '${body.disposition || "COMPLETED"}',
          ${Number(body.durationSeconds) || 0},
          '${(body.notes || "Physical SIM Call").replace(/'/g, "''")}',
          NOW(),
          NOW()
        );
      `;
      executeSupabaseSQL(callSql).catch(() => {});
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      message: "Physical SIM call logged and synchronized with CRM lead.",
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
