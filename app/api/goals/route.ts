import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log('session', session);
  // DO NOT CONSOLE LOG THE REQUEST WITH AWAIT REQUEST.JSON() IN IT
  // IT WILL BREAK THE REQUEST AND YOU WILL GET A 500 ERROR BECAUSE YOU CANNOT READ THE BODY TWICE

  const { goalName } = await req.json();

  console.log('goalName', goalName);

  const newGoal = await prisma.goal.create({
    data: {
      name: goalName,
      percentage: 0,
      date: new Date(),
      userId: session?.user?.id,
    },
  });
  return NextResponse.json(newGoal);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  // const targetUserId = req.nextUrl.searchParams.get('targetUserId');

  // const currentUserId = await prisma.user
  //   .findUnique({ where: { email: currentUserEmail } })
  //   .then((user) => user?.id!);

  // const record = await prisma.follows.delete({
  //   where: {
  //     followerId_followingId: {
  //       followerId: currentUserId,
  //       followingId: targetUserId!,
  //     },
  //   },
  // });

  return NextResponse.json(record);
}
