'use client';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment-timezone';
import React, { useMemo } from 'react';

interface Goal {
  id: string;
  activities: any[];
}

interface ChartLineProps {
  goal: Goal;
}

const ChartLine: React.FC<ChartLineProps> = ({ goal }) => {
  const formattedActivities = useMemo(() => {
    if (!goal.activities || goal.activities.length === 0) return [];

    return goal.activities.map((activity: any) => ({
      ...activity,
      createdAt: moment(activity.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
    }));
  }, [goal.activities]);

  const specificGoalChartData = useMemo(() => {
    if (formattedActivities.length === 0) return null;

    return {
      id: goal.id,
      data: formattedActivities
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map((activity: any) => ({
          x: activity.createdAt,
          y: activity.percentage,
        })),
    };
  }, [formattedActivities, goal.id]);

  if (!formattedActivities.length) {
    return (
      <div className='h-[400px] max-h-[400px]  max-w-full rounded-xl bg-white p-6 shadow-md '>
        <h3 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
          No Activities
        </h3>
      </div>
    );
  }

  const xAxisTickValues =
    specificGoalChartData.data.length > 5
      ? specificGoalChartData.data.filter(
          (_: any, index: any) => index % 2 === 0
        )
      : specificGoalChartData.data;

  return (
    <div className='flex h-[400px] max-h-[400px] max-w-full flex-col rounded-xl bg-white p-6 shadow-md '>
      <h3 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
        Activity Goal Alignment by Category
      </h3>
      <ResponsiveLine
        data={[specificGoalChartData]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        axisBottom={{
          tickValues: xAxisTickValues.map((activity: any) => activity.x),
          format: (value) => moment(value).format('MMM DD, YYYY'),
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Goal Progress',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        useMesh={true}
        enablePointLabel={true}
        enableGridX={false}
        pointLabelYOffset={-12}
        curve='natural'
        tooltip={({ point }: any) => (
          <strong>
            {moment(point.data.xFormatted).format('HH:mm:ss')}
            {': '}
            {point.data.y}%
          </strong>
        )}
      />
    </div>
  );
};

export default ChartLine;
