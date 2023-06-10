-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "alignsWithGoal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "percentage" DROP NOT NULL;
