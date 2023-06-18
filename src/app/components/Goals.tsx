'use client';
// import { checkEnvironment } from '@/lib/getBaseUrl';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setUserGoals } from '@/src/redux/features/userSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import { useEffect, useState } from 'react';
import { GoalType } from '../../../types/types';
import CreateGoal from './CreateGoal';
import Goal from './Goal';

const Goals = ({ goals }: any) => {
  // const [goals, setGoals] = useState<GoalType[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/goals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const allGoals = await res.json();
        dispatch(setUserGoals(allGoals));
        // setGoals(allGoals);
        // console.log('goals', allGoals);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div>
      <div className='flex items-center justify-between'>
        {' '}
        <h1 className='text-2xl font-bold'>Goals</h1>
        <CreateGoal />
      </div>

      {goals && goals.map((goal: any) => <Goal goal={goal} key={goal?.id} />)}
    </div>
  );
};

export default Goals;
