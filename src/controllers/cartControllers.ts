import { Response, Request, request } from "express";
import prisma from "../prismaClient";
import { JsonValue } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export const addProductToCart = async (req: Request, res: Response) => {
    const { productId, userId, variant } = req.body;
    if (!productId) {
        return res.status(400).json({ error: "Product id not provided." });
    }
    if (!userId) {
        return res.status(400).json({ error: "User Id not provided" });
    }
    try {
        const doesCartExistForUser = await prisma.cart.findMany({
            where: {
                userId: userId
            }
        });
        if (doesCartExistForUser.length <= 0) {
            const user = await prisma.user.findUnique({
                where: {
                    userId: userId
                }
            });
            if (!user) {
                return res.status(400).json({ error: "User doesn't exist." });
            }
            const product = await prisma.product.findUnique({
                where: {
                    productId: productId
                }
            });
            if (!product) {
                return res.status(400).json({ error: "Product doesn't exist." });
            }
            if (product.stock[variant] > 1) {
                const cart = await prisma.cart.create({
                    data: {
                        userId: userId,
                        items: [
                            {
                                productId: productId,
                                quantity: 1,
                                variant: variant
                            }
                        ]
                    }
                });

                return res.status(200).json(cart);
            } else {
                return res.status(402).json({ error: "Product out of stock" });
            }

        } else {
            const user = await prisma.user.findUnique({
                where: {
                    userId: userId
                }
            });
            if (!user) {
                return res.status(400).json({ error: "User doesn't exist." });
            }
            const product = await prisma.product.findUnique({
                where: {
                    productId: productId
                }
            });
            if (!product) {
                return res.status(400).json({ error: "Product doesn't exist." });
            }
            console.log(doesCartExistForUser);
            const userCurrentCart = doesCartExistForUser[0];
            if (product.stock[variant] < 1) {
                return res.status(402).json({ error: "Product out of stock" });
            }
            const cart = await prisma.cart.update({
                where: {
                    cartId: userCurrentCart.cartId
                },
                data: {
                    userId: userId,
                    items: {
                        push: {
                            productId: productId,
                            quantity: 1,
                            variant: variant
                        }
                    }
                }
            });
            return res.status(200).json(cart);
        }

    } catch (error: any) {
        return res.status(500).json({ error: "Internal Server Error. Couldn't add product to cart. " + error.message })
    }
};

export const modifyCart = async (req: Request, res: Response) => {
    const { productId, userId, quantity, variant } = req.body;
    if (!productId) {
        return res.status(400).json({ error: "Product id not provided." });
    }
    if (!userId) {
        return res.status(400).json({ error: "User Id not provided" });
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
            return res.status(400).json({ error: "User doesn't exist." });
        }
        const product = await prisma.product.findUnique({
            where: {
                productId: productId
            }
        });
        if (!product) {
            return res.status(400).json({ error: "Product doesn't exist." });
        }
        if (product!.stock[variant] < quantity) {
            return res.status(402).json({ error: "Quantity not available. Try " + product!.stock + " items or less" });
        }
        const userCurrentCart = doesCartExistForUser[0];
        const newCartItems: JsonValue[] = quantity > 0 ? [...userCurrentCart.items.filter((e) => {
            const e1 = e as { productId: string; quantity: number; variant: number };
            return e1.productId != productId && variant != e1.variant
        }), {
            productId: productId,
            quantity: quantity,
            variant: variant
        }
        ] : [...userCurrentCart.items.filter((e) => {
            const e1 = e as { productId: string; quantity: number; variant: number };
            return e1.productId != productId && variant != e1.variant
        }),
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
        return res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error. Couldn't add product to cart." })
    }
};

export const fetchUserCart = async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "Provide a userId to fetch the cart for." });
    }
    try {
        const cart = await prisma.cart.findMany({
            where: {
                userId: userId
            }
        });
        console.log(cart);
        const cartWithStatus = cart.map(async (c) => {
            const items = await Promise.all(c.items.map(async (i) => {
                const item = i as { productId: string; quantity: number; variant: number };
                const product = await prisma.product.findUnique({
                    where: {
                        productId: item.productId
                    }
                });
                return {
                    variant: item.variant,
                    variantName: product?.variants[item.variant],
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product?.price[item.variant],
                    name: product?.name,
                    image: product?.images[0],
                    category: product?.category,
                    discount: product?.discount,
                    stock: product?.stock[item.variant] ?? 0
                };
            }));
            console.log("modified items", items);
            return {
                cartId: c.cartId,
                userId: c.userId,
                items: items.filter((i) => i.quantity <= i.stock),
                outOfStockItems: items.filter((i) => i.quantity > i.stock),
            };
        });
        console.log("cWS", await Promise.all(cartWithStatus));
        return res.json(await Promise.all(cartWithStatus));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
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
            const item = i as { productId: string; quantity: number; variant: number };
            const product = await prisma.product.findUnique({
                where: {
                    productId: item.productId
                }
            });
            return {
                productId: item.productId,
                valid: item.quantity <= (product?.stock[item.variant] ?? 0),
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