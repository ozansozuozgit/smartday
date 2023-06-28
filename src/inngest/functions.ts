import { inngest } from './client';
import { prisma } from '@/lib/prisma';

export const helloWorld = inngest.createFunction(
  { name: 'Hello World' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('1s');
    return { event, body: 'Hello, World!' };
  }
);
export const resetGoal = inngest.createFunction(
  {
    name: 'Reset Goal',
  },
  {
    // Run on schedule
    cron: '0 5 * * *',
  },
  async ({ event }) => {
    // Get Ideas From Database
    try {
      // Retrieve all goals
      const goals = await prisma.goal.findMany();

      // Iterate through each goal
      for (const goal of goals) {
        // Check if the goal is complete
        if (goal?.percentage === 100) {
          console.log('goal', goal?.percentage);
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
            data: { percentage: 0 },
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
