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

  return (
    <div className='bg-gray'>
      <section className='m-auto w-[95%] pt-[50px] max-w-[2000px] '>
        <div className='flex flex-col gap-5'>
          {/* <DatePicker /> */}
          <div className='flex flex-col gap-5 justify-center items-center'>
            <h2 className='text-[30px] font-bold font-roboto text-center uppercase tracking-wide'>
              {selectedGoal ? selectedGoal?.name : 'Overall Progress'}
            </h2>
            {/* Percentage finished */}
            {selectedGoal && (<h3 className='text-xl font-roboto'>{selectedGoal.percentage}/100</h3>)}
          </div>
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
