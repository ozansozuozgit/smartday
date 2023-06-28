'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { setSelectedGoal, setUserGoals } from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { GoalType } from '../../../types/types';
import AddActivity from './AddActivity';
import CreateGoal from './CreateGoal';
import Goal from './Goal';

const Goals = ({ goals }) => {
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
      <div className='mb-5 flex items-center gap-x-2 2xl:justify-between'>
        <div
          className='flex cursor-pointer items-center justify-around gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
          onClick={() => {
            dispatch(setSelectedGoal(null));
          }}
        >
          <AiFillHome className='h-4 w-4 font-open_sans text-white' aria-hidden='true' />
          <span>Home</span>
        </div>
        <CreateGoal />
      </div>
      <div className='divide-y divide-neutral-300 space-y-2'>
        {goals &&
          goals.map((goal) => (
            <Goal goal={goal} key={goal?.id} />
          ))}
      </div>
    </div>
  );
};

export default Goals;
