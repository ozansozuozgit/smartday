import { prisma } from '@/lib/prisma';

import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
  const { categoryName } = await req.json();
  const user = await currentUser();
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

export async function DELETE(req: NextRequest) {
  const categoryId  = req.nextUrl.searchParams.get('categoryId') as any;
  console.log('categoryId', categoryId)
  try {
    // Delete the category from the database
    const response = await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
