import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, goalId } = await req.json();

  const newMessage = await prisma.aiMessage.create({
    data: {
      message: message,
      goalId: goalId,
    },
  });

  return NextResponse.json(newMessage);
}
export async function GET(req: NextRequest) {
  const goalId: any = req.nextUrl.searchParams.get('goalId');

  const startDate: any = req.nextUrl.searchParams.get('startDate');
  const endDate: any = req.nextUrl.searchParams.get('endDate');

  const latestMessage = await prisma.aiMessage.findFirst({
    where: {
      goalId: goalId,
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(latestMessage);
}
