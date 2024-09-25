// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// async function main() {
//   // Create a category
//   const categoryHairCare = await prisma.category.create({
//     data: {
//       categoryId: "hair-care",
//       name: "Hair Care",
//       image: "/categories/hair-care.webp",
//     },
//   });
//   const categoryFaceCare = await prisma.category.create({
//     data: {
//       categoryId: "face-care",
//       name: "Face Care",
//       image: "/categories/face-care.webp",
//     },
//   });
//   const categorySkinCare = await prisma.category.create({
//     data: {
//       categoryId: "skin-care",
//       name: "Skin Care",
//       image: "/categories/skin-care.webp",
//     },
//   });
//   const categoryCreamsSerums = await prisma.category.create({
//     data: {
//       categoryId: "creams-serums",
//       name: "creams & serums",
//       image: "/categories/creams-serums.webp",
//     },
//   });
//   const categoryBodyCare = await prisma.category.create({
//     data: {
//       categoryId: "body-care",
//       name: "Body Care",
//       image: "/categories/body-care.webp",
//     },
//   });

//   // Create a subcategory
//   const subCategory = await Promise.all(
//     ["hair-care", "body-care", "skin-care", "face-care", "creams-serums"].map(
//       async (categoryId) => {
//         await prisma.subCategory.create({
//           data: {
//             subCategoryId: `all-${categoryId}`,
//             name: "All",
//             image: `/categories/${categoryId}.webp`,
//             categoryId: categoryId,
//           },
//         });
//       }
//     )
//   );

//   // Create a product
//   const product = await prisma.product.create({
//     data: {
//       productId: "soapnut-shampoo",
//       name: "Soapnut Shampoo",
//       description: `Indulge in the natural luxury of our Soapnut Shampoo, a gentle yet effective hair care solution crafted with the power of nature. This unique shampoo harnesses the cleansing properties of the soapnut fruit, a traditional remedy known for its remarkable hair-loving qualities. Soapnuts are rich in saponins, natural surfactants that create a luxurious lather while deeply nourishing and conditioning your hair. Experience a gentle cleanse that doesn't strip away your hair's natural oils, leaving it feeling soft, shiny, and manageable.
//     Our Soapnut Shampoo is suitable for all hair types, from oily to dry, and even those with sensitive scalps. The natural anti-fungal and anti-inflammatory properties of soapnuts help soothe and balance the scalp, promoting a healthier environment for hair growth. Say goodbye to harsh chemicals and sulfates, and embrace the gentle touch of nature on your hair and scalp.
//     Choose our Soapnut Shampoo and experience the difference. This sustainable and eco-friendly choice is a testament to our commitment to natural beauty. It's a renewable resource, packaged in recycled and recyclable materials, making it the perfect choice for conscious consumers who care about their hair and the planet.`,
//       category: "hair-care",
//       subCategory: "all-hair-care",
//       images: [
//         "/products/hair-care/all-hair-care/soapnut-shampoo-1.png",
//         "/products/hair-care/all-hair-care/soapnut-shampoo-2.png",
//         "/products/hair-care/all-hair-care/soapnut-shampoo-3.png",
//       ],
//       ingredients: [
//         { name: "Soapnut", quantity: "500mg" },
//         { name: "Aloe Vera", quantity: "200mg" },
//         { name: "Coconut Oil", quantity: "100mg" },
//       ],
//       discount: 10.0,
//       price: [50.0],
//       variants: ["200ml"],
//       howToUse:
//         "1. Wet your hair thoroughly.\n2. Take a small amount of shampoo and massage it into your scalp.\n3. Rinse thoroughly with water.\n4. Repeat if necessary.",
//       videoLink: "https://www.youtube.com/watch?v=dcUZ1T0VW98",
//       rating: 4.5,
//       reviewCount: 0,
//       stock: [10],
//       videoProvider: "YouTube",
//       reviews: [],
//     },
//   });

//   // Add items to wishlist
//   const wishlist = await prisma.wishlist.create({
//     data: {
//       userId: "user1",
//       items: ["prod1"],
//     },
//   });

//   // Create an order
//   const order = await prisma.order.create({
//     data: {
//       orderId: "order1",
//       userId: "user1",
//       items: [{ productId: "prod1", quantity: 1 }],
//       status: "INPROGRESS",
//       totalAmount: 899.99, // Price after discount
//       paymentMethod: "COD",
//       paymentStatus: "PENDING",
//       paymentDetails: {},
//       deliveryAddress: "123 Main St",
//       deliveryDate: new Date("2024-08-01"),
//       orderDate: new Date(),
//       couponCode: "DISCOUNT10",
//       discount: 100.0,
//       discountType: "AMOUNT",
//     },
//   });

