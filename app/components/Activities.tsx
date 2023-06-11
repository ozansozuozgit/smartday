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
          cache: 'no-cache',
        }
      );
      const activities = await allActivities.json();
      setAllActivities(activities);
      console.log('activities', activities);
    };
    getActivities();
  }, [router]);

  return <div>Activities</div>;
};

export default Activities;
