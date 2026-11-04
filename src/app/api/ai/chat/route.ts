import { NextRequest, NextResponse } from "next/server";
import { executeAiAgent, AgentName } from "@/lib/ai-orchestrator";
import { EnterpriseRole } from "@/lib/rbac";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tenantId = req.headers.get("x-tenant-id") || body.tenantId || "tenant-ved-01";
    const userRole = (body.userRole || "SUPER_ADMIN") as EnterpriseRole;
    const agent = (body.agent || "NOVA") as AgentName;
    const prompt = body.prompt || "Run executive telemetry audit";

    const response = await executeAiAgent({
      agent,
      tenantId,
      userRole,
      prompt,
    });

    if (!response.success) {
      return NextResponse.json(response, { status: response.error === "RBAC_PERMISSION_DENIED" ? 403 : 400 });
    }

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
