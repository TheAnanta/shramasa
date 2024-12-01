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

export const postReview: any = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const request: any = await req.body;
    const message = request.message;
    const userId = request.userId;
    const rating = request.rating;

    const review = await prisma.review.create({
      data: {
        reviewId: String(userId),
        userId,
        rating,
        reviewText: message,
        dateAdded: String(Date.now()),
      },
    });

    return res.json({ review: review, status: 201 });
  } catch (error: any) {
    console.log(error.message);
  }
};
