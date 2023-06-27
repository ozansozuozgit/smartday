'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setSelectedGoal } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { getTimes } from '@/src/utils/timeHelpers';
import { GoalType } from '@/types/types';

import { useCallback, useState } from 'react';
import DeleteGoal from './DeleteGoal';
import {RiDeleteBinLine} from 'react-icons/ri';
import {MdTaskAlt} from 'react-icons/md';
import {FaFlagCheckered} from 'react-icons/fa';
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
      style={{
        backgroundColor: goal?.id === selectedGoal?.id ? '#FDE68A' : '',
      }}
    >
      {goal.percentage === 100 ? (
        <MdTaskAlt className='h-4 w-4 text-yellow-500' aria-hidden='true' />
      ) : (
        <FaFlagCheckered className='h-4 w-4 text-orange' aria-hidden='true' />
      )}
      <h2 className='text-md  cursor-pointer'>{goal.name}</h2>
      <RiDeleteBinLine
        className='h-4 w-4 text-red-500  hover:text-red-600'
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
