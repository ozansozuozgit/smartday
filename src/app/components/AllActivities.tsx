'use client';

import Activity from './Activity';

const AllActivities = ({ activities }: any) => {
  return (
    <div className='flex h-[400px] max-h-[400px] max-w-full flex-col space-y-4 rounded-xl bg-white p-6 shadow-warm w-full'>
      <div className='flex justify-between'>
        <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold text-gray-900 sm:mb-2 md:text-xl'>
          {!activities || activities.length === 0
            ? ' No Activities'
            : 'Latest Activities'}
        </h2>
      </div>

      {activities && (
        <div className='max-h-[400px] w-full divide-y divide-gray-200 overflow-y-auto  pl-2 pr-2 font-open_sans sm:pl-2 sm:pr-4'>
          {activities.map((activity: any) => (
            <Activity activity={activity} key={activity.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllActivities;
