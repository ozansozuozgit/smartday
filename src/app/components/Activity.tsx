'use client';
import { formatDatetime, isToday } from '@/src/utils/timeHelpers';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import DeleteActivity from './DeleteActivity';

const Activity = ({ activity }: any) => {
  const [isDeleteActivityOpen, setIsDeleteActivityOpen] = useState(false);

  return (
    <li key={activity.id} className='flex justify-between gap-x-6 py-5'>
      <div className='flex gap-x-4'>
        <div className='min-w-0 flex-auto'>
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {activity.name}
          </p>
        </div>
      </div>
      <div className='hidden sm:flex sm:flex-col sm:items-end'>
        {activity.createdAt && (
          <time dateTime={activity.createdAt}>
            {formatDatetime(activity.createdAt)}
          </time>
        )}
        {activity?.percentage && (
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {activity.percentage}%
          </p>
        )}
        <p className='text-sm font-semibold leading-6 text-gray-900'>
          Aligns with goal: {activity?.alignsWithGoal ? 'Yes' : 'No'}
        </p>
      </div>
      {isToday(activity.createdAt) && (
        <XMarkIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
          onClick={() => setIsDeleteActivityOpen(true)}
        />
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
