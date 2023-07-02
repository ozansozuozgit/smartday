'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { addGoal, setSelectedGoal } from '@/src/redux/features/userSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '@/src/utils/toast';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import * as Sentry from '@sentry/nextjs';
import React, { Fragment, useState } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { GoalType } from '../../../types/types';

const plans = [
  {
    name: 'Single (No Percentage)',
    description: 'Goals can be completed once and will not have a percentage',
    type: 'singleNoPercentage',
  },

  {
    name: 'Single',
    description: 'Goals can be completed once, but will have a percentage',
    type: 'single',
  },
  {
    name: 'Daily',
    description: 'Recurring Goals That Will Reset Everyday at 12:00 AM CST',
    type: 'daily',
  },
];

const CreateGoal = () => {
  const [goalName, setGoalName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(plans[0]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const createGoal = async () => {
    if (!goalName || selected === null) {
      showWarningToast('Please enter a goal name');
      return;
    }
    try {
      const res = await fetch(`${getBaseUrl()}/api/goal`, {
        method: 'POST',
        body: JSON.stringify({ goalName, type: selected.type }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const goal = await res.json();
      goal.activities = [];

      dispatch(addGoal(goal));
      dispatch(setSelectedGoal(goal));
      closeModal();
      showSuccessToast('Goal added!');
      //reset state to default
      setGoalName('');
      setSelected(plans[0]);
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
      showErrorToast('Something went wrong');
    }
  };

  return (
    <div className='font-open_sans'>
      <div
        className='flex cursor-pointer items-center justify-around gap-2 rounded-md bg-teal-500 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
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

          <div className='fixed inset-0 overflow-y-auto '>
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
                <Dialog.Panel className='w-full max-w-[500px] transform overflow-hidden rounded-2xl  bg-slate-100 p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='font-roboto text-xl font-medium'
                  >
                    Enter Goal Name
                  </Dialog.Title>
                  <div className='mt-2 font-open_sans'>
                    <input
                      type='text'
                      name='price'
                      id='price'
                      className='sm:text-md text-md my-5 block w-full rounded-md border-0 py-4 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
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
                  <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className='sr-only'>
                      Server size
                    </RadioGroup.Label>
                    <div className='space-y-2'>
                      {plans.map((plan) => (
                        <RadioGroup.Option
                          key={plan.name}
                          value={plan}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                : ''
                            }
                  ${
                    checked
                      ? 'bg-teal-800 bg-opacity-75 text-white'
                      : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center'>
                                  <div className='text-sm'>
                                    <RadioGroup.Label
                                      as='p'
                                      className={`font-medium  ${
                                        checked ? 'text-white' : 'text-teal-900'
                                      }`}
                                    >
                                      {plan.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as='span'
                                      className={`inline ${
                                        checked
                                          ? 'text-sky-100'
                                          : 'text-teal-800'
                                      }`}
                                    >
                                      <span>{plan.description}</span>{' '}
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked && (
                                  <div className='shrink-0 text-white'>
                                    <FaCheck className='h-4 w-4' />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
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
                      className='inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
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
