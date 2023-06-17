import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  try {
    const goalId = req.nextUrl.searchParams.get('goalId') as string;

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

export async function PATCH(req: NextRequest) {
  const goalId = req.nextUrl.searchParams.get('goalId') as string;
  console.log('goalId', goalId);
  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
  });

  if (!goal) {
    throw new Error('Goal not found');
  }

  console.log('goal', goal);
  // delete the activity
  const response = await prisma.goal.update({
    where: { id: goalId },
    data: { deletedAt: new Date() },
  });

  return NextResponse.json(response);
}
