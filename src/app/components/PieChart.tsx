'use client';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment-timezone';
import React from 'react';

const PieChart = ({ goal }: any) => {
  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div>
        <h3>No activities available</h3>
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

  // console.log('groupedActivities', groupedActivities);

  return (
    <div className='h-[400px]'>
      <h3>Activity Completion Timeline Pie</h3>
      <ResponsivePie
        data={groupedActivities as any}
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
        arcLabel={({ data }: any) => `${data.value}%`}
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
