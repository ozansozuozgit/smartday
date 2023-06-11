import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { useParams } from 'next/navigation';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const allGoalsFromUser = await prisma.activity.findMany({
    where: { userId: session?.user?.id, goalId: req.nextUrl.query.goalId },
  });

  // const allGoalsFromUser = res.json();
  console.log('allGoalsFromUser', allGoalsFromUser);

  return NextResponse.json(allGoalsFromUser);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log('session', session);
  // DO NOT CONSOLE LOG THE REQUEST WITH AWAIT REQUEST.JSON() IN IT
  // IT WILL BREAK THE REQUEST AND YOU WILL GET A 500 ERROR BECAUSE YOU CANNOT READ THE BODY TWICE

  const { category,activityPercentage } = await req.json();


  const goalId = useParams();
  const newActivity = await prisma.activity.create({
    data: {
      name: 'Activity Name', // replace with the actual activity name
      category: category, // replace with the actual category name
      percentage: activityPercentage, // replace with the actual activity percentage
      goal: {
        connect: {
          id: goalId, // replace with the actual goal ID
        },
      },
    },
  });
  
  // Update the goal's percentage
  const updatedGoal = await prisma.goal.update({
    where: {
      id: goalId, // replace with the actual goal ID
    },
    data: {
      percentage: {
        increment: activityPercentage, // increment the goal's percentage by the activity's percentage
      },
    },
  });
  return NextResponse.json(newGoal);
}
