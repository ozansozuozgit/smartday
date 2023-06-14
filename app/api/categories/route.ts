import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session: any = await getServerSession(authOptions);

  const allCategoriesFromUser = await prisma.category.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
  });

  // const allCategoriesFromUser = res.json();
  console.log('allCategoriesFromUser', allCategoriesFromUser);

  return NextResponse.json(allCategoriesFromUser);
}
