'use client';
import { ResponsiveLine } from '@nivo/line';
import React from 'react';

const ChartLine = ({ goal }: any) => {
  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
  };

  const formattedActivities = goal.activities.map(activity => {
    const date = new Date(activity.createdAt);
    const formattedDate = date.toLocaleDateString(); // This will be in the format "MM/DD/YYYY"
    const formattedTime = date.toLocaleTimeString(); // This will be in the format "HH:MM:SS AM/PM"
    return {
      ...activity,
      createdAt: `${formattedDate} ${formattedTime}`,
    };
  });
  
  console.log('goal', goal);
  const specificGoalChartData = {
    id: goal.id,
    color: generateRandomColor(), // Replace with your own color generation logic
    data: formattedActivities
      .sort((a, b) => new Date(a?.createdAt) - new Date(b?.createdAt))
      .map((activity) => ({
        x: activity.createdAt, // Assuming activity.date is a string in 'YYYY-MM-DD' format
        y: activity.percentage,
      })),
  };

  console.log('specificGoalChartData', specificGoalChartData);
  // const chartData = { id: goal.name, data: dataPoints };

  return (
    <div className='h-[400px]'>
      <h3>Activity Completion Timeline</h3>
      <ResponsiveLine
        data={[specificGoalChartData]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=' >-.2f'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Goal Progress',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

export default ChartLine;
