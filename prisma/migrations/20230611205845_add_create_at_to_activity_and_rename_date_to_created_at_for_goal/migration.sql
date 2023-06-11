/*
  Warnings:

  - You are about to drop the column `date` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
