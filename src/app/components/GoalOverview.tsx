'use client';
import { useAppSelector } from '@/src/redux/hooks';
import { isToday } from '@/src/utils/timeHelpers';
import clsx from 'clsx';
import moment from 'moment-timezone';
import React from 'react';
import Activities from '../components/Activities';
import AiActivityChat from '../components/AiActivityChat';
import AlignWithGoalPieChart from '../components/AlignWithGoalPieChart';
import CalendarChartSingle from '../components/CalendarChartSingle';
import CategoryChart from '../components/CategoryChart';
import ChartLine from '../components/ChartLine';
import ActivitiesAlignmentChart from './ActivitiesAlignmentChartProps';
import ActivityPieChart from './ActivityPieChart';
import CompleteGoal from './CompleteGoal';
import DateLabel from './DateLabel';

const GoalOverview = () => {
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);
  const startDate = useAppSelector((state) => state.user.startDate);

  const getProgressBarColor = (percentage: number) => {
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

  const formatType = (type: string) => {
    if (type === 'daily') {
      return 'Daily Recurring';
    } else if (type === 'single') {
      return 'One-Time ';
    } else if (type === 'singleNoPercentage') {
      return 'One-Time (No Progress Tracking)';
    }
  };

  return (
    <div className='m-auto grid max-w-full place-items-center gap-8 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-[450px]'>
      <div className='col-span-1 w-full xl:col-span-3'>
        {selectedGoal && (
          <div className='flex max-w-full items-center justify-between rounded-lg bg-indigo-500 px-6 py-4 font-roboto text-white shadow-warm lg:min-h-[140px]'>
            <div>
              <h5 className='text-md text-teal-300'>
                {formatType(selectedGoal?.type)}
              </h5>
              <h2 className='text-sm font-bold md:text-xl xl:text-2xl'>
                {selectedGoal?.name}
              </h2>
            </div>

            <div className='flex flex-col items-end gap-y-2'>
              {(selectedGoal?.type === 'single' ||
                selectedGoal.type === 'singleNoPercentage') && <CompleteGoal />}

              <DateLabel />
              {selectedGoal.type !== 'singleNoPercentage' && (
                <div className='flex items-center'>
                  <span className='lg:text-md mr-2 text-sm font-semibold xl:text-lg'>
                    {selectedGoal?.percentage}%
                  </span>
                  <span className='inline-block h-2 w-[100px] rounded-full bg-slate-200 md:w-[200px]'>
                    <div
                      className={clsx(
                        'h-full rounded-full',
                        getProgressBarColor(selectedGoal?.percentage)
                      )}
                      style={{ width: `${selectedGoal?.percentage}%` }}
                    ></div>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {selectedGoal && <Activities goal={selectedGoal} />}
      <div className='col-span-1 w-full  lg:col-span-1 xl:col-span-2 2xl:col-span-2'>
        {selectedGoal && <AiActivityChat goal={selectedGoal} />}
      </div>
      {selectedGoal && selectedGoal?.type !== 'singleNoPercentage' && (
        <ActivityPieChart goal={selectedGoal} />
      )}
      {selectedGoal && <AlignWithGoalPieChart goal={selectedGoal} />}
      {selectedGoal && <CategoryChart goal={selectedGoal} />}{' '}
      {selectedGoal && <ActivitiesAlignmentChart goal={selectedGoal} />}
      <div className='col-span-1 w-full xl:col-span-2 '>
        {selectedGoal && <ChartLine goal={selectedGoal} />}
      </div>
      <div className='col-span-1 w-full  xl:col-span-3 '>
        {selectedGoal?.type === 'daily' && (
          <CalendarChartSingle goal={selectedGoal} />
        )}
      </div>
    </div>
  );
};

export default GoalOverview;
