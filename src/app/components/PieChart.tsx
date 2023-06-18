'use client';
import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import moment from 'moment-timezone';

const PieChart = ({ goal }: any) => {
  const currentDate = moment().tz('America/Chicago');
  const todayEST = currentDate.clone().tz('America/New_York').startOf('day');

  const dailyActivities = goal.activities.filter((activity) => {
    const activityDate = moment(activity.createdAt).tz('America/New_York').startOf('day');
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

  // Convert the grouped object back into an array
  const groupedActivities = Object.values(activityGroups);

  const totalPercentageDone = groupedActivities.reduce(
    (acc, activity) => acc + activity.value,
    0
  );
  const remainingPercentage = 100 - totalPercentageDone;

  // Add the remaining percentage slice
  if (remainingPercentage > 0) {
    groupedActivities.push({
      id: 'remaining',
      label: 'Remaining',
      value: remainingPercentage,
    });
  }

  console.log('groupedActivities', groupedActivities);

  return (
    <div className='h-[400px]'>
      <h3>Activity Completion Timeline Pie</h3>
      <ResponsivePie
        data={groupedActivities}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
      />
      {remainingPercentage === 0 && (
        <div>
          <h2>Congratulations!</h2>
          <p>You've completed 100% of your activities for today! Great job!</p>
        </div>
      )}
    </div>
  );
};

export default PieChart;
