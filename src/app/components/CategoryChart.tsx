'use client';
import { useAppSelector } from '@/src/redux/hooks';
import { generateRandomColors } from '@/src/utils/colorUtils';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment';
import React from 'react';

const CategoryChart = ({ goal }: any) => {
  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div className='pie-chart-container mx-2 flex h-[400px] w-full  max-w-full justify-center rounded-xl bg-white p-4 shadow-md'>
        <h2 className='mb-0 mt-2 self-baseline font-roboto text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl md:text-2xl'>
          No Activities
        </h2>
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
    <div className='pie-chart-container-2 mx-2 flex h-[400px] w-full  max-w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md'>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        Category Distribution Overview
      </h2>
      <div className='flex h-full w-[200px] flex-col items-center justify-center lg:w-[400px]'>
        <ResponsivePie
          data={categoryChartData as any}
          margin={{ top: 40, right: 0, bottom: 40, left: 0 }}
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
