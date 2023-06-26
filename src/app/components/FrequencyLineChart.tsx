import { ResponsiveLine } from '@nivo/line';
import React from 'react';
import moment from 'moment';

const FrequencyLineChart = ({ activities }: any) => {
  if (!activities || activities.length === 0) {
    return (
      <div className='p-6 h-[500px] max-w-full max-h-[500px] bg-white rounded-xl shadow-md '>
        <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
          No Activities
        </h3>
      </div>
    );
  }

  // Group activities by date
  const groupedActivities = activities.reduce((groups: any, activity: any) => {
    const date = moment(activity.createdAt).format('YYYY-MM-DD');
    if (!groups[date]) {
      groups[date] = { x: date, y: 0 };
    }
    groups[date].y += 1;
    return groups;
  }, {});

  // Convert the grouped object back into an array and sort it
  const data = Object.values(groupedActivities).sort((a: any, b: any) =>
    a.x.localeCompare(b.x)
  );

  return (
    <div className='p-6 h-[500px] flex flex-col max-w-full max-h-[500px] bg-white rounded-xl shadow-md '>
      <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
        Frequency of Activities Over Time
      </h3>
      <ResponsiveLine
        data={[{ id: 'Frequency', data }]}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: 'linear' }}
        curve="monotoneX"
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 2 days',
          legend: 'date',
          legendOffset: -12,
        }}
        axisLeft={{
          legend: 'count',
          legendOffset: -12,
        }}
        enablePointLabel={true}
        useMesh={true}
      />
    </div>
  );
};

export default FrequencyLineChart;
