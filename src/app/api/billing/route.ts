import { NextRequest, NextResponse } from "next/server";

const SAAS_PLANS = [
  {
    id: "FREE",
    name: "Free Community",
    priceMonthly: 0,
    maxUsers: 3,
    maxLeads: 500,
    simEnabled: false,
    aiAgents: "Limited NOVA",
  },
  {
    id: "STARTER",
    name: "Starter Business",
    priceMonthly: 2999,
    maxUsers: 10,
    maxLeads: 5000,
    simEnabled: true,
    simDevices: 1,
    aiAgents: "NOVA + SALESPRO",
  },
  {
    id: "PRO",
    name: "Growth Pro",
    priceMonthly: 7999,
    maxUsers: 30,
    maxLeads: 25000,
    simEnabled: true,
    simDevices: 5,
    aiAgents: "All 5 Agents + Ledger",
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise Dedicated",
    priceMonthly: 19999,
    maxUsers: 9999,
    maxLeads: 1000000,
    simEnabled: true,
    simDevices: 25,
    aiAgents: "All 5 Agents + Vox Hindi Voice + Custom Isolation",
  },
];

const upiSubmissions: any[] = [
  {
    id: "upi-rec-01",
    tenantId: "tenant-ved-01",
    utr: "UTR408912384721",
    amount: 19999,
    payer: "Ved Packaging Industries Ltd",
    status: "VERIFIED",
    verifiedAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    plans: SAAS_PLANS,
    upiPendingApprovals: upiSubmissions,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { utr, amount, payerName, tenantId } = body;

    if (!utr || !amount) {
      return NextResponse.json({ success: false, error: "UTR and Amount are required." }, { status: 400 });
    }

    const submission = {
      id: `upi-rec-${Date.now()}`,
      tenantId: tenantId || "tenant-ved-01",
      utr,
      amount: Number(amount),
      payer: payerName || "SaaS Customer",
      status: "PENDING_ADMIN_VERIFICATION",
      submittedAt: new Date().toISOString(),
    };

    upiSubmissions.push(submission);

    return NextResponse.json({
      success: true,
      message: "UPI payment UTR submitted for admin reconciliation.",
      reconciliation: submission,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
