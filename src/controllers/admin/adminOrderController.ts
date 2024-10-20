import { Response, Request } from "express";
import prisma from "../../prismaClient";

export const getAllUserOrders: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("Get all user orders");

  try {
    const orders = await prisma.order.findMany();
    const ordersWithUsers = await Promise.all(
      orders.map(async (order) => {
        return await prisma.user
          .findUnique({
            where: {
              userId: order.userId,
            },
          })
          .then((user) => {
            return {
              ...order,
              user,
            };
          });
      })
    );
    console.log(ordersWithUsers);

    return res.status(200).json(ordersWithUsers);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllCoupons: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("Get all user coupons");

  try {
    const coupons = await prisma.coupon.findMany();
    return res.status(200).json(coupons);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
