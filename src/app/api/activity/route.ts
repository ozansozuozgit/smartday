import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface ActivityData {
  name: string;
  percentage: number;
  goalId: string;
  alignsWithGoal: boolean;
  categoryId?: string;
  categoryName?: string;
}
export async function POST(req: NextRequest) {
  const {
    alignsWithGoal,
    percentage,
    goalId,
    activityName,
    categoryId,
    categoryName,
  } = await req.json();

  const activityData: ActivityData = {
    name: activityName,
    percentage: percentage,
    goalId: goalId,
    alignsWithGoal: alignsWithGoal,
  };

  if (categoryId !== undefined && categoryId !== null && categoryId !== '') {
    activityData.categoryId = categoryId;
  }
  if (
    categoryName !== undefined &&
    categoryName !== null &&
    categoryName !== ''
  ) {
    activityData.categoryName = categoryName;
  }

  const newActivity = await prisma.activity.create({
    data: activityData,
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
  return NextResponse.json(newActivity);
}

export async function PATCH(req: NextRequest) {
  const {
    activityId,
    newPercentage,
    goalId,
    name,
    alignWithGoal,
    categoryId,
    categoryName,
    goalPercentage
  } = await req.json();

  const activityData: ActivityData = {
    name: name,
    percentage: newPercentage,
    goalId: goalId,
    alignsWithGoal: alignWithGoal,
  };

  if (categoryId !== undefined && categoryId !== null && categoryId !== '') {
    activityData.categoryId = categoryId;
  }
  if (
    categoryName !== undefined &&
    categoryName !== null &&
    categoryName !== ''
  ) {
    activityData.categoryName = categoryName;
  }

  await prisma.goal.update({
    where: { id: goalId },
    data: { percentage: Number(goalPercentage) },
  });

  // update the activity
  const response = await prisma.activity.update({
    where: { id: activityId },
    data: activityData,
  });

  return NextResponse.json(response);
}

export async function DELETE(req: NextRequest) {
  const activityId = req.nextUrl.searchParams.get('activityId') as any;
  const newPercentage = req.nextUrl.searchParams.get('newPercentage') as any;
  const goalId = req.nextUrl.searchParams.get('goalId') as any;
  // if the activity is from today, subtract its percentage from the goal
  await prisma.goal.update({
    where: { id: goalId },
    data: { percentage: Number(newPercentage) },
  });

  // delete the activity
  const response = await prisma.activity.delete({
    where: { id: activityId },
  });

  return NextResponse.json(response);
}
