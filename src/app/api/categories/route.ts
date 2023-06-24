import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { currentUser } from '@clerk/nextjs';

export async function GET(req: NextRequest) {
  const session: any = await getServerSession(authOptions);

  const user = await currentUser();
  console.log('user', user)
  if (!user) throw new Error("Unauthorized")
  
  const allCategoriesFromUser = await prisma.category.findMany({
    where: { userId: user?.id as any },
    orderBy: { createdAt: 'desc' },
  });

  // const allCategoriesFromUser = res.json();
  console.log('allCategoriesFromUser', allCategoriesFromUser);

  return NextResponse.json(allCategoriesFromUser);
}
