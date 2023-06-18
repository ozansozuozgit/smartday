import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);

    const startDate = req.nextUrl.searchParams.get('startDate') as string;
    const endDate = req.nextUrl.searchParams.get('endDate') as string;

    if (!session?.user?.id || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      include: {
        completedGoals: {
          where: {
            completedAt: {
              gte: new Date(startDate), // Filter completedGoals with completedAt greater than or equal to startDate
              lte: new Date(endDate), // Filter completedGoals with completedAt less than or equal to endDate
            },
          },
          orderBy: { completedAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the completed goals for the user
    return NextResponse.json(user.completedGoals);
  } catch (error) {
    // Handle database or other errors
    console.error('Error fetching completed goals:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
