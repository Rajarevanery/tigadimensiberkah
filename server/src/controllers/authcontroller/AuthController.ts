import { Request, Response } from "express";
import { prisma } from "lib/prisma";
import { generateAccessToken } from "lib/utils";
import bcrypt from "bcrypt";
import { AuthRequest, ILoginRequest } from "types/types";
import { env } from "config/env";

export const login = async (
  req: Request<{}, any, ILoginRequest>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ msg: "email and password are required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ auth: false, message: "Wrong credential bruh 🤔" });
      return;
    }

    const isPWMatch = await bcrypt.compare(password, user.password);

    if (isPWMatch) {
      const { id, nama, role, email: userEmail } = user;

      const accessToken = generateAccessToken({ id, userEmail, nama, role });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: "strict",
        maxAge: env.accessTokenCookieMaxAge,
      });

      res.status(200).json({
        auth: true,
        user: { id, userEmail, role, nama },
      });
    } else {
      res.status(400).json({ auth: false, message: "Wrong credential 🤔" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        nama: true,
        role: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ user });
  } catch {
    res.status(500).json({ message: "Error" });
  }
};
