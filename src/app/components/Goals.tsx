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
      <div className='mb-5 flex items-center justify-between gap-x-2'>
        <div
          className='flex cursor-pointer items-center justify-around gap-2 rounded-md bg-blue px-4  py-2 text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
          onClick={() => {
            dispatch(setSelectedGoal(null));
          }}
        >
          <AiFillHome className='h-4 w-4 text-white font-open_sans' aria-hidden='true' />
          <span>Home</span>
        </div>
        <CreateGoal />
      </div>

      {goals && goals.map((goal: any) => <Goal goal={goal} key={goal?.id} />)}
    </div>
  );
};

export default Goals;
