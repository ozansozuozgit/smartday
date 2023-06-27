'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useAppSelector } from '@/src/redux/hooks';
import { getTimes } from '@/src/utils/timeHelpers';
import { ResponsiveCalendar } from '@nivo/calendar';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';

const CalendarChart = () => {
  const [goalData, setGoalData] = useState([]);
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

  const fetchCompletedGoals = async (start: any, end: any) => {
    const res = await fetch(
      `${getBaseUrl()}/api/completed-goals?startDate=${start}&endDate=${end}`
    );
    const goals = await res.json();

    return goals.map((goal: any) => ({
      day: moment(goal.completedAt).format('YYYY-MM-DD'),
      value: 50,
      name: goal.name,
    }));
  };

  const CustomTooltip = ({ day }: any) => {
    const goal: any = goalData.find((item: any) => item.day === day);
    return (
      <div>
        <div>Date: {day}</div>
        {goal && <div>Goal: {goal.name}</div>}
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompletedGoals(startDate, endDate).then(setGoalData);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [startDate, endDate]);

  return (
    <div className='h-[450px] sm:h-[400px] sm:max-w-[1500px] m-auto bg-white rounded-xl shadow-md p-6 flex flex-col '>
      <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
        Activity Completion Calendar
      </h3>
      <ResponsiveCalendar
        data={goalData}
        from={startDate}
        to={endDate}
        emptyColor='#eeeeee'
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor='#ffffff'
        dayBorderWidth={2}
        dayBorderColor='#ffffff'
        tooltip={CustomTooltip}
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
