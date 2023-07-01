/*
  Warnings:

  - You are about to drop the column `Completed` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "Completed",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
