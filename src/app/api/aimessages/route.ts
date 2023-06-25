import { prisma } from '@/lib/prisma';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, goalId } = await req.json();

  console.log('message', message)

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

  console.log('goalId', goalId)

  const latestMessage = await prisma.aiMessage.findFirst({
    where: {
      goalId: goalId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(latestMessage);
}
