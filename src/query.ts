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

app.post("/update-category-by-id", async (req, res)=>{
  const { name, image, categoryId } = req.body;
  if(!categoryId){
    return res.status(400).json({error: "Invalid category id."});
  }
  if (!name && !image) {
    return res.status(400).json({ error: "Field to be updated not provided." });
  }
  // return res.send(categoryId + " " + image);
  try{
    const updatedCategory = await prisma.category.update({where: {
      categoryId: categoryId
    }, data:{
      name: name,
      image: image
    }});
    res.status(200).json(updatedCategory);
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
