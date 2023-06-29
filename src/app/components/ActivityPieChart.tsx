'use client';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment-timezone';
import React from 'react';

import { generateRandomColors } from '@/src/utils/colorUtils';

const ActivityPieChart = ({ goal }) => {
  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div className='pie-chart-container mx-2 flex h-[400px] w-full max-w-full flex-col rounded-xl bg-white p-4 shadow-warm'>
        <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
          No Activities
        </h2>
      </div>
    );
  }

  const cstTimezone = 'America/Chicago';
  const estTimezone = 'America/New_York';

  const timezone = cstTimezone;
  const todayEST = moment().tz(timezone).startOf('day');

  const dailyActivities = goal?.activities.filter((activity) => {
    const activityDate = moment(activity.createdAt).tz(timezone).startOf('day');
    return activityDate.isSame(todayEST, 'day');
  });

  const activityGroups = dailyActivities.reduce((acc, activity) => {
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

  const groupedActivities = Object.values(activityGroups);

  const totalPercentageDone = groupedActivities.reduce(
    (acc, activity) => acc + activity.value,
    0
  );
  const remainingPercentage = 100 - totalPercentageDone;

  if (remainingPercentage > 0) {
    groupedActivities.push({
      id: 'remaining',
      label: 'Remaining',
      value: remainingPercentage,
    });
  }

  const randomizeColors = () => {
    const randomizedColors = groupedActivities.map((activity) => {
      if (activity.label === 'Remaining') {
        return '#CCCCCC'; // Specify the color for "Remaining" activity
      }
      return generateRandomColors(1);
    });
    return randomizedColors;
  };

  return (
    <div className='pie-chart-container mx-2 flex h-[400px] w-full max-w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow-warm'>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        Daily Activity Breakdown
      </h2>
      <div className='flex h-full w-[200px] flex-col items-center justify-center lg:w-[400px]'>
        <ResponsivePie
          data={groupedActivities}
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
          arcLabel={({ data }) => `${data.value}%`}
          colors={randomizeColors()}
        />
      </div>
    </div>
  );
};

export default ActivityPieChart;
