'use client';
import { ResponsiveLine } from '@nivo/line';
import { groupBy, map, size } from 'lodash';
import moment from 'moment';
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

    const validActivities = goal.activities?.filter(
      (activity) => activity.createdAt && moment(activity.createdAt).isValid()
    );

    const groupedActivities = groupBy(validActivities, (activity) =>
      moment(activity.createdAt).format('YYYY-MM-DD')
    );

    return map(groupedActivities, (activities, date) => ({
      x: new Date(date), // convert string to Date object
      y: size(activities),
    })).sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());
    
  }, [goal.activities]);

  const specificGoalChartData = useMemo(() => {
    if (formattedActivities.length === 0) return null;

    return {
      id: goal.id,
      data: formattedActivities,
    };
  }, [formattedActivities, goal.id]);
  console.log(goal.activities.map(a => a.createdAt)); // log all createdAt dates
  console.log(formattedActivities); // log formatted activities
  
  if (!formattedActivities.length) {
    return (
      <div className='h-[400px] max-h-[400px]  max-w-full rounded-xl bg-white p-6 shadow-warm '>
        <h3 className='mb-4 font-roboto text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl md:text-2xl'>
          No Activities
        </h3>
      </div>
    );
  }

  const xAxisTickValues =
    specificGoalChartData.data.length > 5
      ? specificGoalChartData.data?.filter(
          (_: any, index: any) => index % 2 === 0
        )
      : specificGoalChartData.data;


      console.log('specificGoalChartData', specificGoalChartData)

  return (
    <div className='flex h-[400px] max-h-[400px] max-w-full flex-col rounded-xl bg-white p-6 shadow-warm '>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        Activity Progress Over Time
      </h2>
      <ResponsiveLine
        data={[specificGoalChartData]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: 'YYYY-MM-DD',
          useUTC: false,
          precision: 'day',
        }}
        axisBottom={{
          tickValues: 'every 2 days',
          format: '%b %d, %Y',
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Activities',
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
