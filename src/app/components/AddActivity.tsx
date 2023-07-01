'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import {
  addActivityToAllActivities,
  addActivityToSelectedGoal,
  setActivityFlag,
  updateSelectedGoalCompleted,
  updateSelectedGoalPercentage,
} from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '@/src/utils/toast';
import { Dialog, Transition } from '@headlessui/react';
import * as Sentry from '@sentry/nextjs';
import clsx from 'clsx';
import React, { Fragment, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GoalType } from '../../../types/types';
import Categories from './Categories';

const AddActivity = ({ goal }: any) => {
  const [activityName, setActivityName] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  const [percentage, setPercentage] = useState<number | null>(0);
  const [alignsWithGoal, setAlignsWithGoal] = useState<boolean>(false);
  let [isOpen, setIsOpen] = useState(false);

  const activityFlag = useAppSelector((state) => state.user.activityFlag);

  const dispatch = useAppDispatch();

  const setSelectedCategoryHandler = (id: string, name: string) => {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleComplete = async () => {
    try {
      const res = await fetch(
        `${getBaseUrl()}/api/goal/?goalId=${goal.id}&action=complete`,
        {
          method: 'PATCH',
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
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
    }
  };

  const addActivity = async () => {
    if (!activityName || !percentage) {
      showWarningToast('Please enter a activity name and percentage');
      return;
    }
    if (percentage > 100) {
      showWarningToast('Percentage cannot be greater than 100');
      return;
    }
    if (percentage + goal?.percentage > 100) {
      showWarningToast('Percentage cannot be greater than 100');
      return;
    }
    try {
      const res = await fetch(`${getBaseUrl()}/api/activity`, {
        method: 'POST',
        body: JSON.stringify({
          alignsWithGoal,
          percentage,
          goalId: goal?.id,
          activityName,
          categoryId: selectedCategoryId ?? '',
          categoryName: selectedCategoryName ?? '',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const activity = await res.json();
      const newPercentage = goal.percentage + percentage;
      dispatch(updateSelectedGoalPercentage(newPercentage));
      dispatch(addActivityToSelectedGoal(activity));

      const allActivity = {
        ...activity,
        goal: {
          ...goal,
        },
      };

      if (newPercentage === 100) {
        const res = await handleComplete();
      }
      dispatch(addActivityToAllActivities(allActivity));

      dispatch(setActivityFlag(!activityFlag));
      showSuccessToast('Activity added!');
      setActivityName('');
      setPercentage(0);
      setAlignsWithGoal(false);
      closeModal();
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
      showErrorToast('Something went wrong');
    }
  };

  return (
    <div>
      <div
        className='flex w-full cursor-pointer items-center justify-around gap-2 rounded-md bg-teal-500 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        onClick={openModal}
        style={{
          opacity: goal?.percentage === 100 || !goal ? 0.5 : 1,
          pointerEvents: goal?.percentage === 100 || !goal ? 'none' : 'auto',
        }}
      >
        <FaPlus className='h-4 w-4 text-white' aria-hidden='true' />
        <span>New Activity</span>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
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
            <div className='flex min-h-full items-center justify-center p-4 text-center '>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='mx-auto mt-4 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all '>
                  <Dialog.Title
                    as='h3'
                    className='font-roboto text-xl font-medium'
                  >
                    Enter Activity
                  </Dialog.Title>
                  <div className='mt-5 font-open_sans'>
                    <input
                      type='text'
                      name='price'
                      id='price'
                      className='sm:text-md my-1 block w-full rounded-md border-0 py-4 pl-4 pr-20 text-lg text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
                      placeholder='100k per month'
                    />
                    <Categories
                      setSelectedCategoryHandler={setSelectedCategoryHandler}
                      selectedCategory={selectedCategoryId}
                    />
                    <div className='flex items-center gap-3'>
                      <input
                        type='text'
                        name='percentage'
                        id='percentage'
                        className='sm:text-md my-5 block  w-[70%] rounded-md border-0 py-4 pl-4 pr-20 text-lg text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6'
                        value={percentage ?? 0}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Only allow numbers (integer or decimal)
                          if (/^\d*\.?\d*$/.test(value)) {
                            const inputPercentage = Number(value);
                            const maxPercentage = 100 - (goal?.percentage ?? 0);
                            // Limit the input value to be between 0 and maxPercentage
                            const clampedPercentage = Math.min(
                              Math.max(inputPercentage, 0),
                              maxPercentage
                            );
                            setPercentage(clampedPercentage);
                          }
                        }}
                        placeholder='Percentage of your day'
                      />
                      <div className='flex w-[30%] flex-col gap-y-1 text-sm'>
                        <span>
                          Remaining:{' '}
                          <span className='font-semibold text-blue-500'>
                            {100 - goal?.percentage}%
                          </span>
                        </span>
                        <button
                          className='rounded-lg bg-teal-500 px-2 py-1 text-sm text-white hover:opacity-50'
                          onClick={() => {
                            setPercentage(100 - goal?.percentage);
                          }}
                        >
                          Add Remaining
                        </button>
                      </div>
                    </div>
                  </div>
                  <fieldset>
                    <legend className='sr-only'>Notifications</legend>
                    <div className='space-y-5'>
                      <div className='relative flex items-start'>
                        <div className='flex h-6 items-center '>
                          <div
                            className={clsx(
                              'flex h-6 w-6 items-center justify-center rounded border border-gray-800',
                              alignsWithGoal ? 'bg-teal-500' : 'bg-white'
                            )}
                            onClick={() => setAlignsWithGoal(!alignsWithGoal)}
                          >
                            <input
                              id='comments'
                              aria-describedby='comments-description'
                              name='comments'
                              type='checkbox'
                              className='absolute opacity-0'
                              checked={alignsWithGoal}
                              onChange={() =>
                                setAlignsWithGoal(!alignsWithGoal)
                              }
                            />
                            {alignsWithGoal && (
                              <svg
                                className='h-4 w-4 fill-current text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                              >
                                <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className='ml-3 text-lg leading-6'>
                          <label
                            htmlFor='comments'
                            className='font-medium text-gray-900'
                          >
                            Aligns With Goal
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div className='mt-4 flex justify-end space-x-2'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                      onClick={addActivity}
                    >
                      Submit
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

export default AddActivity;
