const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {


    // Create a category
    // const categoryHairCare = await prisma.category.create({
    //     data: {
    //         categoryId: "hair-care",
    //         name: "Hair Care",
    //         image: "/categories/hair-care.webp",
    //     },
    // });
    // const categoryFaceCare = await prisma.category.create({
    //     data: {
    //         categoryId: "face-care",
    //         name: "Face Care",
    //         image: "/categories/face-care.webp",
    //     },
    // });
    // const categorySkinCare = await prisma.category.create({
    //     data: {
    //         categoryId: "skin-care",
    //         name: "Skin Care",
    //         image: "/categories/skin-care.webp",
    //     },
    // });
    // const categoryCreamsSerums = await prisma.category.create({
    //     data: {
    //         categoryId: "creams-serums",
    //         name: "creams & serums",
    //         image: "/categories/creams-serums.webp",
    //     },
    // });
    // const categoryBodyCare = await prisma.category.create({
    //     data: {
    //         categoryId: "body-care",
    //         name: "Body Care",
    //         image: "/categories/body-care.webp",
    //     },
    // });

    // // Create a subcategory
    // const subCategory = await Promise.all(["hair-care", "body-care", "skin-care", "face-care", "creams-serums"].map(async (categoryId) => {
    //     await prisma.subCategory.create({
    //         data: {
    //             subCategoryId: `all-${categoryId}`,
    //             name: "All",
    //             image: `/categories/${categoryId}.webp`,
    //             categoryId: categoryId,
    //         },
    //     });
    // }));

    // Create a product
    const product = await prisma.product.create({
        data: {
            productId: "soapnut-shampoo",
            name: "Soapnut Shampoo",
            description: `Indulge in the natural luxury of our Soapnut Shampoo, a gentle yet effective hair care solution crafted with the power of nature. This unique shampoo harnesses the cleansing properties of the soapnut fruit, a traditional remedy known for its remarkable hair-loving qualities. Soapnuts are rich in saponins, natural surfactants that create a luxurious lather while deeply nourishing and conditioning your hair. Experience a gentle cleanse that doesn't strip away your hair's natural oils, leaving it feeling soft, shiny, and manageable.
Our Soapnut Shampoo is suitable for all hair types, from oily to dry, and even those with sensitive scalps. The natural anti-fungal and anti-inflammatory properties of soapnuts help soothe and balance the scalp, promoting a healthier environment for hair growth. Say goodbye to harsh chemicals and sulfates, and embrace the gentle touch of nature on your hair and scalp.
Choose our Soapnut Shampoo and experience the difference. This sustainable and eco-friendly choice is a testament to our commitment to natural beauty. It's a renewable resource, packaged in recycled and recyclable materials, making it the perfect choice for conscious consumers who care about their hair and the planet.`,
            category: "hair-care",
            subCategory: "all-hair-care",
            images: ["/products/hair-care/all-hair-care/soapnut-shampoo-1.png", "/products/hair-care/all-hair-care/soapnut-shampoo-2.png", "/products/hair-care/all-hair-care/soapnut-shampoo-3.png"],
            ingredients: [{ "name": "Soapnut", "quantity": "500mg" }, { "name": "Aloe Vera", "quantity": "200mg" }, { "name": "Coconut Oil", "quantity": "100mg" }],
            discount: 10.0,
            price: 50.0,
            howToUse: "1. Wet your hair thoroughly.\n2. Take a small amount of shampoo and massage it into your scalp.\n3. Rinse thoroughly with water.\n4. Repeat if necessary.",
            videoLink: "https://www.youtube.com/watch?v=dcUZ1T0VW98",
            rating: 4.5,
            reviewCount: 0,
            videoProvider: "YouTube",
            reviews: [],
        },
    });

    // // Add items to wishlist
    // const wishlist = await prisma.wishlist.create({
    //     data: {
    //         userId: "user1",
    //         items: ["prod1"],
    //     },
    // });

    // // Create an order
    // const order = await prisma.order.create({
    //     data: {
    //         orderId: "order1",
    //         userId: "user1",
    //         items: [{ productId: "prod1", quantity: 1 }],
    //         status: "INPROGRESS",
    //         totalAmount: 899.99, // Price after discount
    //         paymentMethod: "COD",
    //         paymentStatus: "PENDING",
    //         paymentDetails: {},
    //         deliveryAddress: "123 Main St",
    //         deliveryDate: new Date("2024-08-01"),
    //         orderDate: new Date(),
    //         couponCode: "DISCOUNT10",
    //         discount: 100.0,
    //         discountType: "AMOUNT",
    //     },
    // });

    // console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
