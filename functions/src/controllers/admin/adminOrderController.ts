import { Response, Request } from "express";
import prisma from "../../prismaClient";

export const getAllUserOrders = async (req: Request, res: Response) => {
  console.log("Get all user orders");

  try {
    const orders = await prisma.order.findMany();
    const ordersWithUsers = await Promise.all(orders.map(async (order) => {
      return await prisma.user.findUnique({
        where: {
          userId: order.userId
        }
      }).then((user) => {
        return {
          ...order,
          user
        }
      });
    }))
    console.log(ordersWithUsers);

    res.status(200).json(ordersWithUsers);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllCoupons = async (req: Request, res: Response) => {
  console.log("Get all user coupons");

  try {
    const coupons = await prisma.coupon.findMany();
    res.status(200).json(coupons);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
