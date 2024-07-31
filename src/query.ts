import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/get-all-categories", async (_: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/add-category", async (req: Request, res: Response) => {
  const { name, image } = req.body;
  if (!name) {
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

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/update-category-by-id", async (req, res) => {
  const { name, image, categoryId } = req.body;
  if (!categoryId) {
    return res.status(400).json({ error: "Invalid category id." });
  }
  if (!name && !image) {
    return res.status(400).json({ error: "Field to be updated not provided." });
  }
  // return res.send(categoryId + " " + image);
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
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete-category-by-id", async (req: Request, res: Response) => {
  const { categoryId } = req.body;
  try {
    const response = await prisma.category.delete({
      where: {
        categoryId: categoryId,
      },
    });
    console.log("Category deleted successfully");
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error: "+ error });
  }
});

app.get("/get-all-subcategories", async(req, res)=>{
  try {
    const subcategories = await prisma.subCategory.findMany();
    res.json(subcategories);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" + error.name });
  }
});

app.post("/add-subcategory",async (req, res)=>{
  const {subcategoryName, subcategoryImage, categoryId} = req.body;
  const subcategoryId = subcategoryName.replace(/ /g, "-");
  if(!categoryId){
    res.status(400).json({error: "categoryId expected. Found null."})
  }
  try {
    const doesCategoryExist = (await prisma.category.count({where:{
      categoryId: categoryId
    }})) >= 1;
    if(doesCategoryExist){
      const subcategory = await prisma.subCategory.create({
        data:{
          name: subcategoryName,
          subCategoryId: subcategoryId,
          image: subcategoryImage,
          categoryId: categoryId,
        }
      });
      res.json(subcategory);
    }else{
      res.status(400).json({error: "Invalid category id. Can't add subcategory."})
    }
    res.status(200).json(doesCategoryExist);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: "Couldn't add subcategory: " + error.name });
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

//___PRODUCTS CRUD BELOW________________________________

app.post("/add-product", async (req: Request, res: Response) => {
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
    return res.status(400).json({ error: "Enter all details" });
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
});
//________________________________________________________
