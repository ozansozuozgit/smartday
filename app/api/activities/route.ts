import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const goalId = req.nextUrl.searchParams.get('goalId') as string;

  const allActivitiesFromGoal = await prisma.activity.findMany({
    where: { goalId: goalId },
  });

  return NextResponse.json(allActivitiesFromGoal);
}
