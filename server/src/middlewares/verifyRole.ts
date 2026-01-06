import { Response, NextFunction } from "express";
import { AuthRequest, Role } from "types/types";

export const verifyRole =
  (allowedRoles: Role[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user?.role) {
      return res.status(403).json({ error: "Role tidak ditemui" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Dilarang untuk akses route ini" });
    }

    next();
  };
