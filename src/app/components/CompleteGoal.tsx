'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import {
  addGoalToCompletedGoals,
  setActivityFlag,
  updateSelectedGoalCompleted,
} from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { showErrorToast, showSuccessToast } from '@/src/utils/toast';
import { Dialog, Transition } from '@headlessui/react';
import * as Sentry from '@sentry/nextjs';
import clsx from 'clsx';
import React, { Fragment, useState } from 'react';

const CompleteGoal = () => {
  const dispatch = useAppDispatch();
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);
  const activityFlag = useAppSelector((state) => state.user.activityFlag);
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = async () => {
    try {
      const res = await fetch(
        `${getBaseUrl()}/api/goal/?goalId=${selectedGoal.id}&action=${
          selectedGoal.completed ? 'uncomplete' : 'complete'
        }`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            goalName: selectedGoal.name,
            type: selectedGoal.type.toLowerCase(),
          }),

          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const resCreatedGoal = await fetch(
        `${getBaseUrl()}/api/completed-goal/`,
        {
          method: 'POST',
          body: JSON.stringify({
            goalId: selectedGoal.id,
            goalName: selectedGoal.name,
            goalType: selectedGoal.type,
          }),
        }
      );
      const updatedGoal = await res.json();
      console.log('updatedGoal', updatedGoal);
      dispatch(
        updateSelectedGoalCompleted({
          completed: updatedGoal.completed,
          percentage: updatedGoal.percentage,
          id: updatedGoal.id,
          completedAt: updatedGoal.completedAt,
        })
      );
      dispatch(addGoalToCompletedGoals(updatedGoal));
      dispatch(setActivityFlag(!activityFlag));

      showSuccessToast('Goal updated successfully');
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
      showErrorToast('Something went wrong');
    }
  };

  return (
    <div>
      <div
        className={clsx(
          'flex cursor-pointer items-center justify-around gap-2 rounded-md  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
          {
            'pointer-events-none bg-teal-500': selectedGoal.completed,
            'bg-orange-500': !selectedGoal.completed,
          }
        )}
        onClick={() => setIsOpen(true)}
      >
        <span>
          {selectedGoal.completed ? 'Completed Goal' : 'Complete Goal'}
        </span>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Complete {selectedGoal.name}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-800'>
                      This action is irreversible. Are you sure you want to
                      complete this goal?
                    </p>
                  </div>

                  <div className='mt-4 flex gap-2 font-open_sans'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={handleComplete}
                    >
                      Yes
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={() => setIsOpen(false)}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CompleteGoal;
