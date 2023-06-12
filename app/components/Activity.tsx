'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';

const Activity = ({ activity }: any) => {
  const deleteActivity = async () => {
    try {
      const res = await fetch(`/api/activities/${activity.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const deletedActivity = await res.json();
      console.log('deletedActivity', deletedActivity);
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
      </div>
      <XMarkIcon
        className='h-5 w-5 text-gray-400'
        aria-hidden='true'
        onClick={deleteActivity}
      />
    </li>
  );
};

export default Activity;
