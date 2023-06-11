import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const allCategoriesFromUser = await prisma.category.findMany({
    where: { userId: session?.user?.id },
  });

  // const allCategoriesFromUser = res.json();
  console.log('allCategoriesFromUser', allCategoriesFromUser);

  return NextResponse.json(allCategoriesFromUser);
}

export async function POST(req: NextRequest) {
  const { categoryName } = await req.json();

  const newCategory = await prisma.category.create({
    data: {
      name: categoryName, // replace with the actual activity name
    },
  });

  return NextResponse.json(newCategory);
}
