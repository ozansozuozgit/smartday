'use client';
// import { checkEnvironment } from '@/lib/getBaseUrl';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useEffect, useState } from 'react';
import { GoalType } from '../../types/types';
import CreateGoal from './CreateGoal';
import Goal from './Goal';

const Goals = () => {
  const [goals, setGoals] = useState<GoalType[]>([]);

  const addGoalToState = (goal: GoalType) => {
    setGoals([goal, ...goals]);
  };
  const deleteGoalFromState = async (goal: GoalType) => {
    console.log('goalId', goal?.id);
    setGoals(goals.filter((g: GoalType) => g.id !== goal.id));
  }
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
        setGoals(allGoals);
        console.log('goals', allGoals);
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
        <CreateGoal addGoalToState={addGoalToState} />
      </div>

      {goals && goals.map((goal) => <Goal goal={goal} key={goal?.id} deleteGoalFromState={deleteGoalFromState}/>)}
    </div>
  );
};

export default Goals;
