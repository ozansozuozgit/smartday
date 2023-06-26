'use client';
import { ResponsiveBar } from '@nivo/bar';
import React from 'react';

interface Activity {
  alignsWithGoal: boolean;
  category?: {
    name: string;
  };
  percentage: number;
}

interface Props {
  activities: Activity[];
}

const AllActivitiesBarChart: React.FC<Props> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className='pie-chart-container mx-2 flex h-[500px] w-full max-w-full rounded-xl bg-white p-4 shadow-md'>
        {' '}
        <h3 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
          No Activities
        </h3>
      </div>
    );
  }

  const groupedActivities: { [key: string]: any } = activities.reduce(
    (groups, activity) => {
      const { name: key = 'Uncategorized' } = activity.category ?? {};
      groups[key] = groups[key] || { category: key, align: 0, notAlign: 0 };
      groups[key][activity.alignsWithGoal ? 'align' : 'notAlign'] +=
        activity.percentage;
      return groups;
    },
    {}
  );

  const chartData = Object.values(groupedActivities);

  const colorMapping = {
    align: '#0fb69b',
    notAlign: '#FF5757',
  };

  return (
    <div className='flex h-[500px] w-full max-w-full flex-col rounded-xl  bg-white p-6 shadow-md '>
      <h3 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
        Activity Goal Alignment by Category
      </h3>
      <ResponsiveBar
        data={chartData}
        keys={['align', 'notAlign']}
        indexBy='category'
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={(d) => colorMapping[d.id]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Category',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Goal Progress',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        groupMode='grouped'
      />
    </div>
  );
};

export default AllActivitiesBarChart;
