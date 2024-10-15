import { Response, Request } from "express";
import prisma from "../prismaClient";

export const getUserWishlist = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(400)
      .json({ error: "Provide a userId to fetch the wishlist for." });
  }
  try {
    console.log(userId);
    console.log(await prisma.wishlist.findMany());
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: userId.toString(),
      },
    });
    return res.json(wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const modifyWishlist = async (req: Request, res: Response) => {
  const { productId, userId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: "Product id not provided." });
  }
  if (!userId) {
    return res.status(400).json({ error: "User Id not provided" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist." });
    }
    const product = await prisma.product.findUnique({
      where: {
        productId: productId,
      },
    });
    if (!product) {
      return res.status(400).json({ error: "Product doesn't exist." });
    }
    const userWishlist = await prisma.wishlist.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!userWishlist) {
      const wishlist = await prisma.wishlist.create({
        data: {
          userId: userId,
          items: [productId],
        },
      });
      return res.status(200).json(wishlist);
    } else {
      var updatedWishlist = userWishlist.items;
      if (updatedWishlist.includes(productId)) {
        updatedWishlist = updatedWishlist.filter((e) => e != productId);
      } else {
        updatedWishlist = [...updatedWishlist, productId];
      }
      const wishlist = await prisma.wishlist.update({
        where: {
          userId: userId,
        },
        data: {
          items: updatedWishlist,
        },
      });
      return res.status(200).json(wishlist);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error. Couldn't add product to cart." });
  }
};
//TODO: Remove product from wishlist
