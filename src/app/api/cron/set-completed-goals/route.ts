import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // 1. Retrieve all users
  const users = await prisma.user.findMany();

  // 2. Iterate through each user
  for (const user of users) {
    // 3. Retrieve all goals for the user
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
    });

    // 4. Iterate through each goal
    for (const goal of goals) {
      // 5. Check if the goal is complete
      console.log('goal', goal);
      if (goal?.percentage ?? 0 >= 100) {
        // 6. If the goal is complete, create a completed goal and associate it with the user
        const completedGoal = await prisma.completedGoal.create({
          data: {
            goal: { connect: { id: goal.id } },
            user: { connect: { id: user.id } },
            completedAt: new Date(), // Set the completion date to the current date and time
            name: goal.name,
          },
        });

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

  return NextResponse.json({ message: 'Goals reset', status: 'success' });
}
