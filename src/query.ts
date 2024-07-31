const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

//verified
app.get("/products/:productId", async (req: any, res: any) => {
  const { productId } = req.params;
  const product = await prisma.product.findUnique({
    where: { productId: parseInt(productId) },
  });
  res.json(product);
});

//verified
app.get("/products", async (req: any, res: any) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

//verified
app.get("/cart", async (req: any, res: any) => {
  const { userId, cartId } = req.body;

  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: parseInt(userId),
        cartId: parseInt(cartId),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//verified
app.post("/addToCart", async (req: any, res: any) => {
  const { userId, productId, quantity } = req.body;

  const cartId = await prisma.cart.findUnique({
    where: { userId: parseInt(userId) },
  });

  const cart = await prisma.cart.upsert({
    where: { userId: parseInt(userId) , 
      cart: parseInt(cartId)
    },
    update: {
      items: {
        create: {
          productId: parseInt(productId),
          quantity: parseInt(quantity),
        },
      },
    },
    create: {
      userId: parseInt(userId),
      items: {
        create: {
          productId: parseInt(productId),
          quantity: parseInt(quantity),
        },
      },
    },
  });
  res.json(cart);
});

//verified
app.get("/wishlist", async (req: any, res: any) => {
  const { userId } = req.body;
  const wishlist = await prisma.wishlist.findMany({
    where: { userId: parseInt(userId) },
    include: { product: true },
  });
  res.json(wishlist);
});

//testing
app.post("/addToWishlist", async (req: any, res: any) => {
  const { userId, productId } = req.body;
  const item = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    },
  });

  if (!item) {
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });
    res.json(wishlistItem);
  } else {
    res.json({ message: "Item already exists in wishlist" });
  }
});

//verified
app.get("/orders", async (req: any, res: any) => {
  const { orderId } = req.body;
  const order = await prisma.order.findUnique({
    where: { orderId: parseInt(orderId) },
    include: { product: true },
  });
  res.json(order);
});

//verified
app.get("/orders/:orderId", async (req: any, res: any) => {
  const { orderId } = req.body;
  const order = await prisma.order.findUnique({
    where: { orderId: parseInt(orderId) },
    include: { product: true },
  });
  res.json(order);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
