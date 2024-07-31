import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.delete("/delete-all-force", async (req: Request, res: Response) => {
  try {
    await prisma.category.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.order.deleteMany();
    await prisma.subCategory.deleteMany();
    await prisma.wishlist.deleteMany();

    res.status(200).json({ message: "All categories deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
