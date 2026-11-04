import { NextRequest, NextResponse } from "next/server";
import { registerBrandNewAdmin } from "@/lib/supabase-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role = "SUPER_ADMIN", name, email, password, organizationName, tenantSlug, plan = "ENTERPRISE" } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, Email, and Password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const result = await registerBrandNewAdmin({
      role,
      name,
      email,
      password,
      organizationName: organizationName || `${name}'s Enterprise`,
      tenantSlug: tenantSlug || (organizationName || name).toLowerCase().replace(/[^a-z0-9]/g, "-"),
      plan,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
