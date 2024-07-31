const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  // Create dummy users
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: "Jane",
      lastname: "Doe",
      email: "jane.doe@example.com",
      phone: "9876543210",
      password: "password456",
    },
  });

  // Create dummy products
  const product1 = await prisma.product.create({
    data: {
      name: "Product 1",
      description: "This is product 1",
      price: 10.99,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Product 2",
      description: "This is product 2",
      price: 19.99,
    },
  });

  // Create a cart for user 1
  const cart1 = await prisma.cart.create({
    data: {
      userId: user1.userId,
      items: {
        create: [
          {
            productId: product1.productId,
            quantity: 2,
          },
          {
            productId: product2.productId,
            quantity: 1,
          },
        ],
      },
    },
  });

  // Add items to user 2's wishlist
  await prisma.wishlist.create({
    data: {
      userId: user2.userId,
      productId: product1.productId,
    },
  });

  // Create an order for user 1
  await prisma.order.create({
    data: {
      userId: user1.userId,
      productId: product2.productId,
      quantity: 3,
    },
  });

  console.log("Database seeded successfully!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
