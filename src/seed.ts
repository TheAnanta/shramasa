const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      userId: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      role: 'USER',
      houseNumber: '123',
      floor: '1',
      apartment: '101',
      landmark: 'Near Park',
      address: '123 Main St',
      pincode: 123456,
      avatarId: 'avatar1'
    }
  });

  // Create a category
  const category = await prisma.category.create({
    data: {
      categoryId: 'cat1',
      name: 'Electronics',
      image: 'electronics.jpg'
    }
  });

  // Create a subcategory
  const subCategory = await prisma.subCategory.create({
    data: {
      subCategoryId: 'subcat1',
      name: 'Mobile Phones',
      image: 'mobiles.jpg',
      categoryId: 'cat1'
    }
  });

  // Create a product
  const product = await prisma.product.create({
    data: {
      productId: 'prod1',
      name: 'iPhone 13',
      description: 'Latest iPhone model',
      category: 'cat1',
      subCategory: 'subcat1',
      images: ['iphone13-1.jpg', 'iphone13-2.jpg'],
      ingredients: [],
      discount: 10.0,
      price: 999.99,
      howToUse: 'Use as directed',
      videoLink: 'http://example.com/video',
      rating: 4.5,
      videoProvider: 'YouTube',
      reviews: []
    }
  });

  // Add items to wishlist
  const wishlist = await prisma.wishlist.create({
    data: {
      userId: 'user1',
      items: ['prod1']
    }
  });

  // Create an order
  const order = await prisma.order.create({
    data: {
      orderId: 'order1',
      userId: 'user1',
      items: [{ productId: 'prod1', quantity: 1 }],
      status: 'INPROGRESS',
      totalAmount: 899.99, // Price after discount
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      paymentDetails: {},
      deliveryAddress: '123 Main St',
      deliveryDate: new Date('2024-08-01'),
      orderDate: new Date(),
      couponCode: 'DISCOUNT10',
      discount: 100.0,
      discountType: 'AMOUNT'
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
