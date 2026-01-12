import { env } from "config/env";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, IJWTPayload } from "types/types";

export function verifyJwt(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.accessJwtSecret) as IJWTPayload;

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
