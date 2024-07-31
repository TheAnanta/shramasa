import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.create({
      data: {
        categoryId: "electronics",
        name: "Electronics",
        image: "https://source.unsplash.com/1600x900/?electronics",
      },
    });
    console.log("Category created successfully");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
