-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "method" DROP NOT NULL,
ALTER COLUMN "paymentDetails" DROP NOT NULL;
