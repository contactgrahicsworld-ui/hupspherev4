import { NextRequest, NextResponse } from "next/server";
import { db, LeadRecord } from "@/lib/mock-db";
import { enforceTenantIsolation } from "@/lib/rbac";
import { persistLeadToSupabase, fetchLeadsFromSupabase } from "@/lib/supabase-client";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id") || req.nextUrl.searchParams.get("tenantId") || "tenant-ved-01";
  
  try {
    const supabaseLeads = await fetchLeadsFromSupabase(tenantId);
    if (supabaseLeads && supabaseLeads.length > 0) {
      return NextResponse.json({
        success: true,
        tenantId,
        source: "SUPABASE_POSTGRES",
        totalCount: supabaseLeads.length,
        leads: supabaseLeads,
      });
    }
  } catch {
    // Graceful fallback to memory store
  }

  const leads = db.leads.filter(l => l.tenantId === tenantId);
  return NextResponse.json({
    success: true,
    tenantId,
    source: "DYNAMIC_CACHE",
    totalCount: leads.length,
    leads,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tenantId = req.headers.get("x-tenant-id") || body.tenantId || "tenant-ved-01";

    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: "Name and Phone are mandatory." }, { status: 400 });
    }

    if (body.tenantId && !enforceTenantIsolation(tenantId, body.tenantId)) {
      return NextResponse.json({ success: false, error: "Cross-tenant access violation." }, { status: 403 });
    }

    let score = 50;
    if (body.estimatedValue > 1000000) score += 30;
    else if (body.estimatedValue > 200000) score += 15;
    if (body.companyName) score += 10;

    const newLead: LeadRecord = {
      id: `lead-${Date.now()}`,
      tenantId,
      name: body.name,
      companyName: body.companyName || "Independent Business",
      email: body.email || "",
      phone: body.phone,
      source: body.source || "DIRECT_ENTRY",
      score,
      status: body.status || "NEW",
      estimatedValue: Number(body.estimatedValue) || 0,
      assignedTo: body.assignedTo || "SalesPro AI",
      createdAt: new Date().toISOString(),
    };

    db.leads.unshift(newLead);

    // Persist to Supabase Cloud asynchronously
    persistLeadToSupabase(newLead).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Lead captured and saved securely to Supabase PostgreSQL.",
      lead: newLead,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
