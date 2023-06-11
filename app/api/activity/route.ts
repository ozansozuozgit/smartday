import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const allGoalsFromUser = await prisma.activity.findMany({
    where: { userId: session?.user?.id, goalId: req.nextUrl.query.goalId },
  });

  // const allGoalsFromUser = res.json();
  console.log('allGoalsFromUser', allGoalsFromUser);

  return NextResponse.json(allGoalsFromUser);
}

export async function POST(req: NextRequest) {
  const {
    alignsWithGoal,
    activityPercentage,
    goalId,
    activityName,
    categoryId,
  } = await req.json();

  const newActivity = await prisma.activity.create({
    data: {
      name: activityName, // replace with the actual activity name
      categoryId: categoryId, // replace with the actual category id
      percentage: activityPercentage, // replace with the actual activity percentage
      goalId: goalId, // replace with the actual goal ID
      alignsWithGoal: alignsWithGoal, // default value
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
  return NextResponse.json(newActivity);
}
