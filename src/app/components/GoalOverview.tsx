'use client';
import { useAppSelector } from '@/src/redux/hooks';
import clsx from 'clsx';
import moment from 'moment-timezone';
import React from 'react';
import Activities from '../components/Activities';
import AiActivityChat from '../components/AiActivityChat';
import AlignWithGoalPieChart from '../components/AlignWithGoalPieChart';
import CalendarChartSingle from '../components/CalendarChartSingle';
import CategoryChart from '../components/CategoryChart';
import ChartLine from '../components/ChartLine';
import ActivityPieChart from './ActivityPieChart';
import DateLabel from './DateLabel';
const GoalOverview = () => {
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

  const getProgressBarColor = (percentage: number) => {
    console.log('percentage', percentage);
    if (percentage <= 25) {
      return 'bg-red-500';
    } else if (percentage <= 50) {
      return 'bg-orange-500';
    } else if (percentage <= 75) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  };

  return (
    <div className='m-auto grid max-w-full place-items-center gap-8 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-[450px]'>
      <div className='col-span-1 w-full xl:col-span-3'>
        {selectedGoal && (
          <div className='flex max-w-full items-center justify-between px-6 py-4 font-roboto text-gray-800 shadow-warm'>
            <h2 className='text-xl font-bold xl:text-2xl'>
              {selectedGoal?.name}
            </h2>
            <div className='flex flex-col items-end'>
              <DateLabel />
              <div className='flex items-center'>
                {' '}
                <span className='text-md mr-2 font-semibold xl:text-lg'>
                  {selectedGoal?.percentage}%
                </span>
                <span className='inline-block h-2 w-[200px] rounded-full bg-gray-300'>
                  <div
                    className={clsx(
                      'h-full rounded-full',
                      getProgressBarColor(selectedGoal?.percentage)
                    )}
                    style={{ width: `${selectedGoal?.percentage}%` }}
                  ></div>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedGoal && <Activities goal={selectedGoal} />}

      <div className='col-span-1 w-full  xl:col-span-1 2xl:col-span-2'>
        {selectedGoal && <AiActivityChat goal={selectedGoal} />}
      </div>

      {selectedGoal && <ActivityPieChart goal={selectedGoal} />}

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
