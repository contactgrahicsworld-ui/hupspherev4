import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id") || "tenant-ved-01";
  const employees = db.employees.filter(e => e.tenantId === tenantId);

  const presentCount = employees.filter(e => e.attendanceStatus === "PRESENT").length;
  const attendanceRate = ((presentCount / employees.length) * 100).toFixed(1);

  return NextResponse.json({
    success: true,
    tenantId,
    totalWorkforce: employees.length,
    presentToday: presentCount,
    attendanceRate: `${attendanceRate}%`,
    employees,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employeeId, status } = body;

    const emp = db.employees.find(e => e.id === employeeId);
    if (!emp) {
      return NextResponse.json({ success: false, error: "Employee not found." }, { status: 404 });
    }

    emp.attendanceStatus = status || "PRESENT";

    return NextResponse.json({
      success: true,
      message: `Punch logged: ${emp.name} is now marked ${emp.attendanceStatus}.`,
      employee: emp,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
