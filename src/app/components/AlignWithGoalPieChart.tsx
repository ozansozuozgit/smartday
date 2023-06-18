'use client';
import { useAppSelector } from '@/src/redux/hooks';
import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import moment from 'moment';

const AlignWithGoalPieChart = ({ goal }: any) => {
  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);

  const transformedData = goal.activities.filter((activity) => {
    const activityDate = moment(activity.createdAt);
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    return activityDate.isBetween(startMoment, endMoment, 'day', '[]');
  });

  const alignsWithGoalCount = transformedData.reduce((count, activity) => {
    if (activity.alignsWithGoal) {
      return count + 1;
    }
    return count;
  }, 0);

  const notAlignsWithGoalCount = transformedData.length - alignsWithGoalCount;

  const pieChartData = [
    { id: 'Aligns with Goal', value: alignsWithGoalCount },
    { id: 'Does Not Align with Goal', value: notAlignsWithGoalCount },
  ];

  return (
    <div className='h-[400px]'>
      <h3>Activity Completion Timeline Pie</h3>
      <ResponsivePie
        data={pieChartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
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
      />
    </div>
  );
};

export default AlignWithGoalPieChart;
