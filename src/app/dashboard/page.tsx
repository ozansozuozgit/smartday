'use client';
import { setEndDate, setStartDate } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import React, { useEffect } from 'react';

import moment from 'moment-timezone';

import GoalOverview from '../components/GoalOverview';
import Overview from '../components/Overview';

const Dashboard = () => {
  const dispatch = useAppDispatch();

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
      <section className='m-auto w-[90%] 2xl:w-[95%]  xl:max-w-[1500px] pt-[50px]'>
        <Overview />
        <GoalOverview />
      </section>
    </div>
  );
};

export default Dashboard;
