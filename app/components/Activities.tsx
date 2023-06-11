'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Activities = ({ activities }: any) => {
  const [allActivities, setAllActivities] = useState<any>([]);
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('router', router);
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
  }, [router]);

  return (
    <div>
      {allActivities && (
        <ul role='list' className='divide-y divide-gray-100'>
          {allActivities.map((activity: any) => (
            <li
              key={activity.id}
              className='flex justify-between gap-x-6 py-5'
            >
              <div className='flex gap-x-4'>

                <div className='min-w-0 flex-auto'>
                  <p className='text-sm font-semibold leading-6 text-gray-900'>
                    {activity.name}
                  </p>
        
                </div>
              </div>
              <div className='hidden sm:flex sm:flex-col sm:items-end'>
                <p className='text-sm leading-6 text-gray-900'>{person.role}</p>
                {person.lastSeen ? (
                  <p className='mt-1 text-xs leading-5 text-gray-500'>
                    Last seen{' '}
                    <time dateTime={person.lastSeenDateTime}>
                      {person.lastSeen}
                    </time>
                  </p>
                ) : (
                  <div className='mt-1 flex items-center gap-x-1.5'>
                    <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                      <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                    </div>
                    <p className='text-xs leading-5 text-gray-500'>Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activities;
