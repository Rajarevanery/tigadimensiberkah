import { Request, Response } from "express";
import { prisma } from "lib/prisma";
import { generateAccessToken, generateRefreshToken } from "lib/utils";
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
      where: { email },
    });

    if (!user) {
      res.status(400).json({ auth: false, message: "Wrong credential 🤔" });
      return;
    }

    const isPWMatch = await bcrypt.compare(password, user.password);

    if (!isPWMatch) {
      res.status(400).json({ auth: false, message: "Wrong credential 🤔" });
      return;
    }

    const { id, nama, role, email: userEmail } = user;

    const accessToken = generateAccessToken({ id, userEmail, nama, role });
    const refreshToken = generateRefreshToken(id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: id,
        expiresAt: new Date(Date.now() + env.refreshTokenCookieMaxAge),
      },
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "strict",
      maxAge: env.accessTokenCookieMaxAge,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: env.refreshTokenCookieMaxAge,
    });

    res.status(200).json({
      auth: true,
      user: { id, userEmail, role, nama },
    });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

export const createUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { nama, email, password, currentPassword, role } = req.body;

  if (password !== currentPassword) {
    res.status(400).json({ msg: "Passwords doesnt match" });
    return;
  }

  if (!nama || !email || !password || !role) {
    res.status(400).json({ msg: "Missing required fields" });
    return;
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      res.status(409).json({ msg: "Email dipake" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ msg: "User berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ auth: false, message: "No refresh token" });
      return;
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken) {
      res.status(403).json({ auth: false, message: "Invalid refresh token" });
      return;
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { token: refreshToken } });
      res.status(403).json({ auth: false, message: "Refresh token expired" });
      return;
    }

    const { id, nama, role, email } = storedToken.user;

    const newAccessToken = generateAccessToken({
      id,
      userEmail: email,
      nama,
      role,
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "strict",
      maxAge: env.accessTokenCookieMaxAge,
    });

    res.status(200).json({
      auth: true,
      user: { id, email, nama, role },
    });
  } catch (error) {
    res.status(500).json({ message: "Refresh failed" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/api/auth" });

  res.status(200).json({ message: "Logged out" });
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

    if (!req.user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

export const getAllUser = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        nama: true,
        role: true,
        createdAt: true,
        wilayah: {
          select: {
            wilayah: {
              select: {
                nama_wilayah: true,
              },
            },
          },
        },
      },
    });

    if (!req.user) {
      res.status(404).json({ message: "Unauthorized" });
      return;
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
};
