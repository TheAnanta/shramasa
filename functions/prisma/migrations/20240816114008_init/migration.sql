/*
  Warnings:

  - Added the required column `reviewCount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reviewCount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DeletedUser" (
    "deleted_Id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "DeletedUser_pkey" PRIMARY KEY ("deleted_Id")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviewText" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Carousel" (
    "carouselId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Carousel_pkey" PRIMARY KEY ("carouselId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeletedUser_email_key" ON "DeletedUser"("email");
