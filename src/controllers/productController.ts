import { Response, Request } from "express";
import prisma from "../prismaClient";
import { checkAuthorizedByAdmin } from "../middlewares/authMiddleware";
// checkAuthorizedByAdmin

export const addProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    images,
    categoryId,
    subCategoryId,
    ingredients,
    discount,
    price,
    howToUse,
    videoLink,
    rating,
    videoProvider,
    reviews,
  } = req.body;

  if (
    !name ||
    !categoryId ||
    !subCategoryId ||
    !price ||
    !description ||
    !images ||
    !ingredients ||
    !discount ||
    !howToUse ||
    !videoLink ||
    !rating ||
    !videoProvider ||
    !reviews
  ) {
    return res.status(400).json({ error: "Enter all fields required." });
  }

  const productId = name.replace(/ /g, "-");

  const subCategory = await prisma.subCategory.findUnique({
    where: {
      subCategoryId: subCategoryId,
    },
  });

  if (!subCategory) {
    return res.status(400).json({ error: "Doesn't not exist" });
  }

  if (subCategory.categoryId != categoryId) {
    return res
      .status(400)
      .json({ error: "Subcategory doesn't belong to the category" });
  }

  const product = await prisma.product.create({
    data: {
      productId: productId,
      name: name,
      description: description,
      images: images,
      category: categoryId,
      subCategory: subCategoryId,
      ingredients: ingredients,
      discount: discount,
      price: price,
      howToUse: howToUse,
      videoLink: videoLink,
      rating: rating,
      videoProvider: videoProvider,
      reviews: reviews,
    },
  });

  return res.status(200).json(product);
};
//________________________________________________________

export const publishProductReview = async (req: Request, res: Response) => {
  //
  const { review, productId } = req.body;

  if (!productId) {
    res
      .status(400)
      .json({ error: "Unable to provide rating. Product doesn't exist." });
  }
  if (!review.name) {
    res.status(400).json({
      error:
        "Name not provided along with the review. The user isn't logged in.",
    });
  } else if (!review.rating) {
    res
      .status(400)
      .json({ error: "Please provide a rating from 1 to 5 stars." });
  }

  try {
    const updatedProductWithReview = await prisma.product.update({
      where: {
        productId: productId,
      },
      data: {
        reviews: {
          push: review,
        },
      },
    });
    res.json(updatedProductWithReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsTemp: any = await prisma.product.findMany();
    const products = await Promise.all(
      productsTemp.map(async (e: any) => {
        console.log(e["category"]);
        const tempCategoryId = e["category"];
        const tempSubcategoryId = e["subCategory"];
        e["category"] = await prisma.category.findUnique({
          where: {
            categoryId: tempCategoryId,
          },
        });
        e["subCategory"] = await prisma.subCategory.findUnique({
          where: {
            subCategoryId: tempSubcategoryId,
          },
        });
        e["rating"] = (
          e["reviews"]
            .map((e: any) => e["rating"])
            .reduce((acc: any, value: any) => acc + value, 0) /
          e["reviews"].length
        ).toFixed(2);
        (e["customerRatingCount"] = e.reviews.length), console.log(e);
        return e;
      })
    );
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { productId } = req.body;
  if (!productId) {
    res.status(400).json({ error: "Product id not provided." });
  }
  try {
    const response = await prisma.product.delete({
      where: {
        productId: productId,
      },
    });
    console.log("Product deleted successfully");
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error: " + error });
  }
};
