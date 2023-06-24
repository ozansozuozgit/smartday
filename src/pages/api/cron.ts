import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: any, res: any) {
  try {
    // Retrieve all goals
    const goals = await prisma.goal.findMany();

    // Iterate through each goal
    for (const goal of goals) {
      // Check if the goal is complete
      if (goal?.percentage === 100) {
        console.log('goal', goal?.percentage)
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
    res.status(200).json({ message: 'Goals reset', status: 'success' });
  } catch (error) {
    // Log the error and return an error message
    console.error(error);
    res.status(500).json({
      message: 'Failed to reset goals',
      status: 'error',
      error,
    });
  }
}
