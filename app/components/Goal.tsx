'use client';
import { GoalType } from '@/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
const Goal = ({ goal }: { goal: GoalType }) => {
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

  return (
    <div>
      <h2
        onClick={() => {
          router.push(pathname + '?' + createQueryString('goal', goal.id));
        }}
      >
        {goal.name}
      </h2>
    </div>
  );
};

export default Goal;
