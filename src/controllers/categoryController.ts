import { Request, Response } from "express";
import prisma from "../prismaClient";
import { checkAuthorizedByAdmin } from "../middlewares/authMiddleware";

// checkAuthorizedByAdmin(req, res, next);

export const getAllCategories: any = async (_: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addCategory: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, image } = req.body;
  if (!name || !image) {
    return res.status(400).json({ error: "Name is required" });
  }
  const categoryId = name.replace(/ /g, "-");

  try {
    const category = await prisma.category.create({
      data: {
        categoryId: categoryId,
        name: name,
        image: image,
      },
    });

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCategory: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, image, categoryId } = req.body;
  if (!categoryId) {
    return res.status(400).json({ error: "Invalid category id." });
  }
  if (!name && !image) {
    return res.status(400).json({ error: "Field to be updated not provided." });
  }
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        categoryId: categoryId,
      },
      data: {
        name: name,
        image: image,
      },
    });
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { categoryId } = req.body;
  if (!categoryId) {
    return res.status(400).json({ error: "Category id not provided." });
  }
  try {
    const response = await prisma.category.delete({
      where: {
        categoryId: categoryId,
      },
    });
    console.log("Category deleted successfully");
    return res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error: " + error });
  }
};
