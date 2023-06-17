'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setSelectedGoal } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { GoalType } from '@/types/types';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import DeleteGoal from './DeleteGoal';

const Goal = ({ goal }: { goal: GoalType }) => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const router = useRouter();
  const [isDeleteGoalOpen, setIsDeleteGoalOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function openDeleteGoal() {
    setIsDeleteGoalOpen(true);
  }

  function closeDeleteGoal() {
    setIsDeleteGoalOpen(false);
  }

  const getGoalandActivities = async () => {
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    const res = await fetch(
      `${getBaseUrl()}/api/goal?goalId=${
        goal?.id
      }&startDate=${startDate}&endDate=${endDate}`
    );
    const goalResult = await res.json();
    dispatch(setSelectedGoal(goalResult));
    console.log('the goal fetch was', goal);
  };



  return (
    <div className='flex items-center'>
      <h2 onClick={getGoalandActivities}>{goal.name}</h2>
      <XMarkIcon
        className='h-5 w-5 text-gray-400'
        aria-hidden='true'
        onClick={openDeleteGoal}
      />
      {isDeleteGoalOpen && (
        <DeleteGoal closeDeleteGoal={closeDeleteGoal} goal={goal} />
      )}
    </div>
  );
};

export default Goal;
