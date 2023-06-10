/*
  Warnings:

  - Added the required column `name` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "date" DROP DEFAULT;
