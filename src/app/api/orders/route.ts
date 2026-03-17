import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import "@/models/product.model"; // Ensure Product model is registered for populate
import { authMiddleware } from "@/middleware/auth.middleware";
import { apiSuccess, apiError } from "@/utils/apiResponse";
import { handleError } from "@/utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const orders = await Order.find({ user: user.userId })
      .sort({ createdAt: -1 })
      .populate("orderItems.product");

    return apiSuccess({ orders });
  } catch (error: any) {
    console.error("/api/orders GET error:", error);
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const { items, addressId, subtotal, discount, total, userDetails } = await req.json();

    if (!items || items.length === 0) {
      return apiError("No items in cart", 400);
    }

    // Get user with addresses
    const userDoc = await User.findById(user.userId);
    if (!userDoc) return apiError("User not found", 404);

    // Find selected address
    const selectedAddress = userDoc.addresses?.[parseInt(addressId)];
    if (!selectedAddress) {
      return apiError("Invalid address", 400);
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.discountPrice || item.product.price,
      quantity: item.quantity,
      image: item.product.images?.[0],
    }));

    // Create order
    const order = await Order.create({
      user: user.userId,
      orderItems,
      shippingAddress: selectedAddress,
      paymentMethod: "cod", // Default to COD for now
      paymentStatus: "pending",
      orderStatus: "processing",
      totalPrice: total,
      shippingPrice: 0,
    });

    return apiSuccess({ order }, "Order placed successfully");
  } catch (error: any) {
    console.error("/api/orders POST error:", error);
    return handleError(error);
  }
}