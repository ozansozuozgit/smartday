'use client';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment-timezone';
import React from 'react';

const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + randomColor;
};

const ChartLine = ({ goal }: any) => {

  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div>
        <h3>No activities available</h3>
      </div>
    );
  }
  const formattedActivities = goal?.activities?.map((activity: any) => ({
    ...activity,
    createdAt: moment(activity.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
  }));

  const specificGoalChartData = {
    id: goal.id,
    color: generateRandomColor(),
    data: formattedActivities
      ?.sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((activity: any) => ({
        x: activity.createdAt,
        y: activity.percentage,
      })),
  };

  const xAxisTickValues =
    specificGoalChartData.data.length > 10
      ? specificGoalChartData.data.filter(
          (_: any, index: any) => index % 2 === 0
        )
      : specificGoalChartData.data;

  return (
    <div style={{ height: '400px' }}>
      <h3>Activity Completion Timeline</h3>
      <ResponsiveLine
        data={[specificGoalChartData]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        axisBottom={{
          tickValues: xAxisTickValues.map((activity: any) => activity.x),
          tickRotation: -45,
          format: (value) => moment(value).format('MMM DD, YYYY'),
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
        tooltip={({ point }: any) => (
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
