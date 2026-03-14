import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product.model";
import { adminMiddleware } from "@/middleware/admin.middleware";
import { createProductValidator } from "@/validators/product.validator";
import { apiSuccess } from "@/utils/apiResponse";
import { handleError } from "@/utils/errorHandler";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const admin: any = await adminMiddleware(req);
    if (!admin) return;

    const body = await req.json();
    const data = createProductValidator.parse(body);

    const slug = generateSlug(data.name);

    const existing = await Product.findOne({ slug });
    if (existing) throw new Error("Product already exists");

    const product = await Product.create({ ...data, slug });

    return apiSuccess({ product }, "Product created");

  } catch (error) {
    return handleError(error);
  }
}