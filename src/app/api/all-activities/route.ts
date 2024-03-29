import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const startDate = req.nextUrl.searchParams.get('startDate') as string;
  const endDate = req.nextUrl.searchParams.get('endDate') as string;
  if (!user) throw new Error('Unauthorized');
  try {
    const activities = await prisma.activity.findMany({
      where: {
        goal: {
          userId: user?.id,
          deletedAt: null,
        },
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: { updatedAt: 'desc' },
      include: {
        goal: true,
        category: true,
      },
      take: 100,
    });
    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    console.error(error);
    throw new Error('Activities not found');
  }
}
