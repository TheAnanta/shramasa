import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// app.post("/addToCart", async (req, res) => {
//   // Change from GET to POST for adding to cart
//   const { userId, productId, quantity } = req.body;

//   try {
//     // Check if the cart item already exists for the user
//     const existingCartItem = await prisma.cart.findUnique({
//       where: {
//         userId_productId: {
//           userId: parseInt(userId),
//           productId: parseInt(productId),
//         },
//       },
//     });

//     if (existingCartItem) {
//       // If it exists, update the quantity
//       const updatedCartItem = await prisma.cart.update({
//         where: {
//           userId_productId: {
//             userId: parseInt(userId),
//             productId: parseInt(productId),
//           },
//         },
//         data: {
//           quantity: existingCartItem.quantity + parseInt(quantity),
//         },
//       });
//       return res.json(updatedCartItem);
//     } else {

//       const newCartItem = await prisma.cart.create({
//         data: {
//           userId: parseInt(userId),
//           productId: parseInt(productId),
//           quantity: parseInt(quantity),
//         },
//       });
//       return res.json(newCartItem);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error adding to cart" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
