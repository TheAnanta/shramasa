import { Request, Response } from "express";
import prisma from "../prismaClient";
import { checkAuthorizedByAdmin } from "../middlewares/authMiddleware";
// checkAuthorizedByAdmin(req, res);

export const getAllSubCategories = async (req: Request, res: Response) => {
  try {
    const subcategories = await prisma.subCategory.findMany();
    res.json(subcategories);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" + error.name });
  }
};

export const getSubCategoriesByCategory = async (
  req: Request,
  res: Response
) => {
  const { categoryId } = req.query;
  if (!categoryId) {
    res.status(400).json({ error: "Category ID not provided" });
  }
  try {
    const subcategories = await prisma.subCategory.findMany({
      where: {
        categoryId: categoryId?.toString(),
      },
    });
    if (subcategories.length <= 0) {
      res
        .status(422)
        .json({ error: "No subcategories found for the category id." });
    }
    res.json(subcategories);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" + error.name });
  }
};

export const addSubCategory = async (req: Request, res: Response) => {
  const { subcategoryName, subcategoryImage, categoryId } = req.body;
  const subcategoryId = subcategoryName.replace(/ /g, "-");
  if (!categoryId) {
    res.status(400).json({ error: "categoryId expected. Found null." });
  }
  if (!subcategoryName) {
    res.status(400).json({ error: "subcategoryName not provided." });
  } else if (!subcategoryImage) {
    res.status(400).json({ error: "subcategoryImage not provided." });
  }
  try {
    const doesCategoryExist =
      (await prisma.category.count({
        where: {
          categoryId: categoryId,
        },
      })) >= 1;
    if (doesCategoryExist) {
      const subcategory = await prisma.subCategory.create({
        data: {
          name: subcategoryName,
          subCategoryId: subcategoryId,
          image: subcategoryImage,
          categoryId: categoryId,
        },
      });
      res.json(subcategory);
    } else {
      res
        .status(400)
        .json({ error: "Invalid category id. Can't add subcategory." });
    }
    res.status(200).json(doesCategoryExist);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Couldn't add subcategory: " + error.name });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { subcategoryName, subcategoryImage, categoryId, subcategoryId } =
    req.body;
  if (!subcategoryId) {
    res.status(400).json({ error: "subcategoryId expected. Found null." });
  }
  if (!categoryId) {
    res.status(400).json({ error: "categoryId expected. Found null." });
  }
  if (!subcategoryName && !subcategoryImage) {
    res.status(400).json({ error: "Updatable fields not provided." });
  }
  try {
    const doesCategoryExist =
      !categoryId ||
      (await prisma.category.count({
        where: {
          categoryId: categoryId,
        },
      })) >= 1;
    const doesSubcategoryExist =
      (await prisma.subCategory.count({
        where: {
          subCategoryId: subcategoryId,
        },
      })) >= 1;
    if (doesCategoryExist && doesSubcategoryExist) {
      const subcategory = await prisma.subCategory.update({
        where: {
          subCategoryId: subcategoryId,
        },
        data: {
          name: subcategoryName,
          image: subcategoryImage,
          categoryId: categoryId,
        },
      });
      res.json(subcategory);
    } else if (doesSubcategoryExist) {
      res
        .status(400)
        .json({ error: "Invalid category id. Can't update subcategory." });
    } else {
      res
        .status(400)
        .json({ error: "Invalid subcategory id. Can't update subcategory." });
    }
    res.status(200).json(doesCategoryExist);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Couldn't update subcategory: " + error.name });
  }
};
