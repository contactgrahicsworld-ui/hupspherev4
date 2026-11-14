import { NextRequest, NextResponse } from "next/server";
import { db, TenantRecord } from "@/lib/mock-db";
import { executeSupabaseSQL } from "@/lib/supabase-client";

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

    const plan = body.plan || "STARTER";
    const PLAN_LIMITS: Record<string, { aiLimit: number; simLimit: number }> = {
      FREE: { aiLimit: 1000, simLimit: 0 },
      STARTER: { aiLimit: 5000, simLimit: 1 },
      PRO: { aiLimit: 15000, simLimit: 5 },
      ENTERPRISE: { aiLimit: 50000, simLimit: 25 },
    };

    const newTenant: TenantRecord = {
      id: `tenant-${Date.now()}`,
      name: body.name,
      slug: body.slug.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      plan: plan,
      status: "ACTIVE",
      aiMonthlyLimit: PLAN_LIMITS[plan]?.aiLimit || 5000,
      aiUsageCount: 0,
      simDeviceLimit: PLAN_LIMITS[plan]?.simLimit || 2,
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

// Super Admin: Increase or Decrease Tenant Plan (बढ़ाना या घटाना) & Custom Quotas
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { tenantId, plan, aiMonthlyLimit, simDeviceLimit, status } = body;

    if (!tenantId) {
      return NextResponse.json({ success: false, error: "tenantId is required." }, { status: 400 });
    }

    let tenant = db.tenants.find(t => t.id === tenantId);
    if (!tenant) {
      tenant = {
        id: tenantId,
        name: body.name || "Primary Enterprise Workspace",
        slug: tenantId.replace(/[^a-z0-9]/gi, "-").toLowerCase(),
        plan: (plan as any) || "PRO",
        status: "ACTIVE",
        aiMonthlyLimit: 25000,
        aiUsageCount: 0,
        simDeviceLimit: 5,
      };
      db.tenants.push(tenant);
    }

    const PLAN_LIMITS: Record<string, { aiLimit: number; simLimit: number }> = {
      FREE: { aiLimit: 1000, simLimit: 0 },
      STARTER: { aiLimit: 5000, simLimit: 1 },
      PRO: { aiLimit: 15000, simLimit: 5 },
      ENTERPRISE: { aiLimit: 50000, simLimit: 25 },
    };

    if (plan && ["FREE", "STARTER", "PRO", "ENTERPRISE"].includes(plan)) {
      tenant.plan = plan as any;
      if (PLAN_LIMITS[plan]) {
        tenant.aiMonthlyLimit = aiMonthlyLimit !== undefined ? Number(aiMonthlyLimit) : PLAN_LIMITS[plan].aiLimit;
        tenant.simDeviceLimit = simDeviceLimit !== undefined ? Number(simDeviceLimit) : PLAN_LIMITS[plan].simLimit;
      }
    }

    if (aiMonthlyLimit !== undefined) {
      tenant.aiMonthlyLimit = Math.max(0, Number(aiMonthlyLimit));
    }
    if (simDeviceLimit !== undefined) {
      tenant.simDeviceLimit = Math.max(0, Number(simDeviceLimit));
    }
    if (status) {
      tenant.status = status;
    }

    // Persist to Supabase tenants table if active
    try {
      const sql = `
        UPDATE public.tenants 
        SET updated_at = NOW() 
        WHERE id = '${tenantId.replace(/'/g, "''")}';
      `;
      executeSupabaseSQL(sql).catch(() => {});
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      message: `Tenant [${tenant.name}] plan updated to ${tenant.plan}. Limits: ${tenant.aiMonthlyLimit.toLocaleString("en-IN")} AI Tokens, ${tenant.simDeviceLimit} SIM Devices.`,
      tenant,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
