import { prisma } from '@/lib/prisma';
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

  return NextResponse.json(allCategoriesFromUser);
}
