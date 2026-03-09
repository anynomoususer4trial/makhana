import { NextRequest } from "next/server";

import { authMiddleware } from "./auth.middleware";

import { apiError } from "@/utils/apiResponse";

export async function adminMiddleware(req: NextRequest) {

  const user: any = await authMiddleware(req);

  if (!user) return;

  if (user.role !== "admin") {

    return apiError("Admin access required", 403);

  }

  return user;

}