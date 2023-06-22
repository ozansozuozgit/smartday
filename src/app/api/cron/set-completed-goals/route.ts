import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export const config = {
  runtime: 'edge',
}

export async function GET() {
  try {
    // Retrieve all users
    const users = await prisma.user.findMany();

    // Iterate through each user
    for (const user of users) {
      // Retrieve all goals for the user
      const goals = await prisma.goal.findMany({
        where: { userId: user.id },
      });

      // Iterate through each goal
      for (const goal of goals) {
        // Check if the goal is complete
        if (goal?.percentage ?? 0 >= 100) {
          // If the goal is complete, create a completed goal and associate it with the user
          const completedGoal = await prisma.completedGoal.create({
            data: {
              goal: { connect: { id: goal.id } },
              user: { connect: { id: user.id } },
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
    }

    // Return a success message
    return NextResponse.json({ message: 'Goals reset', status: 'success' });
  } catch (error: any) {
    // Log the error and return an error message
    console.error(error);
    return NextResponse.json({
      message: 'Failed to reset goals',
      status: 'error',
      error,
    });
  }
}
