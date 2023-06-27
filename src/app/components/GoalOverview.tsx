import React from 'react';
import Activities from '../components/Activities';
import AiActivityChat from '../components/AiActivityChat';
import AlignWithGoalPieChart from '../components/AlignWithGoalPieChart';
import CalendarChartSingle from '../components/CalendarChartSingle';
import CategoryChart from '../components/CategoryChart';
import ChartLine from '../components/ChartLine';
import PieChart from './ActivityPieChart';

import { useAppSelector } from '@/src/redux/hooks';

const GoalOverview = () => {
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

  return (
    <div className='grid max-w-full place-items-center gap-[50px] m-auto lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-[450px]'>
      {selectedGoal && <Activities goal={selectedGoal} />}
      <div className='col-span-1 w-full  xl:col-span-1 2xl:col-span-2'>
        {selectedGoal && <AiActivityChat goal={selectedGoal} />}
      </div>
      {selectedGoal && <PieChart goal={selectedGoal} />}

      {selectedGoal && <AlignWithGoalPieChart goal={selectedGoal} />}

      {selectedGoal && <CategoryChart goal={selectedGoal} />}

      <div className='col-span-1 w-full  2xl:col-span-3'>
        {selectedGoal && <ChartLine goal={selectedGoal} />}
      </div>
      <div className='col-span-1 w-full  xl:col-span-1 2xl:col-span-3'>
        {selectedGoal && <CalendarChartSingle goal={selectedGoal} />}
      </div>
    </div>
  );
};

export default GoalOverview;
