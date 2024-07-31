const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      password: 'password123',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      pincode: '10001',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      password: 'password123',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      pincode: '90001',
    },
  });

  // Create some products
  const product1 = await prisma.product.create({
    data: {
      name: 'Product 1',
      description: 'Description for product 1',
      price: 19.99,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Product 2',
      description: 'Description for product 2',
      price: 29.99,
    },
  });

  // Create some cart items for user1
  await prisma.cart.create({
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

  // Create some wishlist items for user2
  await prisma.wishlist.create({
    data: {
      userId: user2.userId,
      productId: product1.productId,
    },
  });

  await prisma.wishlist.create({
    data: {
      userId: user2.userId,
      productId: product2.productId,
    },
  });

  // Create some orders
  await prisma.order.create({
    data: {
      userId: user1.userId,
      productId: product1.productId,
      quantity: 2,
    },
  });

  await prisma.order.create({
    data: {
      userId: user2.userId,
      productId: product2.productId,
      quantity: 1,
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
