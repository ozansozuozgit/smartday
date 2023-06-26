import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');
  const allGoalsFromUser = await prisma.goal.findMany({
    where: { userId: user?.id, deletedAt: null },
    orderBy: { updatedAt: 'desc' },
  });

  // const allGoalsFromUser = res.json();

  return NextResponse.json(allGoalsFromUser);
}

