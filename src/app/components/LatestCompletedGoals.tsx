'use client';

import CompletedGoal from './CompletedGoal';

const LatestCompletedGoals = ({ completedGoals }: any) => {
  return (
    <div className='flex h-[400px] max-h-[500px] w-full max-w-full  flex-col space-y-4 rounded-xl bg-white p-6 shadow-warm  '>
      <div className='flex justify-between'>
        <h2 className='text-md sm:text-md mb-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
          {!completedGoals.length
            ? ' No Completed Goals'
            : 'Latest Completed Goals'}
        </h2>
      </div>

      {completedGoals.length ? (
        <div className='max-h-[300px] divide-y divide-gray-200 overflow-y-auto pl-2 pr-2 font-open_sans sm:max-h-[500px] sm:pl-2 sm:pr-4'>
          {completedGoals?.map((goal: any) => (
            <CompletedGoal goal={goal} key={goal.id} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LatestCompletedGoals;
