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

const upiSubmissions: any[] = [];
const savedInvoices: any[] = [];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenantId") || "tenant-primary";
  const type = searchParams.get("type");

  if (type === "invoices") {
    const tenantInvoices = savedInvoices.filter(i => i.tenantId === tenantId);
    return NextResponse.json({
      success: true,
      totalCount: tenantInvoices.length,
      invoices: tenantInvoices,
    });
  }

  return NextResponse.json({
    success: true,
    plans: SAAS_PLANS,
    upiPendingApprovals: upiSubmissions,
    totalInvoices: savedInvoices.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Handle Dynamic GST Tax Invoice Generation
    if (body.type === "INVOICE" || body.customer) {
      const { customer, amount, gstRate = 18, dueDate, tenantId = "tenant-primary" } = body;

      const baseAmount = parseFloat(amount) || 0;
      const rateNum = parseFloat(gstRate) || 0;
      const gstAmount = (baseAmount * rateNum) / 100;
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;
      const totalAmount = baseAmount + gstAmount;

      const newInvoice = {
        id: `INV-2026-${String(savedInvoices.length + 1).padStart(4, "0")}`,
        tenantId,
        customer: customer || "Valued Enterprise Client",
        baseAmount,
        gstRate: rateNum,
        cgst,
        sgst,
        gstAmount,
        totalAmount,
        status: "ISSUED",
        dueDate: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
        upiQrPayload: `upi://pay?pa=business@upi&pn=${encodeURIComponent(customer || "Client")}&am=${totalAmount.toFixed(2)}&cu=INR`,
        issuedAt: new Date().toISOString(),
      };

      savedInvoices.unshift(newInvoice);

      return NextResponse.json({
        success: true,
        message: `Tax Invoice generated with custom ${rateNum}% GST rate. Total: ₹${totalAmount.toLocaleString("en-IN")}`,
        invoice: newInvoice,
      });
    }

    // 2. Handle UPI Payment Reconciliation
    const { utr, amount, payerName, tenantId } = body;
    if (!utr || !amount) {
      return NextResponse.json({ success: false, error: "UTR and Amount are required." }, { status: 400 });
    }

    const submission = {
      id: `upi-rec-${Date.now()}`,
      tenantId: tenantId || "tenant-primary",
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
