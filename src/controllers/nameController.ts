import { Request, Response } from "express";
import prisma from "../prismaClient";

export const getName = async () => {
  try {
    const products = await prisma.product.findMany();
    console.log(products);
    const categories = await prisma.category.findMany();
    console.log(categories);
    const subCategories = await prisma.subCategory.findMany();
    console.log(subCategories);
  } catch (error: any) {
    console.log("error", error);
  }
};
