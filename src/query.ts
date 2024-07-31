import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

function checkAuthorizedByAdmin(req:Request, res:Response){
  const authToken = req.headers.authorization;
  //TODO: Replace with actual representation
  if(authToken !== "Basic YWRtaW46bWFsbGE="){
    res.status(401).json({error: "You're unauthorized to perform this operation"})
  }
}

//Catergories CRUD
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
  checkAuthorizedByAdmin(req, res);
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

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/update-category-by-id", async (req, res) => {
  checkAuthorizedByAdmin(req, res);
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
  checkAuthorizedByAdmin(req, res);
  const { categoryId } = req.body;
  if (!categoryId) {
    res.status(400).json({ error: "Category id not provided." });
  }
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
    res.status(500).json({ error: "Internal server error: " + error });
  }
});

// SubCategories CRUD
app.get("/get-all-subcategories", async (req, res) => {
  try {
    const subcategories = await prisma.subCategory.findMany();
    res.json(subcategories);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" + error.name });
  }
});

app.get("/get-subcategories-by-category", async (req, res) => {
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
});

app.post("/add-subcategory",async (req, res)=>{
  checkAuthorizedByAdmin(req, res);
  const {subcategoryName, subcategoryImage, categoryId} = req.body;
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
});

app.post("/update-subcategory",async (req, res)=>{
  checkAuthorizedByAdmin(req, res);
  const {subcategoryName, subcategoryImage, categoryId, subcategoryId} = req.body;
  if(!subcategoryId){
    res.status(400).json({error: "subcategoryId expected. Found null."})
  }
  if(!categoryId){
    res.status(400).json({error: "categoryId expected. Found null."})
  }
  if(!subcategoryName && !subcategoryImage){
    res.status(400).json({error: "Updatable fields not provided."})
  }
  try {
    const doesCategoryExist =  !categoryId || (await prisma.category.count({where:{
      categoryId: categoryId
    }})) >= 1;
    const doesSubcategoryExist = (await prisma.subCategory.count({where:{
      subCategoryId: subcategoryId
    }})) >= 1;
    if(doesCategoryExist && doesSubcategoryExist){
      const subcategory = await prisma.subCategory.update({
        where: {
          subCategoryId: subcategoryId
        },
        data:{
          name: subcategoryName,
          image: subcategoryImage,
          categoryId: categoryId,
        }
      });
      res.json(subcategory);
    }else if(doesSubcategoryExist){
      res.status(400).json({error: "Invalid category id. Can't update subcategory."})
    }else{
      res.status(400).json({error: "Invalid subcategory id. Can't update subcategory."})
    }
    res.status(200).json(doesCategoryExist);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: "Couldn't update subcategory: " + error.name });
  }
});

//___PRODUCTS CRUD BELOW________________________________

app.post("/add-product", async (req: Request, res: Response) => {
  checkAuthorizedByAdmin(req, res);
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
});
//________________________________________________________

app.post("/publish-product-review", async(req: Request, res: Response)=>{
  checkAuthorizedByAdmin(req, res);
  const {review, productId} = req.body;

  if(!productId){
    res.status(400).json({error: "Unable to provide rating. Product doesn't exist."})
  }
  if(!review.name){
    res.status(400).json({error: "Name not provided along with the review. The user isn't logged in."})
  }else if(!review.rating){
    res.status(400).json({error: "Please provide a rating from 1 to 5 stars."})
  }

  try{
    const updatedProductWithReview = await prisma.product.update({
      where:{
        productId: productId
      },
      data:{
        reviews:{
          push: review
        }
      }
    })
    res.json(updatedProductWithReview)
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Internal server error: " + error});
  }
});

app.get("/get-all-products", async (req: Request, res: Response) => {
  try {
    const productsTemp: any = await prisma.product.findMany();
    const products = await Promise.all(productsTemp.map(async (e:any)=>{
      console.log(e["category"]);
      const tempCategoryId = e["category"];
      const tempSubcategoryId = e["subCategory"];
      e["category"] = await prisma.category.findUnique({where: {
        categoryId: tempCategoryId
      }});
      e["subCategory"] = await prisma.subCategory.findUnique({
        where: {
          subCategoryId: tempSubcategoryId
        }
      });
      e["aggregateRating"] = e["reviews"].map((e:any)=>e["rating"]).reduce((acc:any, value:any)=>acc+value, 0) / e["reviews"].length;
      console.log(e);
      return e;
    }));
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete-product-by-id", async (req: Request, res: Response) => {
  checkAuthorizedByAdmin(req, res);
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
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});