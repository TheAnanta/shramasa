/*
  Warnings:

  - Added the required column `maxDiscount` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minCartValue` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "maxDiscount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "minCartValue" DOUBLE PRECISION NOT NULL;
