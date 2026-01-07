import { Response, NextFunction } from "express";
import { AuthRequest } from "types/types";
import { Role } from "../../prisma/generated/prisma/enums";

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
