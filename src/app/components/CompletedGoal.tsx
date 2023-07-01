'use client';
import { formatDateTimeDateOnly, isToday } from '@/src/utils/timeHelpers';
import React, { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import DeleteActivity from './DeleteActivity';

const CompletedGoal = ({ goal }) => {
  return (
    <li key={goal.id} className='flex justify-between gap-x-4 py-3'>
      <div className='flex-grow'>
        <p className='text-md font-semibold leading-6 text-gray-700'>
          {goal.name}
        </p>
        <time
          className='text-xs text-gray-600 sm:text-sm'
          dateTime={goal.createdAt}
        >
          {formatDateTimeDateOnly(goal.createdAt)}
        </time>
        <p className='text-md font-semibold leading-6 text-indigo-400'>
          {goal.type}
        </p>{' '}
      </div>

      <AiOutlineCheckCircle className='h-4 w-4 min-w-[8px] text-green-500 sm:h-6 sm:w-6' />
    </li>
  );
};

export default CompletedGoal;
