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
import FrequencyLineChart from './FrequencyLineChart';

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
      if (data.length === 0) data = null;
      dispatch(setAllActivities(data));
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
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
    <div className='grid max-w-full grid-cols-1 place-items-center gap-[50px] lg:grid-cols-1 xl:grid-cols-2 2xl:gap-y-[50px] 3xl:grid-cols-3'>
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

          <div className='col-span-1 w-full  xl:col-span-2'>
            <CalendarChart />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
