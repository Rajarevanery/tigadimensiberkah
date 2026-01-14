import { Request, Response } from "express";
import { prisma } from "lib/prisma";

export const getAllWilayah = async (req: Request, res: Response) => {
  try {
    const wilayah = await prisma.wilayah.findMany({});

    if (!wilayah) {
      res.status(400).json({ msg: "Wilayah tidak tersedia" });
      return;
    }

    res.status(200).json({ wilayah });
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
};
