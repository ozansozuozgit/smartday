/*
  Warnings:

  - You are about to drop the column `completedGoals` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "completedGoals";

-- CreateTable
CREATE TABLE "CompletedGoal" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CompletedGoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompletedGoal" ADD CONSTRAINT "CompletedGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedGoal" ADD CONSTRAINT "CompletedGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
