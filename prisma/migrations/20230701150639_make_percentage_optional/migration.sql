-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "percentage" DROP NOT NULL,
ALTER COLUMN "percentage" SET DEFAULT 0;
