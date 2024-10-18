/*
  Warnings:

  - The `price` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `stock` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "variants" TEXT[],
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION[],
DROP COLUMN "stock",
ADD COLUMN     "stock" INTEGER[] DEFAULT ARRAY[0]::INTEGER[];
