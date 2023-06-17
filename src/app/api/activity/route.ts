import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions);

//   const allGoalsFromUser = await prisma.activity.findMany({
//     where: { userId: session?.user?.id, goalId: req.nextUrl.query.goalId },
//   });

//   // const allGoalsFromUser = res.json();

//   return NextResponse.json(allGoalsFromUser);
// }

export async function POST(req: NextRequest) {
  const { alignsWithGoal, percentage, goalId, activityName, categoryId } =
    await req.json();

  const newActivity = await prisma.activity.create({
    data: {
      name: activityName,
      categoryId: categoryId,
      percentage: percentage,
      goalId: goalId,
      alignsWithGoal: alignsWithGoal,
    },
  });

  // Update the goal's percentage
  const updatedGoal = await prisma.goal.update({
    where: {
      id: goalId, // replace with the actual goal ID
    },
    data: {
      percentage: {
        increment: percentage, // increment the goal's percentage by the activity's percentage
      },
    },
  });
  console.log('updatedGoal', updatedGoal);
  return NextResponse.json(newActivity);
}

export async function DELETE(req: NextRequest) {
  const activityId = req.nextUrl.searchParams.get('activityId') as string;

  // get the activity and its associated goal
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: { goal: true },
  });

  if (!activity) {
    throw new Error('Activity not found');
  }

  // check if the activity is from a past day
  const activityDate = activity.createdAt;
  const today = new Date();

  if (
    activityDate.getDate() === today.getDate() &&
    activityDate.getMonth() === today.getMonth() &&
    activityDate.getFullYear() === today.getFullYear()
  ) {
    if (!activity?.goal?.percentage) {
      throw new Error('No percentage found for this goal');
    }
    // if the activity is from today, subtract its percentage from the goal
    const newPercentage = activity?.goal?.percentage - activity?.percentage;
    await prisma.goal.update({
      where: { id: activity.goal.id },
      data: { percentage: newPercentage },
    });
  }

  // delete the activity
  const response = await prisma.activity.delete({
    where: { id: activityId },
  });

  return NextResponse.json(response);
}
