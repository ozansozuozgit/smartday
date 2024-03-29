'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useAppSelector } from '@/src/redux/hooks';
import { getTimes } from '@/src/utils/timeHelpers';
import { ResponsiveCalendar } from '@nivo/calendar';
import * as Sentry from '@sentry/nextjs';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';

const CalendarChartSingle = ({ goal }: any) => {
  console.log('goal', goal);
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

  const fetchCompletedGoal = async (start: any, end: any, thegoal: any) => {
    try {
      const res = await fetch(
        `${getBaseUrl()}/api/completed-goal?startDate=${start}&endDate=${end}&goalId=${
          thegoal?.id || ''
        }`
      );
      const goalResult = await res.json();

      return goalResult.map((goal: any) => ({
        day: moment(goal.completedAt).format('YYYY-MM-DD'),
        value: 50,
        name: goal.name,
      }));
    } catch (err) {
      Sentry.captureException(err);
    }
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
      fetchCompletedGoal(startDate, endDate, goal).then(setGoalData);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [startDate, endDate, goal]);

  return (
    <div className='m-auto flex h-[450px] flex-col rounded-xl bg-white p-6 shadow-warm sm:h-[400px] sm:max-w-[1500px] '>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        Goal Completion Calendar
      </h2>
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

export default CalendarChartSingle;
