'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import DeleteActivity from './DeleteActivity';
const Activity = ({ activity, deleteActivityFromState }: any) => {
  const [isDeleteActivityOpen, setIsDeleteActivityOpen] = useState(false);

  function openDeleteActivity() {
    console.log('clocked');
    setIsDeleteActivityOpen(true);
  }

  function closeDeleteActivity() {
    setIsDeleteActivityOpen(false);
  }

  const now = new Date();
  const todayEST = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/New_York' })
  )
    .toISOString()
    .split('T')[0];
  const isToday = (date: any) => {
    const activityDate = new Date(
      new Date(date).toLocaleString('en-US', { timeZone: 'America/New_York' })
    )
      .toISOString()
      .split('T')[0];

    console.log('activityDate', activityDate);
    console.log('todayEST', todayEST);

    return activityDate === todayEST;
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
            {new Date(activity.createdAt).toLocaleString()}
          </time>
        )}
        {activity?.percentage && (
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {activity.percentage}%
          </p>
        )}
        <p className='text-sm font-semibold leading-6 text-gray-900'>
          {/* No doesnt show yet */}
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
          deleteActivityFromState={deleteActivityFromState}
          isDeleteActivityOpen={isDeleteActivityOpen}
        />
      )}
    </li>
  );
};

export default Activity;
