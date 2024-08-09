import { Request, Response } from "express";
import prisma from "../prismaClient";
import { DiscountType, OrderStatus, PaymentStatus } from "@prisma/client";
import { randomUUID } from "crypto";

export const instantiateOrder = async (req: Request, res: Response) => {
    const { userId, cartId, addressId, couponCode } = req.body;
    try {
        const cartItems = (await Promise.all(((await prisma.cart.findUnique({
            where: {
                cartId : cartId,
            }
        })))!.items.map(async (i1) => {
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
        if (totalAmount < coupon.minCartValue) {
            return res.status(400).json({ error: "Cart value is less than the minimum cart value required for the coupon." });
        }
        const discount = Math.max(coupon.type == DiscountType.AMOUNT ? coupon.discount : (coupon.discount * totalAmount) / 100, coupon.maxDiscount);
        const address = await prisma.address.findUnique({
            where: {
                addressId: addressId
            }
        });
        const razorpayPaymentId = randomUUID();
        //TODO: Call the razorpay api to generate a razorpay order id to replace with `razorpayPaymentId`
        const payment = await prisma.payment.create({
            data: {
                paymentId: razorpayPaymentId,
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

export const addPaymentInfoFromRazorpay = async (req: Request, res: Response) => {
    const { razorpayPaymentId, paymentStatus, paymentMethod, paymentMethodDetails } = req.body;
    try {
        const order = await prisma.payment.update({
            where: {
                paymentId: razorpayPaymentId
            },
            data: {
                status: paymentStatus,
                method: paymentMethod,
                paymentDetails: {
                    paymentMethodDetails: paymentMethodDetails,
                }
            }
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};