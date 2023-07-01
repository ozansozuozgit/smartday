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
                  Welcome to Smart Day! 👋
                </Dialog.Title>
                <div className='mb-8 text-sm text-gray-800'>
                  <p>
                    Welcome to Smart Day! Our app helps you track your time
                    towards achieving your goals effectively. Here are a few
                    tips:
                  </p>
                  <ul className='mt-4 list-disc pl-6 space-y-2'>
                    <li>
                      Distinguish between Single and Daily Goals. Single Goals
                      have no time limit, while Daily Goals reset each day{' '}
                      <strong>(12AM CST)</strong>.
                    </li>
                    <li>Focus on your active hours and exclude sleep.</li>
                    <li>
                      Estimate the time spent on each activity and enter the
                      percentages accordingly.
                    </li>
                    <li>
                      Be honest with yourself when logging activities and track
                      your progress consistently.
                    </li>
                    <li>
                      Our AI Coach provides feedback to support and motivate you
                      along your journey.
                    </li>
                    <li>
                      Access your profile by clicking on the avatar in the
                      bottom left corner.
                    </li>
                  </ul>
                  <p className='mt-4'>
                    Note: Completing a goal is within your control for single goals. Mark it as
                    completed when you achieve it.
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
