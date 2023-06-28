'use client';
import { useAppSelector } from '@/src/redux/hooks';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment';
import React from 'react';

const AlignWithGoalPieChart = ({ goal }) => {
  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div className='pie-chart-container mx-2 flex h-[400px] w-full max-w-full rounded-xl bg-white p-4 shadow-md'>
        <h2 className='mb-0 mt-2 self-baseline font-roboto text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl md:text-2xl'>
          No Activities
        </h2>
      </div>
    );
  }

  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  const transformedData = goal?.activities.filter((activity) => {
    const activityDate = moment(activity.createdAt);
    return activityDate.isBetween(startMoment, endMoment, 'day', '[]');
  });

  const alignsWithGoalCount = transformedData.reduce(
    (count, activity) => (activity.alignsWithGoal ? count + 1 : count),
    0
  );

  const notAlignsWithGoalCount = transformedData.length - alignsWithGoalCount;

  const pieChartData = [
    { id: 'Aligns with Goal', value: alignsWithGoalCount, color: '#0fb69b' },
    {
      id: 'Does Not Align with Goal',
      value: notAlignsWithGoalCount,
      color: '#FF5757',
    },
  ];

  const legendData = pieChartData.map((data) => ({
    id: data.id,
    label: data.id,
    value: data.value,
  }));

  return (
    <div className='pie-chart-container-2 mx-2 flex h-[400px] w-full max-w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md'>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        {!goal.activities || goal.activities.length === 0
          ? ' No Activities'
          : ' Activity Alignment Overview'}
      </h2>
      <div className='flex h-full w-full max-w-[300px] flex-col items-center justify-center lg:w-[400px]'>
        <ResponsivePie
          data={pieChartData}
          margin={{ top: 0, right: 30, bottom: 60, left: 30 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          enableArcLinkLabels={false}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsTextColor='#333333'
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          arcLabel={({ data }) =>
            `${((data.value / transformedData.length) * 100).toFixed(2)}%`
          }
          tooltip={({ datum }) => `${datum.id}: ${datum.value}`}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 10,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000000',
                  },
                },
              ],
            },
          ]}
          colors={(datum) => datum.data.color}
        />
      </div>
    </div>
  );
};

export default AlignWithGoalPieChart;
