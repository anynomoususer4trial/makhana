import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { authMiddleware } from "@/middleware/auth.middleware";
import { apiSuccess, apiError } from "@/utils/apiResponse";
import { handleError } from "@/utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const userDoc = await User.findById(user.userId).select("addresses");
    if (!userDoc) return apiError("User not found", 404);

    return apiSuccess({ addresses: userDoc.addresses || [] });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const addressData = await req.json();

    // Validate required fields
    const requiredFields = ["fullName", "mobile", "pincode", "state", "city", "area"];
    for (const field of requiredFields) {
      if (!addressData[field]) {
        return apiError(`${field} is required`, 400);
      }
    }

    const userDoc = await User.findById(user.userId);
    if (!userDoc) return apiError("User not found", 404);

    // Add new address to array
    if (!userDoc.addresses) userDoc.addresses = [];
    userDoc.addresses.push({
      ...addressData,
      isDefault: userDoc.addresses.length === 0, // First address is default
    });

    await userDoc.save();

    return apiSuccess({ addresses: userDoc.addresses }, "Address added successfully");
  } catch (error) {
    return handleError(error);
  }
}