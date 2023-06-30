import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const goalId = req.nextUrl.searchParams.get('goalId') as string;

  const allActivitiesFromGoal = await prisma.activity.findMany({
    where: { goalId: goalId },
    orderBy: { updatedAt: 'desc' },
    take: 100,
  });

  return NextResponse.json(allActivitiesFromGoal);
}
