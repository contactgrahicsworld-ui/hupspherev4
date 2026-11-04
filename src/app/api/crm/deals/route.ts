import { NextRequest, NextResponse } from "next/server";
import { db, DealRecord } from "@/lib/mock-db";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id") || req.nextUrl.searchParams.get("tenantId") || "tenant-ved-01";
  const deals = db.deals.filter(d => d.tenantId === tenantId);

  const pipelineSummary = {
    totalValue: deals.reduce((acc, d) => acc + d.amount, 0),
    newDeals: deals.filter(d => d.stage === "NEW").length,
    inProposal: deals.filter(d => d.stage === "PROPOSAL").length,
    inNegotiation: deals.filter(d => d.stage === "NEGOTIATION").length,
    closedWon: deals.filter(d => d.stage === "WON").length,
  };

  return NextResponse.json({
    success: true,
    tenantId,
    summary: pipelineSummary,
    deals,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tenantId = req.headers.get("x-tenant-id") || body.tenantId || "tenant-ved-01";

    if (!body.title || !body.amount) {
      return NextResponse.json({ success: false, error: "Title and Amount are required." }, { status: 400 });
    }

    const newDeal: DealRecord = {
      id: `deal-${Date.now()}`,
      tenantId,
      leadId: body.leadId || "lead-01",
      title: body.title,
      amount: Number(body.amount),
      stage: body.stage || "NEW",
      expectedClose: body.expectedClose || new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
    };

    db.deals.push(newDeal);

    return NextResponse.json({
      success: true,
      message: "Deal created in pipeline.",
      deal: newDeal,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
