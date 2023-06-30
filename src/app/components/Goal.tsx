'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setSelectedGoal } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { getTimes } from '@/src/utils/timeHelpers';
import { GoalType } from '@/types/types';

import { useCallback, useState } from 'react';
import { FaEdit, FaFlagCheckered } from 'react-icons/fa';
import { MdTaskAlt } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import DeleteGoal from './DeleteGoal';
import EditGoal from './EditGoal';

const Goal = ({ goal }: { goal: GoalType }) => {
  const dispatch = useAppDispatch();
  const startDate =
    useAppSelector((state) => state.user.startDate) || getTimes().startOfToday;
  const endDate =
    useAppSelector((state) => state.user.endDate) || getTimes().endOfToday;
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);
  const [isDeleteGoalOpen, setIsDeleteGoalOpen] = useState(false);
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);

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
      className='relative my-1 flex cursor-pointer items-center bg-white p-2 font-open_sans hover:bg-gray-100 '
      onClick={getGoalandActivities}
      style={{
        backgroundColor: goal?.id === selectedGoal?.id ? '#FDE68A' : '',
      }}
    >
      {goal.percentage === 100 ? (
        <MdTaskAlt
          className='h-3 w-3 min-w-[12px] text-yellow-500'
          aria-hidden='true'
        />
      ) : (
        <FaFlagCheckered
          className='h-3 w-3 min-w-[12px] text-orange'
          aria-hidden='true'
        />
      )}
      <h2 className='ml-2 cursor-pointer self-start text-sm'>{goal.name}</h2>
      {selectedGoal?.id === goal?.id && (
        <RiDeleteBinLine
          className='absolute right-2 z-10 h-4 w-4 bg-yellow-200 text-red-500 hover:text-red-600'
          aria-hidden='true'
          onClick={() => setIsDeleteGoalOpen(true)}
        />
      )}
      {selectedGoal?.id === goal?.id && (
        <FaEdit
          className='absolute right-7 z-10 h-4 w-4 bg-yellow-200 text-teal-500 hover:text-teal-400'
          aria-hidden='true'
          onClick={() => setIsEditGoalOpen(true)}
        />
      )}
      {isDeleteGoalOpen && (
        <DeleteGoal
          closeDeleteGoal={() => setIsDeleteGoalOpen(false)}
          goal={goal}
        />
      )}
      {isEditGoalOpen && (
        <EditGoal closeEditGoal={() => setIsEditGoalOpen(false)} goal={goal} />
      )}
    </div>
  );
};

export default Goal;
