import { Request, Response } from "express";
import prisma from "../prismaClient";
import { DiscountType, OrderStatus, PaymentStatus } from "@prisma/client";

export const instantiateOrder = async (req: Request, res: Response) => {
    const { userId, addressId, couponCode } = req.body;
    try {
        const cartItems = (await Promise.all(((await prisma.cart.findMany({
            where: {
                userId: userId,
            }
        }))[0]).items.map(async (i1) => {
            const item = i1 as { productId: string; quantity: number };
            const price = (await (prisma.product.findUnique({
                where: {
                    productId: item.productId
                }
            })))?.price;

            return {
                productId: item.productId,
                quantity: item.quantity,
                price: price,
            };
        }))).filter((i) => i !== undefined);
        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty." });
        }
        const coupon = (await prisma.coupon.findMany({
            where: {
                code: couponCode
            }
        }))[0];
        const totalAmount = cartItems.map((e) => (e.price ?? 0) * e.quantity).reduce((p, c) => p + c);
        const discount = coupon.type == DiscountType.AMOUNT ? coupon.discount : (coupon.discount * totalAmount) / 100;
        // coupon.maxDiscount -> Add to schema, add min cart value to coupon
        const address = await prisma.address.findUnique({
            where: {
                addressId: addressId
            }
        });
        const payment = await prisma.payment.create({
            data: {
                amount: totalAmount - discount,
            }
        });
        const order = await prisma.order.create({
            data: {
                userId: userId,
                items: cartItems,
                // addressId: addressId,
                couponCode: couponCode,
                additionalInfo: {
                    'razorpayId': ''
                },
                deliveryAddress: JSON.stringify(address),
                discount: discount,
                discountType: coupon.type,
                paymentId: payment.paymentId,
            },
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};