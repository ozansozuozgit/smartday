import React from 'react';
import Activities from '../components/Activities';
import AiActivityChat from '../components/AiActivityChat';
import AlignWithGoalPieChart from '../components/AlignWithGoalPieChart';
import CalendarChartSingle from '../components/CalendarChartSingle';
import CategoryChart from '../components/CategoryChart';
import ChartLine from '../components/ChartLine';
import PieChart from '../components/PieChart';

import { useAppSelector } from '@/src/redux/hooks';

const GoalOverview = () => {
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-[50px] 2xl:gap-y-[50px] place-items-center	'>
      {selectedGoal && <Activities goal={selectedGoal} />}
      {selectedGoal && <PieChart goal={selectedGoal} />}

      {selectedGoal && <AlignWithGoalPieChart goal={selectedGoal} />}

      {selectedGoal && <AiActivityChat goal={selectedGoal} />}
      <div className='col-span-1 xl:col-span-2  w-full'>
        {selectedGoal && <ChartLine goal={selectedGoal} />}
      </div>
      {selectedGoal && <CategoryChart goal={selectedGoal} />}

      <div className='col-span-1 xl:col-span-2  w-full'>
        {selectedGoal && <CalendarChartSingle goal={selectedGoal} />}
      </div>
    </div>
  );
};

export default GoalOverview;
