'use client';
import { ResponsiveBar } from '@nivo/bar';
import React from 'react';

const BarChart = ({ goal }: any) => {
  const startDate = new Date('2023-06-16');
  const endDate = new Date('2023-06-17');

  const transformedData = goal.activities
    .filter((activity) => {
      const activityDate = new Date(activity.createdAt);
      return activityDate >= startDate && activityDate <= endDate;
    })
    .map((activity) => ({
      activity: activity.name,
      aligns: activity.alignsWithGoal ? 1 : 0,
      doesNotAlign: activity.alignsWithGoal ? 0 : 1,
    }));

  return (
    <div className='h-[400px] w-[500px]'>
      <h3>Activity Completion Timeline Pie</h3>
      <ResponsiveBar
        data={transformedData}
        keys={['aligns', 'doesNotAlign']}
        indexBy='activity'
        groupMode='stacked'
        colors={{ scheme: 'nivo' }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat={{ format: '', enabled: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'activity',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          //   legend: 'count',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableLabel={false}
        enableGridX={false}
        enableGridY={false}
        isInteractive={true}
        theme={{
          tooltip: {
            container: {
              background: '#333',
            },
          },
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default BarChart;
