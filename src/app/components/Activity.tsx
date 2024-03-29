'use client';
import { formatDatetime, isToday } from '@/src/utils/timeHelpers';
import React, { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import DeleteActivity from './DeleteActivity';
import EditActivity from './EditActivity';
const Activity = ({ activity, type, completed }: any) => {
  console.log('activity', activity);
  console.log('type', type);
  const [isDeleteActivityOpen, setIsDeleteActivityOpen] = useState(false);
  const [isEditActivityOpen, setIsEditActivityOpen] = useState(false);

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
      {activity?.percentage > 0 && type !== 'singleNoPercentage' && (
        <p className='mr-2 text-sm font-semibold text-teal-500 sm:mr-4'>
          {activity.percentage}%
        </p>
      )}
      {!activity?.goal && isToday(activity.createdAt) && type === 'daily' && !completed && (
        <div className='flex items-center gap-x-2'>
          <FaEdit
            className='h-4 w-4 min-w-[8px] cursor-pointer text-teal-500 hover:text-teal-900 sm:h-5 sm:w-5'
            aria-hidden='true'
            onClick={() => setIsEditActivityOpen(true)}
          />
        </div>
      )}
      {!activity?.goal && isToday(activity.createdAt) && type === 'daily' && !completed && (
        <div className='flex items-center gap-x-2'>
          <RiDeleteBinLine
            className='h-4 w-4 min-w-[8px] cursor-pointer text-red-500 hover:text-red-900 sm:h-5 sm:w-5'
            aria-hidden='true'
            onClick={() => setIsDeleteActivityOpen(true)}
          />
        </div>
      )}
      {!activity?.goal &&
        (type === 'single' || type === 'singleNoPercentage') &&
        !completed && (
          <div className='flex items-center gap-x-2'>
            <FaEdit
              className='h-4 w-4 min-w-[8px] cursor-pointer text-teal-500 hover:text-teal-900 sm:h-5 sm:w-5'
              aria-hidden='true'
              onClick={() => setIsEditActivityOpen(true)}
            />
          </div>
        )}
      {!activity?.goal &&
        (type === 'single' || type === 'singleNoPercentage') && !completed && (
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
      {isEditActivityOpen && (
        <EditActivity
          closeEditActivity={() => setIsEditActivityOpen(false)}
          activity={activity}
          isEditActivityOpen={isEditActivityOpen}
        />
      )}
    </li>
  );
};

export default Activity;
