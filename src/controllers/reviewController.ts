import { Response, Request } from "express";
import prisma from "../prismaClient";

export const getReview: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const reviews = await prisma.review.findMany({});
    return res.status(200).json(reviews);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
