/*
  Warnings:

  - You are about to drop the column `productId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordTokenExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyTokenExpiry` on the `User` table. All the data in the column will be lost.
  - The `pincode` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Wishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `wishlistId` on the `Wishlist` table. All the data in the column will be lost.
  - Added the required column `couponCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDetails` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `howToUse` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoLink` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoProvider` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('COD', 'UPI', 'NETBANKING', 'CREDITCARD', 'DEBITCARD', 'WALLET');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('INPROGRESS', 'PROCESSING', 'CONFIRMED', 'DISPATCHED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'AMOUNT');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_productId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_productId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_userId_fkey";

-- DropIndex
DROP INDEX "Cart_userId_productId_key";

-- DropIndex
DROP INDEX "Order_userId_productId_key";

-- DropIndex
DROP INDEX "Wishlist_userId_productId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "productId",
DROP COLUMN "quantity",
ADD COLUMN     "items" JSONB[],
ALTER COLUMN "cartId" DROP DEFAULT;
DROP SEQUENCE "Cart_cartId_seq";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productId",
DROP COLUMN "quantity",
ADD COLUMN     "couponCode" TEXT NOT NULL,
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discountType" "DiscountType" NOT NULL,
ADD COLUMN     "items" JSONB[],
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentDetails" JSONB NOT NULL,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "orderId" DROP DEFAULT;
DROP SEQUENCE "Order_orderId_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "howToUse" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "ingredients" JSONB[],
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reviews" JSONB[],
ADD COLUMN     "subCategory" TEXT NOT NULL,
ADD COLUMN     "videoLink" TEXT NOT NULL,
ADD COLUMN     "videoProvider" TEXT NOT NULL,
ALTER COLUMN "productId" DROP DEFAULT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId");
DROP SEQUENCE "Product_productId_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "firstname",
DROP COLUMN "forgotPasswordToken",
DROP COLUMN "forgotPasswordTokenExpiry",
DROP COLUMN "lastname",
DROP COLUMN "password",
DROP COLUMN "verifyToken",
DROP COLUMN "verifyTokenExpiry",
ADD COLUMN     "apartment" TEXT,
ADD COLUMN     "avatarId" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "houseNumber" TEXT,
ADD COLUMN     "landmark" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
DROP COLUMN "pincode",
ADD COLUMN     "pincode" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");
DROP SEQUENCE "user_userid_seq";

-- AlterTable
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_pkey",
DROP COLUMN "productId",
DROP COLUMN "wishlistId",
ADD COLUMN     "items" TEXT[],
ADD CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "subCategoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("subCategoryId")
);
