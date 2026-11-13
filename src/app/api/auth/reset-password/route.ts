import { NextRequest, NextResponse } from "next/server";
import { verifyOtpAndResetPassword } from "@/lib/supabase-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Email, 6-digit OTP, and new password are required." },
        { status: 400 }
      );
    }

    const result = await verifyOtpAndResetPassword(email, otp, newPassword);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
