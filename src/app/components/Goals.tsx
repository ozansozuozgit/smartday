'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setUserGoals } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useEffect } from 'react';
import { GoalType } from '../../../types/types';
import CreateGoal from './CreateGoal';
import Goal from './Goal';
import AddActivity from './AddActivity';

const Goals = ({ goals }: any) => {
  const dispatch = useAppDispatch();
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

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
      } catch (err) {
        console.log(err);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div>
      <div className='flex items-center justify-between mb-5 gap-x-2'>
        <CreateGoal />
        <AddActivity goal={selectedGoal}/>
      </div>

      {goals && goals.map((goal: any) => <Goal goal={goal} key={goal?.id} />)}
    </div>
  );
};

export default Goals;
