import { Response, Request } from "express";
import prisma from "../prismaClient";
import { checkAuthorizedByAdmin } from "../middlewares/authMiddleware";
// checkAuthorizedByAdmin

export const getLatestProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        dateAdded: "desc",
      },
      take: 5,
    });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

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
    variants,
    howToUse,
    videoLink,
    videoProvider,
    stock,
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
    !videoProvider ||
    !stock ||
    !variants
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
    return res.status(400).json({ error: "Subcategory not provided." });
  }

  if (subCategory.categoryId != categoryId) {
    return res
      .status(400)
      .json({ error: "Subcategory doesn't belong to the category" });
  }

  if (stock.length !== variants.length) {
    return res.status(400).json({ error: "Stock and variants do not match." });
  }
  if (price.length !== variants.length) {
    return res.status(400).json({ error: "Price and variants do not match." });
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
      rating: 0,
      variants: variants,
      videoProvider: videoProvider,
      reviews: [],
      reviewCount: 0,
      stock: stock,
    },
  });

  return res.status(200).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    images,
    categoryId,
    subCategoryId,
    ingredients,
    discount,
    price,
    variants,
    howToUse,
    videoLink,
    videoProvider,
    stock,
    productId,
  } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "Product id not provided." });
  }

  if (stock && stock.length !== variants.length) {
    return res.status(400).json({ error: "Stock and variants do not match." });
  }
  if (price && price.length !== variants.length) {
    return res.status(400).json({ error: "Price and variants do not match." });
  }

  const product = await prisma.product.update({
    where: {
      productId: productId,
    },
    data: {
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
      videoProvider: videoProvider,
      stock: stock,
      variants: variants,
    },
  });
  return res.status(200).json(product);
};

export const updateProductStock = async (req: Request, res: Response) => {
  const { productId, stock, variant } = req.body;
  if (!productId) {
    return res.status(400).json({ error: "Product id not provided." });
  }
  if (variant == null) {
    return res.status(400).json({ error: "Variant not provided." });
  }
  if (stock == null || stock < 0) {
    return res
      .status(400)
      .json({ error: "Invalid or no stock value provided." });
  }
  const product = await prisma.product.findFirst({
    where: {
      productId: productId,
    },
  });
  const stockValues = product?.stock;
  if (stockValues == null) {
    return res.status(400).json({ error: "Product not found." });
  }
  stockValues[variant] = stock;
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        productId: productId,
      },
      data: {
        stock: stockValues,
      },
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//________________________________________________________

export const publishProductReview = async (req: Request, res: Response) => {
  console.log("Publishing review");
  const { review, productId } = req.body;

  if (!productId) {
    return res
      .status(400)
      .json({ error: "Unable to provide rating. Product doesn't exist." });
  }
  console.log(review);
  if (!review.name) {
    return res.status(400).json({
      error:
        "Name not provided along with the review. The user isn't logged in.",
    });
  } else if (!review.rating) {
    return res
      .status(400)
      .json({ error: "Please provide a rating from 1 to 5 stars." });
  }
  console.log("Publishing review 3");
  try {
    const updatedProductWithReview = await prisma.product.update({
      where: {
        productId: productId,
      },
      data: {
        reviews: {
          push: review,
        },
        reviewCount: {
          increment: 1,
        },
      },
    });
    const data = [updatedProductWithReview];
    const productJson = data.map(async (e: any) => {
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
    })[0];
    return res.json(productJson);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error: " + error });
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
        //TODO: Add cart status and wishlist status

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
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: "Product id not provided." });
  }
  try {
    const response = await prisma.product.delete({
      where: {
        productId: productId,
      },
    });
    console.log("Product deleted successfully");
    return res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error: " + error });
  }
};

/**
 * An API to fetch the top grossing products from the categories specified.
 * @param req categories from which the user needs top grossing
 * @param res A sample response
 */
export const getHeroProducts = async (req: Request, res: Response) => {
  try {
    const categories: string[] = req.body.categories;

    if (!categories || categories.length === 0) {
      return res.status(400).json({ error: "Categories not provided." });
    }

    const heroProducts = await Promise.all(
      categories.map(async (category) => {
        if (!category) {
          return null;
        }
        return await prisma.product.findFirst({
          where: {
            category: category,
          },
          orderBy: [
            {
              reviewCount: "desc",
            },
          ],
        });
      })
    );

    const filteredProducts = heroProducts.filter((product) => product !== null);

    return res.status(200).json(filteredProducts);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.query;
  if (!productId) {
    return res.status(400).json({ error: "Product id not provided." });
  }
  try {
    const product = await prisma.product.findUnique({
      where: {
        productId: productId as string,
      },
    });
    if (product === null) {
      return res.status(404).json({ error: "Product not found." });
    }
    const productWithRating = [product].map((e: any) => {
      return {
        ...e,
        rating:
          e.reviews.length > 0
            ? (
              e["reviews"]
                .map((e: any) => e["rating"])
                .reduce((acc: any, value: any) => acc + value, 0) /
              e["reviews"].length
            ).toFixed(2)
            : 0,
        customerRatingCount: e.reviews.length,
      };
    })[0];
    console.log(productWithRating);
    return res.status(200).json(productWithRating);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSimilarCatalogue = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;

    const items = await prisma.product.findMany({
      where: {
        category: category,
      },
      take: 4,
    });

    return res.status(200).json(items);
  } catch (error: any) {
    console.log("Error: " + error.message);
  }
};
