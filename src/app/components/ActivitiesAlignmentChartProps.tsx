'use client';
import { ResponsiveBar } from '@nivo/bar';
import { filter, groupBy, map, size } from 'lodash';
import React, { useMemo } from 'react';
interface Activity {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  alignsWithGoal: boolean;
}

interface Goal {
  id: string;
  name: string;
  activities: Activity[];
}

interface ActivitiesAlignmentChartProps {
  goal: Goal;
}

const ActivitiesAlignmentChart: React.FC<ActivitiesAlignmentChartProps> = ({
  goal,
}) => {
  // Group activities by category and calculate the size of each group
  const data = useMemo(() => {
    if (!goal.activities || goal.activities.length === 0) return [];

    const groupedActivities = groupBy(
      goal.activities,
      (activity) => activity.categoryName || 'Other'
    );

    return map(groupedActivities, (categoryActivities, categoryName) => {
      const aligned = filter(categoryActivities, { alignsWithGoal: true });
      const notAligned = filter(categoryActivities, { alignsWithGoal: false });

      return {
        category: categoryName,
        'Aligned Activities': size(aligned),
        'Not Aligned Activities': size(notAligned),
      };
    });
  }, [goal]);

  if (!data.length) {
    return (
      <div className='pie-chart-container mx-2 flex h-[400px] w-full  max-w-full rounded-xl bg-white p-4 shadow-warm'>
        <h2 className='mb-0 mt-2 self-baseline font-roboto text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl md:text-2xl'>
          No Activities
        </h2>
      </div>
    );
  }

  return (
    <div className='pie-chart-container mx-2 flex h-[400px] w-full max-w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow-warm'>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        Category Activity Alignment
      </h2>
      <ResponsiveBar
        data={data}
        keys={['Aligned Activities', 'Not Aligned Activities']}
        indexBy='category'
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        layout='vertical'
        colors={({ id }) =>
          id === 'Aligned Activities' ? '#0fb69b' : '#FF5757'
        }
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
          legend: 'Number of Activities',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableGridY={false}
        enableLabel={false}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        groupMode='grouped'
      />
    </div>
  );
};

export default ActivitiesAlignmentChart;
