import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order.model";
import { authMiddleware } from "@/middleware/auth.middleware";
import { apiSuccess, apiError } from "@/utils/apiResponse";
import { handleError } from "@/utils/errorHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const { id } = await params;

    const order = await Order.findOne({
      _id: id,
      user: (user as import("@/lib/jwt").JwtPayload).userId
    }).populate("orderItems.product");

    if (!order) return apiError("Order not found", 404);

    return apiSuccess({ order });
  } catch (error: any) {
    console.error("/api/orders/[id] error:", error);
    return handleError(error);
  }
}