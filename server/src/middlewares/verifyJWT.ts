import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { access_jwt_secret } from "../config/db.config";
import { AuthRequest, IJWTPayload } from "types/types";

export function verifyJwt(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, access_jwt_secret) as IJWTPayload;

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
