'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setSelectedGoal } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { GoalType } from '@/types/types';
import { XMarkIcon } from '@heroicons/react/20/solid';
import moment from 'moment-timezone';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import DeleteGoal from './DeleteGoal';

const Goal = ({ goal }: { goal: GoalType }) => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);
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
    if (goal?.id === selectedGoal?.id) return;
    // console.log('startDate', startDate);
    // console.log('endDate', endDate);
    const now = moment();
    const cstTimezone = 'America/Chicago';
    const estTimezone = 'America/New_York';

    // Convert to the beginning of the day in EST
    const startOfToday = now.clone().tz(estTimezone).startOf('day');

    // Convert to the end of the day in EST
    const endOfToday = now.clone().tz(estTimezone).endOf('day');

    const res = await fetch(
      `${getBaseUrl()}/api/goal?goalId=${
        goal?.id
      }&startDate=${startOfToday}&endDate=${endOfToday}`
    );
    const goalResult = await res.json();
    dispatch(setSelectedGoal(goalResult));
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
