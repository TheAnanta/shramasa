import { Request, Response } from "express";
import prisma from "../prismaClient";
import { DiscountType, OrderStatus, PaymentStatus } from "@prisma/client";
import { randomUUID } from "crypto";

export const instantiateOrder = async (req: Request, res: Response) => {
  const { userId, cartId, addressId, couponCode } = req.body;
  try {
    const cartItems = (
      await Promise.all(
        (await prisma.cart.findUnique({
          where: {
            cartId: cartId,
          },
        }))!.items.map(async (i1) => {
          const item = i1 as {
            productId: string;
            quantity: number;
            variant: number;
          };
          const price = (
            await prisma.product.findUnique({
              where: {
                productId: item.productId,
              },
            })
          )?.price[item.variant];

          return {
            productId: item.productId,
            quantity: item.quantity,
            price: price,
            variant: item.variant,
          };
        })
      )
    ).filter((i) => i !== undefined);
    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }
    const coupon = (
      await prisma.coupon.findMany({
        where: {
          code: couponCode,
        },
      })
    )[0];
    const totalAmount = cartItems
      .map((e) => (e.price ?? 0) * e.quantity)
      .reduce((p, c) => p + c);
    if (totalAmount < coupon.minCartValue) {
      return res.status(400).json({
        error:
          "Cart value is less than the minimum cart value required for the coupon.",
      });
    }
    const discount = Math.max(
      coupon.type == DiscountType.AMOUNT
        ? coupon.discount
        : (coupon.discount * totalAmount) / 100,
      coupon.maxDiscount
    );
    const address = await prisma.address.findUnique({
      where: {
        addressId: addressId,
      },
    });
    const razorpayPaymentId = randomUUID();
    //TODO: Call the razorpay api to generate a razorpay order id to replace with `razorpayPaymentId`
    const payment = await prisma.payment.create({
      data: {
        paymentId: razorpayPaymentId,
        amount: totalAmount - discount,
      },
    });
    const order = await prisma.order.create({
      data: {
        userId: userId,
        items: cartItems,
        // addressId: addressId,
        couponCode: couponCode,
        additionalInfo: {},
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

export const getOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params;
    console.log(userId);

    if (!userId) return res.status(404).json({ error: "user not found" });

    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
    });

    console.log("reached here");

    return res.status(203).json(orders);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const addPaymentInfoFromRazorpay = async (
  req: Request,
  res: Response
) => {
  const {
    razorpayPaymentId,
    paymentStatus,
    paymentMethod,
    paymentMethodDetails,
  } = req.body;
  try {
    const order = await prisma.payment.update({
      where: {
        paymentId: razorpayPaymentId,
      },
      data: {
        status: paymentStatus,
        method: paymentMethod,
        paymentDetails: paymentMethodDetails,
      },
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateOrder = async (
  orderId: string,
  data: any,
  callback: (paymentId: string) => Promise<void>,
  res: Response
) => {
  try {
    const order = await prisma.order.update({
      where: {
        orderId: orderId,
      },
      data: data,
    });
    await callback(order.paymentId);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Shramasa accepted the order
export const confirmOrder = async (req: Request, res: Response) => {
  const { orderId, data } = req.body;
  if (!data["deliveryDate"]) {
    return res.status(400).json({ error: "Delivery date is required." });
  }
  if (!data["deliveryPartner"]) {
    return res.status(400).json({ error: "Delivery partner is required." });
  }
  const updatedData = {
    deliveryDate: data["deliveryDate"],
    additionalInfo: {
      deliveryPartner: data["deliveryPartner"],
    },
    status: OrderStatus.CONFIRMED,
  };
  updateOrder(orderId, updatedData, async () => {}, res);
};

//user cancelled the order
export const cancelOrder = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  const updatedData = {
    status: OrderStatus.CANCELLED,
  };

  updateOrder(
    orderId,
    updatedData,
    async (paymentId) => {
      const updatedPayment = await prisma.payment.update({
        where: {
          paymentId: paymentId,
        },
        data: {
          status: PaymentStatus.CANCELLED,
        },
      });
    },
    res
  );
};

//the payment was successful
export const processOrder = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  const updatedData = {
    status: OrderStatus.PROCESSING,
  };

  updateOrder(orderId, updatedData, async (paymentId) => {}, res);
};

//the order was dispatched by the delivery partner
export const dispatchOrder = async (req: Request, res: Response) => {
  const { orderId, deliveryTracking } = req.body;
  const updatedData = {
    additionalInfo: {
      put: {
        deliveryTracking: deliveryTracking,
      },
    },
    status: OrderStatus.DISPATCHED,
  };

  updateOrder(orderId, updatedData, async (paymentId) => {}, res);
};

//the order was delivered to the customer
export const deliverOrder = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  const updatedData = {
    status: OrderStatus.DELIVERED,
  };

  updateOrder(orderId, updatedData, async (paymentId) => {}, res);
};
