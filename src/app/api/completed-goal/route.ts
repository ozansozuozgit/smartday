import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs';

export async function GET(req: NextRequest) {
  try {
    // const session: any = await getServerSession(authOptions);

    const startDate = req.nextUrl.searchParams.get('startDate') as string;
    const endDate = req.nextUrl.searchParams.get('endDate') as string;
    const goalId = req.nextUrl.searchParams.get('goalId') as string;
    const user = await currentUser();
    console.log('user', user);
    if (!user) throw new Error('Unauthorized');
    if (!user?.id || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    const completedGoals = await prisma.completedGoal.findMany({
      where: {
        userId: user?.id,
        completedAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        goalId: goalId, // Add a check for the goal ID
      },
      orderBy: { completedAt: 'desc' },
    });

    if (!completedGoals) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the completed goals for the user
    return NextResponse.json(completedGoals);
  } catch (error) {
    // Handle database or other errors
    console.error('Error fetching completed goals:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
