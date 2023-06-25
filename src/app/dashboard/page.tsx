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
  const dispatch = useAppDispatch();
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

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

  const getPercentageDescription = (percentage: number) => {
    if (percentage < 25) {
      return 'Keep pushing! You can do it!';
    } else if (percentage < 50) {
      return 'Great progress! Stay determined!';
    } else if (percentage < 75) {
      return 'You are getting closer! Keep going!';
    } else if (percentage < 100) {
      return 'Almost there! You are doing amazing!';
    } else {
      return 'Congratulations! Goal achieved!';
    }
  };

  return (
    <div className='bg-gray'>
      <section className='m-auto w-[95%] pt-[50px] max-w-[2000px] '>
        <div className='flex flex-col gap-5 justify-center items-center my-12'>
          <h2 className='text-4xl font-bold font-roboto text-center uppercase tracking-wide '>
            {selectedGoal ? (
              <>
                <span>{selectedGoal.name}</span>
                <span className='border-b-2 border-pink'></span>
              </>
            ) : (
              'Overall Progress'
            )}
          </h2>
          {selectedGoal && (
            <h3 className='text-2xl font-roboto'>
              {selectedGoal.percentage}/100 -{' '}
              {getPercentageDescription(selectedGoal.percentage)}
            </h3>
          )}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-[50px] 2xl:gap-y-[50px] place-items-center	'>
          {selectedGoal && <Activities goal={selectedGoal} />}
          {selectedGoal && <PieChart goal={selectedGoal} />}

          {selectedGoal && <AlignWithGoalPieChart goal={selectedGoal} />}

          {selectedGoal && <AiActivityChat goal={selectedGoal} />}
          <div className='col-span-1 xl:col-span-2  w-full'>
            {selectedGoal && <ChartLine goal={selectedGoal} />}
          </div>
          <div className='col-span-1 xl:col-span-2 3xl:col-span-3  w-full'>
            {selectedGoal && <CalendarChartSingle goal={selectedGoal} />}
          </div>
        </div>
        {/* {!selectedGoal && <CalendarChart />} */}
      </section>
    </div>
  );
};

export default Dashboard;
