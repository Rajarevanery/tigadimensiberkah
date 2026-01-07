import { Request } from "express";
import { Role } from "../../prisma/generated/prisma/enums";

export type IJWTPayload = {
  id: string;
  nama: string;
  role: Role;
};

export interface AuthRequest extends Request {
  user?: IJWTPayload;
}

export type ILoginRequest = {
  email: string;
  password: string;
};
