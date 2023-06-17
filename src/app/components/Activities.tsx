'use client';

import Activity from './Activity';
import AddActivity from './AddActivity';

const Activities = ({ goal }: any) => {
  return (
    <div className='p-12 flex flex-col max-w-lg'>
      <div className='flex justify-between pb-5'>
        <h2>{goal?.percentage}</h2>
        <AddActivity goal={goal} />
      </div>

      <div className='flex flex-col'>
        {goal?.activities && (
          <ul
            role='list'
            className='divide-y divide-gray-100 bg-white max-w-md p-4 rounded max-h-[200px] overflow-y-scroll'
          >
            {goal?.activities.map((activity: any) => (
              <Activity activity={activity} key={activity?.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Activities;
