import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product.model";
import { apiSuccess } from "@/utils/apiResponse";
import { handleError } from "@/utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "-createdAt";

    const query: any = { isActive: true };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    // Parse sort parameter
    const sortObj: any = {};
    if (sort.startsWith('-')) {
      sortObj[sort.substring(1)] = -1;
    } else {
      sortObj[sort] = 1;
    }

    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    // Add inStock field based on stock
    const productsWithInStock = products.map(product => ({
      ...product,
      inStock: product.stock > 0
    }));

    const total = await Product.countDocuments(query);

    return apiSuccess({
      products: productsWithInStock,
      total,
      page,
      pages: Math.ceil(total / limit),
    });

  } catch (error) {
    return handleError(error);
  }
}