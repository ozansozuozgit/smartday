'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { GoalType } from '@/types/types';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

const Goal = ({
  goal,
  deleteGoalFromState,
}: {
  goal: GoalType;
  deleteGoalFromState: (goal: GoalType) => void;
}) => {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const deleteGoal = async () => {
    try {
      const res = await fetch(`${getBaseUrl()}/api/goal/?goalId=${goal.id}`, {
        method: 'PATCH',
      });
      const deletedGoal = await res.json();
      deleteGoalFromState(deletedGoal);
      router.push(pathname);
    } catch (err) {
      console.log(err);
    }
  };

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
        onClick={deleteGoal}
      />
    </div>
  );
};

export default Goal;
