import { ResponsiveBar } from '@nivo/bar';
import React from 'react';

const AllActivitiesBarChart = ({ activities }: any) => {
  if (!activities || activities.length === 0) {
    return (
      <div className='p-6 h-[500px]  max-w-full max-h-[500px] bg-white rounded-xl shadow-md '>
        <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
          No Activities
        </h3>
      </div>
    );
  }

  // Group activities by category
  const groupedActivities = activities.reduce((groups: any, activity: any) => {
    const key = activity.category?.name ?? 'Uncategorized';
    if (!groups[key]) {
      groups[key] = {
        category: key,
        align: 0,
        notAlign: 0,
      };
    }
    if (activity.alignsWithGoal) {
      groups[key].align += activity.percentage;
    } else {
      groups[key].notAlign += activity.percentage;
    }
    return groups;
  }, {});

  // Prepare the data for the chart
  const chartData = Object.values(groupedActivities);

  return (
    <div className='p-6 h-[500px] flex flex-col max-w-full max-h-[500px] bg-white rounded-xl shadow-md '>
      <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
        Activity Goal Alignment by Category
      </h3>
      <ResponsiveBar
        data={chartData}
        keys={['align', 'notAlign']}
        indexBy="category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Category',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Goal Progress',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        groupMode="grouped"
      />
    </div>
  );
};

export default AllActivitiesBarChart;
