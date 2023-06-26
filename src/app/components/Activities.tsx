'use client';

import Activity from './Activity';
import AddActivity from './AddActivity';

const Activities = ({ goal }: any) => {

  return (
      <div className='p-6 flex flex-col max-w-full h-[500px] max-h-[500px] bg-white rounded-xl shadow-md space-y-4 w-full'>
      <div className='flex justify-between'>
        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
          {!goal.activities || goal.activities.length === 0
            ? ' No Activities'
            : 'Activities'}
        </h2>
        <AddActivity goal={goal} />
      </div>
      {goal.percentage > 0 && <h3> {goal.percentage}/100 </h3>}

      {goal?.activities && (
        <div className='divide-y divide-gray-200 overflow-y-auto max-h-[300px] sm:max-h-[500px] pr-2 pl-2 sm:pr-4 sm:pl-2 font-open_sans'>
          {goal.activities.map((activity: any) => (
            <Activity activity={activity} key={activity.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities;
