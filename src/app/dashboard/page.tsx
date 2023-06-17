'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setSelectedGoal, setUserAuth } from '@/src/redux/features/userSlice';
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
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

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
    const getGoalandActivities = async () => {
      const res = await fetch(
        `${getBaseUrl()}/api/goal?goalId=${searchParams.get('goal')}`
      );
      const goal = await res.json();
      dispatch(setSelectedGoal(goal));
      setGoal(goal);
      setAllActivities(goal?.activities);
      console.log('the goal fetch was', goal);
    };
    getGoalandActivities();
  }, [searchParams]);

  console.log('session', session);

  useEffect(() => {
    if (!session) return;
    // @ts-ignore
    dispatch(setUserAuth(session.user));
  }, [session]);
  
  if (status === 'unauthenticated') {
    router.push(`/`);
  }

  return (
    <div>
      <section className='bg-gray'>
        {/* <Goals /> */}
        {selectedGoal && (
          <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center w-1/2 p-12 bg-white rounded-lg shadow-lg'>
              <h1 className='text-2xl font-bold'>Goal: {selectedGoal?.name}</h1>
              <p className='text-xl font-bold'>
                Percentage: {selectedGoal?.percentage}%
              </p>
            </div>
          </div>
        )}

        {selectedGoal && (
          <Activities
            goal={goal}
            allActivities={allActivities}
            updateGoalPercentage={updateGoalPercentage}
          />
        )}
        {selectedGoal && <ChartLine goal={selectedGoal} />}
        {selectedGoal && <PieChart goal={selectedGoal} />}
        {selectedGoal && <BarChart goal={selectedGoal} />}
      </section>
    </div>
  );
};

export default Dashboard;
