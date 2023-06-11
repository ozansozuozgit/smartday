'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { Dialog, Transition } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';
import React, { Fragment, useRef, useState } from 'react';
import { GoalType } from '../../types/types';
import Categories from './Categories';
import CreateCategory from './CreateCategory';
const AddActivity = () => {
  const searchParams = useSearchParams();

  const goalId = searchParams.get('goal');

  // form inputs
  const [activityName, setActivityName] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  let [isOpen, setIsOpen] = useState(false);

  const setSelectedCategoryHandler = (category: string) => {
    console.log('category', category)
    setSelectedCategoryId(category);

  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addActivity = async () => {
    if (!activityName) return;
    try {
      const res = await fetch(`${getBaseUrl()}/api/activity`, {
        method: 'POST',
        body: JSON.stringify({
          alignsWithGoal,
          activityPercentage,
          goalId,
          activityName,
          categoryId:selectedCategoryId ,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const goal = await res.json();
      //   addGoalToState(goal);
      closeModal();
      console.log('Goal added!');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <>
        <div className='flex items-center justify-center'>
          <button
            type='button'
            onClick={openModal}
            className='rounded-md bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
          >
            Create Goal
          </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                  <Dialog.Panel className='w-full max-w-[300px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      Enter Activity
                    </Dialog.Title>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='price'
                        id='price'
                        className='block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault(); // Prevents form submission
                            addActivity();
                          }
                        }}
                        placeholder='100k per month'
                      />
                      <Categories
                        setSelectedCategoryHandler={setSelectedCategoryHandler}
                        selectedCategory={selectedCategoryId}
                      />
                    </div>

                    <div className='mt-4 space-x-2 flex justify-end'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
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
      </>
    </div>
  );
};

export default AddActivity;
