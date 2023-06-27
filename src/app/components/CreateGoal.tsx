'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { addGoal, setSelectedGoal } from '@/src/redux/features/userSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
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
    <div className='font-open_sans'>
      <div
        className='flex cursor-pointer items-center justify-around gap-2 rounded-md bg-teal px-2  py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 '
        onClick={openModal}
      >
        <FaPlus className='h-3 w-3 text-white' aria-hidden='true' />
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
                    className='font-roboto text-lg font-medium '
                  >
                    Enter Goal Name
                  </Dialog.Title>
                  <div className='mt-2 font-open_sans'>
                    <input
                      type='text'
                      name='price'
                      id='price'
                      className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-md my-5 block w-full rounded-md border-0 py-4 pl-4 pr-20 text-md ring-1 ring-inset focus:ring-2 focus:ring-inset sm:leading-6'
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

                  <div className='mt-4 flex justify-end space-x-2'>
                    <button
                      type='button'
                      className='focus-visible:ring-bluefocus-visible:ring-offset-2 inline-flex justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue focus:outline-none focus-visible:ring-2'
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='focus-visible:ring-bluefocus-visible:ring-offset-2 inline-flex justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-teal focus:outline-none focus-visible:ring-2'
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
