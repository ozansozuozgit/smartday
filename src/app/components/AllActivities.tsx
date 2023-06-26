'use client';

import Activity from './Activity';

const AllActivities = ({ activities }: any) => {
  return (
    <div className='p-6 flex flex-col max-w-full h-[500px] max-h-[500px] bg-white rounded-xl shadow-md space-y-4 '>
      <div className='flex justify-between'>
        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
          {!activities || activities.length === 0
            ? ' No Activities'
            : 'Latest Activities'}
        </h2>
      </div>

      {activities && (
        <div className='divide-y divide-gray-200 w-full overflow-y-auto max-h-[500px] sm:max-h-[800px] pr-2 pl-2 sm:pr-4 sm:pl-2 font-open_sans'>
          {activities.map((activity: any) => (
            <Activity activity={activity} key={activity.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllActivities;
