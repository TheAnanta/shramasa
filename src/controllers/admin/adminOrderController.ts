import { Response, Request } from "express";
import prisma from "../../prismaClient";

export const getAllUserOrders = async (req: Request, res: Response) => {
  console.log("Get all user orders");
  
  try {
    const orders = await prisma.order.findMany();
    console.log(orders);
    
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
