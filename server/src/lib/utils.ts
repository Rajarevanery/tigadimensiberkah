import jwt from "jsonwebtoken";
import { IJWTPayload } from "../types/types";
import { env } from "config/env";

export const generateAccessToken = (data: IJWTPayload) => {
  return jwt.sign(data, env.accessJwtSecret, {
    expiresIn: env.refreshTokenExpiresIn,
  });
};
