'use client';
import { formatDatetime, isToday } from '@/src/utils/timeHelpers';
import React, { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import DeleteActivity from './DeleteActivity';

const Activity = ({ activity, type }: any) => {
  const [isDeleteActivityOpen, setIsDeleteActivityOpen] = useState(false);
  return (
    <li
      key={activity.id}
      className='flex items-center justify-between gap-x-4 py-3'
    >
      {activity?.alignsWithGoal ? (
        <AiOutlineCheckCircle className='h-4 w-4 min-w-[8px] text-green-500 sm:h-6 sm:w-6' />
      ) : (
        <AiOutlineCloseCircle className='h-4 w-4 min-w-[8px] text-red-500 sm:h-6 sm:w-6' />
      )}
      <div className='flex-grow'>
        <p className='text-md font-semibold leading-6 text-gray-700'>
          {activity.name}
        </p>
        {activity?.goal && activity?.goal?.name && (
          <p className='text-xs text-gray-600 sm:text-sm'>
            Goal: {activity.goal.name}
          </p>
        )}
        <time
          className='text-xs text-gray-600 sm:text-sm'
          dateTime={activity.createdAt}
        >
          {formatDatetime(activity.createdAt)}
        </time>
      </div>
      {activity?.percentage && (
        <p className='mr-2 text-sm font-semibold text-teal-500 sm:mr-4'>
          {activity.percentage}%
        </p>
      )}
      {!activity?.goal && isToday(activity.createdAt) && type === 'daily' && (
        <div className='flex items-center gap-x-2'>
          <RiDeleteBinLine
            className='h-4 w-4 min-w-[8px] cursor-pointer text-red-500 hover:text-red-900 sm:h-5 sm:w-5'
            aria-hidden='true'
            onClick={() => setIsDeleteActivityOpen(true)}
          />
        </div>
      )}
      {!activity?.goal && type === 'single' && (
        <div className='flex items-center gap-x-2'>
          <RiDeleteBinLine
            className='h-4 w-4 min-w-[8px] cursor-pointer text-red-500 hover:text-red-900 sm:h-5 sm:w-5'
            aria-hidden='true'
            onClick={() => setIsDeleteActivityOpen(true)}
          />
        </div>
      )}
      {isDeleteActivityOpen && (
        <DeleteActivity
          closeDeleteActivity={() => setIsDeleteActivityOpen(false)}
          activity={activity}
          isDeleteActivityOpen={isDeleteActivityOpen}
        />
      )}
    </li>
  );
};

export default Activity;
