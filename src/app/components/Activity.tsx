'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import DeleteActivity from './DeleteActivity';
import moment from 'moment-timezone';

const Activity = ({ activity }: any) => {
  const [isDeleteActivityOpen, setIsDeleteActivityOpen] = useState(false);

  function openDeleteActivity() {
    setIsDeleteActivityOpen(true);
  }

  function closeDeleteActivity() {
    setIsDeleteActivityOpen(false);
  }

  const now = moment().tz('America/Chicago');

  const isToday = (date: any) => {
    const activityDate = moment(date).tz('America/New_York');
    const todayEST = now.clone().tz('America/New_York').startOf('day');

    return activityDate.isSameOrAfter(todayEST, 'day');
  };

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
            {moment(activity.createdAt).tz('America/New_York').format('lll')}
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
          onClick={openDeleteActivity}
        />
      )}
      {isDeleteActivityOpen && (
        <DeleteActivity
          closeDeleteActivity={closeDeleteActivity}
          activity={activity}
          isDeleteActivityOpen={isDeleteActivityOpen}
        />
      )}
    </li>
  );
};

export default Activity;
