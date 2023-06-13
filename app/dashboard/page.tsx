'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Activities from '../components/Activities';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [goal, setGoal] = useState<any>(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const getGoals = async () => {
      const res = await fetch(
        `${getBaseUrl()}/api/goal?goalId=${searchParams.get('goal')}`
      );
      const goal = await res.json();
      setGoal(goal);
      console.log('the goal fetch was', goal);
    };
    getGoals();
  }, [searchParams,triggerRefresh]);

  if (status === 'unauthenticated') {
    router.push(`/`);
  }

  return (
    <div>
      <section className='bg-gray'>
        {/* <Goals /> */}
        <Activities goal={goal}  setTriggerRefresh={setTriggerRefresh} />
      </section>
    </div>
  );
};

export default Dashboard;
