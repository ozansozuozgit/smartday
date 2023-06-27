'use client';
import { useAppSelector } from '@/src/redux/hooks';
import { generateRandomColors } from '@/src/utils/colorUtils';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment';
import React from 'react';

const CategoryChart = ({ goal }: any) => {
  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div className='pie-chart-container mx-2 flex h-[500px] w-full max-w-full rounded-xl bg-white p-4 shadow-md'>
        <h3 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
          No Activities
        </h3>
      </div>
    );
  }
  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  const transformedData = goal.activities.filter((activity) => {
    const activityDate = moment(activity.createdAt);
    return activityDate.isBetween(startMoment, endMoment, 'day', '[]');
  });
  const categoryCount = transformedData.reduce((count: any, activity: any) => {
    const { categoryName } = activity;
    if (categoryName) {
      count[categoryName] = (count[categoryName] || 0) + 1;
    } else {
      count['Other'] = (count['Other'] || 0) + 1;
    }
    return count;
  }, {});

  const categoryChartData = Object.entries(categoryCount).map(
    ([categoryName, count]: any) => ({
      id: categoryName,
      value: count,
    })
  );

  // Generate random colors for each category
  const categoryColors = generateRandomColors(categoryChartData.length);

  // Assign the generated colors to the categoryChartData
  categoryChartData.forEach((data: any, index) => {
    data.color = categoryColors[index];
  });

  return (
    <div className='pie-chart-container mx-2 flex h-[500px] w-full max-w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md'>
      <h2 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
        Category Distribution Overview
      </h2>
      <div className='h-full w-full'>
        <ResponsivePie
          data={categoryChartData as any}
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
          arcLabel={({ data }: any) =>
            `${((data.value / transformedData.length) * 100).toFixed(2)}%`
          }
          tooltip={({ datum }) => `${datum.id}: ${datum.value}`}
          arcLabelsRadiusOffset={0.6} // Adjust the radius offset for label positioning
          arcLabelsSkipLabelThreshold={10} // Skip labels for small slices
          colors={(datum: any) => datum.data.color}
        />
      </div>
    </div>
  );
};

export default CategoryChart;
