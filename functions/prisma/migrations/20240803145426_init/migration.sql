/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `apartment` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `floor` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `houseNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `landmark` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `User` table. All the data in the column will be lost.
  - Added the required column `additionalInfo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "additionalInfo" JSONB NOT NULL,
ADD COLUMN     "addressId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "apartment",
DROP COLUMN "firstName",
DROP COLUMN "floor",
DROP COLUMN "houseNumber",
DROP COLUMN "landmark",
DROP COLUMN "lastName",
DROP COLUMN "pincode",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "addressId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "apartment" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
