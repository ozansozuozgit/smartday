'use client'
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment-timezone';
import React from 'react';

const AllCategoryPieChart = ({ activities }: any) => {
  if (!activities || activities.length === 0) {
    return (
      <div className='h-[500px] max-w-full sm:max-w-xl mx-2 bg-white rounded-xl shadow-md p-4 pie-chart-container w-[550px]'>
        <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
          No Activities
        </h3>
      </div>
    );
  }

  const categories = activities.reduce((acc: any, activity: any) => {
    const category = activity.category?.name ?? 'Other';
    if (!acc[category]) {
      acc[category] = {
        id: category,
        label: category,
        value: 0,
      };
    }
    acc[category].value += 1; // Increase count for each activity in the category
    return acc;
  }, {});

  const activityCategories = Object.values(categories);

  // Function to randomize colors same as in your code
  const colors: any = {
    indigo: '#6655FE',
    orange: '#FE9945',
    pink: '#EB6FF9',
    teal: '#0fb69b',
    blue: '#50BAFF',
  };

  const getRandomColor = () => {
    const colorKeys = Object.keys(colors);
    const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    return colors[randomColorKey];
  };

  const randomizeColors = () => {
    const uniqueColors = new Set();
    const randomizedColors = activityCategories.map(() => {
      let color = getRandomColor();
      while (uniqueColors.has(color)) {
        color = getRandomColor();
      }
      uniqueColors.add(color);
      return color;
    });
    return randomizedColors;
  };

  return (
    <div className='h-[500px] max-w-full sm:max-w-xl mx-2 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center pie-chart-container w-[550px]'>
      <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
        Activities by Category
      </h2>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <ResponsivePie
          data={activityCategories as any}
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
          colors={randomizeColors()}
        />
      </div>
    </div>
  );
};

export default AllCategoryPieChart;
