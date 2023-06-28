'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function OnboardingModal({ onClose }: any) {


  return (
    <>
      <Transition appear show as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={onClose}>
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

          <div className='fixed inset-0 overflow-y-auto font-open_sans'>
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
                    className='text-gray-900 text-lg font-medium leading-6'
                  >
                    Welcome To Time Spent! 👋
                  </Dialog.Title>
                  <div className='mt-2 flex flex-col gap-4'>
                    <p className='text-gray-500 text-sm'>
                      Welcome to our app designed to help you track your time
                      spent on achieving your goals. While the app is versatile
                      and adaptable to your needs, we have some tips to maximize
                      its potential:
                    </p>
                    <ol className='list-decimal space-y-2 pl-6'>
                      <li className='mb-1'>
                        Focus on one goal for an extended period of time.
                      </li>
                      <li className='mb-1'>
                        Estimate the time spent on each activity and enter
                        percentages accordingly. Exact figures are not
                        necessary.
                      </li>
                      <li className='mb-1'>
                        Be honest with yourself throughout the process.
                      </li>
                      <li className='mb-1'>
                        Activities should exclude sleep. Concentrate on your
                        waking hours and what you accomplish during them.
                      </li>
                      <li className='mb-1'>
                        Consistently track your progress to gain a comprehensive
                        understanding of how you spend your time and its
                        correlation to your goal.
                      </li>
                      <li className='mb-1'>
                        Our AI coach will provide feedback based on your
                        activities and progress. Although it may come off as
                        quirky at times, remember that it has good intentions.
                      </li>
                    </ol>
                    <p className='text-gray-500 text-sm'>
                      <span className='font-semibold'>Note:</span> When you
                      reach 100% progress or the day comes to an end{' '}
                      <strong>(12 AM CST)</strong>, our system will acknowledge
                      and mark your goal as completed. This ensures that your
                      hard work and dedication are recognized and saved for
                      future reference.
                    </p>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white hover:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2'
                      onClick={onClose}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
