'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Activity from './Activity';
import AddActivity from './AddActivity';

// TODO: Activities will not be used from the dashboard, update the state there
const Activities = ({ activities, goal, updateGoalPercentage }: any) => {
  const [allActivities, setAllActivities] = useState<any>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const addActivityToState = (activity: any) => {
    setAllActivities([activity, ...allActivities]);
    updateGoalPercentage('add', activity.percentage);
  };
  const deleteActivityFromState = async (activity: any) => {
    console.log('activityId', activity?.id);
    setAllActivities(allActivities.filter((a: any) => a.id !== activity.id));
    updateGoalPercentage('subtract', activity?.percentage);
  };
  useEffect(() => {
    setAllActivities([]);
    const goalId = searchParams.get('goal');
    console.log('goalId', goalId);

    const getActivities = async () => {
      const allActivities = await fetch(
        `${getBaseUrl()}/api/activities?goalId=${goalId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const activities = await allActivities.json();
      setAllActivities(activities);
      console.log('activities', activities);
    };
    getActivities();
  }, [searchParams]);

  // const addGoalToUser = async () => {
  //   const allActivities = await fetch(
  //     `${getBaseUrl()}/api/cron/set-completed-goals`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   const activities = await allActivities.json();
  //   console.log('activities', activities);
  // };

  return (
    <div className='p-12 flex flex-col max-w-lg'>
      <div className='flex justify-between pb-5'>
        {' '}
        <h2>{goal?.percentage}</h2>
        <AddActivity goal={goal} addActivityToState={addActivityToState} />
      </div>

      <div className='flex flex-col'>
        {allActivities && (
          <ul
            role='list'
            className='divide-y divide-gray-100 bg-white max-w-md p-4 rounded max-h-[200px] overflow-y-scroll'
          >
            {allActivities.map((activity: any) => (
              <Activity
                activity={activity}
                key={activity?.id}
                deleteActivityFromState={deleteActivityFromState}
              />
            ))}
          </ul>
        )}
      </div>
      {/* <button onClick={addGoalToUser}>Add Goal to User</button> */}
    </div>
  );
};

export default Activities;
