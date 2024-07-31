import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Get a single product by ID
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId) },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// Get the cart items for a user
app.get("/cart", async (req, res) => {
  res.json({ message: "Get cart items" });
});

// Get the wishlist items for a user
app.get("/wishlist", async (req, res) => {
  const { userId, wishlistId } = req.body;
  try {
    const wishlistItems = await prisma.wishlist.findMany({
      where: {
        wishlistId: parseInt(wishlistId),
        userId: parseInt(userId),
      },
      include: { product: true },
    });
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching wishlist items" });
  }
});

// Get an order by ID
app.get("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { orderId: parseInt(orderId) },
      include: { product: true },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
