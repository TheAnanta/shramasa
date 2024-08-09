import { Response, Request, request } from "express";
import prisma from "../prismaClient";
import { JsonValue } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { error } from "console";

export const addProductToCart = async (req: Request, res: Response) => {
    const { productId, userId } = req.body;
    if (!productId) {
        res.status(400).json({ error: "Product id not provided." });
    }
    if (!userId) {
        res.status(400).json({ error: "User Id not provided" });
    }
    try {
        const doesCartExistForUser = await prisma.cart.findMany({
            where: {
                userId: userId
            }
        });
        if (!doesCartExistForUser) {
            const user = await prisma.user.findUnique({
                where: {
                    userId: userId
                }
            });
            if (!user) {
                res.status(400).json({ error: "User doesn't exist." });
            }
            const product = await prisma.product.findUnique({
                where: {
                    productId: productId
                }
            });
            if (!product) {
                res.status(400).json({ error: "Product doesn't exist." });
            }
            const cart = await prisma.cart.create({
                data: {
                    userId: userId,
                    items: [
                        {
                            productId: productId,
                            quantity: 1
                        }
                    ]
                }
            });

            res.status(200).json(cart);
        } else {
            const user = await prisma.user.findUnique({
                where: {
                    userId: userId
                }
            });
            if (!user) {
                res.status(400).json({ error: "User doesn't exist." });
            }
            const product = await prisma.product.findUnique({
                where: {
                    productId: productId
                }
            });
            if (!product) {
                res.status(400).json({ error: "Product doesn't exist." });
            }
            const userCurrentCart = doesCartExistForUser[0];
            const cart = await prisma.cart.update({
                where: {
                    cartId: userCurrentCart.cartId
                },
                data: {
                    userId: userId,
                    items: {
                        push: {
                            productId: productId,
                            quantity: 1
                        }
                    }
                }
            });
            res.status(200).json(cart);
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error. Couldn't add product to cart." })
    }
};

export const modifyCart = async (req: Request, res: Response) => {
    const { productId, userId, quantity } = req.body;
    if (!productId) {
        res.status(400).json({ error: "Product id not provided." });
    }
    if (!userId) {
        res.status(400).json({ error: "User Id not provided" });
    }
    try {
        const doesCartExistForUser = await prisma.cart.findMany({
            where: {
                userId: userId
            }
        });

        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            }
        });
        if (!user) {
            res.status(400).json({ error: "User doesn't exist." });
        }
        const product = await prisma.product.findUnique({
            where: {
                productId: productId
            }
        });
        if (!product) {
            res.status(400).json({ error: "Product doesn't exist." });
        }
        if (product!.stock < quantity) {
            res.status(402).json({ error: "Quantity not available. Try " + product!.stock + " items or less" });
        }
        const userCurrentCart = doesCartExistForUser[0];
        const newCartItems: JsonValue[] = [...userCurrentCart.items.filter((e) => {
            const e1 = e as { productId: string; quantity: number };
            return e1.productId != productId
        }), {
            productId: productId,
            quantity: quantity
        }
        ];
        const cart = await prisma.cart.update({
            where: {
                cartId: userCurrentCart.cartId
            },
            data: {
                userId: userId,
                items: newCartItems as Prisma.InputJsonValue[],
            }
        });
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error. Couldn't add product to cart." })
    }
};

export const fetchUserCart = async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).json({ error: "Provide a userId to fetch the cart for." });
    }
    try {
        const cart = await prisma.cart.findMany({
            where: {
                userId: userId
            }
        });
        const cartWithStatus = cart.map(async (c) => {
            const items = await Promise.all(c.items.map(async (i) => {
                const item = i as { productId: string; quantity: number };
                const product = await prisma.product.findUnique({
                    where: {
                        productId: item.productId
                    }
                });
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product?.price,
                    name: product?.name,
                    stock: product?.stock ?? 0
                };
            }));

            return {
                cartId: c.cartId,
                userId: c.userId,
                items: items.filter((i) => i.quantity <= i.stock),
                outOfStockItems: items.filter((i) => i.quantity > i.stock),
            };
        });
        res.json(cartWithStatus[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const removeInvalidProductsFromCart = async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).json({ error: "Provide a userId to fetch the cart for." });
    }

    try {
        const cart = (await prisma.cart.findMany({
            where: {
                userId: userId
            }
        }))[0];
        const cartWithStatus = (await Promise.all(cart.items.map(async (i) => {
            const item = i as { productId: string; quantity: number };
            const product = await prisma.product.findUnique({
                where: {
                    productId: item.productId
                }
            });
            return {
                productId: item.productId,
                valid: item.quantity <= (product?.stock ?? 0),
            };
        }))).filter((i) => !i.valid).map((i) => i.productId);
        const newCartItems: JsonValue[] = cart.items.filter((e) => {
            const e1 = e as { productId: string; quantity: number };
            return cartWithStatus.includes(e1.productId);
        });
        const updatedCart = await prisma.cart.update({
            where: {
                cartId: cart.cartId
            },
            data: {
                userId: userId,
                items: newCartItems as Prisma.InputJsonValue[],
            }
        });
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};