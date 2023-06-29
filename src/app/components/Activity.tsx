'use client';
import { formatDatetime, isToday } from '@/src/utils/timeHelpers';
import React, { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import DeleteActivity from './DeleteActivity';

const Activity = ({ activity }) => {
  const [isDeleteActivityOpen, setIsDeleteActivityOpen] = useState(false);

  console.log('activity', activity);

  return (
    <li key={activity.id} className='flex justify-between gap-x-4 py-3'>
      <div className='flex-grow'>
        <p className='text-gray-700 text-md font-semibold leading-6'>
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
      <div className='flex items-center'>
        {activity?.percentage && (
          <p className='mr-2 text-sm font-semibold text-green-500 sm:mr-4'>
            {activity.percentage}%
          </p>
        )}
        {activity?.alignsWithGoal ? (
          <AiOutlineCheckCircle className='h-4 w-4 min-w-[8px] text-green-500 sm:h-6 sm:w-6' />
        ) : (
          <AiOutlineCloseCircle className='h-4 w-4 min-w-[8px] text-red-500 sm:h-6 sm:w-6' />
        )}
      </div>
      {!activity?.goal && isToday(activity.createdAt) && (
        <button
          className={`text-xs font-medium text-red-500 hover:text-red-700 sm:text-sm`}
          onClick={() => setIsDeleteActivityOpen(true)}
        >
          Delete
        </button>
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
