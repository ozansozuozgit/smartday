'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';

const Activity = ({ activity, deleteActivityFromState }: any) => {
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
  const deleteActivity = async () => {
    try {
      const res = await fetch(`/api/activity?activityId=${activity.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const deletedActivity = await res.json();
      console.log('deletedActivity', deletedActivity);
      deleteActivityFromState(deletedActivity);
    } catch (err) {
      console.log(err);
    }
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
        {activity?.alignsWithGoal && (
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {/* No doesnt show yet */}
            {activity?.alignsWithGoal? 'Yes' : 'No'}
          </p>
        )}
      </div>
      {isToday(activity.createdAt) && ( // Show the delete icon only if it's today
        <XMarkIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
          onClick={deleteActivity}
        />
      )}
    </li>
  );
};

export default Activity;
