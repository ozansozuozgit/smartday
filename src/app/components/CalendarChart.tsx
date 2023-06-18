'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useAppSelector } from '@/src/redux/hooks';
import { ResponsiveCalendar } from '@nivo/calendar';
import debounce from 'lodash.debounce';
import moment from 'moment-timezone';
import React, { useCallback, useEffect, useState } from 'react';

const CalendarChart = () => {
  const [goalData, setGoalData] = useState<any>([]);
  const startDate = useAppSelector((state) =>
    state.user.startDate ? moment(state.user.startDate).toISOString() : ''
  );
  const endDate = useAppSelector((state) =>
    state.user.endDate ? moment(state.user.endDate).toISOString() : ''
  );
  const now = moment();
  const cstTimezone = 'America/Chicago';
  const estTimezone = 'America/New_York';

  const startOfToday: Date = now
    .clone()
    .tz(estTimezone)
    .startOf('day')
    .toDate();
  const endOfToday: Date = now.clone().tz(estTimezone).endOf('day').toDate();

  const getCompletedGoals = useCallback(
    async (start?: string | Date, end?: string | Date) => {
      const res = await fetch(
        `${getBaseUrl()}/api/completed-goals?startDate=${
          start ? start : startOfToday
        }&endDate=${end ? end : endOfToday}`
      );
      const goalResult = await res.json();
      const parsedData = goalResult.map((goal: any) => ({
        day: moment(goal.completedAt).format('YYYY-MM-DD'),
        value: 50,
        name: goal.name, // Add the 'name' property
      }));
      setGoalData(parsedData);
    },
    []
  );
  const CustomTooltip = ({ day }: any) => {
    const goal = goalData.find((item: any) => item.day === day);
    return (
      <div>
        <div>Date: {day}</div>
        {goal && <div>Goal: {goal.name}</div>}
      </div>
    );
  };
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getCompletedGoals(startDate, endDate);
    }, 500); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [startDate, endDate, getCompletedGoals]);
  return (
    <div className='h-[500px] w-[500px]'>
      {goalData.length && (
        <ResponsiveCalendar
          data={goalData}
          from={startDate ? startDate : startOfToday}
          to={endDate ? endDate : endOfToday}
          emptyColor='#eeeeee'
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor='#ffffff'
          dayBorderWidth={2}
          dayBorderColor='#ffffff'
          tooltip={CustomTooltip} // Use the custom tooltip component
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
      )}
    </div>
  );
};

export default CalendarChart;
