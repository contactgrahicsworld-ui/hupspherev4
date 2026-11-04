import { NextRequest, NextResponse } from "next/server";
import { db, LeadRecord } from "@/lib/mock-db";
import { enforceTenantIsolation } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id") || req.nextUrl.searchParams.get("tenantId") || "tenant-ved-01";
  const leads = db.leads.filter(l => l.tenantId === tenantId);

  return NextResponse.json({
    success: true,
    tenantId,
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

    // Server-side tenant isolation check
    if (body.tenantId && !enforceTenantIsolation(tenantId, body.tenantId)) {
      return NextResponse.json({ success: false, error: "Cross-tenant access violation." }, { status: 403 });
    }

    // Lead scoring algorithm
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

    return NextResponse.json({
      success: true,
      message: "Lead captured and scored successfully.",
      lead: newLead,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
