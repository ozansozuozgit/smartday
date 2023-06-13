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
        // 6. If the goal is complete, add it to the completedGoals array and reset the percentage
        await prisma.$transaction([
          prisma.user.update({
            where: { id: user.id },
            data: {
              completedGoals: [...user.completedGoals, goal.id], // append the new goal ID
            },
          }),
          prisma.goal.update({
            where: { id: goal.id },
            data: { percentage: 0 },
          }),
        ]);
      } else {
        // If the goal is not complete, reset the goal percentage
        await prisma.goal.update({
          where: { id: goal.id },
          data: { percentage: 0 },
        });
      }
    }
  }
  return NextResponse.json({ message: 'Goals reset' });
}
