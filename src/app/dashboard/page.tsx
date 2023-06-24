'use client';
import {
  setEndDate,
  setStartDate,
  setUserAuth,
} from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Activities from '../components/Activities';
// import BarChart from '../components/BarChart';
// import {
//   ClerkProvider,
//   SignedOut,
//   useAuth,
//   useUser,
// } from '@clerk/nextjs';
import moment from 'moment-timezone';
import AiActivityChat from '../components/AiActivityChat';
import AlignWithGoalPieChart from '../components/AlignWithGoalPieChart';
import CalendarChart from '../components/CalendarChart';
import CalendarChartSingle from '../components/CalendarChartSingle';
import ChartLine from '../components/ChartLine';
import DatePicker from '../components/DatePicker';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  // const { data: session, status } = useSession();
  // const { isSignedIn, user } = useUser();
  // const { isLoaded, userId, sessionId, getToken } = useAuth();

  const router = useRouter();

  const dispatch = useAppDispatch();
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

  useEffect(() => {
    router.refresh();
  }, []);

  // console.log('user', user);
  // useEffect(() => {
  //   if (!session) return;
  //   // @ts-ignore
  //   dispatch(setUserAuth(session.user));
  // }, [session]);

  // useEffect(() => {
  //   console.log('user', user);
  // }, [isLoaded, user]);

  // if (status === 'unauthenticated') {
  //   router.push(`/`);
  // }

  useEffect(() => {
    const now = moment();
    const cstTimezone = 'America/Chicago';
    const estTimezone = 'America/New_York';
    const timezone = cstTimezone;

    // Convert to the beginning of the day in EST
    const startOfToday = now.clone().tz(timezone).startOf('day').format();

    // Convert to the end of the day in EST
    const endOfToday = now.clone().tz(timezone).endOf('day').format();
    dispatch(setStartDate(startOfToday));
    dispatch(setEndDate(endOfToday));
  }, []);

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
        {/* {session?.user && !selectedGoal && <CalendarChart />} */}
        {selectedGoal && <CalendarChartSingle goal={selectedGoal} />}
        {selectedGoal && <AiActivityChat goal={selectedGoal} />}
      </section>
    </div>
  );
};

export default Dashboard;
