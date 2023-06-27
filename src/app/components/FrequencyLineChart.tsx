'use client';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment';
import React, { useMemo } from 'react';

interface Activity {
  createdAt: string;
}

interface FrequencyLineChartProps {
  activities: Activity[];
}

const FrequencyLineChart: React.FC<FrequencyLineChartProps> = ({
  activities,
}) => {
  const data = useMemo(() => {
    if (!activities || activities.length === 0) return [];

    // Group activities by date
    const groupedActivities = activities.reduce(
      (groups: any, activity: any) => {
        const date = moment(activity.createdAt).format('YYYY-MM-DD');
        if (!groups[date]) {
          groups[date] = { x: date, y: 0 };
        }
        groups[date].y += 1;
        return groups;
      },
      {}
    );

    // Convert the grouped object back into an array and sort it
    return Object.values(groupedActivities).sort((a: any, b: any) =>
      a.x.localeCompare(b.x)
    );
  }, [activities]);

  if (!data.length) {
    return (
      <div className='p-6 h-[400px]  max-w-full max-h-[400px] bg-white rounded-xl shadow-md '>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
          No Activities
        </h2>
      </div>
    );
  }
  console.log('data', data);
  return (
    <div className='p-6 h-[400px] flex flex-col max-w-full max-h-full bg-white rounded-xl shadow-md'>
      <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        Frequency of Activities Over Time
      </h2>

      <ResponsiveLine
        data={[{ id: 'ActivityFrequency', data }]}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
        xFormat='time:%Y-%m-%d'
        curve='monotoneX'
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 2 days',
          legend: 'date',
          legendOffset: -12,
        }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
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

export default FrequencyLineChart;
