import { Request, Response } from "express";
import prisma from "../prismaClient";

export const validateCoupon = async (req: Request, res: Response) => {
    try {
        const { couponCode } = req.body;
        const coupon = await prisma.coupon.findFirst({
            where: {
                code: couponCode,
            },
        });
        if (!coupon) {
            return res.status(404).json({ error: "Coupon not found" });
        }
        if (coupon.validTill < new Date()) {
            return res.status(400).json({ error: "Coupon has expired" });
        }
        return res.status(200).json({ coupon });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};