'use client';

import Activity from './Activity';
import AddActivity from './AddActivity';

const Activities = ({ goal }: any) => {
  if (!goal.activities || goal.activities.length === 0) {
    return (
      <div className='h-[500px] max-w-full sm:max-w-xl  mx-2 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center  pie-chart-container w-[550px]'>
        <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto '>
        No Activities
        </h3>
      </div>
    );
  }
  return (
    <div className='p-6 flex flex-col max-w-full sm:max-w-xl h-[500px] max-h-[500px] bg-white rounded-xl shadow-md space-y-4 w-[550px]'>
      <div className='flex justify-between'>
      <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 font-roboto'>
        Activities
      </h2>
      <AddActivity goal={goal} />
      </div>
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
