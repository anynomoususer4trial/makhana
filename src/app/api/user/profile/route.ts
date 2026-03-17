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

    const userDoc = await User.findById(user.userId).select("-password");
    if (!userDoc) return apiError("User not found", 404);

    return apiSuccess({ user: userDoc });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const updateData = await req.json();

    // Only allow updating certain fields
    const allowedFields = ["name", "mobile"];
    const filteredData: any = {};

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    }

    const userDoc = await User.findByIdAndUpdate(
      user.userId,
      filteredData,
      { new: true, select: "-password" }
    );

    if (!userDoc) return apiError("User not found", 404);

    return apiSuccess({ user: userDoc }, "Profile updated successfully");
  } catch (error) {
    return handleError(error);
  }
}