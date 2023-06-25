'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import {
  addActivityToSelectedGoal,
  setActivityFlag,
  updateSelectedGoalPercentage,
} from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useEffect, useState } from 'react';
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
    console.log(id, name)
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
    console.log('selectedCategoryName', selectedCategoryName)
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addActivity = async () => {
    if (!activityName || !percentage) return;
    if (percentage > 100) return alert('Percentage cannot be greater than 100');
    if (percentage + goal?.percentage > 100)
      return alert('Percentage cannot be greater than 100');
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
      dispatch(setActivityFlag(!activityFlag));
      setActivityName('');
      setPercentage(0);
      setAlignsWithGoal(false);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div
        className='flex items-center justify-around rounded-md bg-teal px-2 py-2 gap-2  text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer w-full'
        onClick={openModal}
        style={{
          opacity: goal?.percentage === 100 || !goal ? 0.5 : 1,
          pointerEvents: goal?.percentage === 100 || !goal ? 'none' : 'auto',
        }}
      >
        <PlusIcon className='h-4 w-4 text-white' aria-hidden='true' />

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
                <Dialog.Panel className='w-full max-w-md mx-auto mt-4 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-roboto font-medium '
                  >
                    Enter Activity
                  </Dialog.Title>
                  <div className='mt-5 font-open_sans'>
                    <input
                      type='text'
                      name='price'
                      id='price'
                      className='block w-full rounded-md border-0 py-4 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:text-md sm:leading-6 my-5'
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
                        name='perentage'
                        id='perentage'
                        className='block w-full rounded-md border-0 py-4 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:text-md sm:leading-6 my-5'
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
                      <span className='text-lg w-[70%]'>
                        Remaining:{' '}
                        <span className='text-blue font-semibold'>
                          {100 - goal?.percentage}%
                        </span>
                      </span>
                    </div>
                  </div>
                  <fieldset>
                    <legend className='sr-only'>Notifications</legend>
                    <div className='space-y-5'>
                      <div className='relative flex items-start'>
                        <div className='flex h-6 items-center'>
                          <input
                            id='comments'
                            aria-describedby='comments-description'
                            name='comments'
                            type='checkbox'
                            className='h-8 w-8 rounded border-gray text-indigo-600 focus:ring-indigo-600'
                            checked={alignsWithGoal}
                            onChange={() => setAlignsWithGoal(!alignsWithGoal)}
                          />
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
                  <div className='mt-4 space-x-2 flex justify-end'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2'
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
