import { prisma } from '@/lib/prisma';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs';

export async function GET(req: NextRequest) {

  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const allCategoriesFromUser = await prisma.category.findMany({
    where: { userId: user?.id as any },
    orderBy: { createdAt: 'desc' },
  });

  // const allCategoriesFromUser = res.json();
  console.log('allCategoriesFromUser', allCategoriesFromUser);

  return NextResponse.json(allCategoriesFromUser);
}
