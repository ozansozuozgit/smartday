'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useAppSelector } from '@/src/redux/hooks';
import { ResponsiveCalendar } from '@nivo/calendar';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';

const CalendarChart = ({ goal }: any) => {
  const [goalData, setGoalData] = useState<any>([]);
  const completedGoals = useAppSelector((state) => state.user.completedGoals);
  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);
  useEffect(() => {
    // console.log('completedGoals', completedGoals);
    const getCompletedGoals = async () => {
      console.log('completedGoals' , completedGoals);

      console.log('startDate', startDate);
      console.log('endDate', endDate);
      const now = moment();
      const cstTimezone = 'America/Chicago';
      const estTimezone = 'America/New_York';

      // Convert to the beginning of the day in EST
      const startOfToday = now.clone().tz(estTimezone).startOf('day');

      // Convert to the end of the day in EST
      const endOfToday = now.clone().tz(estTimezone).endOf('day');

      // Format the dates as ISO strings
      const startOfTodayISO = startOfToday.toISOString();
      const endOfTodayISO = endOfToday.toISOString();

      console.log('Start of today (EST):', startOfTodayISO);
      console.log('End of today (EST):', endOfTodayISO);
    console.log('completedGoals' , completedGoals);
      const res = await fetch(
        `${getBaseUrl()}/api/completed-goals?startDate=${startOfToday}&endDate=${endOfToday}`
      );
      const goalResult = await res.json();
      // dispatch(setSelectedGoal(goalResult));
      console.log('the goals fetch for calendar', goalResult);
    };
    getCompletedGoals();
  }, []);
  const data = [
    {
      value: 41,
      day: '2015-10-18',
    },
    {
      value: 119,
      day: '2017-12-28',
    },
    {
      value: 261,
      day: '2018-07-22',
    },
    {
      value: 320,
      day: '2016-07-21',
    },
    {
      value: 396,
      day: '2015-05-12',
    },
    {
      value: 40,
      day: '2016-06-20',
    },
  ];

  return (
    <div className='h-[500px] w-[500px]'>
      <ResponsiveCalendar
        data={data}
        from='2015-03-01'
        to='2016-07-12'
        emptyColor='#eeeeee'
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor='#ffffff'
        dayBorderWidth={2}
        dayBorderColor='#ffffff'
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    </div>
  );
};

export default CalendarChart;
