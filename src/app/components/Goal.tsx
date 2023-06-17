'use client';
import { GoalType } from '@/types/types';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import DeleteGoal from './DeleteGoal';
const Goal = ({ goal }: { goal: GoalType }) => {
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
    console.log('clocked');
    setIsDeleteGoalOpen(true);
  }

  function closeDeleteGoal() {
    setIsDeleteGoalOpen(false);
  }

  return (
    <div className='flex items-center'>
      <h2
        onClick={() => {
          router.push(pathname + '?' + createQueryString('goal', goal.id));
        }}
      >
        {goal.name}
      </h2>

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
