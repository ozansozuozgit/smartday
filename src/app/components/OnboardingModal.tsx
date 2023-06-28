'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const OnboardingModal = ({ onClose }: any) => {
  return (
    <>
      <Transition appear show as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 overflow-y-auto'
          onClose={onClose}
        >
          <div className='flex min-h-screen items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter='transition-all transform ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='transition-all transform ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='relative w-full max-w-md rounded-xl bg-white px-6 py-8 shadow-xl'>
                <Dialog.Title className='mb-6 text-xl font-medium text-gray-900'>
                  Welcome To Time Spent! 👋
                </Dialog.Title>
                <div className='mb-8 text-sm text-gray-800'>
                  <p className='mb-4'>
                    Welcome to our app designed to help you track your time
                    spent on achieving your goals. While the app is versatile
                    and adaptable to your needs, we have some tips to maximize
                    its potential:
                  </p>
                  <ol className='mb-4 list-decimal pl-6'>
                    <li className='mb-2'>
                      Activities should exclude sleep. Concentrate on your
                      waking hours and what you accomplish during them.
                    </li>
                    <li className='mb-2'>
                      Activities can only be deleted in the same day.
                    </li>
                    <li className='mb-2'>
                      Focus on one goal for an extended period of time.
                    </li>
                    <li className='mb-2'>
                      Estimate the time spent on each activity and enter
                      percentages accordingly. Exact figures are not necessary.
                    </li>
                    <li className='mb-2'>
                      Be honest with yourself throughout the process.
                    </li>

                    <li className='mb-2'>
                      Consistently track your progress to gain a comprehensive
                      understanding of how you spend your time and its
                      correlation to your goal.
                    </li>
                    <li className='mb-2'>
                      Our AI coach will provide feedback based on your
                      activities and progress. Although it may come off as
                      quirky at times, remember that it has good intentions.
                    </li>
                  </ol>
                  <p>
                    <span className='font-semibold'>Note:</span> When you reach
                    100% progress or the day comes to an end{' '}
                    <strong>(12 AM CST)</strong>, our system will acknowledge
                    and mark your goal as completed. This ensures that your hard
                    work and dedication are recognized and saved for future
                    reference.
                  </p>
                </div>

                <div className='flex justify-end'>
                  <button
                    type='button'
                    className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={onClose}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OnboardingModal;
