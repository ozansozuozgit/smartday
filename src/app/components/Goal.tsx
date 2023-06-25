'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setSelectedGoal } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { getTimes } from '@/src/utils/timeHelpers';
import { GoalType } from '@/types/types';
import { ChartBarIcon, FlagIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useCallback, useState } from 'react';
import DeleteGoal from './DeleteGoal';

const Goal = ({ goal }: { goal: GoalType }) => {
  const dispatch = useAppDispatch();
  const startDate =
    useAppSelector((state) => state.user.startDate) || getTimes().startOfToday;
  const endDate =
    useAppSelector((state) => state.user.endDate) || getTimes().endOfToday;
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);
  const [isDeleteGoalOpen, setIsDeleteGoalOpen] = useState(false);

  const getGoalandActivities = useCallback(async () => {
    if (goal?.id === selectedGoal?.id) return;

    const res = await fetch(
      `${getBaseUrl()}/api/goal?goalId=${
        goal?.id
      }&startDate=${startDate}&endDate=${endDate}`
    );
    const goalResult = await res.json();
    dispatch(setSelectedGoal(goalResult));
  }, [goal, selectedGoal, startDate, endDate, dispatch]);

  return (
    <div
      className='flex items-center justify-between bg-white p-2 rounded-lg my-1 hover:bg-gray cursor-pointer'
      onClick={getGoalandActivities}
    >
      <FlagIcon className='h-4 w-4 text-orange' aria-hidden='true' />
      <h2 className='text-sm  cursor-pointer'>{goal.name}</h2>
      <XMarkIcon
        className='h-6 w-6 text-red-500  hover:text-red-600'
        aria-hidden='true'
        onClick={() => setIsDeleteGoalOpen(true)}
      />
      {isDeleteGoalOpen && (
        <DeleteGoal
          closeDeleteGoal={() => setIsDeleteGoalOpen(false)}
          goal={goal}
        />
      )}
    </div>
  );
};

export default Goal;
