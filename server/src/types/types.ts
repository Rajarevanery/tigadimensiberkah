import { Request } from "express";

export enum Role {
  ADMIN,
  KARYAWAN,
}

export type IJWTPayload = {
  id: number;
  nama: string;
  role: Role;
};

export interface AuthRequest extends Request {
  user?: IJWTPayload;
}
