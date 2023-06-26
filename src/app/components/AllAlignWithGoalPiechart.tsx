'use client';
import { ResponsivePie } from '@nivo/pie';
import React from 'react';

interface Activity {
  alignsWithGoal: boolean;
}

interface Props {
  activities: Activity[];
}

const AllAlignWithGoalPieChart: React.FC<Props> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className='h-[500px] max-w-full sm:max-w-xl mx-2 bg-white rounded-xl shadow-md p-4 pie-chart-container w-[550px]'>
        <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
          No Activities
        </h3>
      </div>
    );
  }

  const alignmentCount: { [key: string]: any } = {
    Aligned: { id: 'Aligned', label: 'Aligned', value: 0, color: '#0fb69b' },
    'Not Aligned': {
      id: 'Not Aligned',
      label: 'Not Aligned',
      value: 0,
      color: '#FF5757',
    },
  };

  activities.forEach((activity) => {
    const alignment = activity.alignsWithGoal ? 'Aligned' : 'Not Aligned';
    alignmentCount[alignment].value += 1;
  });

  const activityAlignments = Object.entries(alignmentCount).map(
    ([key, value]) => value
  );

  return (
    <div className='h-[500px] max-w-full sm:max-w-xl mx-2 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center pie-chart-container w-[550px]'>
      <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
        Goal Alignment of Activities
      </h2>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <ResponsivePie
          key='pie-chart'
          data={activityAlignments as any}
          margin={{ top: 50, right: 0, bottom: 100, left: 0 }}
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
          arcLabel={({ data }: any) => `${data.value}`}
          colors={(d: any) => d.data.color} // Use the assigned color for each data point
        />
      </div>
    </div>
  );
};

export default AllAlignWithGoalPieChart;
