import { prisma } from '@/lib/prisma';
import { inngest } from './client';

export const resetGoal = inngest.createFunction(
  {
    name: 'Reset Goal',
  },
  {
    // Run on schedule
    cron: '0 5 * * *',
  },
  async ({ event }) => {
    try {
      // Retrieve all goals that have a type of 'daily'
      const goals = await prisma.goal.findMany({
        where: { type: 'daily' },
      });

      // Iterate through each goal
      for (const goal of goals) {
        // Check if the goal is complete
        if (goal?.percentage === 100) {
          // If the goal is complete, create a completed goal and associate it with the user
          const completedGoal = await prisma.completedGoal.create({
            data: {
              goal: { connect: { id: goal.id } },
              userId: goal.userId,
              completedAt: new Date(), // Set the completion date to the current date and time
              name: goal.name,
            },
          });

          // Reset the goal percentage
          await prisma.goal.update({
            where: { id: goal.id },
            data: { percentage: 0, completed: false },
          });
        } else {
          // If the goal is not complete, reset the goal percentage
          await prisma.goal.update({
            where: { id: goal.id },
            data: { percentage: 0 },
          });
        }
      }

      // Return a success message
      return 'Goals reset';
    } catch (error) {
      // Log the error and return an error message
      console.error(error);
      return 'Failed to reset goals';
    }
  }
);
