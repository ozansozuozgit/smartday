'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setUserAuth } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Activities from '../components/Activities';
import BarChart from '../components/BarChart';
import ChartLine from '../components/ChartLine';
import PieChart from '../components/PieChart';
const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [goal, setGoal] = useState<any>(null);
  const [allActivities, setAllActivities] = useState<any>([]);

  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const updateGoalPercentage = async (action: string, percentage: number) => {
    if (action === 'add') {
      const newPercentage = goal.percentage + percentage;
      setGoal({ ...goal, percentage: newPercentage });
    }
    if (action === 'subtract') {
      const newPercentage = goal.percentage - percentage;
      setGoal({ ...goal, percentage: newPercentage });
    }
  };

  useEffect(() => {
    const getGoals = async () => {
      const res = await fetch(
        `${getBaseUrl()}/api/goal?goalId=${searchParams.get('goal')}`
      );
      const goal = await res.json();
      setGoal(goal);
      setAllActivities(goal?.activities);
      console.log('the goal fetch was', goal);
    };
    getGoals();
  }, [searchParams]);

  console.log('session', session);

  useEffect(() => {
    if (!session) return;

    // @ts-ignore
    dispatch(setUserAuth(session.user));
  }, []);
  if (status === 'unauthenticated') {
    router.push(`/`);
  }

  return (
    <div>
      <section className='bg-gray'>
        {/* <Goals /> */}
        {goal && (
          <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center w-1/2 p-12 bg-white rounded-lg shadow-lg'>
              <h1 className='text-2xl font-bold'>Goal: {goal?.name}</h1>
              <p className='text-xl font-bold'>
                Percentage: {goal?.percentage}%
              </p>
            </div>
          </div>
        )}

        {goal && (
          <Activities
            goal={goal}
            allActivities={allActivities}
            updateGoalPercentage={updateGoalPercentage}
          />
        )}
        {goal && <ChartLine goal={goal} />}
        {goal && <PieChart goal={goal} />}
        {goal && <BarChart goal={goal} />}
      </section>
    </div>
  );
};

export default Dashboard;
