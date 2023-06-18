'use client';
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment-timezone';

const ChartLine = ({ goal }) => {
  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
  };

  const formattedActivities = goal.activities.map((activity) => ({
    ...activity,
    createdAt: moment(activity.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
  }));

  const specificGoalChartData = {
    id: goal.id,
    color: generateRandomColor(),
    data: formattedActivities
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((activity) => ({
        x: activity.createdAt,
        y: activity.percentage,
      })),
  };

  const xAxisTickValues =
    specificGoalChartData.data.length > 10
      ? specificGoalChartData.data
          .map((activity) => activity.x)
          .filter((_, index) => index % 2 === 0)
      : specificGoalChartData.data.map((activity) => activity.x);

  const xAxisTickRotation = -45;

  return (
    <div style={{ height: '400px' }}>
      <h3>Activity Completion Timeline</h3>
      <ResponsiveLine
        data={[specificGoalChartData]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        axisBottom={{
          tickValues: xAxisTickValues,
          tickRotation: xAxisTickRotation,
          format: (value) => moment(value).format('MMM DD, YYYY'), // Format the tick labels using moment library
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
        useMesh={true}
        enablePointLabel={true}
        pointLabelYOffset={-12}
        tooltip={({ point }) => (
          <strong>
            {moment(point.data.xFormatted).format('HH:mm:ss')}
            {': '}
            {point.data.y}%
          </strong>
        )}
      />
    </div>
  );
};

export default ChartLine;
