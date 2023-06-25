'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { addGoal, setSelectedGoal } from '@/src/redux/features/userSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useState } from 'react';
import { GoalType } from '../../../types/types';

const CreateGoal = () => {
  const [goalName, setGoalName] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const createGoal = async () => {
    if (!goalName) return;

    try {
      const res = await fetch(`${getBaseUrl()}/api/goal`, {
        method: 'POST',
        body: JSON.stringify({ goalName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const goal = await res.json();
      goal.activities = [];

      dispatch(addGoal(goal));
      dispatch(setSelectedGoal(goal));
      closeModal();
      console.log('Goal added!');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=''>
      <div
        className='flex items-center justify-around rounded-md bg-teal px-6 py-2 gap-2  text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer'
        onClick={openModal}
      >
        <PlusIcon className='h-4 w-4 text-white' aria-hidden='true' />
        <span>New Goal</span>
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
                    className='text-xl font-roboto font-medium '
                  >
                    Enter Goal Name
                  </Dialog.Title>
                  <div className='mt-2 font-open_sans'>
                    <input
                      type='text'
                      name='price'
                      id='price'
                      className='block w-full rounded-md border-0 py-4 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:text-md sm:leading-6 my-5'
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          createGoal();
                        }
                      }}
                      placeholder='100k per month'
                    />
                  </div>

                  <div className='mt-4 space-x-2 flex justify-end'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-bluefocus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-bluefocus-visible:ring-offset-2'
                      onClick={createGoal}
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

export default CreateGoal;
