// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// var fs = require("fs").promises;

// // const prisma = new PrismaClient();

// async function loadProducts() {
//     try {
//         // Read the JSON file
//         const data = await fs.readFile('../prisma/master.json', 'utf8');

//         // Parse the JSON data into a JavaScript array of products
//         const products = JSON.parse(data);
//         const categories = [...new Set(products.map((product) => product.category))];
//         const subCategoriesWithCategory = [...new Set(products.map((product) => [product.subCategory, product.category]))];
//         const subCategories = [...new Set(products.map((product) => product.subCategory))].map((sub) => [sub, subCategoriesWithCategory.filter((subCat) => subCat[0] === sub)[0][1]]);
//         console.log(categories);
//         console.log(subCategories);

//         for (const cat of categories) {
//             const category = await prisma.category.create({
//                 data: {
//                     categoryId: cat,
//                     name: cat.toString().split('-') // Split the string at hyphens
//                         .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
//                         .join(' '),
//                     image: `/categories/${cat}.webp`,
//                 },
//             });
//         }

//         for (const subCat of subCategories) {
//             const subCategory = await prisma.subCategory.create({
//                 data: {
//                     subCategoryId: subCat[0],
//                     name: subCat[0].toString().split('-') // Split the string at hyphens
//                         .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
//                         .join(' '),
//                     categoryId: subCat[1],
//                     image: "/sub-categories/" + subCat[0] + ".webp",
//                 },
//             });
//         }

//         // Loop through each product and insert it into the database
//         for (const product of products) {
//             console.log(product);

//             await prisma.product.create({
//                 data: {
//                     productId: product.productId,
//                     name: product.name,
//                     videoLink: "",
//                     description: product.description,
//                     category: product.category,
//                     subCategory: product.subCategory,
//                     images: product.images,
//                     price: product.price,
//                     discount: product.discount ?? 0,
//                     howToUse: product.howToUse,
//                     stock: product.stock,
//                     rating: 0,
//                     reviews: [],
//                     videoProvider: "YouTube",
//                     reviewCount: 0,
//                     ingredients: product.ingredients.map((ingredient) => ({
//                         name: ingredient.name,
//                         quantity: ingredient.quantity
//                     }))
//                 },
//             });
//         }

//         const coupon = await prisma.coupon.create({
//             data: {
//                 couponId: "DISCOUNT10",
//                 code: "SHRAMASAONE",
//                 discount: 10.0,
//                 type: "PERCENTAGE",
//                 maxDiscount: 100.0,
//                 minCartValue: 500,
//                 validTill: new Date("2025-08-01"),
//                 isActive: true,
//             },
//         });
//         console.log('Products inserted successfully!');
//     } catch (error) {
//         console.error('Error inserting products:', error);
//     } finally {
//         await prisma.$disconnect(); // Make sure to close the Prisma client connection
//     }
// }

// loadProducts();