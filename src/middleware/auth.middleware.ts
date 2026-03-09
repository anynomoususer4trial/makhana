import { NextRequest } from "next/server";

import { verifyToken } from "@/lib/jwt";

import { apiError } from "@/utils/apiResponse";


export async function authMiddleware(req: NextRequest) {

  try {

    const token = req.cookies.get("token")?.value;

    if (!token) {

      return apiError("Unauthorized", 401);

    }

    const decoded = verifyToken(token);

    if (!decoded) {

      return apiError("Invalid token", 401);

    }

    return decoded;

  } catch (error) {

    return apiError("Authentication failed", 401);

  }

}