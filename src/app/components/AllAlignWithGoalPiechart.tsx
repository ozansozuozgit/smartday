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
      <div className='pie-chart-container-2 mx-2 flex h-[400px] w-full  max-w-full rounded-xl bg-white p-4 shadow-warm'>
        <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
          No Activities
        </h2>
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
    <div className='pie-chart-container-2 mx-2 flex h-[400px] w-full  max-w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow-warm'>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        Goal Alignment of Activities
      </h2>
      <ResponsivePie
        key='pie-chart'
        data={activityAlignments as any}
        margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
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
        arcLabelsTextColor="white" // Set the text color to white
        arcLabel={({ data }: any) => `${data.value}`}
        colors={(d: any) => d.data.color} // Use the assigned color for each data point
      />
    </div>
  );
};

export default AllAlignWithGoalPieChart;
