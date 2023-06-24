import { prisma } from '@/lib/prisma';

import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
  const { categoryName } = await req.json();
  const user = await currentUser();
  console.log('user', user);
  if (!user) throw new Error('Unauthorized');
  const newCategory = await prisma.category.create({
    data: {
      name: categoryName, // replace with the actual activity name
      //ts-ignore
      userId: user?.id,
    },
  });

  return NextResponse.json(newCategory);
}
