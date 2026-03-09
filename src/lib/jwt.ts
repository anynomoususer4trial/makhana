import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface JwtPayload {

  userId: string;

  email: string;

  role: string;

  isVerified: boolean;

}

export function generateToken(payload: JwtPayload) {

  return jwt.sign(

    payload,

    JWT_SECRET,

    {

      expiresIn: "7d"

    }

  );

}

export function verifyToken(token: string) {

  try {

    return jwt.verify(token, JWT_SECRET);

  } catch (error) {

    return null;

  }

}