'use client';
import { formatDatetime, isToday } from '@/src/utils/timeHelpers';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import DeleteActivity from './DeleteActivity';

const Activity = ({ activity }: any) => {
  const [isDeleteActivityOpen, setIsDeleteActivityOpen] = useState(false);

  return (
    <li key={activity.id} className='flex justify-between gap-x-4 py-3'>

      <div className='flex-grow'>
        <p className='text-sm sm:text-lg font-medium leading-6 text-gray-900 overflow-ellipsis overflow-hidden'>
          {activity.name}
        </p>
        <time
          className='text-xs sm:text-sm text-gray-500'
          dateTime={activity.createdAt}
        >
          {formatDatetime(activity.createdAt)}
        </time>
      </div>
      <div className='flex items-center'>
        {activity?.percentage && (
          <p className='text-sm sm:text-lg font-semibold text-green-500 mr-2 sm:mr-4'>
            {activity.percentage}%
          </p>
        )}
        {activity?.alignsWithGoal ? (
          <CheckCircleIcon className='h-4 sm:h-6 w-4 sm:w-6 text-green-500' />
        ) : (
          <XCircleIcon className='h-4 sm:h-6 w-4 sm:w-6 text-red-500' />
        )}
      </div>
      <button
        className={`text-xs sm:text-sm font-medium ${
          isToday(activity.createdAt)
            ? 'text-red-500 hover:text-red-700'
            : 'text-gray-300 cursor-default'
        }`}
        onClick={() =>
          isToday(activity.createdAt) && setIsDeleteActivityOpen(true)
        }
      >
        Delete
      </button>
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
