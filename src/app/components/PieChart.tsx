'use client';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment-timezone';
import React from 'react';
interface Colors {
  [key: string]: string;
}
const PieChart = ({ goal }: any) => {
  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div className='pie-chart-container mx-2 flex h-[500px] w-full max-w-full rounded-xl bg-white p-4 shadow-md'>
        <h3 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
          No Activities
        </h3>
      </div>
    );
  }
  const cstTimezone = 'America/Chicago';
  const estTimezone = 'America/New_York';

  const timezone = cstTimezone;
  const todayEST = moment().tz(timezone).startOf('day');

  const dailyActivities = goal?.activities.filter((activity: any) => {
    const activityDate = moment(activity.createdAt).tz(timezone).startOf('day');
    return activityDate.isSame(todayEST, 'day');
  });

  const activityGroups = dailyActivities.reduce((acc: any, activity: any) => {
    if (!acc[activity.name]) {
      acc[activity.name] = {
        id: activity.name,
        label: activity.name,
        value: 0,
      };
    }

    acc[activity.name].value += activity.percentage;

    return acc;
  }, {});

  // Convert the grouped object back into an array
  const groupedActivities = Object.values(activityGroups);

  const totalPercentageDone: any = groupedActivities.reduce(
    (acc: any, activity: any) => acc + activity.value,
    0
  );
  const remainingPercentage: any = 100 - totalPercentageDone;

  // Add the remaining percentage slice
  if (remainingPercentage > 0) {
    groupedActivities.push({
      id: 'remaining',
      label: 'Remaining',
      value: remainingPercentage,
    });
  }

  const colors: Colors = {
    indigo: '#6655FE',
    orange: '#FE9945',
    pink: '#EB6FF9',
    teal: '#0fb69b',
    blue: '#50BAFF',
  };

  const getRandomColor = () => {
    const colorKeys = Object.keys(colors);
    const randomColorKey =
      colorKeys[Math.floor(Math.random() * colorKeys.length)];
    return colors[randomColorKey];
  };

  const randomizeColors = () => {
    const uniqueColors = new Set();
    const randomizedColors = groupedActivities.map((activity: any) => {
      console.log(activity.label);

      if (activity.label === 'Remaining') {
        console.log(activity.label);
        return '#CCCCCC'; // Specify the color for "Remaining" activity
      }

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
    <div className='pie-chart-container mx-2 flex h-[500px] w-full max-w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md'>
      <h2 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
        Daily Activity Breakdown
      </h2>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <ResponsivePie
          data={groupedActivities as any}
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
          arcLabel={({ data }: any) => `${data.value}%`}
          colors={randomizeColors()}
        />
      </div>
    </div>
  );
};

export default PieChart;
