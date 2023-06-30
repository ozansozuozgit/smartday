import { getBaseUrl } from '@/lib/getBaseUrl';
import { setAllActivities } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { getTimes } from '@/src/utils/timeHelpers';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import AllActivities from './AllActivities';
import AllActivitiesBarChart from './AllActivitiesBarChart';
import AllAlignWithGoalPieChart from './AllAlignWithGoalPiechart';
import CalendarChart from './CalendarChart';
import DateLabel from './DateLabel';
import FrequencyLineChart from './FrequencyLineChart';
import * as Sentry from '@sentry/nextjs';

const Overview = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state) =>
    state.user.startDate
      ? moment(state.user.startDate).toISOString()
      : getTimes().startOfToday
  );
  const endDate = useAppSelector((state) =>
    state.user.endDate
      ? moment(state.user.endDate).toISOString()
      : getTimes().endOfToday
  );
  const allActivities = useAppSelector((state) => state.user.allActivities);
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

  const fetchActivities = async (start: any, end: any) => {
    try {
      const res = await fetch(
        `${getBaseUrl()}/api/all-activities?startDate=${start}&endDate=${end}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await res.json();
      if (data.length === 0) data = [];
      dispatch(setAllActivities(data));
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchActivities(startDate, endDate);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [startDate, endDate]);
  return (
    <div className='m-auto grid max-w-full place-items-center gap-[50px] lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[450px] 3xl:grid-cols-3'>
      <div className='col-span-1 w-full xl:col-span-3'>
        {!selectedGoal && (
          <div className='flex max-w-full items-center justify-between px-6 py-4 font-roboto text-gray-800 shadow-warm'>
            <h2 className='text-xl font-bold xl:text-3xl'>
              Overview Dashboard{' '}
            </h2>
            <DateLabel />
          </div>
        )}
      </div>
      {!selectedGoal && (
        <>
          <div className='col-span-1 w-full  xl:col-span-2'>
            <AllActivities activities={allActivities} />
          </div>
          <AllAlignWithGoalPieChart activities={allActivities} />

          <AllActivitiesBarChart activities={allActivities} />
          <div className='col-span-1 w-full  xl:col-span-2'>
            <FrequencyLineChart activities={allActivities} />
          </div>

          <div className='col-span-1 w-full  xl:col-span-3'>
            <CalendarChart />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