//   const coupon = await prisma.coupon.create({
//     data: {
//       couponId: "DISCOUNT10",
//       code: "SHRAMASAONE",
//       discount: 10.0,
//       type: "PERCENTAGE",
//       maxDiscount: 100.0,
//       minCartValue: 500,
//       validTill: new Date("2025-08-01"),
//       isActive: true,
//     },
//   });
//   console.log("Seeding finished.");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seeding Users
  const user1 = await prisma.user.create({
    data: {
      userId: "user1",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      role: "USER",
      avatarId: null,
      addresses: {
        create: [
          {
            addressId: "addr1",
            name: "Home",
            houseNumber: "123",
            floor: "1",
            apartment: "101",
            landmark: "Near Park",
            address: "123 Street, City",
            pincode: 123456,
            isDefault: true,
          },
          {
            addressId: "addr2",
            name: "Work",
            houseNumber: "456",
            floor: "5",
            apartment: "502",
            landmark: "Near Mall",
            address: "456 Street, City",
            pincode: 789101,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      userId: "user2",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "0987654321",
      role: "ADMIN",
      avatarId: null,
      addresses: {
        create: [
          {
            addressId: "addr3",
            houseNumber: "789",
            floor: "Ground",
            apartment: "G1",
            landmark: "Near River",
            address: "789 Street, Another City",
            pincode: 987654,
            isDefault: true,
          },
        ],
      },
    },
  });

  // Seeding Categories and Subcategories
  const category = await prisma.category.create({
    data: {
      categoryId: "cat1",
      name: "Electronics",
      image: "electronics.jpg",
    },
  });

  const subCategory = await prisma.subCategory.create({
    data: {
      subCategoryId: "subcat1",
      name: "Mobile Phones",
      image: "mobile.jpg",
      categoryId: "cat1",
    },
  });

  // Seeding Products
  const product = await prisma.product.create({
    data: {
      productId: "prod1",
      name: "iPhone 12",
      description: "Latest iPhone with A14 chip",
      category: "Electronics",
      subCategory: "Mobile Phones",
      images: ["iphone12.jpg"],
      ingredients: [],
      discount: 10.0,
      price: [999.99],
      variants: ["64GB", "128GB"],
      howToUse: "Turn it on and enjoy.",
      videoLink: "https://youtube.com/example",
      videoProvider: "YouTube",
      rating: 4.5,
      reviewCount: 100,
      stock: [10],
    },
  });

  // Seeding Cart
  const cart = await prisma.cart.create({
    data: {
      userId: user1.userId,
      items: [
        {
          productId: "prod1",
          quantity: 1,
          variant: "64GB",
        },
      ],
    },
  });

  // Seeding Wishlist
  const wishlist = await prisma.wishlist.create({
    data: {
      userId: user1.userId,
      items: ["prod1"],
    },
  });

  // Seeding Order and Payment
  const payment = await prisma.payment.create({
    data: {
      paymentId: "pay1",
      amount: 999.99,
      status: "PENDING",
      method: "CREDITCARD",
      paymentDetails: {},
    },
  });

  const order = await prisma.order.create({
    data: {
      userId: user1.userId,
      items: [
        {
          productId: "prod1",
          quantity: 1,
          variant: "64GB",
        },
      ],
      status: "PROCESSING",
      paymentId: payment.paymentId,
      deliveryAddress: "123 Street, City",
      couponCode: null,
      discount: null,
      discountType: null,
      additionalInfo: {},
    },
  });

  // Seeding Coupons
  const coupon = await prisma.coupon.create({
    data: {
      couponId: "coupon1",
      code: "DISCOUNT10",
      discount: 10.0,
      type: "PERCENTAGE",
      validTill: new Date("2024-12-31"),
      isActive: true,
      maxDiscount: 50.0,
      minCartValue: 100.0,
    },
  });

  // Seeding Reviews
  const review = await prisma.review.create({
    data: {
      reviewId: "rev1",
      userId: user1.userId,
      rating: 4.5,
      reviewText: "Great product!",
    },
  });

  // Seeding Carousel
  const carousel = await prisma.carousel.create({
    data: {
      carouselId: "car1",
      image: "banner1.jpg",
      link: "https://example.com/product1",
    },
  });

  console.log("Seed data created successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
