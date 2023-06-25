'use client';
import { useAppSelector } from '@/src/redux/hooks';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment';
import React from 'react';

const AlignWithGoalPieChart = ({ goal }: any) => {
  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div className='h-[500px] max-w-full sm:max-w-xl  mx-2 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center  pie-chart-container w-[550px]'>
        <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto '>
          No Activities
        </h3>
      </div>
    );
  }
  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  const transformedData = goal?.activities.filter((activity: any) => {
    const activityDate = moment(activity.createdAt);
    return activityDate.isBetween(startMoment, endMoment, 'day', '[]');
  });

  const alignsWithGoalCount = transformedData.reduce(
    (count: any, activity: any) =>
      activity.alignsWithGoal ? count + 1 : count,
    0
  );

  const notAlignsWithGoalCount = transformedData.length - alignsWithGoalCount;

  const pieChartData = [
    { id: 'Aligns with Goal', value: alignsWithGoalCount },
    { id: 'Does Not Align with Goal', value: notAlignsWithGoalCount },
  ];

  const legendData = pieChartData.map((data) => ({
    id: data.id,
    label: data.id,
    value: data.value,
  }));

  return (
    <div className='h-[500px] max-w-full sm:max-w-xl  mx-2 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center  pie-chart-container w-[550px]'>
      <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
        Activity Alignment Overview{' '}
      </h2>
      <div className='h-full w-full'>
        <ResponsivePie
          data={pieChartData as any}
          margin={{ top: 50, right: 0, bottom: 100, left: 0 }}
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
          arcLabel={({ data }: any) =>
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
              itemsSpacing: 10, // Increase spacing between legend items
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
        />
      </div>{' '}
    </div>
  );
};

export default AlignWithGoalPieChart;
