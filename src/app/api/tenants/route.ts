import { NextRequest, NextResponse } from "next/server";
import { db, TenantRecord } from "@/lib/mock-db";

export async function GET() {
  return NextResponse.json({
    success: true,
    totalTenants: db.tenants.length,
    tenants: db.tenants,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: "Name and Slug are required." }, { status: 400 });
    }

    const newTenant: TenantRecord = {
      id: `tenant-${Date.now()}`,
      name: body.name,
      slug: body.slug.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      plan: body.plan || "STARTER",
      status: "ACTIVE",
      aiMonthlyLimit: body.plan === "ENTERPRISE" ? 25000 : 5000,
      aiUsageCount: 0,
      simDeviceLimit: body.plan === "ENTERPRISE" ? 10 : 2,
    };

    db.tenants.push(newTenant);

    return NextResponse.json({
      success: true,
      message: "Tenant provisioned with isolated database schema.",
      tenant: newTenant,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
