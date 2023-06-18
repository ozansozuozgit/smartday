'use client';
import { setUserAuth } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Activities from '../components/Activities';
// import BarChart from '../components/BarChart';
import ChartLine from '../components/ChartLine';
import DatePicker from '../components/DatePicker';
import PieChart from '../components/PieChart';
import AlignWithGoalPieChart from '../components/AlignWithGoalPieChart';
import CalendarChart from '../components/CalendarChart';
import CalendarChartSingle from '../components/CalendarChartSingle';
const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

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
        <DatePicker />
        {selectedGoal && <Activities goal={selectedGoal} />}
        {selectedGoal && <ChartLine goal={selectedGoal} />}
        {selectedGoal && <PieChart goal={selectedGoal} />}
        {selectedGoal && <AlignWithGoalPieChart goal={selectedGoal} />}
        {session?.user && <CalendarChart />}
        {selectedGoal && <CalendarChartSingle goal={selectedGoal} />}

      </section>
    </div>
  );
};

export default Dashboard;
