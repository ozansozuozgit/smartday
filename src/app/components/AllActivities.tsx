'use client';

import Activity from './Activity';

const AllActivities = ({ activities }: any) => {
  return (
    <div className='flex h-[400px] max-h-[400px] max-w-full flex-col space-y-4 rounded-xl bg-white p-6 shadow-md '>
      <div className='flex justify-between'>
        <h2 className='text-gray-900 mb-4 font-roboto text-lg font-semibold sm:mb-6 sm:text-xl md:text-2xl'>
          {!activities || activities.length === 0
            ? ' No Activities'
            : 'Latest Activities'}
        </h2>
      </div>

      {activities && (
        <div className='divide-gray-200 max-h-[400px] w-full divide-y overflow-y-auto  pl-2 pr-2 font-open_sans sm:pl-2 sm:pr-4'>
          {activities.map((activity: any) => (
            <Activity activity={activity} key={activity.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllActivities;
