'use client';
import { setEndDate, setStartDate } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import React, { useEffect } from 'react';
import Activities from '../components/Activities';

import moment from 'moment-timezone';
import AiActivityChat from '../components/AiActivityChat';
import AlignWithGoalPieChart from '../components/AlignWithGoalPieChart';
import CalendarChart from '../components/CalendarChart';
import CalendarChartSingle from '../components/CalendarChartSingle';
import CategoryChart from '../components/CategoryChart';
import ChartLine from '../components/ChartLine';
import Overview from '../components/Overview';
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
    console.log('startOfToday', startOfToday);
    dispatch(setStartDate(startOfToday));
    dispatch(setEndDate(endOfToday));
  }, []);

  return (
    <div className='bg-gray relative py-12 z-1 min-h-screen'>
      <section className='m-auto w-[95%] max-w-[2000px] pt-[100px]'>
    

        <div className='grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-[50px] 2xl:gap-y-[50px] place-items-center	'>
          {selectedGoal && <Activities goal={selectedGoal} />}
          {selectedGoal && <PieChart goal={selectedGoal} />}

          {selectedGoal && <AlignWithGoalPieChart goal={selectedGoal} />}

          {selectedGoal && <AiActivityChat goal={selectedGoal} />}
          <div className='col-span-1 xl:col-span-2  w-full'>
            {selectedGoal && <ChartLine goal={selectedGoal} />}
          </div>
          {selectedGoal && <CategoryChart goal={selectedGoal} />}

          <div className='col-span-1 xl:col-span-2  w-full'>
            {selectedGoal && <CalendarChartSingle goal={selectedGoal} />}
          </div>
        </div>
        {!selectedGoal && <Overview />}
      </section>
    </div>
  );
};

export default Dashboard;
