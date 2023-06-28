'use client';

import { useAppSelector } from '@/src/redux/hooks';
import { isToday } from '@/src/utils/timeHelpers';
import Activity from './Activity';
import AddActivity from './AddActivity';

const Activities = ({ goal }: any) => {
  const startDate = useAppSelector((state) => state.user.startDate);
  return (
    <div className='flex h-[400px] max-h-[500px] w-full max-w-full  flex-col space-y-4 rounded-xl bg-white p-6 shadow-md  '>
      <div className='flex justify-between'>
        <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
          {!goal.activities || goal.activities.length === 0
            ? ' No Activities'
            : 'Activities'}
        </h2>
        {isToday(startDate) && <AddActivity goal={goal} />}
      </div>
      {goal.percentage > 0 && isToday(startDate) && (
        <h3 className='text-sm'> {goal.percentage}/100 </h3>
      )}

      {goal?.activities && (
        <div className='max-h-[300px] divide-y divide-gray-200 overflow-y-auto pl-2 pr-2 font-open_sans sm:max-h-[500px] sm:pl-2 sm:pr-4'>
          {goal.activities.map((activity: any) => (
            <Activity activity={activity} key={activity.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities;
