'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AddActivity from '../components/AddActivity';
import Activity from './Activity';

const Activities = ({ activities, goal,setTriggerRefresh }: any) => {
  const [allActivities, setAllActivities] = useState<any>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const addActivityToState = (activity: any) => {
    setAllActivities([...allActivities, activity]);
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

  const addGoalToUser = async () => {
    const allActivities = await fetch(
      `${getBaseUrl()}/api/cron/set-completed-goals`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const activities = await allActivities.json();
    console.log('activities', activities);
  };

  return (
    <div className='p-12'>
      <h2>{goal?.percentage}</h2>
      {allActivities && (
        <ul
          role='list'
          className='divide-y divide-gray-100 bg-white max-w-md p-4 rounded max-h-[200px] overflow-y-scroll'
        >
          {allActivities.map((activity: any) => (
            <Activity activity={activity} key={activity?.id} />
          ))}
        </ul>
      )}
      <AddActivity goal={goal} addActivityToState={addActivityToState} setTriggerRefresh={setTriggerRefresh}/>

      <button onClick={addGoalToUser}>Add Goal to User</button>
    </div>
  );
};

export default Activities;
