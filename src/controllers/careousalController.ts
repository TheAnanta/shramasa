import { Response, Request } from "express";
import prisma from "../prismaClient";

export const getCarousal = async (req: Request, res: Response) => {
  try {
    const carousal = await prisma.product.findMany();
    //sort carousal by latest time,and limit it 5
    carousal.sort((a, b) => {
      return b.dateAdded.getTime() - a.dateAdded.getTime();
    });
    carousal.slice(0, 5);

    return res.status(200).json(carousal);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
