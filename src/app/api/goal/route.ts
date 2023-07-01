import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs';
import { type } from 'os';

export async function GET(req: NextRequest) {
  try {
    const goalId = req.nextUrl.searchParams.get('goalId') as string;
    const startDate = req.nextUrl.searchParams.get('startDate') as string;
    const endDate = req.nextUrl.searchParams.get('endDate') as string;

    // Validate goalId
    if (!goalId) {
      return NextResponse.json(
        { error: 'Missing goalId parameter' },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId,
      },
      include: {
        activities: {
          where: {
            createdAt: {
              gte: new Date(startDate), // Filter activities with createdAt greater than or equal to startDate
              lte: new Date(endDate), // Filter activities with createdAt less than or equal to endDate
            },
          },
          orderBy: { updatedAt: 'desc' },
        },
      },
    });

    if (!goal) {
      return NextResponse.json(null, { status: 404 });
    }

    // Return the goal
    return NextResponse.json(goal);
  } catch (error) {
    // Handle database or other errors
    console.error('Error fetching goal:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // DO NOT CONSOLE LOG THE REQUEST WITH AWAIT REQUEST.JSON() IN IT
  // IT WILL BREAK THE REQUEST AND YOU WILL GET A 500 ERROR BECAUSE YOU CANNOT READ THE BODY TWICE
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const { goalName, type } = await req.json();

  const newGoal = await prisma.goal.create({
    data: {
      name: goalName,
      percentage: 0,
      userId: user?.id as any,
      activities: {},
      type: type,
    },
  });
  return NextResponse.json(newGoal);
}

export async function PATCH(req: NextRequest) {
  const goalId = req.nextUrl.searchParams.get('goalId') as string;
  const action = req.nextUrl.searchParams.get('action') as string;
  const user = await currentUser();
  const { goalName = 'default', type = 'default' } = await req.json();

  console.log('goalId', goalId);
  console.log('action', action);
  console.log('goalName', goalName);
  console.log('type', type);

  if (action === 'delete') {
    const goal = await prisma.goal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      throw new Error('Goal not found');
    }

    // delete the goal
    const response = await prisma.goal.update({
      where: { id: goalId },
      data: { deletedAt: new Date() },
    });
    // delete the completed goal
    const completedGoal = await prisma.completedGoal.findFirst({
      where: { goalId: goalId },
    });

    console.log('completedGoal', completedGoal);

    if (completedGoal) {
      // Mark the completed goal as deleted
      const responseDeleted = await prisma.completedGoal.update({
        where: { id: completedGoal.id },
        data: { deletedAt: new Date() },
      });

      console.log('responseDeleted', responseDeleted);
    }

    return NextResponse.json(response);
  }

  if (action === 'update') {
    console.log('updating');
    const response = await prisma.goal.update({
      where: { id: goalId },
      data: { name: goalName },
    });
    return NextResponse.json(response);
  }

  if (action === 'complete') {
    const response = await prisma.goal.update({
      where: { id: goalId },
      data: { completed: true, completedAt: new Date(), percentage: 100 },
    });

    if (type === 'single') {
      const completedGoal = await prisma.completedGoal.create({
        data: {
          goal: { connect: { id: goalId } },
          userId: user?.id as any,
          completedAt: new Date(), // Set the completion date to the current date and time
          name: goalName,
          type: type,
        },
      });
    }

    return NextResponse.json(response);
  }
  if (action === 'uncomplete') {
    const response = await prisma.goal.update({
      where: { id: goalId },
      data: { completed: false },
    });
    return NextResponse.json(response);
  }
}
