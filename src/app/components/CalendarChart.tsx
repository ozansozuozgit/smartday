'use client';
import { useAppSelector } from '@/src/redux/hooks';
import { getTimes } from '@/src/utils/timeHelpers';
import { ResponsiveCalendar } from '@nivo/calendar';
import moment from 'moment-timezone';

const CalendarChart = ({ completedGoals }: any) => {
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

  const fetchCompletedGoals = () => {
    return completedGoals
      ?.filter((goal: any) => goal.completedAt)
      .map((goal: any) => ({
        day: moment(goal.completedAt).format('YYYY-MM-DD'),
        value: 50,
        name: goal.name,
      }));
  };

  const CustomTooltip = ({ day }: any) => {
    const goals = fetchCompletedGoals();
    const goal: any = goals?.find((goal: any) => goal.day === day);
    return (
      <div>
        <div>Date: {day}</div>
        {goal && <div>Goal: {goal.name}</div>}
      </div>
    );
  };
  const goalData = fetchCompletedGoals();

  return (
    <div className='m-auto flex h-[450px] flex-col rounded-xl bg-white p-6 shadow-warm sm:h-[400px] xl:max-w-[1500px] '>
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
        tooltip={({ day }: any) => <CustomTooltip day={day} />}
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
