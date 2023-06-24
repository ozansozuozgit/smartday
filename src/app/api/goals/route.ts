import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // const session: any = await getServerSession(authOptions);
  const user = await currentUser();
  console.log('user', user);
  if (!user) throw new Error('Unauthorized');
  const allGoalsFromUser = await prisma.goal.findMany({
    where: { userId: user?.id, deletedAt: null },
    orderBy: { updatedAt: 'desc' },
  });

  // const allGoalsFromUser = res.json();

  return NextResponse.json(allGoalsFromUser);
}

// export async function DELETE(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const currentUserEmail = session?.user?.email!;
//   // const targetUserId = req.nextUrl.searchParams.get('targetUserId');

//   // const currentUserId = await prisma.user
//   //   .findUnique({ where: { email: currentUserEmail } })
//   //   .then((user) => user?.id!);

//   // const record = await prisma.follows.delete({
//   //   where: {
//   //     followerId_followingId: {
//   //       followerId: currentUserId,
//   //       followingId: targetUserId!,
//   //     },
//   //   },
//   // });

//   return NextResponse.json(record);
// }
