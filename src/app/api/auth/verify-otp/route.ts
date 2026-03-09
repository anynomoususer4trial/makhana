import { NextRequest } from "next/server";

import { connectDB } from "@/lib/db";

import Otp from "@/models/Otp";

import User from "@/models/user.model";

import { verifyOtpValidator } from "@/validators/otp.validator";

import { apiSuccess, apiError } from "@/utils/apiResponse";

import { handleError } from "@/utils/errorHandler";

export async function POST(req: NextRequest) {

  try {

    await connectDB();

    const body = await req.json();

    const { email, otp } = verifyOtpValidator.parse(body);

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {

      return apiError("OTP not found", 400);

    }

    if (otpRecord.otp !== otp) {

      return apiError("Invalid OTP", 400);

    }

    if (otpRecord.expiresAt < new Date()) {

      return apiError("OTP expired", 400);

    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {

      await User.create({
        email,
        role: "user"
      });

    }

    // Delete OTP
    await Otp.deleteMany({ email });

    return apiSuccess(
      null,
      "Email verified successfully"
    );

  } catch (error) {

    return handleError(error);

  }

}