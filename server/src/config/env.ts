import "dotenv/config";
import { SignOptions } from "jsonwebtoken";

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT),
  client_url: process.env.CLIENT_URL,

  accessJwtSecret: process.env.ACCESS_JWT_SECRET!,
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET!,

  accessTokenExpiresIn: process.env
    .ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],

  refreshTokenExpiresIn: process.env
    .REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],

  accessTokenCookieMaxAge: Number(
    process.env.ACCESS_TOKEN_COOKIE_MAX_AGE || 900000
  ),
  refreshTokenCookieMaxAge: Number(
    process.env.REFRESH_TOKEN_COOKIE_MAX_AGE || 604800000
  ),
};
