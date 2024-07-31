import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

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

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
